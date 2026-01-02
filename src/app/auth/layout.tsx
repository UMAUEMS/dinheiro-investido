import Link from "next/link";
import { siteConfig } from "@/lib/constants";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#171A3D] via-[#263A68] to-[#342852] flex flex-col">
      {/* Header simples */}
      <header className="py-6">
        <div className="container mx-auto px-4">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <span className="text-[#171A3D] font-bold text-lg">DI</span>
            </div>
            <span className="text-white font-bold text-xl">{siteConfig.name}</span>
          </Link>
        </div>
      </header>

      {/* Conteúdo */}
      <main className="flex-1 flex items-center justify-center py-8">
        <div className="container mx-auto px-4">
          {children}
        </div>
      </main>

      {/* Footer simples */}
      <footer className="py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-white/60 text-sm">
            © {new Date().getFullYear()} {siteConfig.name}. Todos os direitos reservados.
          </p>
          <div className="flex justify-center gap-4 mt-2">
            <Link href="/termos" className="text-white/60 text-sm hover:text-white">
              Termos de Uso
            </Link>
            <Link href="/privacidade" className="text-white/60 text-sm hover:text-white">
              Privacidade
            </Link>
            <Link href="/ajuda" className="text-white/60 text-sm hover:text-white">
              Ajuda
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
