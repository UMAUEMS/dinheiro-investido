import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, BookOpen, Video, Sparkles } from "lucide-react";

export function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#171A3D] via-[#263A68] to-[#342852]"
      aria-labelledby="hero-title"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#4F3D67] rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#263A68] rounded-full blur-3xl" />
      </div>

      {/* Grid Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="container mx-auto px-4 py-32 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8">
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <span className="text-white/90 text-sm font-medium">
              Plataforma com IA integrada
            </span>
          </div>

          {/* Main Title */}
          <h1
            id="hero-title"
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
          >
            Transforme seus PDFs em{" "}
            <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 bg-clip-text text-transparent">
              experiências digitais
            </span>{" "}
            incríveis
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-2xl mx-auto">
            Crie flipbooks interativos, revistas digitais, catálogos e materiais educacionais 
            em minutos, sem conhecimento técnico.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" asChild className="text-lg">
              <Link href="/auth">
                Começar Grátis
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="text-lg border-white/30 text-white hover:bg-white/10 hover:text-white"
            >
              <Link href="/galeria">
                <Play className="w-5 h-5" />
                Ver Exemplos
              </Link>
            </Button>
          </div>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-3">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <BookOpen className="w-4 h-4 text-white/80" />
              <span className="text-white/80 text-sm">Flipbooks</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <Video className="w-4 h-4 text-white/80" />
              <span className="text-white/80 text-sm">Vídeos Interativos</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <Sparkles className="w-4 h-4 text-white/80" />
              <span className="text-white/80 text-sm">IA Integrada</span>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="hidden lg:block absolute bottom-20 left-10 animate-bounce">
          <div className="w-16 h-20 bg-white/10 backdrop-blur-sm rounded-lg transform rotate-12 shadow-xl" />
        </div>
        <div className="hidden lg:block absolute top-40 right-20 animate-pulse">
          <div className="w-12 h-16 bg-white/10 backdrop-blur-sm rounded-lg transform -rotate-12 shadow-xl" />
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
          <div className="w-1 h-3 bg-white/50 rounded-full" />
        </div>
      </div>
    </section>
  );
}
