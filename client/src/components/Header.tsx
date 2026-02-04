import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, Phone } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "Início", href: "/", hasDropdown: false },
    { name: "Sobre Nós", href: "/sobre", hasDropdown: false },
    { name: "Cursos", href: "/cursos", hasDropdown: true },
    { name: "Consulta", href: "/consulta", hasDropdown: false },
    { name: "Blog", href: "/blog", hasDropdown: false },
    { name: "Seja um Parceiro", href: "/parceiro", hasDropdown: false },
    { name: "Ouvidoria", href: "/ouvidoria", hasDropdown: false },
    { name: "FAQ", href: "/faq", hasDropdown: false },
  ];

  return (
    <header className="w-full bg-white sticky top-0 z-50 shadow-md border-b border-gray-100">
      {/* Top Bar - Adicionado WhatsApp e Central de Atendimento */}
      <div className="bg-primary text-white py-1.5 text-sm font-semibold hidden md:block">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex gap-6 items-center">
            <a 
              href="https://wa.me/554499449323" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-white/80 transition-colors"
            >
              <svg 
                viewBox="0 0 24 24" 
                width="18" 
                height="18" 
                fill="currentColor" 
                className="text-white"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .004 5.412 0 12.048c0 2.123.554 4.197 1.607 6.037L0 24l6.105-1.602a11.834 11.834 0 005.937 1.598h.005c6.637 0 12.048-5.414 12.052-12.05a11.831 11.831 0 00-3.679-8.527" />
              </svg>
              (44) 9944-9323
            </a>
            <span className="opacity-40">|</span>
            <a 
              href="/contato" 
              className="flex items-center gap-2 hover:text-white/80 transition-colors"
            >
              <Phone size={16} />
              Central de Atendimento
            </a>
            <span className="opacity-40">|</span>
            <span className="flex items-center gap-2">
              <span className="opacity-80">Local:</span> Maringá - PR
            </span>
          </div>
          <div className="flex gap-8 items-center">
            <a href="#" className="hover:text-white/80 transition-colors">AVA do Aluno</a>
            <a href="#" className="hover:text-white/80 transition-colors">Área do Parceiro</a>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="container mx-auto px-4 py-1.5">
        <div className="flex justify-between items-center">
          <Link href="/">
            <div className="cursor-pointer hover:opacity-90 transition-opacity">
              <img 
                src="/images/logo-la-educacao.jpg" 
                alt="LA. Educação" 
                className="h-20 w-auto object-contain"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-7">
            {navItems.map((item) => (
              item.hasDropdown ? (
                <DropdownMenu key={item.name}>
                  <div className="flex items-center gap-1.5 group">
                    <Link href={item.href}>
                      <span className="text-gray-700 hover:text-primary text-base font-bold transition-colors cursor-pointer">
                        {item.name}
                      </span>
                    </Link>
                    <DropdownMenuTrigger className="outline-none">
                      <ChevronDown size={16} className="text-gray-400 group-hover:text-primary group-hover:rotate-180 transition-all duration-300" />
                    </DropdownMenuTrigger>
                  </div>
                  <DropdownMenuContent className="border-gray-100 shadow-xl rounded-xl p-3 animate-in fade-in zoom-in-95 duration-200 min-w-[200px]">
                    <Link href="/cursos">
                      <DropdownMenuItem className="cursor-pointer rounded-lg hover:bg-gray-50 hover:text-primary font-bold text-base p-2.5">
                        Ver Todos os Cursos
                      </DropdownMenuItem>
                    </Link>
                    <DropdownMenuItem className="cursor-pointer rounded-lg hover:bg-gray-50 hover:text-primary font-semibold text-base p-2.5 border-t border-gray-50 mt-1">Graduação EAD</DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer rounded-lg hover:bg-gray-50 hover:text-primary font-semibold text-base p-2.5">Pós-Graduação</DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer rounded-lg hover:bg-gray-50 hover:text-primary font-semibold text-base p-2.5">Cursos Técnicos</DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer rounded-lg hover:bg-gray-50 hover:text-primary font-semibold text-base p-2.5">Profissionalizantes</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link key={item.name} href={item.href}>
                  <span className="text-gray-700 hover:text-primary text-base font-bold transition-colors cursor-pointer relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-primary after:left-0 after:-bottom-1.5 after:transition-all hover:after:w-full">
                    {item.name}
                  </span>
                </Link>
              )
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden xl:block">
            <Button className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white text-base font-extrabold shadow-xl shadow-primary/20 rounded-full px-8 py-3 h-12 transition-all hover:scale-105 uppercase tracking-wider">
              SEJA UM PARCEIRO
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="xl:hidden text-gray-700 hover:text-primary transition-colors p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="xl:hidden bg-white border-t border-gray-100 absolute w-full h-[calc(100vh-70px)] z-50 overflow-y-auto animate-in slide-in-from-top-5 duration-300">
          <div className="container mx-auto px-4 py-8 flex flex-col gap-6">
            {navItems.map((item) => (
              <Link key={item.name} href={item.href}>
                <span className="text-lg font-bold text-gray-700 hover:text-primary block border-b border-gray-50 pb-4" onClick={() => setIsMobileMenuOpen(false)}>
                  {item.name}
                </span>
              </Link>
            ))}
            <div className="mt-6 flex flex-col gap-4">
              <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary/5 h-14 rounded-xl font-extrabold text-base">
                Área do Aluno
              </Button>
              <Button className="w-full bg-gradient-to-r from-primary to-accent text-white h-14 rounded-xl font-extrabold text-base shadow-xl shadow-primary/20">
                SEJA UM PARCEIRO
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
