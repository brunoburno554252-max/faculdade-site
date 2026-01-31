import { z } from "zod";
import { publicProcedure, router } from "./_core/trpc";
import * as adminDb from "./adminDb";

// Public routers for frontend (no authentication required)
export const publicCoursesRouter = router({
  getAll: publicProcedure.query(async () => {
    // Get only active courses
    const courses = await adminDb.getAllCourses();
    return courses.filter(c => c.isActive);
  }),
  
  getBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ input }) => {
      const courses = await adminDb.getAllCourses();
      const course = courses.find(c => c.slug === input.slug && c.isActive);
      if (!course) {
        return null;
      }
      const curriculum = await adminDb.getCourseCurriculum(course.id);
      return { ...course, curriculum };
    }),
});

export const publicBlogRouter = router({
  getAll: publicProcedure.query(async () => {
    const posts = await adminDb.getAllBlogPosts();
    return posts.filter(p => p.isPublished);
  }),
  
  getFeatured: publicProcedure.query(async () => {
    const posts = await adminDb.getAllBlogPosts();
    return posts
      .filter(p => p.isPublished && p.featured)
      .sort((a: any, b: any) => new Date(b.publishedAt || b.createdAt).getTime() - new Date(a.publishedAt || a.createdAt).getTime())
      .slice(0, 3); // Return max 3 featured posts
  }),
  
  getBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ input }) => {
      const posts = await adminDb.getAllBlogPosts();
      return posts.find(p => p.slug === input.slug && p.isPublished) || null;
    }),
});

export const publicBannersRouter = router({
  getActive: publicProcedure.query(async () => {
    const banners = await adminDb.getAllHeroBanners();
    return banners
      .filter(b => b.isActive)
      .sort((a: any, b: any) => a.order - b.order);
  }),
});

export const publicCertificationsRouter = router({
  getAll: publicProcedure.query(async () => {
    return await adminDb.getAllCertifications();
  }),
});

export const publicSettingsRouter = router({
  getAll: publicProcedure.query(async () => {
    return await adminDb.getAllSettings();
  }),
});

export const publicCategoriesRouter = router({
  getAll: publicProcedure.query(async () => {
    const categories = await adminDb.getAllCategories();
    return categories.filter((c: any) => c.isActive);
  }),
});

export const publicTypesRouter = router({
  getAll: publicProcedure.query(async () => {
    const types = await adminDb.getAllTypes();
    return types.filter((t: any) => t.isActive);
  }),
});

export const publicTestimonialsRouter = router({
  getAll: publicProcedure.query(async () => {
    const testimonials = await adminDb.getAllTestimonials();
    return testimonials.filter((t: any) => t.isActive);
  }),
});
