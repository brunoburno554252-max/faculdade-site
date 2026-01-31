import { z } from "zod";
import { publicProcedure, router } from "./_core/trpc";
import * as adminDbOmbudsman from "./adminDbOmbudsman";

export const publicOmbudsmanRouter = router({
  create: publicProcedure
    .input(z.object({
      name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
      email: z.string().email("Email inválido"),
      phone: z.string().optional(),
      subject: z.string().min(3, "Assunto deve ter pelo menos 3 caracteres"),
      message: z.string().min(10, "Mensagem deve ter pelo menos 10 caracteres"),
    }))
    .mutation(async ({ input }) => {
      await adminDbOmbudsman.createOmbudsmanMessage(input);
      return { success: true };
    }),
});
