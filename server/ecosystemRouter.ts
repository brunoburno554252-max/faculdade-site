import { z } from "zod";
import { protectedProcedure, router } from "./_core/trpc";
import { writeFileSync, readFileSync } from "fs";
import { join } from "path";

const CARDS_FILE = join(process.cwd(), "client/src/data/organograma-cards-final.json");

const cardCoordinateSchema = z.object({
  cardId: z.string(),
  nome: z.string(),
  tipo: z.string(),
  categoria: z.string(),
  posicao: z.string(),
  x: z.number(),
  y: z.number(),
  width: z.number(),
  height: z.number(),
  descricao: z.string(),
});

type CardCoordinate = z.infer<typeof cardCoordinateSchema>;

export const ecosystemRouter = router({
  // Salvar coordenadas dos cards direto no arquivo JSON
  saveCoordinates: protectedProcedure
    .input(z.record(z.string(), cardCoordinateSchema))
    .mutation(({ input }) => {
      try {
        // Validar que é admin
        // (por enquanto sem validação já que login é simplificado)
        
        // Salvar direto no arquivo JSON
        const jsonContent = JSON.stringify(input, null, 2);
        writeFileSync(CARDS_FILE, jsonContent, "utf-8");

        return {
          success: true,
          message: "Coordenadas salvas com sucesso!",
        };
      } catch (error) {
        console.error("Erro ao salvar coordenadas:", error);
        throw new Error("Erro ao salvar coordenadas no arquivo");
      }
    }),

  // Carregar coordenadas do arquivo JSON
  getCoordinates: protectedProcedure.query(() => {
    try {
      const fileContent = readFileSync(CARDS_FILE, "utf-8");
      const coordinates = JSON.parse(fileContent);
      return coordinates;
    } catch (error) {
      console.error("Erro ao carregar coordenadas:", error);
      throw new Error("Erro ao carregar coordenadas");
    }
  }),
});
