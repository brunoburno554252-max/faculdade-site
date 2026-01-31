import { z } from "zod";
import { publicProcedure, router } from "./_core/trpc";
import { storagePut } from "./storage";
import { TRPCError } from "@trpc/server";

export const uploadRouter = router({
  uploadImage: publicProcedure
    .input(z.object({
      base64: z.string(),
      filename: z.string(),
      contentType: z.string(),
    }))
    .mutation(async ({ input }) => {
      try {
        // Remove o prefixo data:image/...;base64, se existir
        const base64Data = input.base64.replace(/^data:image\/\w+;base64,/, '');
        
        // Converte base64 para Buffer
        const buffer = Buffer.from(base64Data, 'base64');
        
        // Gera um nome único para o arquivo
        const timestamp = Date.now();
        const randomStr = Math.random().toString(36).substring(7);
        const extension = input.filename.split('.').pop() || 'jpg';
        const key = `uploads/${timestamp}-${randomStr}.${extension}`;
        
        // Faz upload para S3
        const result = await storagePut(key, buffer, input.contentType);
        
        return {
          url: result.url,
          key: result.key,
        };
      } catch (error) {
        console.error('Upload error:', error);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Erro ao fazer upload da imagem',
        });
      }
    }),
});
