import { Metadata } from "next";
import Link from "next/link";
import {
  Target,
  Eye,
  Heart,
  Users,
  Award,
  Globe,
  Lightbulb,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { generateMetadata } from "@/lib/metadata";
import { stats } from "@/lib/constants";

export const metadata: Metadata = generateMetadata({
  title: "Sobre Nós",
  description:
    "Conheça a história do Dinheiro Investido. Nossa missão é democratizar a criação de conteúdo digital interativo para todos.",
  path: "/sobre",
});

const values = [
  {
    icon: Lightbulb,
    title: "Inovação",
    description:
      "Buscamos constantemente novas formas de tornar a criação digital mais acessível.",
  },
  {
    icon: Users,
    title: "Acessibilidade",
    description:
      "Acreditamos que todos devem poder criar conteúdo digital de qualidade.",
  },
  {
    icon: Heart,
    title: "Simplicidade",
    description:
      "Recursos poderosos não precisam ser complicados. Simplificamos o complexo.",
  },
  {
    icon: Shield,
    title: "Confiança",
    description:
      "Protegemos seus dados e conteúdos com os mais altos padrões de segurança.",
  },
];

const timeline = [
  {
    year: "2023",
    title: "O Início",
    description:
      "Nascemos com a missão de democratizar a criação de publicações digitais interativas.",
  },
  {
    year: "2024",
    title: "Crescimento",
    description:
      "Alcançamos 10.000 usuários e lançamos recursos de IA integrada.",
  },
  {
    year: "2025",
    title: "Expansão",
    description:
      "Lançamento da loja de packs digitais e convites virtuais interativos.",
  },
];

export default function SobrePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-[#171A3D] via-[#263A68] to-[#342852] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Transformando ideias em experiências digitais
            </h1>
            <p className="text-xl text-white/80">
              Somos uma plataforma brasileira dedicada a tornar a criação de
              conteúdo digital interativo acessível para todos.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Mission */}
            <div className="text-center md:text-left">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#171A3D] to-[#263A68] flex items-center justify-center mb-6 mx-auto md:mx-0">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-[#171A3D] mb-4">
                Nossa Missão
              </h2>
              <p className="text-lg text-[#736F89]">
                Democratizar a criação de conteúdo digital interativo,
                permitindo que qualquer pessoa, independentemente de seu
                conhecimento técnico, possa transformar suas ideias em
                publicações profissionais e engajadoras.
              </p>
            </div>

            {/* Vision */}
            <div className="text-center md:text-left">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#342852] to-[#4F3D67] flex items-center justify-center mb-6 mx-auto md:mx-0">
                <Eye className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-[#171A3D] mb-4">
                Nossa Visão
              </h2>
              <p className="text-lg text-[#736F89]">
                Ser a plataforma líder em publicações digitais interativas na
                América Latina, reconhecida pela facilidade de uso, inovação
                tecnológica e compromisso com a acessibilidade.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-[#E5E5E6]">
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

      {/* Values */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#171A3D] mb-4">
              Nossos Valores
            </h2>
            <p className="text-lg text-[#736F89] max-w-2xl mx-auto">
              Os princípios que guiam tudo o que fazemos
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {values.map((value, index) => (
              <Card key={index} className="bg-[#E5E5E6] border-none text-center">
                <CardContent className="p-6">
                  <div className="w-14 h-14 mx-auto rounded-xl bg-gradient-to-br from-[#171A3D] to-[#263A68] flex items-center justify-center mb-4">
                    <value.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-[#171A3D] mb-2">
                    {value.title}
                  </h3>
                  <p className="text-[#736F89]">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-[#E5E5E6]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#171A3D] mb-4">
              Nossa Jornada
            </h2>
          </div>

          <div className="max-w-3xl mx-auto">
            {timeline.map((item, index) => (
              <div key={index} className="flex gap-6 mb-8 last:mb-0">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#171A3D] to-[#263A68] flex items-center justify-center text-white font-bold">
                    {item.year.slice(-2)}
                  </div>
                  {index < timeline.length - 1 && (
                    <div className="w-0.5 flex-1 bg-[#171A3D]/20 mt-2" />
                  )}
                </div>
                <div className="flex-1 pb-8">
                  <span className="text-sm font-semibold text-[#4F3D67]">
                    {item.year}
                  </span>
                  <h3 className="text-xl font-bold text-[#171A3D] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-[#736F89]">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[#171A3D] via-[#263A68] to-[#342852] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Faça parte dessa história
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Junte-se a milhares de criadores que já estão transformando suas
            ideias em publicações digitais incríveis.
          </p>
          <Button
            size="lg"
            asChild
            className="bg-white text-[#171A3D] hover:bg-white/90"
          >
            <Link href="/auth">Começar Grátis</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
