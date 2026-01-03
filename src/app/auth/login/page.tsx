"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { Mail, Lock, ArrowRight, Loader2, Sparkles } from "lucide-react";
import { login } from "../actions";

function LoginForm() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const result = await login(formData);

    if (result?.error) {
      setError(result.error);
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#b76e79] via-[#c4868f] to-[#d4a5a5] relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
        <div className="absolute bottom-40 right-20 w-48 h-48 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-white/5 rounded-full" />
        
        <div className="relative z-10 flex flex-col items-center justify-center w-full p-12 text-white">
          <div className="mb-8">
            <Sparkles className="w-16 h-16 text-white/80" />
          </div>
          <h1 className="text-4xl font-bold mb-4 text-center">Bem-vindo de volta!</h1>
          <p className="text-white/80 text-center max-w-sm text-lg">
            Continue criando flipbooks incríveis e encante seus clientes.
          </p>
          
          {/* Stats */}
          <div className="mt-12 flex gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold">50K+</div>
              <div className="text-white/70 text-sm">Flipbooks</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">12K+</div>
              <div className="text-white/70 text-sm">Usuários</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">4.9★</div>
              <div className="text-white/70 text-sm">Avaliação</div>
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

          <h2 className="text-2xl font-bold text-[#4a3f3f] mb-2">Entrar</h2>
          <p className="text-[#7a6b6b] mb-8">Digite suas credenciais</p>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
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
            </div>

            <div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#b76e79]/50" />
                <input
                  type="password"
                  name="password"
                  placeholder="Senha"
                  required
                  className="w-full pl-12 pr-4 py-4 rounded-xl bg-white border border-[#b76e79]/20 text-[#4a3f3f] placeholder-[#7a6b6b]/50 focus:outline-none focus:border-[#b76e79] transition-all"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <Link href="/auth/forgot-password" className="text-sm text-[#b76e79] hover:underline">
                Esqueceu a senha?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-[#b76e79] to-[#d4a5a5] text-white font-semibold shadow-lg hover:shadow-xl disabled:opacity-50 transition-all flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  Entrar
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          <p className="text-center text-[#7a6b6b] mt-8">
            Não tem conta?{" "}
            <Link href="/auth/register" className="text-[#b76e79] font-semibold hover:underline">
              Criar conta
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-[#fffbf8]"><Loader2 className="w-8 h-8 animate-spin text-[#b76e79]" /></div>}>
      <LoginForm />
    </Suspense>
  );
}
