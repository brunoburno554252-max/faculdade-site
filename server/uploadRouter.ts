import { z } from "zod";
import { publicProcedure, router } from "./_core/trpc";
import { TRPCError } from "@trpc/server";
import * as fs from "fs";
import * as path from "path";

// Diretório de uploads - em produção usa /var/www/uploads, em dev usa pasta local
const UPLOAD_DIR = process.env.NODE_ENV === "production" 
  ? "/var/www/uploads" 
  : path.join(process.cwd(), "public/uploads");

// Garante que o diretório existe
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

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
        const extension = input.filename.split('.').pop() || 'jpg';
        // Limpa o nome do arquivo removendo caracteres especiais
        const cleanFilename = input.filename
          .replace(/\.[^/.]+$/, '') // Remove extensão
          .replace(/[^a-zA-Z0-9_-]/g, '_') // Substitui caracteres especiais
          .substring(0, 50); // Limita tamanho
        const finalFilename = `${timestamp}-${cleanFilename}.${extension}`;
        
        // Salva o arquivo localmente
        const filePath = path.join(UPLOAD_DIR, finalFilename);
        fs.writeFileSync(filePath, buffer);
        
        // URL pública
        const url = `/uploads/${finalFilename}`;
        
        console.log(`[Upload tRPC] Arquivo salvo: ${filePath}`);
        console.log(`[Upload tRPC] URL pública: ${url}`);
        
        return {
          url,
          key: finalFilename,
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
