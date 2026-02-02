export default function TrustSeals() {
  const seals = [
    {
      id: 1,
      name: "Education Awards 2025",
      image: "/images/seal-awards.png",
      description: "Prêmio Nacional de Excelência"
    },
    {
      id: 2,
      name: "Google 5 Estrelas",
      image: "/images/seal-google.png",
      description: "Certificação Google"
    },
    {
      id: 3,
      name: "RA1000",
      image: "/images/seal-ra1000.png",
      description: "Certificação RA1000"
    },
    {
      id: 4,
      name: "Education Awards 2025",
      image: "/images/seal-awards.png",
      description: "Prêmio Internacional"
    },
    {
      id: 5,
      name: "Google 5 Estrelas",
      image: "/images/seal-google.png",
      description: "Excelência em Serviço"
    },
    {
      id: 6,
      name: "RA1000",
      image: "/images/seal-ra1000.png",
      description: "Certificação Premium"
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
              <div className="w-32 h-32 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 mb-4">
                <img 
                  src={seal.image} 
                  alt={seal.name}
                  className="max-w-full max-h-full object-contain drop-shadow-lg"
                />
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
