import { z } from "zod";
import { publicProcedure, router } from "./_core/trpc";
import axios from "axios";

const BITRIX_WEBHOOK_URL = "https://grupolaeducacao.bitrix24.com.br/rest/11/skpys5v7oq07mf2y/crm.item.list.json";
const ENTITY_TYPE_ID = 1058;

// Mapeamento de Status conforme fornecido pelo usuário
const STATUS_MAP: Record<number, string> = {
  249: "Concluído",
  243: "Aguardando Documentos",
  383: "Aguardando Trabalhos - EJA",
  385: "Aguardando TCC",
  251: "Entregue Aluno/Parceiro",
  379: "Parcelas Atrasadas",
  381: "Parcelas Pendentes",
  439: "Aguardando Práticas Pedagógicas",
  429: "Aguardando Envio para Certificadora",
  247: "Processo de Emissão (LA)",
  245: "Enviado a Certificadora"
};

export const bitrixCertificadosRouter = router({
  search: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      try {
        const response = await axios.get(BITRIX_WEBHOOK_URL, {
          params: {
            entityTypeId: ENTITY_TYPE_ID,
            "filter[id]": input.id
          }
        });

        const items = response.data?.result?.items || [];
        
        if (items.length === 0) {
          return { success: false, message: "Certificado não encontrado." };
        }

        const item = items[0];
        
        // Mapeamento dos campos UF_CRM_11_...
        const statusId = Number(item.ufCrm11_1742922374807);
        
        return {
          success: true,
          data: {
            id: item.id,
            aluno: item.ufCrm11_1742922113371 || "Não informado",
            curso: item.ufCrm11_1742922326382 || "Não informado",
            status: STATUS_MAP[statusId] || `Status desconhecido (${statusId})`,
            dataSolicitacao: item.ufCrm11_1742923044042 ? new Date(item.ufCrm11_1742923044042).toLocaleDateString('pt-BR') : "Não informada",
            arquivos: item.ufCrm11_1748878858 || []
          }
        };
      } catch (error) {
        console.error("Erro ao consultar Bitrix:", error);
        return { success: false, message: "Erro ao consultar o sistema de certificados." };
      }
    }),
});
