import { z } from "zod";
import { publicProcedure, router } from "./_core/trpc";
import * as adminDbMetadata from "./adminDbMetadata";

export const publicPartnersRouter = router({
  create: publicProcedure
    .input(z.object({
      name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
      email: z.string().email("Email inválido"),
      phone: z.string().optional(),
      company: z.string().optional(),
      message: z.string().min(10, "Mensagem deve ter pelo menos 10 caracteres"),
    }))
    .mutation(async ({ input }) => {
      await adminDbMetadata.createPartnershipRequest(input);
      return { success: true };
    }),
});
