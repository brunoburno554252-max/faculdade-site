import { useState, useEffect } from "react";
import { useRoute } from "wouter";
import { toast } from "sonner";
import { ArrowLeft, X, Upload, Image as ImageIcon, Save } from "lucide-react";
import instituicoesInfo from "@/data/instituicoes-info.json";

interface InstituicaoInfo {
  nome: string;
  tipo: string;
  categoria: string;
  descricao: string;
  missao?: string;
  visao?: string;
  valores?: string[];
  fotos?: string[]; // Usado para o Logo
  banner?: string; // Novo campo para o Banner
  website?: string;
  [key: string]: any;
}

export default function AdminEcosystemInstitutionPage() {
  const [, params] = useRoute("/admin-la-educacao/ecossistema/:id");
  const institutionId = params?.id as string;

  const [formData, setFormData] = useState<InstituicaoInfo | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Carregar dados da instituição
  useEffect(() => {
    if (institutionId) {
      const institution = instituicoesInfo[institutionId as keyof typeof instituicoesInfo] as InstituicaoInfo;
      if (institution) {
        setFormData({
          ...institution,
          // Garantir que campos novos existam
          banner: institution.banner || "",
          fotos: institution.fotos || [],
        });
      }
    }
  }, [institutionId]);

  const handleInputChange = (field: string, value: any) => {
    if (formData) {
      setFormData({
        ...formData,
        [field]: value,
      });
    }
  };

  const handleSave = async () => {
    if (!formData || !institutionId) return;

    setIsSaving(true);
    try {
      const response = await fetch("/api/ecosystem/save-institution", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          institutionId,
          data: formData,
        }),
      });

      if (!response.ok) {
        throw new Error("Erro ao salvar no servidor");
      }

      toast.success("✓ Alterações salvas com sucesso!");
      
      setTimeout(() => {
        window.location.href = "/admin-la-educacao/ecossistema";
      }, 1000);
    } catch (error) {
      toast.error("Erro ao salvar alterações");
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  if (!formData) {
    return (
      <div className="min-h-screen bg-gray-50 p-8 flex items-center justify-center">
        <div className="text-pink-600 font-bold animate-pulse">Carregando dados da empresa...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <a
              href="/admin-la-educacao/ecossistema"
              className="p-2 bg-white rounded-full shadow-sm text-pink-600 hover:bg-pink-50 transition-colors"
            >
              <ArrowLeft size={24} />
            </a>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{formData.nome}</h1>
              <p className="text-gray-500">Gerenciar conteúdo e identidade visual</p>
            </div>
          </div>
          
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center justify-center gap-2 bg-pink-600 text-white py-3 px-8 rounded-xl hover:bg-pink-700 transition shadow-lg shadow-pink-200 font-bold disabled:opacity-50"
          >
            {isSaving ? "Salvando..." : <><Save size={20} /> Salvar Alterações</>}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Coluna da Esquerda: Imagens */}
          <div className="lg:col-span-1 space-y-6">
            {/* Logo da Empresa */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <ImageIcon size={20} className="text-pink-600" /> Logo da Empresa
              </h3>
              <div className="aspect-square bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center overflow-hidden relative group">
                {formData.fotos && formData.fotos[0] ? (
                  <>
                    <img src={formData.fotos[0]} alt="Logo" className="w-full h-full object-contain p-4" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button className="text-white font-bold text-sm">Trocar Logo</button>
                    </div>
                  </>
                ) : (
                  <div className="text-center p-4">
                    <Upload className="mx-auto text-gray-400 mb-2" size={32} />
                    <p className="text-xs text-gray-500">Clique para fazer upload do logo (PNG/JPG)</p>
                  </div>
                )}
              </div>
              <input 
                type="text" 
                placeholder="URL da Imagem do Logo"
                value={formData.fotos?.[0] || ""}
                onChange={(e) => handleInputChange("fotos", [e.target.value])}
                className="mt-4 w-full px-4 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 outline-none"
              />
            </div>

            {/* Banner de Fundo */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <ImageIcon size={20} className="text-pink-600" /> Banner de Fundo
              </h3>
              <div className="aspect-video bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center overflow-hidden relative group">
                {formData.banner ? (
                  <>
                    <img src={formData.banner} alt="Banner" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button className="text-white font-bold text-sm">Trocar Banner</button>
                    </div>
                  </>
                ) : (
                  <div className="text-center p-4">
                    <Upload className="mx-auto text-gray-400 mb-2" size={32} />
                    <p className="text-xs text-gray-500">Upload do banner de fundo</p>
                  </div>
                )}
              </div>
              <input 
                type="text" 
                placeholder="URL da Imagem do Banner"
                value={formData.banner || ""}
                onChange={(e) => handleInputChange("banner", e.target.value)}
                className="mt-4 w-full px-4 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 outline-none"
              />
            </div>
          </div>

          {/* Coluna da Direita: Textos */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Conteúdo da Seção</h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Nome da Empresa</label>
                  <input
                    type="text"
                    value={formData.nome}
                    onChange={(e) => handleInputChange("nome", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 outline-none transition-all"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Tipo de Negócio</label>
                    <input
                      type="text"
                      value={formData.tipo}
                      onChange={(e) => handleInputChange("tipo", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Categoria</label>
                    <input
                      type="text"
                      value={formData.categoria}
                      onChange={(e) => handleInputChange("categoria", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Descrição Detalhada</label>
                  <textarea
                    value={formData.descricao}
                    onChange={(e) => handleInputChange("descricao", e.target.value)}
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 outline-none transition-all resize-none"
                    placeholder="Escreva aqui o texto que aparecerá quando o aluno clicar na logo desta empresa..."
                  />
                  <p className="mt-2 text-xs text-gray-400">Este texto será exibido na seção de conteúdo dinâmico do site.</p>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Link do Website (Opcional)</label>
                  <input
                    type="url"
                    value={formData.website || ""}
                    onChange={(e) => handleInputChange("website", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 outline-none transition-all"
                    placeholder="https://..."
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
