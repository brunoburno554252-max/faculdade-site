import { invokeLLM } from "./_core/llm";

interface CurriculumSubject {
  semester: number;
  subjectName: string;
  workload: number;
  description?: string;
}

interface ParsedCurriculum {
  subjects: CurriculumSubject[];
  courseName?: string;
  totalSemesters?: number;
}

/**
 * URL da API serverless de processamento de PDF
 * Configure via variável de ambiente ou use fallback local
 */
const PDF_SERVICE_URL = process.env.PDF_SERVICE_URL || "http://localhost:3001/api/parse-pdf";

/**
 * Processar PDF usando API serverless externa
 */
async function processPDFWithExternalAPI(pdfBuffer: Buffer): Promise<ParsedCurriculum> {
  try {
    // Converter PDF para base64
    const pdfBase64 = pdfBuffer.toString('base64');
    
    // Obter API key do LLM (reutilizar a mesma configuração)
    const apiKey = process.env.BUILT_IN_FORGE_API_KEY || process.env.OPENAI_API_KEY;
    
    // Chamar API serverless
    const response = await fetch(PDF_SERVICE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        pdf: pdfBase64,
        apiKey: apiKey
      })
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API serverless retornou erro: ${response.status} - ${errorText}`);
    }
    
    const result = await response.json();
    
    if (!result.success) {
      throw new Error(result.error || "Erro desconhecido na API serverless");
    }
    
    return result.data as ParsedCurriculum;
  } catch (error: any) {
    // Se API serverless falhar, tentar fallback local
    console.error("Erro ao usar API serverless, tentando fallback local:", error.message);
    return await processPDFLocally(pdfBuffer);
  }
}

/**
 * Fallback: processar PDF localmente usando apenas LLM
 * (sem OCR, apenas para PDFs com texto selecionável)
 */
async function processPDFLocally(pdfBuffer: Buffer): Promise<ParsedCurriculum> {
  try {
    // Converter buffer para base64
    const base64Pdf = pdfBuffer.toString('base64');
    const dataUrl = `data:application/pdf;base64,${base64Pdf}`;

    const response = await invokeLLM({
      messages: [
        {
          role: "system",
          content: `Você é um assistente especializado em analisar grades curriculares de cursos técnicos e superiores brasileiros.

OBJETIVO: Extrair APENAS as disciplinas/componentes curriculares com seus semestres/módulos e cargas horárias.

O QUE EXTRAIR:
- Nome da disciplina/componente curricular
- Número do semestre/módulo/período
- Carga horária em horas

O QUE IGNORAR:
- Cabeçalhos e rodapés
- Informações administrativas
- Códigos de disciplina
- Pré-requisitos
- Descrições genéricas

REGRAS:
- Se a carga horária não estiver explícita, use 60h como padrão
- Módulos são equivalentes a semestres
- Extraia TODAS as disciplinas encontradas`
        },
        {
          role: "user",
          content: [
            {
              type: "file_url",
              file_url: {
                url: dataUrl,
                mime_type: "application/pdf"
              }
            },
            {
              type: "text",
              text: `Analise este PDF de grade curricular e retorne APENAS um JSON válido com a estrutura:

{
  "courseName": "nome do curso",
  "totalSemesters": número de semestres/módulos,
  "subjects": [
    {
      "semester": 1,
      "subjectName": "Nome da Disciplina",
      "workload": 80
    }
  ]
}`
            }
          ]
        }
      ],
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "curriculum_data",
          strict: true,
          schema: {
            type: "object",
            properties: {
              courseName: {
                type: "string",
                description: "Nome do curso identificado"
              },
              totalSemesters: {
                type: "integer",
                description: "Número total de semestres/módulos"
              },
              subjects: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    semester: {
                      type: "integer",
                      description: "Número do semestre/módulo"
                    },
                    subjectName: {
                      type: "string",
                      description: "Nome da disciplina"
                    },
                    workload: {
                      type: "integer",
                      description: "Carga horária em horas"
                    },
                    description: {
                      type: "string",
                      description: "Descrição opcional"
                    }
                  },
                  required: ["semester", "subjectName", "workload"],
                  additionalProperties: false
                }
              }
            },
            required: ["subjects"],
            additionalProperties: false
          }
        }
      }
    });

    const content = response.choices[0].message.content;
    if (!content || typeof content !== 'string') {
      throw new Error("LLM returned empty or invalid response");
    }

    const parsed = JSON.parse(content);
    return parsed as ParsedCurriculum;
  } catch (error: any) {
    throw new Error(`Falha no processamento local: ${error.message}`);
  }
}

/**
 * Main function to process PDF and extract curriculum
 */
export async function processCurriculumPDF(pdfBuffer: Buffer): Promise<ParsedCurriculum> {
  try {
    // Tentar usar API serverless primeiro
    const curriculum = await processPDFWithExternalAPI(pdfBuffer);

    if (!curriculum.subjects || curriculum.subjects.length === 0) {
      throw new Error("Nenhuma disciplina foi encontrada no PDF. Verifique se o documento contém uma grade curricular válida.");
    }

    return curriculum;
  } catch (error: any) {
    throw new Error(`Falha ao processar PDF: ${error.message}`);
  }
}
