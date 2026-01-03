import Link from "next/link";
import { Facebook, Instagram, Youtube, Mail, Heart, Sparkles, ArrowRight } from "lucide-react";
import { siteConfig, footerLinks } from "@/lib/constants";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/5 bg-[#030014]" role="contentinfo">
      {/* Background gradient */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[128px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-pink-600/10 rounded-full blur-[128px]" />
      </div>
      
      <div className="container relative z-10 mx-auto px-6 py-16">
        {/* Newsletter Section */}
        <div className="relative mb-16">
          <div className="absolute -inset-2 bg-gradient-to-r from-violet-600/20 via-purple-600/20 to-pink-600/20 rounded-3xl blur-xl" />
          <div className="relative bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl p-8 md:p-10">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">Receba novidades exclusivas</h3>
                <p className="text-white/50">Dicas, tutoriais e ofertas especiais direto no seu email.</p>
              </div>
              <form className="flex gap-3 w-full md:w-auto">
                <input
                  type="email"
                  placeholder="seu@email.com"
                  className="flex-1 md:w-64 px-5 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-purple-500/50 focus:bg-white/[0.07] transition-all"
                />
                <button 
                  type="submit" 
                  className="group inline-flex items-center gap-2 px-6 py-3.5 font-semibold text-white bg-gradient-to-r from-violet-600 to-purple-600 rounded-xl hover:shadow-[0_0_30px_rgba(139,92,246,0.4)] transition-all"
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
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-violet-600 to-purple-600 flex items-center justify-center transition-transform group-hover:scale-110">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 to-purple-600 rounded-xl blur opacity-30 group-hover:opacity-50 transition-opacity" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold text-white">Dinheiro</span>
                <span className="text-xs text-white/50 -mt-1">Investido</span>
              </div>
            </Link>
            <p className="text-white/50 text-sm mb-6 max-w-xs leading-relaxed">
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
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Produto */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Produto</h3>
            <ul className="space-y-3">
              {footerLinks.produto.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/40 hover:text-white transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categorias */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Categorias</h3>
            <ul className="space-y-3">
              {footerLinks.categorias.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/40 hover:text-white transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Empresa */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Empresa</h3>
            <ul className="space-y-3">
              {footerLinks.empresa.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/40 hover:text-white transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/40 hover:text-white transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pt-8 border-t border-white/5">
          <p className="text-white/30 text-sm">
            © {currentYear} {siteConfig.name}. Todos os direitos reservados.
          </p>
          <p className="text-white/30 text-sm flex items-center gap-1.5">
            Feito com <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> no Brasil
          </p>
        </div>
      </div>
    </footer>
  );
}
