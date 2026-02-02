import { useState, useRef, useEffect } from "react";
import { toast } from "sonner";
import ToggleSwitch from "./ToggleSwitch";
import { trpc } from "@/lib/trpc";
import cardsData from "@/data/organograma-cards-final.json";
import { X, ZoomIn, ZoomOut, RotateCcw } from "lucide-react";

interface CardPosition {
  [key: string]: {
    x: number;
    y: number;
    inverted?: boolean;
  };
}

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

export default function FullscreenEcosystemEditor() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const [positions, setPositions] = useState<CardPosition>({});
  const [draggingCard, setDraggingCard] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [showCode, setShowCode] = useState(false);
  const [zoom, setZoom] = useState(0.5); // Começar com zoom 50% para caber na tela
  const [panX, setPanX] = useState(0);
  const [panY, setPanY] = useState(0);
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });

  // Dimensões reais da imagem
  const imageWidth = 8199;
  const imageHeight = 4576;

  const saveCoordinatesMutation = trpc.ecosystem.saveCoordinates.useMutation();
  const toggleInvertedMutation = trpc.ecosystem.toggleInverted.useMutation();

  // Inicializar posições
  useEffect(() => {
    const initialPositions: CardPosition = {};
    Object.entries(cardsData).forEach(([cardId, card]) => {
      initialPositions[cardId] = {
        x: (card as CardInfo).x,
        y: (card as CardInfo).y,
        inverted: (card as CardInfo).inverted || false,
      };
    });
    setPositions(initialPositions);
  }, []);

  const getDisplayCoordinates = (cardId: string) => {
    if (!positions[cardId]) return null;

    const scaledX = (positions[cardId].x * zoom) + panX;
    const scaledY = (positions[cardId].y * zoom) + panY;

    return {
      displayX: scaledX,
      displayY: scaledY,
    };
  };

  const handleMouseDown = (e: React.MouseEvent, cardId: string) => {
    // Se for clique com botão direito ou Ctrl, ativar pan
    if (e.button === 2 || e.ctrlKey) {
      e.preventDefault();
      setIsPanning(true);
      setPanStart({ x: e.clientX - panX, y: e.clientY - panY });
      return;
    }

    e.preventDefault();
    const coords = getDisplayCoordinates(cardId);
    if (!coords) return;

    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();

    setDraggingCard(cardId);
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    // Pan mode
    if (isPanning) {
      setPanX(e.clientX - panStart.x);
      setPanY(e.clientY - panStart.y);
      return;
    }

    if (!draggingCard || !canvasRef.current) return;

    const canvasRect = canvasRef.current.getBoundingClientRect();

    const displayX = e.clientX - canvasRect.left - dragOffset.x;
    const displayY = e.clientY - canvasRect.top - dragOffset.y;

    // Converter de coordenadas de display para coordenadas reais
    const imageX = (displayX - panX) / zoom;
    const imageY = (displayY - panY) / zoom;

    // Limitar dentro da imagem
    const constrainedX = Math.max(0, Math.min(imageX, imageWidth - 50));
    const constrainedY = Math.max(0, Math.min(imageY, imageHeight - 50));

    setPositions((prev) => ({
      ...prev,
      [draggingCard]: {
        ...prev[draggingCard],
        x: Math.round(constrainedX),
        y: Math.round(constrainedY),
      },
    }));
  };

  const handleMouseUp = () => {
    setDraggingCard(null);
    setIsPanning(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    const newZoom = Math.max(0.1, Math.min(2, zoom + delta));
    setZoom(newZoom);
  };

  const handleSave = async () => {
    const updatedCards: Record<string, any> = {};
    Object.entries(cardsData).forEach(([cardId, card]) => {
      const cardData = card as CardInfo;
      updatedCards[cardId] = {
        ...cardData,
        x: positions[cardId]?.x || cardData.x,
        y: positions[cardId]?.y || cardData.y,
        inverted: positions[cardId]?.inverted || false,
      };
    });

    try {
      await saveCoordinatesMutation.mutateAsync(updatedCards);
      toast.success("✓ Coordenadas salvas com sucesso! A página será recarregada...");
      
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      toast.error("Erro ao salvar coordenadas");
      console.error(error);
    }
  };

  const handleToggleInverted = async (cardId: string) => {
    const currentInverted = positions[cardId]?.inverted || false;
    const newInverted = !currentInverted;

    try {
      await toggleInvertedMutation.mutateAsync({
        cardId,
        inverted: newInverted,
      });

      setPositions((prev) => ({
        ...prev,
        [cardId]: {
          ...prev[cardId],
          inverted: newInverted,
        },
      }));

      toast.success(`Card ${cardId} ${newInverted ? "invertido" : "restaurado"}!`);
    } catch (error) {
      toast.error("Erro ao inverter card");
      console.error(error);
    }
  };

  const handleReset = () => {
    const initialPositions: CardPosition = {};
    Object.entries(cardsData).forEach(([cardId, card]) => {
      initialPositions[cardId] = {
        x: (card as CardInfo).x,
        y: (card as CardInfo).y,
        inverted: (card as CardInfo).inverted || false,
      };
    });
    setPositions(initialPositions);
    setZoom(0.5);
    setPanX(0);
    setPanY(0);
  };

  const handleClose = () => {
    window.history.back();
  };

  // Gerar JSON para copiar
  const generateJSON = () => {
    const output: Record<string, any> = {};
    Object.entries(cardsData).forEach(([cardId, card]) => {
      const cardData = card as CardInfo;
      output[cardId] = {
        nome: cardData.nome,
        tipo: cardData.tipo,
        categoria: cardData.categoria,
        posicao: cardData.posicao,
        x: positions[cardId]?.x || cardData.x,
        y: positions[cardId]?.y || cardData.y,
        width: cardData.width,
        height: cardData.height,
        descricao: cardData.descricao,
        inverted: positions[cardId]?.inverted || false,
      };
    });
    return JSON.stringify(output, null, 2);
  };

  const jsonCode = generateJSON();

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 bg-black z-50 flex flex-col"
      onContextMenu={(e) => e.preventDefault()}
    >
      {/* Header */}
      <div className="bg-gray-900 text-white p-4 flex justify-between items-center border-b border-gray-700">
        <div>
          <h1 className="text-2xl font-bold">Editor de Ecossistema - Tela Cheia</h1>
          <p className="text-sm text-gray-400">Arraste os botões para posicionar. Scroll para zoom. Ctrl+Drag para pan.</p>
        </div>
        <button
          onClick={handleClose}
          className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg transition"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Canvas Area */}
      <div className="flex-1 overflow-hidden relative bg-black">
        <div
          ref={canvasRef}
          className="w-full h-full relative overflow-hidden"
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onWheel={handleWheel}
          style={{ cursor: isPanning ? "grabbing" : draggingCard ? "grabbing" : "grab" }}
        >
          {/* Imagem com zoom e pan */}
          <div
            style={{
              transform: `translate(${panX}px, ${panY}px) scale(${zoom})`,
              transformOrigin: "0 0",
              transition: draggingCard || isPanning ? "none" : "transform 0.1s ease-out",
            }}
          >
            <img
              src="/ecossistema-organograma.png"
              alt="Ecossistema LA Educação"
              className="block"
              style={{
                width: `${imageWidth}px`,
                height: `${imageHeight}px`,
              }}
              draggable={false}
            />

            {/* Toggles Draggable */}
            {Object.entries(cardsData).map(([cardId, card]) => {
              const coords = getDisplayCoordinates(cardId);
              if (!coords) return null;

              return (
                <div
                  key={cardId}
                  className="absolute cursor-grab active:cursor-grabbing group"
                  style={{
                    left: `${coords.displayX}px`,
                    top: `${coords.displayY}px`,
                    transform: "translate(-50%, -50%)",
                  }}
                  onMouseDown={(e) => handleMouseDown(e, cardId)}
                >
                  <ToggleSwitch
                    isActive={true}
                    label={(card as CardInfo).nome}
                    onClick={() => {}}
                    inverted={positions[cardId]?.inverted || false}
                  />
                  {/* Botão para inverter */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggleInverted(cardId);
                    }}
                    className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition"
                    title="Inverter cores do botão"
                  >
                    ⚡
                  </button>
                  {/* Label */}
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black text-white px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition">
                    {(card as CardInfo).nome}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer Controls */}
      <div className="bg-gray-900 text-white p-4 border-t border-gray-700 flex gap-3 flex-wrap">
        <button
          onClick={handleSave}
          disabled={saveCoordinatesMutation.isPending}
          className="bg-pink-600 hover:bg-pink-700 disabled:bg-pink-400 text-white font-bold py-2 px-4 rounded-lg transition"
        >
          💾 Salvar Coordenadas
        </button>
        <button
          onClick={handleReset}
          className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg transition"
        >
          🔄 Resetar Zoom/Pan
        </button>
        <button
          onClick={() => setZoom(Math.max(0.1, zoom - 0.1))}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition flex items-center gap-2"
        >
          <ZoomOut className="w-4 h-4" /> Zoom Out
        </button>
        <button
          onClick={() => setZoom(Math.min(2, zoom + 0.1))}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition flex items-center gap-2"
        >
          <ZoomIn className="w-4 h-4" /> Zoom In
        </button>
        <button
          onClick={() => setZoom(0.5)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition flex items-center gap-2"
        >
          <RotateCcw className="w-4 h-4" /> Reset Zoom
        </button>
        <button
          onClick={() => setShowCode(!showCode)}
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition ml-auto"
        >
          {showCode ? "🙈 Ocultar" : "👁️ Ver"} JSON
        </button>
      </div>

      {/* JSON Display */}
      {showCode && (
        <div className="bg-gray-800 text-green-400 p-4 max-h-48 overflow-y-auto border-t border-gray-700">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-bold">JSON/JavaScript</h3>
            <button
              onClick={() => {
                navigator.clipboard.writeText(jsonCode);
                toast.success("✓ JSON copiado para clipboard!");
              }}
              className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm"
            >
              📋 Copiar
            </button>
          </div>
          <pre className="text-xs font-mono whitespace-pre-wrap break-words">
            {jsonCode}
          </pre>
        </div>
      )}

      {/* Info Panel */}
      <div className="absolute bottom-4 right-4 bg-gray-900 text-white p-4 rounded-lg border border-gray-700 max-w-xs text-xs">
        <h4 className="font-bold mb-2">Coordenadas Selecionadas:</h4>
        {draggingCard && positions[draggingCard] && (
          <div>
            <p><strong>{(cardsData[draggingCard as keyof typeof cardsData] as CardInfo).nome}</strong></p>
            <p>X: <span className="font-mono">{positions[draggingCard].x}</span></p>
            <p>Y: <span className="font-mono">{positions[draggingCard].y}</span></p>
            <p>Zoom: <span className="font-mono">{(zoom * 100).toFixed(0)}%</span></p>
          </div>
        )}
        {!draggingCard && (
          <p className="text-gray-400">Arraste um botão para ver suas coordenadas</p>
        )}
      </div>
    </div>
  );
}
