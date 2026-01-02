import Link from "next/link";
import { Home, Search, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-[#171A3D] via-[#263A68] to-[#342852]">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center text-white">
          {/* 404 Number */}
          <div className="mb-8">
            <span className="text-[150px] md:text-[200px] font-bold leading-none bg-gradient-to-r from-white/30 to-white/10 bg-clip-text text-transparent">
              404
            </span>
          </div>

          {/* Message */}
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Página não encontrada
          </h1>
          <p className="text-xl text-white/70 mb-8">
            Ops! A página que você está procurando não existe ou foi movida.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              asChild
              className="bg-white text-[#171A3D] hover:bg-white/90"
            >
              <Link href="/">
                <Home className="w-5 h-5 mr-2" />
                Ir para Home
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="border-white/30 text-white hover:bg-white/10"
            >
              <Link href="/ajuda">
                <Search className="w-5 h-5 mr-2" />
                Central de Ajuda
              </Link>
            </Button>
          </div>

          {/* Suggestions */}
          <div className="mt-12 pt-8 border-t border-white/10">
            <p className="text-white/60 mb-4">Você pode estar procurando:</p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link
                href="/recursos"
                className="px-4 py-2 bg-white/10 rounded-full text-sm hover:bg-white/20 transition-colors"
              >
                Recursos
              </Link>
              <Link
                href="/modelos"
                className="px-4 py-2 bg-white/10 rounded-full text-sm hover:bg-white/20 transition-colors"
              >
                Modelos
              </Link>
              <Link
                href="/precos"
                className="px-4 py-2 bg-white/10 rounded-full text-sm hover:bg-white/20 transition-colors"
              >
                Preços
              </Link>
              <Link
                href="/galeria"
                className="px-4 py-2 bg-white/10 rounded-full text-sm hover:bg-white/20 transition-colors"
              >
                Galeria
              </Link>
              <Link
                href="/blog"
                className="px-4 py-2 bg-white/10 rounded-full text-sm hover:bg-white/20 transition-colors"
              >
                Blog
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
