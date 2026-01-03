"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, X, Sparkles, ChevronDown } from "lucide-react";
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
          ? "bg-[#030014]/80 backdrop-blur-xl border-b border-white/5 py-3"
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
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-violet-600 to-purple-600 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 to-purple-600 rounded-xl blur opacity-30 group-hover:opacity-60 transition-opacity" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold text-white tracking-tight">Dinheiro</span>
            <span className="text-xs text-white/50 -mt-1 font-medium">Investido</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex items-center gap-1" role="menubar">
          {navLinks.map((link) => (
            <li key={link.href} role="none">
              <Link
                href={link.href}
                className="px-4 py-2 text-sm text-white/60 hover:text-white font-medium rounded-lg hover:bg-white/5 transition-all duration-300"
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
            className="px-5 py-2.5 text-sm font-medium text-white/80 hover:text-white transition-colors"
          >
            Entrar
          </Link>
          <Link
            href="/auth/register"
            className="group relative inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-violet-600 to-purple-600 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(139,92,246,0.4)]"
          >
            <span className="relative z-10">Começar Grátis</span>
            <Sparkles className="w-4 h-4 relative z-10" />
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2.5 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors"
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
        <div className="mx-4 mt-2 p-6 bg-[#0a0a1a]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl">
          <nav className="flex flex-col gap-1" aria-label="Menu mobile">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-3 text-white/70 hover:text-white font-medium rounded-xl hover:bg-white/5 transition-all"
                onClick={() => setIsMenuOpen(false)}
                role="menuitem"
              >
                {link.label}
              </Link>
            ))}
            <hr className="border-white/10 my-4" />
            <Link
              href="/auth/login"
              className="px-4 py-3 text-center text-white/70 hover:text-white font-medium rounded-xl hover:bg-white/5 transition-all"
              onClick={() => setIsMenuOpen(false)}
            >
              Entrar
            </Link>
            <Link
              href="/auth/register"
              className="px-4 py-3 text-center font-semibold text-white bg-gradient-to-r from-violet-600 to-purple-600 rounded-xl"
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
