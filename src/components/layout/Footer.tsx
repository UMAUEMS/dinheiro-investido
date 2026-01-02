import Link from "next/link";
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react";
import { siteConfig, footerLinks } from "@/lib/constants";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="bg-gradient-to-br from-[#171A3D] via-[#263A68] to-[#342852] text-white"
      role="contentinfo"
    >
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                <span className="text-white font-bold text-lg">DI</span>
              </div>
              <span className="text-xl font-bold">{siteConfig.name}</span>
            </Link>
            <p className="text-white/70 mb-6 max-w-md">
              Transforme seus PDFs em publicações digitais interativas incríveis. 
              Crie flipbooks, revistas, catálogos e muito mais com facilidade.
            </p>
            {/* Social Links */}
            <div className="flex gap-4">
              <a
                href={siteConfig.links.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href={siteConfig.links.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href={siteConfig.links.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="YouTube"
              >
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Produto */}
          <div>
            <h3 className="font-bold text-lg mb-4">Produto</h3>
            <ul className="space-y-3">
              {footerLinks.produto.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categorias */}
          <div>
            <h3 className="font-bold text-lg mb-4">Categorias</h3>
            <ul className="space-y-3">
              {footerLinks.categorias.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Empresa & Legal */}
          <div>
            <h3 className="font-bold text-lg mb-4">Empresa</h3>
            <ul className="space-y-3 mb-6">
              {footerLinks.empresa.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <h3 className="font-bold text-lg mb-4">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-wrap gap-6 justify-center lg:justify-start">
            <a
              href="mailto:contato@dinheiroinvestidoweb.com.br"
              className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
            >
              <Mail size={18} />
              <span>contato@dinheiroinvestidoweb.com.br</span>
            </a>
            <a
              href="tel:+5511999999999"
              className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
            >
              <Phone size={18} />
              <span>(11) 99999-9999</span>
            </a>
            <span className="flex items-center gap-2 text-white/70">
              <MapPin size={18} />
              <span>São Paulo, Brasil</span>
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/60 text-sm text-center md:text-left">
              &copy; {currentYear} {siteConfig.name}. Todos os direitos reservados.
            </p>
            <p className="text-white/60 text-sm">
              Feito com dedicação no Brasil
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
