import React, { useState, useEffect } from "react";
import instituicoesInfo from "@/data/instituicoes-info.json";

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

// Fallback para banners caso não estejam definidos no JSON
const bannerFallbacks: Record<string, string> = {
  mde: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1600",
  faculdade_la: "https://images.unsplash.com/photo-1541339907198-e08756ebafe3?auto=format&fit=crop&q=80&w=1600",
  la_bank: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=1600",
  la_tecnologia: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1600",
  la_tec_sul: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=1600",
  la_tec: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&q=80&w=1600",
  astor_tec: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1600",
  capacita_cidade: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80&w=1600",
  izul: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1600",
};

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

export default function EcosystemMenu() {
  // Processar os itens do menu a partir do JSON
  const menuItems = menuMapping.map(item => {
    const data = (instituicoesInfo as any)[item.key];
    return {
      id: item.id,
      key: item.key,
      name: data?.nome || item.id.toUpperCase(),
      logo: data?.fotos?.[0] || logoFallbacks[item.key],
      banner: data?.banner || bannerFallbacks[item.key],
      description: data?.descricao || "Descrição em breve."
    };
  });

  const [activeTabId, setActiveTabId] = useState(menuItems[0].id);
  
  // Encontrar o item ativo atualizado
  const activeTab = menuItems.find(item => item.id === activeTabId) || menuItems[0];

  return (
    <section id="ecossistema" className="w-full bg-white overflow-hidden">
      {/* Header da Seção */}
      <div className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-6">
            Por que somos o maior <span className="text-primary">Ecossistema Educacional</span> do Brasil?
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            À disposição de nossos parceiros e alunos, reunimos uma estrutura completa que integra educação, tecnologia, finanças, marketing e impacto social, tudo dentro de um único ecossistema.
          </p>
        </div>
      </div>

      {/* Menu Rosa Claro */}
      <div className="bg-[#FFF0F5] py-8 border-y border-pink-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-nowrap justify-between items-center gap-4 md:gap-8 overflow-x-auto pb-4 scrollbar-hide">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTabId(item.id)}
                className={`group flex flex-col items-center transition-all duration-300 hover:scale-110 flex-shrink-0 outline-none ${
                  activeTab.id === item.id ? "scale-110" : "opacity-70 hover:opacity-100"
                }`}
              >
                <div className="h-14 md:h-20 lg:h-24 w-auto flex items-center justify-center px-2">
                  <img
                    src={item.logo}
                    alt={item.name}
                    className={`max-h-full w-auto object-contain transition-all duration-500 ${
                      activeTab.id === item.id ? "drop-shadow-md" : "drop-shadow-sm"
                    }`}
                  />
                </div>
                <div className={`mt-2 h-1 w-full rounded-full transition-all duration-300 ${
                  activeTab.id === item.id ? "bg-primary" : "bg-transparent"
                }`} />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Conteúdo Dinâmico com Banner de Fundo Real */}
      <div className="relative min-h-[600px] flex items-center justify-center overflow-hidden" key={activeTab.id}>
        {/* Banner de Fundo com Overlay Gradiente */}
        <div className="absolute inset-0 z-0">
          <img 
            src={activeTab.banner} 
            alt="Background" 
            className="w-full h-full object-cover animate-in fade-in zoom-in duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-white/95 backdrop-blur-[2px]"></div>
        </div>

        {/* Conteúdo Centralizado */}
        <div className="container mx-auto px-4 relative z-10 py-24">
          <div className="max-w-4xl mx-auto text-center animate-in fade-in slide-in-from-bottom-12 duration-700">
            <div className="flex justify-center mb-12">
              <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl border border-gray-100/50 backdrop-blur-md">
                <img 
                  src={activeTab.logo} 
                  alt={activeTab.name} 
                  className="h-28 md:h-40 object-contain"
                />
              </div>
            </div>
            <h3 className="text-4xl md:text-6xl font-heading font-extrabold text-gray-900 mb-8 leading-tight tracking-tight">
              Sobre a <span className="text-primary">{activeTab.name}</span>
            </h3>
            <div className="bg-white/40 backdrop-blur-md p-8 rounded-3xl border border-white/50 shadow-xl">
              <p className="text-gray-800 text-xl md:text-3xl leading-relaxed font-medium">
                {activeTab.description}
              </p>
            </div>
            <div className="mt-14 flex justify-center">
              <div className="h-2.5 w-32 bg-primary rounded-full shadow-xl shadow-primary/30"></div>
            </div>
          </div>
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{ __html: `
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </section>
  );
}
