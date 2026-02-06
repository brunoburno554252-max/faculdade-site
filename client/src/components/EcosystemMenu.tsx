import { useState, useEffect } from "react";
import { trpc } from "@/lib/trpc";

// Mapeamento das chaves do JSON para os IDs usados no menu
const menuMapping = [
  { id: "mde", key: "mde" },
  { id: "la-faculdades", key: "faculdade_la" },
  { id: "la-bank", key: "la_bank" },
  { id: "la-tecnologia", key: "la_tecnologia" },
  { id: "latec-sul", key: "la_tec_sul" },
  { id: "latec", key: "la_tec" },
  { id: "astortc", key: "astor_tec" },
  { id: "capacita", key: "capacita_cidade" },
  { id: "aizu", key: "izul" },
];

// Fallback para logos (caminhos locais)
const logoFallbacks: Record<string, string> = {
  mde: "/assets/logos-grupo/MDE - PNG.png",
  faculdade_la: "/assets/logos-grupo/Logo_LAFACULDADES_principal.png",
  la_bank: "/assets/logos-grupo/Logo_LABank_Principal.png",
  la_tecnologia: "/assets/logos-grupo/LA TECNOLOGIA COLORIDO HORIZONTAL.png",
  la_tec_sul: "/assets/logos-grupo/Logo_LATecSul_Principal.png",
  la_tec: "/assets/logos-grupo/Logo_LATec_Principal.png",
  astor_tec: "/assets/logos-grupo/AstorTec_Oficial.png",
  capacita_cidade: "/assets/logos-grupo/Design sem nome.png",
  izul: "/assets/logos-grupo/Aizul.png",
};

interface MenuItem {
  id: string;
  key: string;
  name: string;
  logo: string;
  link?: string;
}

export default function EcosystemMenu() {
  const [instituicoesInfo, setInstituicoesInfo] = useState<Record<string, any>>({});
  const [isLoading, setIsLoading] = useState(true);

  // Buscar configurações da seção Ecosystem do banco
  const { data: ecosystemSettings = [] } = trpc.home.getHomeSection.useQuery({ section: "ecosystem" });

  // Função auxiliar para pegar valor de um campo
  const getFieldValue = (field: string, defaultValue: string = "") => {
    const item = (ecosystemSettings as any[]).find((s: any) => s.field === field);
    return item?.value || defaultValue;
  };

  // Valores padrão (fallback)
  const title = getFieldValue("title", "Por que somos o maior Ecossistema Educacional do Brasil?");
  const description = getFieldValue("description", "À disposição de nossos parceiros e alunos, reunimos uma estrutura completa que integra educação, tecnologia, finanças, marketing e impacto social, tudo dentro de um único ecossistema.");

  // Carregar dados das instituições do banco de dados
  useEffect(() => {
    async function loadInstitutions() {
      try {
        const response = await fetch("/api/ecosystem/institutions");
        if (response.ok) {
          const data = await response.json();
          setInstituicoesInfo(data);
        }
      } catch (error) {
        console.error("Erro ao carregar instituições:", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadInstitutions();
  }, []);

  // Processar os itens do menu a partir dos dados do banco
  const menuItems: MenuItem[] = menuMapping.map(item => {
    const data = instituicoesInfo[item.key];
    return {
      id: item.id,
      key: item.key,
      name: data?.nome || item.id.toUpperCase(),
      logo: data?.fotos?.[0] || logoFallbacks[item.key],
      link: data?.link || "#"
    };
  });

  return (
    <section id="ecossistema" className="w-full bg-white overflow-hidden">
      {/* Header da Seção */}
      <div className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-6">
            {title.split(/(Ecossistema Educacional)/g).map((part, i) => {
              if (part === "Ecossistema Educacional") {
                return <span key={i} className="text-primary">{part}</span>;
              }
              return part;
            })}
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            {description}
          </p>
        </div>
      </div>

      {/* Seta Animada */}
      <div className="flex justify-center py-4 bg-white">
        <svg 
          className="w-6 h-6 text-primary animate-bounce" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>

      {/* Grid de Logos Clicáveis - SIMPLIFICADO */}
      <div className="bg-[#FFF0F5] py-16 border-y border-pink-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
            {menuItems.map((item) => (
              <a
                key={item.id}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 hover:-translate-y-1"
              >
                <img
                  src={item.logo}
                  alt={item.name}
                  className="max-h-16 md:max-h-20 w-auto object-contain transition-all duration-300 group-hover:scale-110"
                  onError={(e) => {
                    // Fallback se a imagem não carregar
                    const target = e.target as HTMLImageElement;
                    if (logoFallbacks[item.key] && target.src !== logoFallbacks[item.key]) {
                      target.src = logoFallbacks[item.key];
                    }
                  }}
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
