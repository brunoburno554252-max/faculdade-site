import { useEffect, useRef } from "react";

const badges = [
  { id: 1, name: "Reconhecido pelo MEC", image: "/images/badges/selo-mec.png" },
  { id: 2, name: "Selo RA1000 Reclame Aqui", image: "/images/badges/selo-ra1000.png" },
  { id: 3, name: "Google 5 Estrelas", image: "/images/badges/selo-google.png" },
  { id: 4, name: "ISTOÉ Somos Notícia", image: "/images/badges/selo-istoe.png" },
  { id: 9, name: "Caras TV", image: "/images/badges/selo-caras.png" },
  // Placeholder images for badges not found in high quality, using text fallback or generic icons if needed
  // For now, we repeat the high quality ones to create a full carousel effect
  { id: 5, name: "Reconhecido pelo MEC", image: "/images/badges/selo-mec.png" },
  { id: 6, name: "Selo RA1000 Reclame Aqui", image: "/images/badges/selo-ra1000.png" },
  { id: 7, name: "Google 5 Estrelas", image: "/images/badges/selo-google.png" },
  { id: 8, name: "ISTOÉ Somos Notícia", image: "/images/badges/selo-istoe.png" },
  { id: 10, name: "Caras TV", image: "/images/badges/selo-caras.png" },
];

export default function Certifications() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const scroll = () => {
      if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
        scrollContainer.scrollLeft = 0;
      } else {
        scrollContainer.scrollLeft += 1;
      }
    };

    const intervalId = setInterval(scroll, 20);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <section className="py-12 bg-white border-b border-gray-100 overflow-hidden">
      <div className="container mx-auto px-4 mb-8 text-center">
        <span className="text-accent font-bold tracking-widest text-sm uppercase block">Qualidade Comprovada</span>
      </div>

      <div 
        ref={scrollRef}
        className="flex items-center gap-16 overflow-x-hidden whitespace-nowrap py-4"
        style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}
      >
        {/* Double the badges to create seamless infinite scroll */}
        {[...badges, ...badges].map((badge, index) => (
          <div 
            key={`${badge.id}-${index}`} 
            className="flex-shrink-0 grayscale hover:grayscale-0 transition-all duration-500 cursor-pointer transform hover:scale-110"
          >
            <img 
              src={badge.image} 
              alt={badge.name} 
              className="h-24 w-auto object-contain"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
