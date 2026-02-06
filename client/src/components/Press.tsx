import { trpc } from "@/lib/trpc";

export default function Press() {
  const { data: press = [] } = trpc.home.getPress.useQuery();

  if (press.length === 0) return null;

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
          Estamos na <span className="text-primary">Imprensa Nacional</span>
        </h2>
        
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {press.map((item: any) => (
            <a
              key={item.id}
              href={item.link || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-transform hover:scale-110"
            >
              <img
                src={item.image_url}
                alt={item.name}
                className="h-12 md:h-16 object-contain"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
