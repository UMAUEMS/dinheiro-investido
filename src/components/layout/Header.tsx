"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { navLinks, siteConfig } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-md"
          : "bg-transparent"
      )}
      role="banner"
    >
      {/* Skip Link para Acessibilidade */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:bg-[#171A3D] focus:text-white focus:px-4 focus:py-2 focus:rounded-lg"
      >
        Pular para o conteúdo principal
      </a>

      <nav
        className="container mx-auto px-4 py-4 flex items-center justify-between"
        role="navigation"
        aria-label="Navegação principal"
      >
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-bold"
          aria-label={`${siteConfig.name} - Página inicial`}
        >
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#171A3D] via-[#263A68] to-[#342852] flex items-center justify-center">
            <span className="text-white font-bold text-lg">DI</span>
          </div>
          <span
            className={cn(
              "hidden sm:block transition-colors",
              isScrolled ? "text-[#171A3D]" : "text-white"
            )}
          >
            {siteConfig.name}
          </span>
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex items-center gap-1" role="menubar">
          {navLinks.map((link) => (
            <li key={link.href} role="none">
              <Link
                href={link.href}
                className={cn(
                  "px-4 py-2 rounded-lg font-medium transition-colors",
                  isScrolled
                    ? "text-[#171A3D] hover:bg-[#E5E5E6]"
                    : "text-white/90 hover:text-white hover:bg-white/10"
                )}
                role="menuitem"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA Buttons */}
        <div className="hidden lg:flex items-center gap-3">
          <Button
            variant={isScrolled ? "ghost" : "outline"}
            asChild
            className={cn(
              !isScrolled && "border-white/50 text-white hover:bg-white/10 hover:text-white"
            )}
          >
            <Link href="/auth">Entrar</Link>
          </Button>
          <Button asChild>
            <Link href="/auth">Começar Grátis</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className={cn(
            "lg:hidden p-2 rounded-lg transition-colors",
            isScrolled
              ? "text-[#171A3D] hover:bg-[#E5E5E6]"
              : "text-white hover:bg-white/10"
          )}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className={cn(
          "lg:hidden absolute top-full left-0 right-0 bg-white shadow-lg transition-all duration-300 overflow-hidden",
          isMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        )}
        role="menu"
        aria-hidden={!isMenuOpen}
      >
        <nav className="container mx-auto px-4 py-4">
          <ul className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <li key={link.href} role="none">
                <Link
                  href={link.href}
                  className="block px-4 py-3 rounded-lg text-[#171A3D] font-medium hover:bg-[#E5E5E6] transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                  role="menuitem"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-[#E5E5E6]">
            <Button variant="secondary" asChild className="w-full">
              <Link href="/auth" onClick={() => setIsMenuOpen(false)}>
                Entrar
              </Link>
            </Button>
            <Button asChild className="w-full">
              <Link href="/auth" onClick={() => setIsMenuOpen(false)}>
                Começar Grátis
              </Link>
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
