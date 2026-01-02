import { stats } from "@/lib/constants";

export function Stats() {
  return (
    <section className="py-16 bg-[#E5E5E6]" aria-labelledby="stats-title">
      <h2 id="stats-title" className="sr-only">
        Estatísticas da plataforma
      </h2>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#171A3D] to-[#263A68] bg-clip-text text-transparent mb-2">
                {stat.value}
              </div>
              <div className="text-[#736F89] font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
