import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { trpc } from "@/lib/trpc";

// Fallback slides if no banners in database
const fallbackSlides = [
  {
    id: 1,
    image: "/images/hero-students.jpg",
    title: "Revolucionando a educação à distância",
    subtitle: "Conectamos instituições a empreendedores e alunos ao conhecimento.",
    ctaText: "Quero ser Parceiro",
    ctaLink: "/parceiro",
    displayDuration: 10,
    textPosition: "left" as const,
    overlayOpacity: 50,
  },
  {
    id: 2,
    image: "/images/banner-library.jpg",
    title: "Estude onde e quando quiser",
    subtitle: "Plataforma moderna e flexível para você conquistar seu diploma.",
    ctaText: "Conhecer Cursos",
    ctaLink: "/cursos",
    displayDuration: 10,
    textPosition: "left" as const,
    overlayOpacity: 50,
  },
  {
    id: 3,
    image: "/images/banner-graduation.jpg",
    title: "Diploma reconhecido pelo MEC",
    subtitle: "Mais de 4.000 cursos com qualidade garantida e certificada.",
    ctaText: "Inscreva-se Agora",
    ctaLink: "/consulta",
    displayDuration: 10,
    textPosition: "left" as const,
    overlayOpacity: 50,
  }
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { data: bannersData, isLoading } = trpc.banners.getActive.useQuery();
  
  const slides = bannersData && bannersData.length > 0 ? bannersData : fallbackSlides;
  const currentBanner = slides[currentSlide];

  useEffect(() => {
    // Use individual banner duration or default to 10 seconds
    const duration = (currentBanner?.displayDuration || 10) * 1000;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, duration);

    return () => clearInterval(interval);
  }, [slides.length, currentSlide, currentBanner?.displayDuration]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  if (isLoading) {
    return (
      <section className="relative bg-gray-900 overflow-hidden h-[500px]">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
        </div>
      </section>
    );
  }

  // Helper to get text alignment class
  const getTextAlignmentClass = (position: string = "left") => {
    switch (position) {
      case "center":
        return "items-center text-center";
      case "right":
        return "items-end text-right";
      default:
        return "items-start text-left";
    }
  };

  // Helper to get container alignment
  const getContainerAlignmentClass = (position: string = "left") => {
    switch (position) {
      case "center":
        return "justify-center";
      case "right":
        return "justify-end";
      default:
        return "justify-start";
    }
  };

  return (
    <section className="relative bg-gray-900 overflow-hidden h-[500px] group">
      {/* Slides */}
      {slides.map((slide, index) => {
        const overlayOpacity = slide.overlayOpacity ?? 50;
        const textPosition = slide.textPosition || "left";
        
        return (
          <div 
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            {/* Background Image with Dynamic Overlay */}
            <div 
              className="absolute inset-0 bg-black z-10" 
              style={{ opacity: overlayOpacity / 100 }}
            />
            <img 
              src={slide.image} 
              alt={slide.title} 
              className="w-full h-full object-cover"
            />
            
            {/* Content */}
            <div className={`absolute inset-0 z-20 flex items-center ${getContainerAlignmentClass(textPosition)}`}>
              <div className="container mx-auto px-6">
                <div className={`max-w-3xl animate-in slide-in-from-bottom-10 fade-in duration-1000 flex flex-col ${getTextAlignmentClass(textPosition)}`}>
                  <span className="inline-block py-1 px-3 rounded-full bg-primary/90 text-white text-xs font-bold tracking-widest uppercase mb-6 backdrop-blur-sm w-fit">
                    LA. Educação
                  </span>
                  
                  <h1 className="text-4xl md:text-6xl font-heading font-bold text-white leading-tight mb-6 tracking-tight drop-shadow-lg">
                    {slide.title}
                  </h1>
                  
                  {slide.subtitle && (
                    <p className="text-lg md:text-xl text-gray-200 mb-10 leading-relaxed max-w-2xl drop-shadow-md font-light">
                      {slide.subtitle}
                    </p>
                  )}
                  
                  <div className={`flex flex-col sm:flex-row gap-4 ${textPosition === 'center' ? 'justify-center' : textPosition === 'right' ? 'justify-end' : ''}`}>
                    <Button 
                      className="bg-primary hover:bg-primary/90 text-white text-base font-bold px-8 h-14 rounded-full transition-all shadow-lg shadow-primary/30 hover:scale-105"
                      onClick={() => window.location.href = slide.ctaLink || '/parceiro'}
                    >
                      {slide.ctaText || 'Quero ser Parceiro'}
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                    <Button 
                      variant="outline" 
                      className="border-2 border-white text-white hover:bg-white hover:text-gray-900 text-base font-bold px-8 h-14 rounded-full transition-all backdrop-blur-sm hover:scale-105"
                      onClick={() => window.location.href = '/cursos'}
                    >
                      Ver Cursos
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Navigation Arrows */}
      <button 
        onClick={prevSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-all opacity-0 group-hover:opacity-100"
        aria-label="Slide anterior"
      >
        <ChevronLeft size={24} />
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-all opacity-0 group-hover:opacity-100"
        aria-label="Próximo slide"
      >
        <ChevronRight size={24} />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all ${
              index === currentSlide 
                ? "w-8 bg-primary" 
                : "w-2 bg-white/50 hover:bg-white/75"
            }`}
            aria-label={`Ir para slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
