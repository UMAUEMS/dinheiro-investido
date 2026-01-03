"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/recursos", label: "Recursos" },
  { href: "/modelos", label: "Modelos" },
  { href: "/precos", label: "Preços" },
  { href: "/loja", label: "Loja" },
];

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
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-white/95 backdrop-blur-md border-b border-[#b76e79]/10 py-4"
          : "bg-transparent py-6"
      )}
    >
      <nav className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-[#4a3f3f]">
          Dinheiro<span className="text-[#b76e79]">.</span>
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-[#7a6b6b] hover:text-[#b76e79] font-medium transition-colors"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="hidden lg:flex items-center gap-4">
          <Link href="/auth/login" className="text-[#7a6b6b] hover:text-[#b76e79] font-medium transition-colors">
            Entrar
          </Link>
          <Link
            href="/auth/register"
            className="px-6 py-2.5 font-semibold text-white bg-gradient-to-r from-[#b76e79] to-[#d4a5a5] rounded-full shadow-md hover:shadow-lg transition-all"
          >
            Começar
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2 text-[#4a3f3f]"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-b border-[#b76e79]/10 shadow-lg">
          <nav className="container mx-auto px-6 py-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[#4a3f3f] hover:text-[#b76e79] font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <hr className="border-[#b76e79]/10" />
            <Link
              href="/auth/login"
              className="text-[#7a6b6b] font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Entrar
            </Link>
            <Link
              href="/auth/register"
              className="text-center py-3 font-semibold text-white bg-gradient-to-r from-[#b76e79] to-[#d4a5a5] rounded-full"
              onClick={() => setIsMenuOpen(false)}
            >
              Começar Grátis
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
