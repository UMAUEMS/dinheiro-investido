"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, X, Sparkles } from "lucide-react";
import { navLinks, siteConfig } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled
          ? "bg-white/90 backdrop-blur-xl border-b border-[#b76e79]/10 py-3 shadow-sm"
          : "bg-transparent py-5"
      )}
      role="banner"
    >
      {/* Skip Link para Acessibilidade */}
      <a
        href="#main-content"
        className="skip-link"
      >
        Pular para o conteúdo principal
      </a>

      <nav
        className="container mx-auto px-6 flex items-center justify-between"
        role="navigation"
        aria-label="Navegação principal"
      >
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 group"
          aria-label={`${siteConfig.name} - Página inicial`}
        >
          <div className="relative">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#b76e79] to-[#d4a5a5] flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-md shadow-[#b76e79]/20">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold text-[#4a3f3f] tracking-tight">Dinheiro</span>
            <span className="text-xs text-[#7a6b6b] -mt-1 font-medium">Investido</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex items-center gap-1" role="menubar">
          {navLinks.map((link) => (
            <li key={link.href} role="none">
              <Link
                href={link.href}
                className="px-4 py-2 text-sm text-[#7a6b6b] hover:text-[#b76e79] font-medium rounded-lg hover:bg-[#fce4ec]/50 transition-all duration-300"
                role="menuitem"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA Buttons */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            href="/auth/login"
            className="px-5 py-2.5 text-sm font-medium text-[#7a6b6b] hover:text-[#b76e79] transition-colors"
          >
            Entrar
          </Link>
          <Link
            href="/auth/register"
            className="group relative inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-[#b76e79] to-[#d4a5a5] rounded-xl overflow-hidden transition-all duration-300 shadow-md shadow-[#b76e79]/20 hover:shadow-lg hover:shadow-[#b76e79]/30"
          >
            <span className="relative z-10">Começar Grátis</span>
            <Sparkles className="w-4 h-4 relative z-10" />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2.5 rounded-xl bg-[#fce4ec]/50 border border-[#b76e79]/10 text-[#b76e79] hover:bg-[#fce4ec] transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
        >
          {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className={cn(
          "lg:hidden absolute top-full left-0 right-0 transition-all duration-500",
          isMenuOpen 
            ? "opacity-100 translate-y-0 pointer-events-auto" 
            : "opacity-0 -translate-y-4 pointer-events-none"
        )}
        role="menu"
        aria-hidden={!isMenuOpen}
      >
        <div className="mx-4 mt-2 p-6 bg-white/95 backdrop-blur-xl border border-[#b76e79]/10 rounded-2xl shadow-xl shadow-[#b76e79]/10">
          <nav className="flex flex-col gap-1" aria-label="Menu mobile">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-3 text-[#4a3f3f] hover:text-[#b76e79] font-medium rounded-xl hover:bg-[#fce4ec]/50 transition-all"
                onClick={() => setIsMenuOpen(false)}
                role="menuitem"
              >
                {link.label}
              </Link>
            ))}
            <hr className="border-[#b76e79]/10 my-4" />
            <Link
              href="/auth/login"
              className="px-4 py-3 text-center text-[#7a6b6b] hover:text-[#b76e79] font-medium rounded-xl hover:bg-[#fce4ec]/50 transition-all"
              onClick={() => setIsMenuOpen(false)}
            >
              Entrar
            </Link>
            <Link
              href="/auth/register"
              className="px-4 py-3 text-center font-semibold text-white bg-gradient-to-r from-[#b76e79] to-[#d4a5a5] rounded-xl shadow-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Começar Grátis
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
