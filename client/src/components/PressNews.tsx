import { ExternalLink } from "lucide-react";

export default function PressNews() {
  const news = [
    {
      id: 1,
      title: "LA Educação lidera transformação digital no Brasil",
      outlet: "Jornal Nacional",
      date: "2024",
      description: "Conheça como a LA Educação está revolucionando a educação à distância no país.",
      link: "#"
    },
    {
      id: 2,
      title: "Maior ecossistema educacional do Brasil",
      outlet: "Revista Educação",
      date: "2024",
      description: "Reportagem especial sobre o crescimento e impacto da LA Educação.",
      link: "#"
    },
    {
      id: 3,
      title: "Inovação em educação profissional",
      outlet: "Portal de Notícias",
      date: "2024",
      description: "LA Educação reconhecida por inovação em cursos técnicos e profissionalizantes.",
      link: "#"
    },
    {
      id: 4,
      title: "Parceria com instituições internacionais",
      outlet: "Mídia Educacional",
      date: "2024",
      description: "LA Educação expande presença internacional com novas parcerias.",
      link: "#"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-4">
            Notícias na <span className="text-primary">Imprensa Nacional</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Acompanhe a cobertura da mídia sobre os avanços e conquistas da LA Educação.
          </p>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {news.map((item) => (
            <div 
              key={item.id} 
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group hover:-translate-y-1"
            >
              {/* Card Header */}
              <div className="h-2 bg-gradient-to-r from-primary to-accent"></div>
              
              {/* Card Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <span className="text-xs font-bold text-primary uppercase tracking-wider">
                    {item.outlet}
                  </span>
                  <span className="text-xs text-gray-500">{item.date}</span>
                </div>
                
                <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {item.description}
                </p>
                
                <a 
                  href={item.link}
                  className="inline-flex items-center gap-2 text-primary font-bold text-sm hover:gap-3 transition-all"
                >
                  Leia mais
                  <ExternalLink size={16} />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <a 
            href="/blog"
            className="inline-block bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white font-bold px-8 py-4 rounded-full shadow-lg shadow-primary/20 transition-all hover:-translate-y-1"
          >
            Ver Todas as Notícias
          </a>
        </div>
      </div>
    </section>
  );
}
