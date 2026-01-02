import Link from "next/link";
import {
  GraduationCap,
  Building,
  Megaphone,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const useCases = [
  {
    icon: GraduationCap,
    category: "Educação",
    description: "Professores, escolas e universidades",
    items: [
      "Apostilas interativas",
      "Livros didáticos",
      "Materiais de curso",
      "Flashcards educativos",
    ],
    color: "#263A68",
    href: "/categorias/educacao",
  },
  {
    icon: Building,
    category: "Institucional",
    description: "Empresas, governo e organizações",
    items: [
      "Relatórios anuais",
      "Documentos oficiais",
      "Manuais internos",
      "Comunicados",
    ],
    color: "#342852",
    href: "/categorias/institucional",
  },
  {
    icon: Megaphone,
    category: "Marketing",
    description: "Agências e equipes de marketing",
    items: [
      "Catálogos de produtos",
      "Portfólios",
      "Apresentações",
      "Brochuras digitais",
    ],
    color: "#4F3D67",
    href: "/categorias/marketing",
  },
  {
    icon: TrendingUp,
    category: "Vendas",
    description: "Lojas e equipes comerciais",
    items: [
      "Catálogos de vendas",
      "Lookbooks",
      "Cardápios digitais",
      "Listas de preços",
    ],
    color: "#171A3D",
    href: "/categorias/vendas",
  },
];

export function UseCases() {
  return (
    <section
      className="py-20 lg:py-32 bg-white"
      aria-labelledby="use-cases-title"
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-[#4F3D67] font-semibold mb-4">
            PARA TODOS OS SETORES
          </span>
          <h2
            id="use-cases-title"
            className="text-3xl md:text-4xl font-bold text-[#171A3D] mb-6"
          >
            Casos de uso por setor
          </h2>
          <p className="text-lg text-[#736F89]">
            Nossa plataforma atende às necessidades específicas de cada área, 
            com recursos pensados para seu contexto.
          </p>
        </div>

        {/* Use Cases Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {useCases.map((useCase, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl border border-[#E5E5E6] p-8 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-start gap-6">
                {/* Icon */}
                <div
                  className="w-16 h-16 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: useCase.color }}
                >
                  <useCase.icon className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-[#171A3D] mb-1">
                    {useCase.category}
                  </h3>
                  <p className="text-[#736F89] mb-4">{useCase.description}</p>

                  {/* Items */}
                  <ul className="space-y-2 mb-6">
                    {useCase.items.map((item, itemIndex) => (
                      <li
                        key={itemIndex}
                        className="flex items-center gap-2 text-[#171A3D]"
                      >
                        <div
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: useCase.color }}
                        />
                        {item}
                      </li>
                    ))}
                  </ul>

                  {/* Link */}
                  <Link
                    href={useCase.href}
                    className="inline-flex items-center gap-2 font-semibold transition-colors"
                    style={{ color: useCase.color }}
                  >
                    Ver exemplos
                    <span className="group-hover:translate-x-1 transition-transform">
                      →
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
