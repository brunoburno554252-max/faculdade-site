import { Button } from "@/components/ui/button";
import { CheckCircle2, TrendingUp, DollarSign, Users, Package, Clock } from "lucide-react";

export default function About() {
  const benefits = [
    {
      icon: <DollarSign className="text-white" size={20} />,
      title: "REPASSE",
      desc: "Possibilitamos LUCROS de até 1000%."
    },
    {
      icon: <Package className="text-white" size={20} />,
      title: "CATÁLOGO",
      desc: "Temos hoje o MAIOR catálogo para revenda de cursos do Brasil, com quase 4.000 opções de todas as modalidades."
    },
    {
      icon: <Clock className="text-white" size={20} />,
      title: "FLUXO DE CAIXA",
      desc: "Parceiro recebe e repassa, aqui o parceiro não precisa aguardar mais de 30 dias para receber."
    },
    {
      icon: <TrendingUp className="text-white" size={20} />,
      title: "PRECIFICAÇÃO",
      desc: "Parceiro tem total autonomia, para precificar, pois aqui ele é dono do seu próprio negócio."
    },
    {
      icon: <Users className="text-white" size={20} />,
      title: "CONSULTORIA COMERCIAL/MARKETING",
      desc: "Trabalhamos com gestores regionais, altamente capacitados para prestar consultoria gratuita aos parceiros."
    }
  ];

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-20">
          {/* Image Composition */}
          <div className="w-full lg:w-1/2 relative order-2 lg:order-1">
            <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white">
              <img 
                src="/images/about-building-new.jpg" 
                alt="Sede da LA Educação" 
                className="w-full aspect-[4/3] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-60"></div>
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-accent/30 rounded-full blur-3xl z-0"></div>
            <div className="absolute -top-10 -right-10 w-80 h-80 bg-primary/20 rounded-full blur-3xl z-0"></div>
            
            {/* Floating Stat Card */}
            <div className="absolute -bottom-10 -right-10 bg-white p-8 rounded-3xl shadow-2xl border border-gray-100 z-20 hidden md:block animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300 max-w-xs">
              <div className="flex flex-col gap-2">
                <span className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                  +1.500
                </span>
                <span className="text-gray-600 font-bold text-lg leading-tight">
                  Parceiros ativos em todo o Brasil
                </span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="w-full lg:w-1/2 order-1 lg:order-2">
            <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-gray-900 mb-8 leading-tight">
              <span className="text-primary">Empresários Educacionais:</span> transformem propósito em <span className="text-primary">rentabilidade</span> real com o maior ecossistema de cursos do mundo
            </h2>
            
            <p className="text-gray-700 text-lg mb-4 leading-relaxed font-semibold">
              Ser parceiro da LA Educação é sair do jogo pequeno.
            </p>

            <p className="text-gray-600 text-lg mb-10 leading-relaxed">
              Enquanto o mercado paga 30%, aqui você constrói autoridade, domina seu negócio e pode lucrar até 1000% sobre cada matrícula.
            </p>

            <h3 className="text-xl font-bold text-primary mb-6">
              Conheça agora os diferenciais de Ser LA:
            </h3>

            {/* Grid de 2 colunas para os diferenciais */}
            <div className="grid grid-cols-2 gap-5 mb-12">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3 group">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-primary flex items-center justify-center shrink-0 shadow-md shadow-accent/30 group-hover:scale-110 transition-transform duration-300">
                    {benefit.icon}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 mb-0.5">{benefit.title}</h4>
                    <p className="text-xs text-gray-600">{benefit.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <Button className="bg-gradient-to-r from-accent to-primary hover:opacity-90 text-white font-bold px-10 h-16 rounded-full shadow-xl shadow-accent/20 transition-all hover:-translate-y-1 w-full sm:w-auto text-lg">
              QUERO SER UM PARCEIRO
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
