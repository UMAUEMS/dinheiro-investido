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
          ? "header-glass py-3"
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
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#667eea] to-[#764ba2] flex items-center justify-center transition-all duration-300 group-hover:scale-110">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div className="absolute -inset-1 bg-gradient-to-r from-[#667eea] to-[#764ba2] rounded-2xl blur opacity-30 group-hover:opacity-60 transition-opacity" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold gradient-text">Dinheiro</span>
            <span className="text-sm text-white/60 -mt-1">Investido</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex items-center gap-1" role="menubar">
          {navLinks.map((link) => (
            <li key={link.href} role="none">
              <Link
                href={link.href}
                className="px-5 py-2.5 text-white/70 hover:text-white font-medium rounded-xl hover:bg-white/5 transition-all duration-300"
                role="menuitem"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA Buttons */}
        <div className="hidden lg:flex items-center gap-4">
          <Link
            href="/auth/login"
            className="btn-glass text-sm px-6 py-3"
          >
            Entrar
          </Link>
          <Link
            href="/auth/register"
            className="btn-gradient text-sm px-6 py-3"
          >
            <span>Começar Grátis</span>
            <Sparkles className="w-4 h-4" />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-3 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
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
        <div className="mx-4 mt-2 p-6 glass-card">
          <nav className="flex flex-col gap-2" aria-label="Menu mobile">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-3 text-white/80 hover:text-white font-medium rounded-xl hover:bg-white/5 transition-all"
                onClick={() => setIsMenuOpen(false)}
                role="menuitem"
              >
                {link.label}
              </Link>
            ))}
            <hr className="border-white/10 my-4" />
            <Link
              href="/auth/login"
              className="btn-glass text-center"
              onClick={() => setIsMenuOpen(false)}
            >
              Entrar
            </Link>
            <Link
              href="/auth/register"
              className="btn-gradient text-center"
              onClick={() => setIsMenuOpen(false)}
            >
              <span>Começar Grátis</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
