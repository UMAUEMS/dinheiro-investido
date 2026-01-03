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
      <div className="min-h-screen flex items-center justify-center bg-[#fffbf8] px-4 py-12">
        {/* Background */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#86efac]/20 rounded-full blur-[100px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#a7f3d0]/20 rounded-full blur-[100px]" />
        </div>
        
        <div className="relative z-10 w-full max-w-md">
          <div className="relative bg-white rounded-2xl border border-green-200 p-8 shadow-xl shadow-green-100 text-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-200">
              <Check className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-[#4a3f3f] mb-4">
              Conta criada com sucesso!
            </h1>
            <p className="text-[#7a6b6b] mb-8">
              Enviamos um email de confirmação para você. Por favor, verifique sua caixa de entrada e clique no link para ativar sua conta.
            </p>
            <Link
              href="/auth/login"
              className="group inline-flex items-center gap-2 py-4 px-8 rounded-xl bg-gradient-to-r from-[#b76e79] to-[#d4a5a5] text-white font-semibold shadow-lg shadow-[#b76e79]/20 hover:shadow-xl hover:shadow-[#b76e79]/30 transition-all"
            >
              Ir para o Login
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    );
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
            Comece a criar{" "}
            <span className="bg-gradient-to-r from-[#b76e79] to-[#d4a5a5] bg-clip-text text-transparent">
              flipbooks incríveis
            </span>{" "}
            hoje
          </h1>
          <p className="text-lg text-[#7a6b6b] mb-12 max-w-md">
            Junte-se a milhares de criadores que já transformam seus PDFs em experiências digitais únicas.
          </p>

          {/* Benefits */}
          <div className="space-y-4 mb-12">
            {[
              { icon: BookOpen, text: "3 flipbooks grátis para começar" },
              { icon: Video, text: "Exportação em vídeo MP4" },
              { icon: ShoppingBag, text: "Venda seus produtos digitais" },
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-4 text-[#7a6b6b]">
                <div className="w-10 h-10 rounded-xl bg-white shadow-md shadow-[#b76e79]/10 border border-[#b76e79]/10 flex items-center justify-center">
                  <feature.icon className="w-5 h-5 text-[#b76e79]" />
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
                  className="w-9 h-9 rounded-full bg-gradient-to-br from-[#b76e79] to-[#d4a5a5] border-2 border-white flex items-center justify-center text-xs font-bold text-white shadow-md"
                >
                  {initials}
                </div>
              ))}
            </div>
            <div>
              <div className="flex items-center gap-1 mb-0.5">
                {[1,2,3,4,5].map(i => (
                  <Star key={i} className="w-3.5 h-3.5 fill-[#f59e0b] text-[#f59e0b]" />
                ))}
              </div>
              <p className="text-xs text-[#7a6b6b]">
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
                  Crie sua conta grátis
                </h2>
                <p className="text-[#7a6b6b]">
                  Comece a criar flipbooks incríveis hoje
                </p>
              </div>

              {/* Error Message */}
              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                  {error}
                </div>
              )}

              {/* Register Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-[#4a3f3f] mb-2">
                    Nome completo
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#b76e79]/50" />
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Seu nome"
                      required
                      className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-[#fdf2f8] border border-[#b76e79]/20 text-[#4a3f3f] placeholder-[#7a6b6b]/50 focus:outline-none focus:border-[#b76e79] focus:ring-2 focus:ring-[#b76e79]/10 transition-all"
                    />
                  </div>
                </div>

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
                      className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-[#fdf2f8] border border-[#b76e79]/20 text-[#4a3f3f] placeholder-[#7a6b6b]/50 focus:outline-none focus:border-[#b76e79] focus:ring-2 focus:ring-[#b76e79]/10 transition-all"
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
                      placeholder="Mínimo 6 caracteres"
                      required
                      minLength={6}
                      className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-[#fdf2f8] border border-[#b76e79]/20 text-[#4a3f3f] placeholder-[#7a6b6b]/50 focus:outline-none focus:border-[#b76e79] focus:ring-2 focus:ring-[#b76e79]/10 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#4a3f3f] mb-2">
                    Confirmar senha
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#b76e79]/50" />
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      placeholder="Digite a senha novamente"
                      required
                      minLength={6}
                      className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-[#fdf2f8] border border-[#b76e79]/20 text-[#4a3f3f] placeholder-[#7a6b6b]/50 focus:outline-none focus:border-[#b76e79] focus:ring-2 focus:ring-[#b76e79]/10 transition-all"
                    />
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-2">
                  <input
                    type="checkbox"
                    id="terms"
                    name="terms"
                    required
                    className="w-5 h-5 mt-0.5 rounded bg-[#fdf2f8] border-[#b76e79]/30 text-[#b76e79] focus:ring-[#b76e79] focus:ring-offset-0"
                  />
                  <label htmlFor="terms" className="text-sm text-[#7a6b6b]">
                    Eu concordo com os{" "}
                    <Link href="/termos" className="text-[#b76e79] hover:text-[#8b5a5a]">
                      Termos de Uso
                    </Link>{" "}
                    e{" "}
                    <Link href="/privacidade" className="text-[#b76e79] hover:text-[#8b5a5a]">
                      Política de Privacidade
                    </Link>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="group w-full py-4 px-6 rounded-xl bg-gradient-to-r from-[#b76e79] to-[#d4a5a5] text-white font-semibold shadow-lg shadow-[#b76e79]/20 hover:shadow-xl hover:shadow-[#b76e79]/30 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 mt-6"
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
              <p className="text-center text-[#7a6b6b] mt-6">
                Já tem uma conta?{" "}
                <Link href="/auth/login" className="text-[#b76e79] font-medium hover:text-[#8b5a5a] transition-colors">
                  Fazer login
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

export default function RegisterPage() {
  return (
    <Suspense fallback={<LoadingState />}>
      <RegisterForm />
    </Suspense>
  );
}
