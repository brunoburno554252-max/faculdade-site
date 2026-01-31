import { Button } from "@/components/ui/button";
import { CheckCircle2, TrendingUp, DollarSign, Users } from "lucide-react";

export default function About() {
  const benefits = [
    {
      icon: <DollarSign className="text-white" size={24} />,
      title: "Maior Repasse do Brasil",
      desc: "Condições exclusivas para acelerar seu lucro."
    },
    {
      icon: <TrendingUp className="text-white" size={24} />,
      title: "Liberdade Total",
      desc: "Você define a precificação na sua região."
    },
    {
      icon: <Users className="text-white" size={24} />,
      title: "Consultoria Gratuita",
      desc: "Apoio de especialistas em vendas e marketing."
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
            <span className="text-accent font-bold tracking-widest text-sm uppercase mb-3 block">Seja um Licenciado</span>
            <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-gray-900 mb-8 leading-tight">
              Converta propósito em <span className="text-primary">rentabilidade</span> real.
            </h2>
            
            <p className="text-gray-600 text-lg mb-10 leading-relaxed">
              Ao se tornar um parceiro da LA. Educação, você não apenas amplia o acesso à educação de qualidade, mas fortalece sua marca com autoridade no setor e aumenta sua receita a cada nova matrícula.
            </p>

            <div className="space-y-8 mb-12">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-5 group">
                  <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center shrink-0 shadow-lg shadow-primary/30 group-hover:scale-110 transition-transform duration-300">
                    {benefit.icon}
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-1">{benefit.title}</h4>
                    <p className="text-gray-500">{benefit.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <Button className="bg-accent hover:bg-accent/90 text-white font-bold px-10 h-16 rounded-full shadow-xl shadow-accent/20 transition-all hover:-translate-y-1 w-full sm:w-auto text-lg">
              QUERO SER UM PARCEIRO
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
