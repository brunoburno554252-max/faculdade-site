import { useState, useEffect } from "react";
import { Search, CheckCircle2, XCircle, MapPin, Phone, Mail, AlertCircle, Shield, Users, Building2, Sparkles, ChevronRight, Loader2 } from "lucide-react";
import { trpc } from "@/lib/trpc";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface Licenciado {
  id: number;
  nome: string;
  status: string;
  cnpj_cpf: string;
  polo: string;
  telefone?: string;
  email?: string;
  endereco?: string;
  cidade?: string;
  estado?: string;
}

export default function ConsultPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  
  // Debounce para evitar muitas requisições
  useEffect(() => {
    setIsTyping(true);
    const timer = setTimeout(() => {
      setDebouncedTerm(searchTerm);
      setIsTyping(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [searchTerm]);
  
  // Buscar apenas se tiver 3+ caracteres
  const shouldSearch = debouncedTerm.trim().length >= 3;
  
  // Query TRPC com busca segura no backend
  const { data, isLoading, error } = trpc.licenciados.search.useQuery(
    { term: debouncedTerm },
    { 
      enabled: shouldSearch,
      retry: 1,
      refetchOnWindowFocus: false
    }
  );
  
  const filteredResults = data?.data || [];
  const showResults = shouldSearch;
  const showMinLengthWarning = searchTerm.trim().length > 0 && searchTerm.trim().length < 3;

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section - Mais impactante */}
        <section className="relative py-20 overflow-hidden">
          {/* Background com gradiente e padrão */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#9d197d] via-[#c41e8a] to-[#9d197d]"></div>
          <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10"></div>
          
          {/* Elementos decorativos */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl"></div>
          
          <div className="container relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                <Shield className="w-4 h-4 text-yellow-300" />
                <span className="text-white text-sm font-medium">Sistema de Verificação Oficial</span>
              </div>
              
              {/* Ícone principal */}
              <div className="inline-flex items-center justify-center w-24 h-24 bg-white/20 backdrop-blur-sm rounded-3xl mb-8 shadow-2xl">
                <Search className="w-12 h-12 text-white" />
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Consulte um <span className="text-yellow-300">Polo Parceiro</span>
              </h1>
              <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
                Verifique se um polo é credenciado e autorizado pela LA. Educação. 
                Busque por nome, CNPJ/CPF, ID ou código do polo.
              </p>
              
              {/* Stats */}
              <div className="flex flex-wrap justify-center gap-8 mt-10">
                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-5 py-3 rounded-2xl">
                  <Users className="w-6 h-6 text-yellow-300" />
                  <div className="text-left">
                    <p className="text-2xl font-bold text-white">1.000+</p>
                    <p className="text-sm text-white/70">Parceiros Ativos</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-5 py-3 rounded-2xl">
                  <Building2 className="w-6 h-6 text-yellow-300" />
                  <div className="text-left">
                    <p className="text-2xl font-bold text-white">27</p>
                    <p className="text-sm text-white/70">Estados</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-5 py-3 rounded-2xl">
                  <Shield className="w-6 h-6 text-yellow-300" />
                  <div className="text-left">
                    <p className="text-2xl font-bold text-white">100%</p>
                    <p className="text-sm text-white/70">Verificados</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Search Section - Design Premium */}
        <section className="relative -mt-16 pb-20">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              {/* Search Card Principal */}
              <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-[#9d197d]/10 rounded-xl flex items-center justify-center">
                    <Search className="w-5 h-5 text-[#9d197d]" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Buscar Parceiro</h2>
                    <p className="text-sm text-gray-500">Digite pelo menos 3 caracteres para iniciar</p>
                  </div>
                </div>
                
                {/* Campo de Busca Premium */}
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#9d197d] to-[#c41e8a] rounded-2xl opacity-0 group-focus-within:opacity-100 blur transition-opacity duration-300"></div>
                  <div className="relative bg-gray-50 rounded-2xl p-2 group-focus-within:bg-white transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-[#9d197d] to-[#c41e8a] rounded-xl flex items-center justify-center shadow-lg">
                        {isLoading || isTyping ? (
                          <Loader2 className="w-6 h-6 text-white animate-spin" />
                        ) : (
                          <Search className="w-6 h-6 text-white" />
                        )}
                      </div>
                      <input
                        type="text"
                        placeholder="Nome, CNPJ/CPF, ID ou Código do Polo..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="flex-1 bg-transparent text-lg text-gray-900 placeholder-gray-400 focus:outline-none py-4"
                      />
                      {searchTerm && (
                        <button 
                          onClick={() => setSearchTerm("")}
                          className="flex-shrink-0 w-10 h-10 bg-gray-200 hover:bg-gray-300 rounded-xl flex items-center justify-center transition-colors"
                        >
                          <XCircle className="w-5 h-5 text-gray-500" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Aviso de mínimo de caracteres */}
                {showMinLengthWarning && (
                  <div className="mt-4 flex items-center gap-3 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
                    <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0" />
                    <p className="text-sm text-amber-700">
                      Digite pelo menos <strong>3 caracteres</strong> para iniciar a busca.
                    </p>
                  </div>
                )}
                
                {/* Dicas de busca */}
                {!showResults && !showMinLengthWarning && (
                  <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3">
                      <div className="w-8 h-8 bg-[#9d197d]/10 rounded-lg flex items-center justify-center">
                        <Users className="w-4 h-4 text-[#9d197d]" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Por Nome</p>
                        <p className="text-xs text-gray-500">Ex: João Silva</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3">
                      <div className="w-8 h-8 bg-[#9d197d]/10 rounded-lg flex items-center justify-center">
                        <Building2 className="w-4 h-4 text-[#9d197d]" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Por CNPJ/CPF</p>
                        <p className="text-xs text-gray-500">Ex: 123.456.789-00</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3">
                      <div className="w-8 h-8 bg-[#9d197d]/10 rounded-lg flex items-center justify-center">
                        <Search className="w-4 h-4 text-[#9d197d]" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Por ID/Código</p>
                        <p className="text-xs text-gray-500">Ex: 537 ou polo_sp</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Loading State Premium */}
              {isLoading && showResults && (
                <div className="mt-8 bg-white rounded-2xl shadow-lg p-12 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-[#9d197d]/10 rounded-2xl mb-4">
                    <Loader2 className="w-8 h-8 text-[#9d197d] animate-spin" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Buscando parceiros...</h3>
                  <p className="text-gray-500">Aguarde enquanto consultamos nossa base de dados.</p>
                </div>
              )}

              {/* Error State */}
              {error && showResults && (
                <div className="mt-8 bg-red-50 border-2 border-red-200 rounded-2xl p-8 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-2xl mb-4">
                    <XCircle className="w-8 h-8 text-red-500" />
                  </div>
                  <h3 className="text-lg font-semibold text-red-900 mb-2">Erro na Busca</h3>
                  <p className="text-red-700">{error.message}</p>
                </div>
              )}

              {/* Results Section */}
              {!isLoading && !error && showResults && (
                <div className="mt-8">
                  {/* Results Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#9d197d]/10 rounded-xl flex items-center justify-center">
                        <Sparkles className="w-5 h-5 text-[#9d197d]" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-gray-900">
                          {filteredResults.length} resultado{filteredResults.length !== 1 ? 's' : ''}
                        </h2>
                        <p className="text-sm text-gray-500">para "{debouncedTerm}"</p>
                      </div>
                    </div>
                  </div>

                  {filteredResults.length === 0 ? (
                    <div className="bg-gray-50 border-2 border-gray-200 rounded-2xl p-12 text-center">
                      <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-3xl mb-6">
                        <Search className="w-10 h-10 text-gray-400" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        Nenhum parceiro encontrado
                      </h3>
                      <p className="text-gray-600 max-w-md mx-auto">
                        Não encontramos nenhum polo parceiro com o termo "<strong>{debouncedTerm}</strong>".
                        Verifique se digitou corretamente ou tente outro termo.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {filteredResults.map((licenciado: Licenciado) => (
                        <div
                          key={licenciado.id}
                          className={`bg-white rounded-2xl shadow-lg border-2 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                            licenciado.status === "ativo"
                              ? "border-green-200 hover:border-green-300"
                              : "border-red-200 hover:border-red-300"
                          }`}
                        >
                          {/* Status Bar */}
                          <div className={`px-6 py-3 ${
                            licenciado.status === "ativo" 
                              ? "bg-gradient-to-r from-green-500 to-emerald-500" 
                              : "bg-gradient-to-r from-red-500 to-rose-500"
                          }`}>
                            <div className="flex items-center gap-2 text-white">
                              {licenciado.status === "ativo" ? (
                                <>
                                  <CheckCircle2 className="w-5 h-5" />
                                  <span className="font-semibold">Parceiro Credenciado e Autorizado</span>
                                </>
                              ) : (
                                <>
                                  <XCircle className="w-5 h-5" />
                                  <span className="font-semibold">Não Credenciado</span>
                                </>
                              )}
                            </div>
                          </div>
                          
                          {/* Content */}
                          <div className="p-6">
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1">
                                <h3 className="text-xl font-bold text-gray-900 mb-4">
                                  {licenciado.nome}
                                </h3>
                                
                                {/* Info Grid */}
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                  <div className="bg-gray-50 rounded-xl p-4">
                                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">ID do Parceiro</p>
                                    <p className="text-lg font-bold text-[#9d197d]">{licenciado.id}</p>
                                  </div>
                                  <div className="bg-gray-50 rounded-xl p-4">
                                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Código do Polo</p>
                                    <p className="text-lg font-bold text-gray-900">{licenciado.polo}</p>
                                  </div>
                                  <div className="bg-gray-50 rounded-xl p-4 col-span-2 md:col-span-1">
                                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">CNPJ/CPF</p>
                                    <p className="text-lg font-mono font-bold text-gray-900">{licenciado.cnpj_cpf}</p>
                                  </div>
                                </div>
                              </div>
                              
                              {/* Arrow */}
                              <div className="hidden md:flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl">
                                <ChevronRight className="w-6 h-6 text-gray-400" />
                              </div>
                            </div>

                            {/* Contact Info */}
                            {(licenciado.telefone || licenciado.email || licenciado.endereco) && (
                              <div className="mt-6 pt-6 border-t border-gray-200">
                                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Informações de Contato</p>
                                <div className="flex flex-wrap gap-4">
                                  {licenciado.telefone && (
                                    <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-lg">
                                      <Phone className="w-4 h-4 text-[#9d197d]" />
                                      <span className="text-sm text-gray-700">{licenciado.telefone}</span>
                                    </div>
                                  )}
                                  {licenciado.email && (
                                    <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-lg">
                                      <Mail className="w-4 h-4 text-[#9d197d]" />
                                      <span className="text-sm text-gray-700">{licenciado.email}</span>
                                    </div>
                                  )}
                                  {licenciado.endereco && (
                                    <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-lg">
                                      <MapPin className="w-4 h-4 text-[#9d197d]" />
                                      <span className="text-sm text-gray-700">
                                        {licenciado.endereco}
                                        {licenciado.cidade && `, ${licenciado.cidade}`}
                                        {licenciado.estado && ` - ${licenciado.estado}`}
                                      </span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Info Section */}
        <section className="py-16 bg-gray-50">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-7 h-7 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Parceiro Credenciado</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Significa que o polo passou por todas as verificações e está autorizado a representar 
                    a LA. Educação, oferecendo cursos e serviços educacionais com total respaldo institucional.
                  </p>
                </div>
                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <div className="w-14 h-14 bg-red-100 rounded-2xl flex items-center justify-center mb-6">
                    <XCircle className="w-7 h-7 text-red-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Não Credenciado</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Indica que o polo não possui credenciamento ativo ou teve seu credenciamento suspenso. 
                    Recomendamos cautela ao contratar serviços de polos não credenciados.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
