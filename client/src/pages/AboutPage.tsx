import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CheckCircle, Award, Users, Globe, Target, Heart, Sparkles, Sun, Building2, MapPin, BadgeCheck, Calendar } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-24 overflow-hidden">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#9d197d] via-[#c41e8a] to-[#9d197d]"></div>
          <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10"></div>
          
          <div className="container relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="text-white">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                  Sobre a <span className="text-yellow-300">LA Educação</span>
                </h1>
                <p className="text-xl text-white/90 leading-relaxed">
                  E se cada matrícula fosse uma semente de futuro, e também o motor do seu crescimento? 
                  A LA Educação nasceu para te colocar no centro dessa história: conectamos instituições 
                  de ensino de todo o Brasil a polos parceiros que compartilham o mesmo propósito de 
                  levar <strong>conhecimento a quem mais precisa</strong>.
                </p>
                <p className="text-lg text-white/80 mt-4 leading-relaxed">
                  Enquanto abrimos portas para sonhadores, do Ensino Médio ao Superior, você recebe um 
                  <strong> portfólio completo</strong> de cursos EAD, <strong>preços competitivos</strong> e 
                  um <strong>time de especialistas</strong> guiando cada etapa. Resultado: mais visibilidade 
                  para as escolas, mais alunos conquistados por você, <strong>mais vidas transformadas</strong>.
                </p>
              </div>
              <div className="relative">
                <div className="absolute -inset-4 bg-white/20 rounded-3xl blur-xl"></div>
                <img 
                  src="/sede_la_educacao.webp" 
                  alt="Sede LA Educação - Maringá PR" 
                  className="relative rounded-3xl shadow-2xl w-full h-[400px] object-cover border-4 border-white/30"
                />
                <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl p-4 shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-[#9d197d]/10 rounded-xl flex items-center justify-center">
                      <Building2 className="w-6 h-6 text-[#9d197d]" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Nossa Sede</p>
                      <p className="font-bold text-gray-900">+500 m²</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Nossa História - Timeline */}
        <section className="py-20 bg-gray-50">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Nossa <span className="text-[#9d197d]">História</span>
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Uma trajetória de crescimento, inovação e compromisso com a educação brasileira
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* 2020-2021 */}
              <div className="relative bg-white rounded-3xl p-8 shadow-lg border-t-4 border-[#9d197d] hover:-translate-y-2 transition-all duration-300">
                <div className="absolute -top-6 left-8">
                  <div className="bg-[#9d197d] text-white px-4 py-2 rounded-full font-bold text-lg">
                    2020 - 2021
                  </div>
                </div>
                <div className="mt-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 uppercase tracking-wide">
                    Surge a Nossa Empresa
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Durante a pandemia, o EAD se fortalece, inspirando a criação da LA Educação, 
                    que busca oferecer ensino acessível, de qualidade e com suporte humanizado.
                  </p>
                </div>
                <div className="mt-4 flex items-center gap-2 text-[#9d197d]">
                  <Calendar className="w-5 h-5" />
                  <span className="text-sm font-medium">Início da jornada</span>
                </div>
              </div>

              {/* 2023 */}
              <div className="relative bg-white rounded-3xl p-8 shadow-lg border-t-4 border-[#c41e8a] hover:-translate-y-2 transition-all duration-300">
                <div className="absolute -top-6 left-8">
                  <div className="bg-[#c41e8a] text-white px-4 py-2 rounded-full font-bold text-lg">
                    2023
                  </div>
                </div>
                <div className="mt-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 uppercase tracking-wide">
                    Ano do Impulso
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Logo no primeiro ano, a LA Educação mobilizou mais de <strong>1.000 representantes</strong> em 
                    todo o país, firmou acordos com mais de <strong>15 instituições de ensino superior</strong> e 
                    estreou o <strong>maior portfólio de cursos EAD</strong> do mercado.
                  </p>
                </div>
                <div className="mt-4 flex items-center gap-2 text-[#c41e8a]">
                  <Sparkles className="w-5 h-5" />
                  <span className="text-sm font-medium">Crescimento exponencial</span>
                </div>
              </div>

              {/* 2024 */}
              <div className="relative bg-white rounded-3xl p-8 shadow-lg border-t-4 border-[#9d197d] hover:-translate-y-2 transition-all duration-300">
                <div className="absolute -top-6 left-8">
                  <div className="bg-[#9d197d] text-white px-4 py-2 rounded-full font-bold text-lg">
                    2024
                  </div>
                </div>
                <div className="mt-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 uppercase tracking-wide">
                    De Startup a Grupo
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Nos consolidamos como o <strong>Grupo LA Educação</strong>, um ecossistema completo com 
                    escolas técnicas, faculdade, banco próprio e instituto social, transformando desafios 
                    em oportunidades de crescimento.
                  </p>
                </div>
                <div className="mt-4 flex items-center gap-2 text-[#9d197d]">
                  <Award className="w-5 h-5" />
                  <span className="text-sm font-medium">Consolidação</span>
                </div>
              </div>
            </div>

            {/* Texto adicional */}
            <div className="mt-12 bg-white rounded-3xl p-8 shadow-lg max-w-4xl mx-auto">
              <p className="text-gray-700 leading-relaxed text-center">
                Em 2024 nos consolidamos como um <strong>Grupo Educacional</strong>. Este marco foi acompanhado 
                pela aquisição da <strong>LA Faculdades</strong> e <strong>Astortec</strong>, que ampliaram nosso 
                portfólio de educação a distância e presencial. Em 2025, demos mais um passo significativo com 
                a aquisição da <strong>LA Tec</strong> e <strong>LA Bank</strong>, ampliando nosso alcance no 
                setor técnico e financeiro.
              </p>
            </div>
          </div>
        </section>

        {/* Missão, Visão, Valores */}
        <section className="py-20 bg-white">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Missão */}
              <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                <div className="w-16 h-16 bg-[#9d197d]/10 rounded-2xl flex items-center justify-center text-[#9d197d] mb-6">
                  <Target size={36} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Missão</h3>
                <p className="text-gray-600 leading-relaxed">
                  Promover uma competitividade mais justa para os pequenos empreendedores do setor educacional, 
                  ampliando o acesso à educação de qualidade e contribuindo para um Brasil mais próspero.
                </p>
              </div>

              {/* Visão */}
              <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                <div className="w-16 h-16 bg-[#c41e8a]/10 rounded-2xl flex items-center justify-center text-[#c41e8a] mb-6">
                  <Globe size={36} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Visão</h3>
                <p className="text-gray-600 leading-relaxed">
                  Ser reconhecido como líder e pioneiro na intermediação de negócios educacionais no Brasil, 
                  tornando-se a maior força de vendas offline do país, com <strong>6.000 parceiros afiliados até 2026</strong>.
                </p>
              </div>

              {/* Valores */}
              <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                <div className="w-16 h-16 bg-[#9d197d]/10 rounded-2xl flex items-center justify-center text-[#9d197d] mb-6">
                  <Heart size={36} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Valores</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-center gap-3">
                    <Sun size={18} className="text-yellow-500 flex-shrink-0" /> 
                    <span><strong>Alegria:</strong> Criar um ambiente leve e inspirador.</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Heart size={18} className="text-red-500 flex-shrink-0" /> 
                    <span><strong>Caridade:</strong> Só queremos o que podemos compartilhar.</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Sparkles size={18} className="text-purple-500 flex-shrink-0" /> 
                    <span><strong>Gratidão:</strong> Cultivar a gratidão em todas as situações.</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Users size={18} className="text-blue-500 flex-shrink-0" /> 
                    <span><strong>Liberdade:</strong> A chave para o potencial humano.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Nossa Sede */}
        <section className="py-20 bg-gray-50">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  Nossa <span className="text-[#9d197d]">Sede</span>
                </h2>
                <div className="flex items-center gap-3 mb-6 text-gray-600">
                  <MapPin className="w-6 h-6 text-[#9d197d]" />
                  <span className="text-lg">Rua Moóca, 221 — Maringá, PR</span>
                </div>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Esse endereço em Maringá guarda o nosso maior salto de fé. Há pouco tempo éramos apenas 
                  dez sonhadores dividindo mesas apertadas e planos ambiciosos; hoje, cruzamos a porta de 
                  uma sede de <strong>mais de 500 m²</strong> que pulsa energia criativa a cada passo.
                </p>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Crescemos tanto que, mesmo neste espaço amplo, mal conseguimos acomodar todos que embarcaram 
                  nessa jornada, e isso é a melhor medida do nosso sucesso. Olhamos esses corredores cheios e 
                  sentimos apenas uma coisa: <strong>gratidão profunda por cada pessoa</strong> que nos trouxe 
                  até aqui e por todas que ainda chegarão para preencher os próximos capítulos dessa história.
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="bg-white px-6 py-3 rounded-full shadow-md flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-[#9d197d]" />
                    <span className="font-semibold">+500 m²</span>
                  </div>
                  <div className="bg-white px-6 py-3 rounded-full shadow-md flex items-center gap-2">
                    <Users className="w-5 h-5 text-[#9d197d]" />
                    <span className="font-semibold">Equipe em crescimento</span>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-br from-[#9d197d]/20 to-[#c41e8a]/20 rounded-3xl blur-xl"></div>
                <img 
                  src="/sede_la_educacao.webp" 
                  alt="Sede LA Educação - Maringá PR" 
                  className="relative rounded-3xl shadow-2xl w-full h-[450px] object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Nossos Selos */}
        <section className="py-20 bg-white">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Nossos <span className="text-[#9d197d]">Selos</span>
              </h2>
              <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                Somos reconhecidos por <strong>oito selos de excelência</strong> que traduzem nossa credibilidade 
                e compromisso com a qualidade educacional.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { name: "Selo RA 1.000", desc: "Atendimento impecável" },
                { name: "Prêmio RA 2024", desc: "Indicado ao prêmio" },
                { name: "The Education", desc: "Qualidade acadêmica" },
                { name: "ESG", desc: "Responsabilidade socioambiental" },
                { name: "Silver Total LAQI", desc: "Performance global" },
                { name: "ABED", desc: "Referência em EAD" },
                { name: "Verificado Meta", desc: "Autenticidade digital" },
                { name: "MEC", desc: "Validade nacional" },
              ].map((selo, index) => (
                <div 
                  key={index}
                  className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl shadow-md border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-center"
                >
                  <div className="w-14 h-14 bg-[#9d197d]/10 rounded-xl flex items-center justify-center text-[#9d197d] mx-auto mb-4">
                    <BadgeCheck size={28} />
                  </div>
                  <h4 className="font-bold text-gray-900 mb-1">{selo.name}</h4>
                  <p className="text-sm text-gray-500">{selo.desc}</p>
                </div>
              ))}
            </div>

            <p className="text-center text-gray-600 mt-12 max-w-3xl mx-auto leading-relaxed">
              Cada selo é um compromisso vivo com a <strong>inovação</strong>, a <strong>ética</strong> e 
              o <strong>sucesso</strong> de quem aprende conosco. Conquistamos o Selo RA 1.000 e fomos indicados 
              ao Prêmio RA 2024, reflexo de um atendimento impecável; recebemos os selos The Education, ESG e 
              Silver Total do LAQI, comprovando qualidade acadêmica, responsabilidade socioambiental e performance global.
            </p>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-16 bg-gradient-to-r from-[#9d197d] to-[#c41e8a]">
          <div className="container text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Junte-se a nós e descubra como propósito e rentabilidade podem caminhar lado a lado
            </h2>
            <a 
              href="/seja-parceiro"
              className="inline-flex items-center gap-2 bg-white text-[#9d197d] px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors shadow-xl"
            >
              Quero ser um Parceiro
              <CheckCircle className="w-5 h-5" />
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
