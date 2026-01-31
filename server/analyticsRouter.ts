import { router, publicProcedure } from "./_core/trpc";
import { z } from "zod";
import { getDb } from "./db";
import { pageviews } from "../drizzle/schema";
import { sql, and, gte, lte, count, desc } from "drizzle-orm";

export const analyticsRouter = router({
  // Registrar uma visualização de página
  trackPageview: publicProcedure
    .input(
      z.object({
        path: z.string(),
        referrer: z.string().optional(),
        userAgent: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");
      await db.insert(pageviews).values({
        path: input.path,
        referrer: input.referrer || null,
        userAgent: input.userAgent || null,
        sessionId: null,
        ipAddress: null,
      });
      return { success: true };
    }),

  // Obter estatísticas gerais
  getStats: publicProcedure
    .input(
      z.object({
        startDate: z.string().optional(),
        endDate: z.string().optional(),
      })
    )
    .query(async ({ input }) => {
      const conditions = [];
      
      if (input.startDate) {
        conditions.push(gte(pageviews.viewedAt, new Date(input.startDate)));
      }
      if (input.endDate) {
        conditions.push(lte(pageviews.viewedAt, new Date(input.endDate)));
      }

      const db = await getDb();
      if (!db) return { totalViews: 0, uniqueVisitors: 0, pagesPerVisitor: "0" };

      // Total de visualizações
      const totalViewsResult = await db
        .select({ count: count() })
        .from(pageviews)
        .where(conditions.length > 0 ? and(...conditions) : undefined);
      
      const totalViews = totalViewsResult[0]?.count || 0;

      // Visitantes únicos (aproximado por sessionId/userAgent)
      const uniqueVisitorsResult = await db
        .select({ count: sql<number>`COUNT(DISTINCT ${pageviews.userAgent})` })
        .from(pageviews)
        .where(conditions.length > 0 ? and(...conditions) : undefined);
      
      const uniqueVisitors = Number(uniqueVisitorsResult[0]?.count || 0);

      // Páginas por visitante
      const pagesPerVisitor = uniqueVisitors > 0 ? (totalViews / uniqueVisitors).toFixed(1) : "0";

      return {
        totalViews,
        uniqueVisitors,
        pagesPerVisitor,
      };
    }),

  // Obter páginas mais visitadas
  getTopPages: publicProcedure
    .input(
      z.object({
        startDate: z.string().optional(),
        endDate: z.string().optional(),
        limit: z.number().default(10),
      })
    )
    .query(async ({ input }) => {
      const conditions = [];
      
      if (input.startDate) {
        conditions.push(gte(pageviews.viewedAt, new Date(input.startDate)));
      }
      if (input.endDate) {
        conditions.push(lte(pageviews.viewedAt, new Date(input.endDate)));
      }

      const db = await getDb();
      if (!db) return [];

      const topPages = await db
        .select({
          page: pageviews.path,
          views: count(),
        })
        .from(pageviews)
        .where(conditions.length > 0 ? and(...conditions) : undefined)
        .groupBy(pageviews.path)
        .orderBy(desc(count()))
        .limit(input.limit);

      // Calcular total para percentagens
      const totalViewsResult = await db
        .select({ count: count() })
        .from(pageviews)
        .where(conditions.length > 0 ? and(...conditions) : undefined);
      
      const totalViews = totalViewsResult[0]?.count || 1;

      return topPages.map((item: { page: string; views: number }) => ({
        page: item.page,
        views: item.views,
        percentage: Math.round((item.views / totalViews) * 100),
      }));
    }),
});
