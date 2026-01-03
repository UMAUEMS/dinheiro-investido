"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Mail, Lock, ArrowRight, Loader2, Sparkles, BookOpen, Video, ShoppingBag } from "lucide-react";
import { login } from "../actions";

function LoginForm() {
  const searchParams = useSearchParams();
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
    <div className="min-h-screen flex bg-[#fffbf8]">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#fdf2f8] via-[#fff5f0] to-[#fce4ec]" />
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#f8bbd9]/30 rounded-full blur-[100px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#ffe5d9]/40 rounded-full blur-[100px]" />
          {/* Decorative dots pattern */}
          <div className="absolute inset-0 opacity-30" style={{
            backgroundImage: 'radial-gradient(#b76e79 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }} />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center px-12 xl:px-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 mb-12 group">
            <div className="relative">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#b76e79] to-[#d4a5a5] flex items-center justify-center transition-transform group-hover:scale-110 shadow-lg shadow-[#b76e79]/20">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-[#4a3f3f]">Dinheiro</span>
              <span className="text-xs text-[#7a6b6b] -mt-1">Investido</span>
            </div>
          </Link>

          <h1 className="text-4xl xl:text-5xl font-bold text-[#4a3f3f] mb-6 leading-tight">
            Transforme seus PDFs em{" "}
            <span className="bg-gradient-to-r from-[#b76e79] to-[#d4a5a5] bg-clip-text text-transparent">
              experiências incríveis
            </span>
          </h1>
          <p className="text-lg text-[#7a6b6b] mb-12 max-w-md">
            Crie flipbooks interativos, exporte vídeos cinematográficos e venda produtos digitais.
          </p>

          {/* Features */}
          <div className="space-y-4">
            {[
              { icon: BookOpen, text: "Flipbooks com efeito de virada de página" },
              { icon: Video, text: "Exportação em vídeo MP4" },
              { icon: ShoppingBag, text: "Loja de produtos digitais" },
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-4 text-[#7a6b6b]">
                <div className="w-10 h-10 rounded-xl bg-white shadow-md shadow-[#b76e79]/10 border border-[#b76e79]/10 flex items-center justify-center">
                  <feature.icon className="w-5 h-5 text-[#b76e79]" />
                </div>
                <span>{feature.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#b76e79] to-[#d4a5a5] flex items-center justify-center shadow-md shadow-[#b76e79]/20">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-[#4a3f3f]">Dinheiro Investido</span>
            </Link>
          </div>

          {/* Card */}
          <div className="relative">
            <div className="relative bg-white rounded-2xl border border-[#b76e79]/10 p-8 shadow-xl shadow-[#b76e79]/5">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-[#4a3f3f] mb-2">
                  Bem-vindo de volta!
                </h2>
                <p className="text-[#7a6b6b]">
                  Entre na sua conta para continuar
                </p>
              </div>

              {/* Error Message */}
              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                  {error}
                </div>
              )}

              {/* Login Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-[#4a3f3f] mb-2">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#b76e79]/50" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="seu@email.com"
                      required
                      className="w-full pl-12 pr-4 py-4 rounded-xl bg-[#fdf2f8] border border-[#b76e79]/20 text-[#4a3f3f] placeholder-[#7a6b6b]/50 focus:outline-none focus:border-[#b76e79] focus:ring-2 focus:ring-[#b76e79]/10 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-[#4a3f3f] mb-2">
                    Senha
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#b76e79]/50" />
                    <input
                      type="password"
                      id="password"
                      name="password"
                      placeholder="••••••••"
                      required
                      minLength={6}
                      className="w-full pl-12 pr-4 py-4 rounded-xl bg-[#fdf2f8] border border-[#b76e79]/20 text-[#4a3f3f] placeholder-[#7a6b6b]/50 focus:outline-none focus:border-[#b76e79] focus:ring-2 focus:ring-[#b76e79]/10 transition-all"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 cursor-pointer text-[#7a6b6b] hover:text-[#4a3f3f] transition-colors">
                    <input
                      type="checkbox"
                      name="remember"
                      className="w-4 h-4 rounded bg-[#fdf2f8] border-[#b76e79]/30 text-[#b76e79] focus:ring-[#b76e79] focus:ring-offset-0"
                    />
                    Lembrar de mim
                  </label>
                  <Link href="/auth/forgot-password" className="text-[#b76e79] hover:text-[#8b5a5a] transition-colors">
                    Esqueceu a senha?
                  </Link>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="group w-full py-4 px-6 rounded-xl bg-gradient-to-r from-[#b76e79] to-[#d4a5a5] text-white font-semibold shadow-lg shadow-[#b76e79]/20 hover:shadow-xl hover:shadow-[#b76e79]/30 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Entrando...
                    </>
                  ) : (
                    <>
                      Entrar
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>

              {/* Register Link */}
              <p className="text-center text-[#7a6b6b] mt-6">
                Não tem uma conta?{" "}
                <Link href="/auth/register" className="text-[#b76e79] font-medium hover:text-[#8b5a5a] transition-colors">
                  Criar conta grátis
                </Link>
              </p>
            </div>
          </div>

          {/* Back Link */}
          <div className="text-center mt-8">
            <Link href="/" className="text-[#7a6b6b]/70 hover:text-[#7a6b6b] text-sm transition-colors">
              ← Voltar para o início
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fffbf8]">
      <div className="text-center">
        <Loader2 className="w-12 h-12 animate-spin text-[#b76e79] mx-auto" />
        <p className="text-[#7a6b6b] mt-4">Carregando...</p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<LoadingState />}>
      <LoginForm />
    </Suspense>
  );
}
