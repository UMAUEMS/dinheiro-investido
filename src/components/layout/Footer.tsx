import Link from "next/link";
import { Instagram, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#fffbf8] border-t border-[#b76e79]/10 py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          {/* Logo e descrição */}
          <div>
            <Link href="/" className="text-xl font-bold text-[#4a3f3f]">
              Dinheiro<span className="text-[#b76e79]">.</span>
            </Link>
            <p className="text-sm text-[#7a6b6b] mt-2 max-w-xs">
              Transforme PDFs em flipbooks interativos.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-8">
            <div>
              <h4 className="font-semibold text-[#4a3f3f] mb-3">Produto</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/recursos" className="text-[#7a6b6b] hover:text-[#b76e79]">Recursos</Link></li>
                <li><Link href="/precos" className="text-[#7a6b6b] hover:text-[#b76e79]">Preços</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-[#4a3f3f] mb-3">Empresa</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/sobre" className="text-[#7a6b6b] hover:text-[#b76e79]">Sobre</Link></li>
                <li><Link href="/contato" className="text-[#7a6b6b] hover:text-[#b76e79]">Contato</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-[#4a3f3f] mb-3">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/termos" className="text-[#7a6b6b] hover:text-[#b76e79]">Termos</Link></li>
                <li><Link href="/privacidade" className="text-[#7a6b6b] hover:text-[#b76e79]">Privacidade</Link></li>
              </ul>
            </div>
          </div>

          {/* Social */}
          <div className="flex gap-3">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#fce4ec] flex items-center justify-center text-[#b76e79] hover:bg-[#b76e79] hover:text-white transition-colors">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="mailto:contato@dinheiroinvestido.com.br" className="w-10 h-10 rounded-full bg-[#fce4ec] flex items-center justify-center text-[#b76e79] hover:bg-[#b76e79] hover:text-white transition-colors">
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[#b76e79]/10 text-center text-sm text-[#7a6b6b]">
          © 2026 Dinheiro Investido. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}
