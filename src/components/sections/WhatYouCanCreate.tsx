import Link from "next/link";
import {
  BookOpen,
  FileText,
  ShoppingBag,
  PartyPopper,
  Package,
  Presentation,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const creations = [
  {
    icon: BookOpen,
    title: "Flipbooks",
    description: "Revistas e livros digitais com efeito de virada de página",
    color: "#171A3D",
  },
  {
    icon: FileText,
    title: "Relatórios",
    description: "Documentos institucionais e relatórios anuais interativos",
    color: "#263A68",
  },
  {
    icon: Presentation,
    title: "Apostilas",
    description: "Materiais educacionais e cursos completos",
    color: "#342852",
  },
  {
    icon: ShoppingBag,
    title: "Catálogos",
    description: "Catálogos de produtos e lookbooks profissionais",
    color: "#4F3D67",
  },
  {
    icon: PartyPopper,
    title: "Convites",
    description: "Convites virtuais interativos para eventos",
    color: "#736F89",
  },
  {
    icon: Package,
    title: "Packs Digitais",
    description: "Artes e templates para download e impressão",
    color: "#263A68",
  },
];

export function WhatYouCanCreate() {
  return (
    <section
      className="py-20 lg:py-32 bg-gradient-to-br from-[#171A3D] via-[#263A68] to-[#342852] text-white"
      aria-labelledby="create-title"
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-white/60 font-semibold mb-4">
            POSSIBILIDADES INFINITAS
          </span>
          <h2
            id="create-title"
            className="text-3xl md:text-4xl font-bold mb-6"
          >
            O que você pode criar
          </h2>
          <p className="text-lg text-white/70">
            De materiais educacionais a catálogos de vendas, nossa plataforma 
            se adapta às suas necessidades.
          </p>
        </div>

        {/* Creations Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {creations.map((item, index) => (
            <div
              key={index}
              className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300"
            >
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-4"
                style={{ backgroundColor: `${item.color}40` }}
              >
                <item.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-white/70">{item.description}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button
            size="lg"
            asChild
            className="bg-white text-[#171A3D] hover:bg-white/90"
          >
            <Link href="/modelos">Ver Todos os Modelos</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
