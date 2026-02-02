const pressSeals = [
  { id: 1, name: "Jornal Nacional", image: "https://via.placeholder.com/120x120/FF6B9D/FFFFFF?text=JN", color: "#FF6B9D" },
  { id: 2, name: "Folha de S.Paulo", image: "https://via.placeholder.com/120x120/FFB347/FFFFFF?text=FSP", color: "#FFB347" },
  { id: 3, name: "O Globo", image: "https://via.placeholder.com/120x120/87CEEB/FFFFFF?text=OG", color: "#87CEEB" },
  { id: 4, name: "Valor Econômico", image: "https://via.placeholder.com/120x120/98D98E/FFFFFF?text=VE", color: "#98D98E" },
  { id: 5, name: "Revista Educação", image: "https://via.placeholder.com/120x120/DDA0DD/FFFFFF?text=RE", color: "#DDA0DD" },
  { id: 6, name: "Portal de Notícias", image: "https://via.placeholder.com/120x120/F0E68C/FFFFFF?text=PN", color: "#F0E68C" },
];

export default function PressNews() {
  return (
    <section className="py-12 bg-white border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <span className="text-[#E91E8C] font-bold tracking-widest text-sm uppercase block">Notícias da Imprensa Nacional</span>
        </div>

        {/* Grid estático com cores */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-center">
          {pressSeals.map((seal) => (
            <div 
              key={seal.id}
              className="flex flex-col items-center justify-center group transform transition-transform duration-300 hover:scale-110"
            >
              <div 
                className="flex items-center justify-center mb-3 w-32 h-32 rounded-full shadow-lg group-hover:shadow-xl transition-all duration-300"
                style={{ backgroundColor: seal.color }}
              >
                <img 
                  src={seal.image} 
                  alt={seal.name} 
                  className="h-24 w-auto object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
