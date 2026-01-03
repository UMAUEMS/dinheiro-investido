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
    <div className="min-h-screen flex bg-[#030014]">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-600/20 via-purple-600/10 to-pink-600/20" />
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-600/30 rounded-full blur-[128px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-pink-600/20 rounded-full blur-[128px]" />
          {/* Grid pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center px-12 xl:px-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 mb-12 group">
            <div className="relative">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-600 to-purple-600 flex items-center justify-center transition-transform group-hover:scale-110">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 to-purple-600 rounded-xl blur opacity-30 group-hover:opacity-50 transition-opacity" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-white">Dinheiro</span>
              <span className="text-xs text-white/50 -mt-1">Investido</span>
            </div>
          </Link>

          <h1 className="text-4xl xl:text-5xl font-bold text-white mb-6 leading-tight">
            Transforme seus PDFs em{" "}
            <span className="bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
              experiências incríveis
            </span>
          </h1>
          <p className="text-lg text-white/50 mb-12 max-w-md">
            Crie flipbooks interativos, exporte vídeos cinematográficos e venda produtos digitais.
          </p>

          {/* Features */}
          <div className="space-y-4">
            {[
              { icon: BookOpen, text: "Flipbooks com efeito de virada de página" },
              { icon: Video, text: "Exportação em vídeo MP4" },
              { icon: ShoppingBag, text: "Loja de produtos digitais" },
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-4 text-white/60">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                  <feature.icon className="w-5 h-5 text-purple-400" />
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
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-violet-600 to-purple-600 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">Dinheiro Investido</span>
            </Link>
          </div>

          {/* Card */}
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-violet-600/20 via-purple-600/20 to-pink-600/20 rounded-3xl blur-xl" />
            <div className="relative bg-gradient-to-br from-white/[0.07] to-white/[0.03] backdrop-blur-xl rounded-2xl border border-white/10 p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-white mb-2">
                  Bem-vindo de volta!
                </h2>
                <p className="text-white/50">
                  Entre na sua conta para continuar
                </p>
              </div>

              {/* Error Message */}
              {error && (
                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm">
                  {error}
                </div>
              )}

              {/* Login Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-white/70 mb-2">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="seu@email.com"
                      required
                      className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-purple-500/50 focus:bg-white/[0.07] transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-white/70 mb-2">
                    Senha
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                    <input
                      type="password"
                      id="password"
                      name="password"
                      placeholder="••••••••"
                      required
                      minLength={6}
                      className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-purple-500/50 focus:bg-white/[0.07] transition-all"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 cursor-pointer text-white/50 hover:text-white/70 transition-colors">
                    <input
                      type="checkbox"
                      name="remember"
                      className="w-4 h-4 rounded bg-white/5 border-white/20 text-purple-500 focus:ring-purple-500 focus:ring-offset-0"
                    />
                    Lembrar de mim
                  </label>
                  <Link href="/auth/forgot-password" className="text-purple-400 hover:text-purple-300 transition-colors">
                    Esqueceu a senha?
                  </Link>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="group w-full py-4 px-6 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 text-white font-semibold hover:shadow-[0_0_30px_rgba(139,92,246,0.4)] focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
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
              <p className="text-center text-white/50 mt-6">
                Não tem uma conta?{" "}
                <Link href="/auth/register" className="text-purple-400 font-medium hover:text-purple-300 transition-colors">
                  Criar conta grátis
                </Link>
              </p>
            </div>
          </div>

          {/* Back Link */}
          <div className="text-center mt-8">
            <Link href="/" className="text-white/30 hover:text-white/50 text-sm transition-colors">
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
    <div className="min-h-screen flex items-center justify-center bg-[#030014]">
      <div className="text-center">
        <Loader2 className="w-12 h-12 animate-spin text-purple-500 mx-auto" />
        <p className="text-white/40 mt-4">Carregando...</p>
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
