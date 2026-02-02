import { Award, Star, CheckCircle } from "lucide-react";

export default function TrustSeals() {
  const seals = [
    {
      id: 1,
      name: "Prêmio Nacional",
      icon: "🏆",
      description: "Reconhecimento nacional"
    },
    {
      id: 2,
      name: "Excelência em Educação",
      icon: "⭐",
      description: "Prêmio de excelência"
    },
    {
      id: 3,
      name: "Google Partner",
      icon: "🔍",
      description: "Parceiro Google"
    },
    {
      id: 4,
      name: "RA1000",
      icon: "✓",
      description: "Certificação RA1000"
    },
    {
      id: 5,
      name: "Prêmio Internacional",
      icon: "🌍",
      description: "Reconhecimento internacional"
    },
    {
      id: 6,
      name: "Certificação Premium",
      icon: "⭐",
      description: "Certificação premium"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-4">
            Selos de Confiança <span className="text-primary">Nacional e Internacional</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Reconhecimentos e certificações que comprovam nossa excelência e compromisso com a qualidade educacional.
          </p>
        </div>

        {/* Selos Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-center">
          {seals.map((seal) => (
            <div key={seal.id} className="flex flex-col items-center justify-center group">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center text-5xl group-hover:scale-110 transition-transform duration-300 mb-4">
                {seal.icon}
              </div>
              <h3 className="text-sm font-bold text-gray-900 text-center">{seal.name}</h3>
              <p className="text-xs text-gray-500 text-center mt-1">{seal.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
