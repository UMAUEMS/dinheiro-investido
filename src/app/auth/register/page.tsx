"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { Mail, Lock, User, ArrowRight, Loader2, Check, Sparkles, BookOpen, Video, ShoppingBag } from "lucide-react";
import { signup } from "../actions";

function RegisterForm() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;
    
    if (password !== confirmPassword) {
      setError("As senhas não coincidem");
      setIsLoading(false);
      return;
    }

    const result = await signup(formData);

    if (result?.error) {
      setError(result.error);
      setIsLoading(false);
    } else {
      setSuccess(true);
      setIsLoading(false);
    }
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fffbf8] p-8">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-[#4a3f3f] mb-4">Conta criada!</h1>
          <p className="text-[#7a6b6b] mb-8">Verifique seu email para ativar.</p>
          <Link href="/auth/login" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#b76e79] to-[#d4a5a5] text-white font-semibold rounded-full">
            Ir para Login <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      {/* Left - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#d4a5a5] via-[#c4868f] to-[#b76e79] relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-20 right-20 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
        <div className="absolute bottom-40 left-20 w-48 h-48 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-white/5 rounded-full" />
        
        <div className="relative z-10 flex flex-col items-center justify-center w-full p-12 text-white">
          <div className="mb-8">
            <Sparkles className="w-16 h-16 text-white/80" />
          </div>
          <h1 className="text-4xl font-bold mb-4 text-center">Comece grátis!</h1>
          <p className="text-white/80 text-center max-w-sm text-lg mb-12">
            Crie flipbooks incríveis em minutos e encante seus clientes.
          </p>
          
          {/* Features */}
          <div className="space-y-4 w-full max-w-xs">
            <div className="flex items-center gap-4 bg-white/10 rounded-xl p-4">
              <BookOpen className="w-6 h-6" />
              <span>Flipbooks ilimitados</span>
            </div>
            <div className="flex items-center gap-4 bg-white/10 rounded-xl p-4">
              <Video className="w-6 h-6" />
              <span>Exportação em vídeo</span>
            </div>
            <div className="flex items-center gap-4 bg-white/10 rounded-xl p-4">
              <ShoppingBag className="w-6 h-6" />
              <span>Loja de produtos</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-[#fffbf8]">
        <div className="w-full max-w-md">
          <Link href="/" className="text-2xl font-bold text-[#4a3f3f] mb-8 block">
            Dinheiro<span className="text-[#b76e79]">.</span>
          </Link>

          <h2 className="text-2xl font-bold text-[#4a3f3f] mb-2">Criar conta</h2>
          <p className="text-[#7a6b6b] mb-8">É grátis e leva 30 segundos</p>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#b76e79]/50" />
              <input
                type="text"
                name="name"
                placeholder="Nome"
                required
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-white border border-[#b76e79]/20 text-[#4a3f3f] placeholder-[#7a6b6b]/50 focus:outline-none focus:border-[#b76e79] transition-all"
              />
            </div>

            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#b76e79]/50" />
              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-white border border-[#b76e79]/20 text-[#4a3f3f] placeholder-[#7a6b6b]/50 focus:outline-none focus:border-[#b76e79] transition-all"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#b76e79]/50" />
              <input
                type="password"
                name="password"
                placeholder="Senha"
                required
                minLength={6}
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-white border border-[#b76e79]/20 text-[#4a3f3f] placeholder-[#7a6b6b]/50 focus:outline-none focus:border-[#b76e79] transition-all"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#b76e79]/50" />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirmar senha"
                required
                minLength={6}
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-white border border-[#b76e79]/20 text-[#4a3f3f] placeholder-[#7a6b6b]/50 focus:outline-none focus:border-[#b76e79] transition-all"
              />
            </div>

            <div className="flex items-start gap-3 pt-2">
              <input type="checkbox" name="terms" required className="mt-1 w-4 h-4 rounded border-[#b76e79]/30 text-[#b76e79] focus:ring-[#b76e79]" />
              <label className="text-sm text-[#7a6b6b]">
                Concordo com os <Link href="/termos" className="text-[#b76e79]">Termos</Link> e <Link href="/privacidade" className="text-[#b76e79]">Privacidade</Link>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-[#b76e79] to-[#d4a5a5] text-white font-semibold shadow-lg hover:shadow-xl disabled:opacity-50 transition-all flex items-center justify-center gap-2 mt-6"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  Criar conta
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          <p className="text-center text-[#7a6b6b] mt-8">
            Já tem conta?{" "}
            <Link href="/auth/login" className="text-[#b76e79] font-semibold hover:underline">
              Entrar
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-[#fffbf8]"><Loader2 className="w-8 h-8 animate-spin text-[#b76e79]" /></div>}>
      <RegisterForm />
    </Suspense>
  );
}
