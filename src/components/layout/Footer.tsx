import Link from "next/link";
import { Facebook, Instagram, Youtube, Mail, Heart, Sparkles, ArrowRight } from "lucide-react";
import { siteConfig, footerLinks } from "@/lib/constants";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-[#b76e79]/10 bg-gradient-to-b from-[#fffbf8] to-[#fdf2f8]" role="contentinfo">
      <div className="container relative z-10 mx-auto px-6 py-16">
        {/* Newsletter Section */}
        <div className="relative mb-16">
          <div className="relative bg-white rounded-2xl p-8 md:p-10 shadow-lg shadow-[#b76e79]/5 border border-[#b76e79]/10">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <h3 className="text-2xl font-bold text-[#4a3f3f] mb-2">Receba novidades exclusivas</h3>
                <p className="text-[#7a6b6b]">Dicas, tutoriais e ofertas especiais direto no seu email.</p>
              </div>
              <form className="flex gap-3 w-full md:w-auto">
                <input
                  type="email"
                  placeholder="seu@email.com"
                  className="flex-1 md:w-64 px-5 py-3.5 rounded-xl bg-[#fdf2f8] border border-[#b76e79]/20 text-[#4a3f3f] placeholder:text-[#7a6b6b]/60 focus:outline-none focus:border-[#b76e79] focus:ring-2 focus:ring-[#b76e79]/10 transition-all"
                />
                <button 
                  type="submit" 
                  className="group inline-flex items-center gap-2 px-6 py-3.5 font-semibold text-white bg-gradient-to-r from-[#b76e79] to-[#d4a5a5] rounded-xl shadow-md shadow-[#b76e79]/20 hover:shadow-lg hover:shadow-[#b76e79]/30 transition-all"
                >
                  <span>Inscrever</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 md:gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6 group">
              <div className="relative">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#b76e79] to-[#d4a5a5] flex items-center justify-center transition-transform group-hover:scale-110 shadow-md shadow-[#b76e79]/20">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold text-[#4a3f3f]">Dinheiro</span>
                <span className="text-xs text-[#7a6b6b] -mt-1">Investido</span>
              </div>
            </Link>
            <p className="text-[#7a6b6b] text-sm mb-6 max-w-xs leading-relaxed">
              Transforme seus PDFs em flipbooks interativos e vídeos cinematográficos. A plataforma completa para criadores digitais.
            </p>
            {/* Social Links */}
            <div className="flex gap-2">
              {[
                { icon: Instagram, href: siteConfig.links.instagram, label: "Instagram" },
                { icon: Facebook, href: siteConfig.links.facebook, label: "Facebook" },
                { icon: Youtube, href: "https://youtube.com", label: "YouTube" },
                { icon: Mail, href: "mailto:contato@dinheiroinvestidoweb.com.br", label: "Email" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith('mailto') ? undefined : "_blank"}
                  rel={social.href.startsWith('mailto') ? undefined : "noopener noreferrer"}
                  className="w-10 h-10 rounded-xl bg-[#fce4ec]/50 border border-[#b76e79]/10 flex items-center justify-center text-[#b76e79]/60 hover:text-[#b76e79] hover:bg-[#fce4ec] hover:border-[#b76e79]/20 transition-all"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Produto */}
          <div>
            <h3 className="text-sm font-semibold text-[#4a3f3f] mb-4">Produto</h3>
            <ul className="space-y-3">
              {footerLinks.produto.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-[#7a6b6b] hover:text-[#b76e79] transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categorias */}
          <div>
            <h3 className="text-sm font-semibold text-[#4a3f3f] mb-4">Categorias</h3>
            <ul className="space-y-3">
              {footerLinks.categorias.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-[#7a6b6b] hover:text-[#b76e79] transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Empresa */}
          <div>
            <h3 className="text-sm font-semibold text-[#4a3f3f] mb-4">Empresa</h3>
            <ul className="space-y-3">
              {footerLinks.empresa.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-[#7a6b6b] hover:text-[#b76e79] transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-[#4a3f3f] mb-4">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-[#7a6b6b] hover:text-[#b76e79] transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pt-8 border-t border-[#b76e79]/10">
          <p className="text-[#7a6b6b]/70 text-sm">
            © {currentYear} {siteConfig.name}. Todos os direitos reservados.
          </p>
          <p className="text-[#7a6b6b]/70 text-sm flex items-center gap-1.5">
            Feito com <Heart className="w-3.5 h-3.5 text-[#b76e79] fill-[#b76e79]" /> no Brasil
          </p>
        </div>
      </div>
    </footer>
  );
}
