const pressSeals = [
  { id: 1, name: "Jornal Nacional", image: "https://via.placeholder.com/120x120/E91E8C/FFFFFF?text=JN" },
  { id: 2, name: "Folha de S.Paulo", image: "https://via.placeholder.com/120x120/E91E8C/FFFFFF?text=FSP" },
  { id: 3, name: "O Globo", image: "https://via.placeholder.com/120x120/E91E8C/FFFFFF?text=OG" },
  { id: 4, name: "Valor Econômico", image: "https://via.placeholder.com/120x120/E91E8C/FFFFFF?text=VE" },
  { id: 5, name: "Revista Educação", image: "https://via.placeholder.com/120x120/E91E8C/FFFFFF?text=RE" },
  { id: 6, name: "Portal de Notícias", image: "https://via.placeholder.com/120x120/E91E8C/FFFFFF?text=PN" },
];

export default function PressNews() {
  return (
    <section className="py-12 bg-white border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <span className="text-[#E91E8C] font-bold tracking-widest text-sm uppercase block">Notícias da Imprensa Nacional</span>
        </div>

        {/* Grid estático */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-center">
          {pressSeals.map((seal) => (
            <div 
              key={seal.id}
              className="flex flex-col items-center justify-center group transform transition-transform duration-300 hover:scale-110"
            >
              <div className="flex items-center justify-center mb-3">
                <img 
                  src={seal.image} 
                  alt={seal.name} 
                  className="h-24 w-auto object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
