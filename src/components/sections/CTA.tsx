import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export function CTA() {
  return (
    <section
      className="py-20 lg:py-32 bg-gradient-to-br from-[#171A3D] via-[#263A68] to-[#342852] relative overflow-hidden"
      aria-labelledby="cta-title"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#4F3D67] rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8">
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <span className="text-white/90 text-sm font-medium">
              Comece gratuitamente hoje
            </span>
          </div>

          {/* Title */}
          <h2
            id="cta-title"
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6"
          >
            Pronto para transformar suas ideias em publicações incríveis?
          </h2>

          {/* Description */}
          <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
            Junte-se a milhares de criadores que já estão usando nossa plataforma 
            para criar conteúdo digital de alta qualidade.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              asChild
              className="text-lg bg-white text-[#171A3D] hover:bg-white/90"
            >
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
              <Link href="/precos">Ver Planos</Link>
            </Button>
          </div>

          {/* Trust Badges */}
          <div className="mt-12 flex flex-wrap justify-center gap-8 text-white/60 text-sm">
            <span>✓ Sem cartão de crédito</span>
            <span>✓ 3 publicações grátis</span>
            <span>✓ Suporte em português</span>
          </div>
        </div>
      </div>
    </section>
  );
}
