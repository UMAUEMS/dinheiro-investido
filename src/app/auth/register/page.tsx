"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { Mail, Lock, User, ArrowRight, Loader2, Sparkles, Check, BookOpen, Video, ShoppingBag, Star } from "lucide-react";
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
    
    // Verificar se as senhas coincidem
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
      <div className="min-h-screen flex items-center justify-center bg-[#030014] px-4 py-12">
        {/* Background */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-green-600/20 rounded-full blur-[128px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-emerald-600/20 rounded-full blur-[128px]" />
        </div>
        
        <div className="relative z-10 w-full max-w-md">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-green-600/20 via-emerald-600/20 to-teal-600/20 rounded-3xl blur-xl" />
            <div className="relative bg-gradient-to-br from-white/[0.07] to-white/[0.03] backdrop-blur-xl rounded-2xl border border-white/10 p-8 text-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/30">
                <Check className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white mb-4">
                Conta criada com sucesso!
              </h1>
              <p className="text-white/50 mb-8">
                Enviamos um email de confirmação para você. Por favor, verifique sua caixa de entrada e clique no link para ativar sua conta.
              </p>
              <Link
                href="/auth/login"
                className="group inline-flex items-center gap-2 py-4 px-8 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 text-white font-semibold hover:shadow-[0_0_30px_rgba(139,92,246,0.4)] transition-all"
              >
                Ir para o Login
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
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
            Comece a criar{" "}
            <span className="bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
              flipbooks incríveis
            </span>{" "}
            hoje
          </h1>
          <p className="text-lg text-white/50 mb-12 max-w-md">
            Junte-se a milhares de criadores que já transformam seus PDFs em experiências digitais únicas.
          </p>

          {/* Benefits */}
          <div className="space-y-4 mb-12">
            {[
              { icon: BookOpen, text: "3 flipbooks grátis para começar" },
              { icon: Video, text: "Exportação em vídeo MP4" },
              { icon: ShoppingBag, text: "Venda seus produtos digitais" },
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-4 text-white/60">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                  <feature.icon className="w-5 h-5 text-purple-400" />
                </div>
                <span>{feature.text}</span>
              </div>
            ))}
          </div>

          {/* Social Proof */}
          <div className="flex items-center gap-4">
            <div className="flex -space-x-2">
              {['MS', 'JS', 'AC', 'PL'].map((initials, i) => (
                <div 
                  key={i} 
                  className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 border-2 border-[#030014] flex items-center justify-center text-xs font-bold text-white"
                >
                  {initials}
                </div>
              ))}
            </div>
            <div>
              <div className="flex items-center gap-1 mb-0.5">
                {[1,2,3,4,5].map(i => (
                  <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-xs text-white/40">
                +2.000 usuários satisfeitos
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12 overflow-y-auto">
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
                  Crie sua conta grátis
                </h2>
                <p className="text-white/50">
                  Comece a criar flipbooks incríveis hoje
                </p>
              </div>

              {/* Error Message */}
              {error && (
                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm">
                  {error}
                </div>
              )}

              {/* Register Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-white/70 mb-2">
                    Nome completo
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Seu nome"
                      required
                      className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-purple-500/50 focus:bg-white/[0.07] transition-all"
                    />
                  </div>
                </div>

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
                      className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-purple-500/50 focus:bg-white/[0.07] transition-all"
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
                      placeholder="Mínimo 6 caracteres"
                      required
                      minLength={6}
                      className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-purple-500/50 focus:bg-white/[0.07] transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-white/70 mb-2">
                    Confirmar senha
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      placeholder="Digite a senha novamente"
                      required
                      minLength={6}
                      className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-purple-500/50 focus:bg-white/[0.07] transition-all"
                    />
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-2">
                  <input
                    type="checkbox"
                    id="terms"
                    name="terms"
                    required
                    className="w-5 h-5 mt-0.5 rounded bg-white/5 border-white/20 text-purple-500 focus:ring-purple-500 focus:ring-offset-0"
                  />
                  <label htmlFor="terms" className="text-sm text-white/50">
                    Eu concordo com os{" "}
                    <Link href="/termos" className="text-purple-400 hover:text-purple-300">
                      Termos de Uso
                    </Link>{" "}
                    e{" "}
                    <Link href="/privacidade" className="text-purple-400 hover:text-purple-300">
                      Política de Privacidade
                    </Link>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="group w-full py-4 px-6 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 text-white font-semibold hover:shadow-[0_0_30px_rgba(139,92,246,0.4)] focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 mt-6"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Criando conta...
                    </>
                  ) : (
                    <>
                      Criar conta grátis
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>

              {/* Login Link */}
              <p className="text-center text-white/50 mt-6">
                Já tem uma conta?{" "}
                <Link href="/auth/login" className="text-purple-400 font-medium hover:text-purple-300 transition-colors">
                  Fazer login
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

export default function RegisterPage() {
  return (
    <Suspense fallback={<LoadingState />}>
      <RegisterForm />
    </Suspense>
  );
}
