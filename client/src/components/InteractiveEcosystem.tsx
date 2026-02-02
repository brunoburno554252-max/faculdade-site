import { useState, useEffect } from "react";
import { X } from "lucide-react";
import ToggleSwitch from "./ToggleSwitch";
import cardsData from "@/data/organograma-cards-final.json";
import instituicoesInfo from "@/data/instituicoes-info.json";

interface CardInfo {
  nome: string;
  tipo: string;
  categoria: string;
  posicao: string;
  x: number;
  y: number;
  width: number;
  height: number;
  descricao: string;
  inverted?: boolean;
}

interface InstituicaoInfo {
  nome: string;
  tipo: string;
  categoria: string;
  descricao: string;
  missao: string;
  visao: string;
  valores: string[];
  cursos?: string[];
  servicos?: string[];
  programas?: string[];
  empresas?: string[];
  fotos?: string[];
  website?: string;
}

export default function InteractiveEcosystem() {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeToggles, setActiveToggles] = useState<Record<string, boolean>>({});

  const imageWidth = 8199;
  const imageHeight = 4576;

  // Calcular percentuais para responsividade
  const getPercentages = (card: CardInfo) => {
    return {
      left: (card.x / imageWidth) * 100,
      top: (card.y / imageHeight) * 100,
      width: (card.width / imageWidth) * 100,
      height: (card.height / imageHeight) * 100,
    };
  };

  const handleToggleClick = (cardId: string) => {
    setSelectedCard(cardId);
    setIsModalOpen(true);
    setActiveToggles((prev) => ({
      ...prev,
      [cardId]: true,
    }));
  };

  const closeModal = () => {
    setIsModalOpen(false);
    if (selectedCard) {
      setActiveToggles((prev) => ({
        ...prev,
        [selectedCard]: false,
      }));
    }
    setTimeout(() => setSelectedCard(null), 300);
  };

  const selectedCardData = selectedCard
    ? (cardsData[selectedCard as keyof typeof cardsData] as CardInfo)
    : null;

  const selectedInstituicaoInfo = selectedCard
    ? (instituicoesInfo[selectedCard as keyof typeof instituicoesInfo] as InstituicaoInfo)
    : null;

  return (
    <div className="relative w-full">
      {/* Container da imagem com overlay interativo */}
      <div className="relative w-full bg-white">
        <img
          src="/ecossistema-organograma.png"
          alt="Ecossistema LA Educação"
          className="w-full h-auto"
          loading="lazy"
        />

        {/* Overlay com botões toggle switches */}
        <div className="absolute inset-0 w-full h-full pointer-events-none">
          {Object.entries(cardsData).map(([cardId, card]) => {
            const percentages = getPercentages(card as CardInfo);
            const isActive = activeToggles[cardId] || false;

            return (
              <div
                key={cardId}
                className="absolute pointer-events-auto"
                style={{
                  left: `${percentages.left}%`,
                  top: `${percentages.top}%`,
                  width: `${percentages.width}%`,
                  height: `${percentages.height}%`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transform: "scale(1.2)",
                }}
              >
                <ToggleSwitch
                  isActive={isActive}
                  onClick={() => handleToggleClick(cardId)}
                  title={`Clique para abrir ${(card as CardInfo).nome}`}
                  inverted={(card as CardInfo).inverted || false}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal Estilo Instagram - Vertical */}
      {isModalOpen && selectedCardData && selectedInstituicaoInfo && (
        <div 
          className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div 
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-300 flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header com Fechar */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 flex-shrink-0">
              <div>
                <h2 className="text-xl font-bold text-gray-900">{selectedInstituicaoInfo.nome}</h2>
                <p className="text-sm text-gray-600">{selectedInstituicaoInfo.tipo}</p>
              </div>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 p-2 rounded-full transition"
              >
                <X size={24} />
              </button>
            </div>

            {/* Imagem - Estilo Instagram (Vertical) */}
            <div className="w-full h-96 bg-gray-900 flex-shrink-0 overflow-hidden">
              {selectedInstituicaoInfo.fotos && selectedInstituicaoInfo.fotos.length > 0 ? (
                <img
                  src={selectedInstituicaoInfo.fotos[0]}
                  alt={selectedInstituicaoInfo.nome}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center text-gray-400">
                    <div className="text-6xl mb-4">🏢</div>
                    <p>Sem imagem</p>
                  </div>
                </div>
              )}
            </div>

            {/* Informações - Scroll */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Categoria Badge */}
              <div>
                <div className="inline-block bg-pink-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                  {selectedInstituicaoInfo.categoria}
                </div>
              </div>

              {/* Descrição */}
              <div>
                <p className="text-gray-700 leading-relaxed">
                  {selectedInstituicaoInfo.descricao}
                </p>
              </div>

              {/* Missão */}
              <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                <p className="text-xs text-blue-600 font-bold uppercase tracking-wide">Missão</p>
                <p className="text-sm text-blue-900 mt-2">
                  {selectedInstituicaoInfo.missao}
                </p>
              </div>

              {/* Visão */}
              <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500">
                <p className="text-xs text-purple-600 font-bold uppercase tracking-wide">Visão</p>
                <p className="text-sm text-purple-900 mt-2">
                  {selectedInstituicaoInfo.visao}
                </p>
              </div>

              {/* Valores */}
              {selectedInstituicaoInfo.valores && selectedInstituicaoInfo.valores.length > 0 && (
                <div>
                  <p className="text-xs text-gray-600 font-bold uppercase tracking-wide mb-2">
                    Valores Fundamentais
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {selectedInstituicaoInfo.valores.map((valor, idx) => (
                      <span
                        key={idx}
                        className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold"
                      >
                        {valor}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Cursos/Serviços/Programas */}
              {(selectedInstituicaoInfo.cursos?.length ||
                selectedInstituicaoInfo.servicos?.length ||
                selectedInstituicaoInfo.programas?.length ||
                selectedInstituicaoInfo.empresas?.length) && (
                <div>
                  <p className="text-xs text-gray-600 font-bold uppercase tracking-wide mb-2">
                    {selectedInstituicaoInfo.cursos?.length
                      ? "Cursos Oferecidos"
                      : selectedInstituicaoInfo.servicos?.length
                        ? "Serviços"
                        : selectedInstituicaoInfo.programas?.length
                          ? "Programas"
                          : "Empresas do Grupo"}
                  </p>
                  <div className="space-y-1">
                    {(
                      selectedInstituicaoInfo.cursos ||
                      selectedInstituicaoInfo.servicos ||
                      selectedInstituicaoInfo.programas ||
                      selectedInstituicaoInfo.empresas ||
                      []
                    ).map((item, idx) => (
                      <div key={idx} className="flex items-start text-sm text-gray-700">
                        <span className="inline-block w-2 h-2 bg-pink-600 rounded-full mr-2 mt-1 flex-shrink-0"></span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Botões CTA - Sticky Footer */}
            <div className="flex gap-3 p-6 border-t border-gray-200 flex-shrink-0 bg-white">
              <button className="flex-1 bg-pink-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-pink-700 transition text-sm">
                Conhecer Mais
              </button>
              {selectedInstituicaoInfo.website && (
                <a
                  href={selectedInstituicaoInfo.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 border-2 border-pink-600 text-pink-600 py-2 px-4 rounded-lg font-semibold hover:bg-pink-50 transition text-sm text-center"
                >
                  Visitar Site
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
