"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Mail, Lock, ArrowRight, Github, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { login, loginWithGoogle, loginWithGithub } from "../actions";

function LoginForm() {
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/dashboard";
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<string | null>(null);

  async function handleSubmit(formData: FormData) {
    setIsLoading(true);
    setError(null);

    const result = await login(formData);

    if (result?.error) {
      setError(result.error);
      setIsLoading(false);
    }
  }

  async function handleGoogleLogin() {
    setSocialLoading("google");
    const result = await loginWithGoogle();
    if (result?.error) {
      setError(result.error);
      setSocialLoading(null);
    }
  }

  async function handleGithubLogin() {
    setSocialLoading("github");
    const result = await loginWithGithub();
    if (result?.error) {
      setError(result.error);
      setSocialLoading(null);
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <Card className="bg-white border-none shadow-2xl">
        <CardHeader className="text-center pb-0">
          <CardTitle className="text-2xl text-[#171A3D]">
            Bem-vindo de volta!
          </CardTitle>
          <p className="text-[#736F89] mt-2">
            Entre na sua conta para continuar
          </p>
        </CardHeader>

        <CardContent className="pt-6">
          {/* Mensagem de erro */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
              {error}
            </div>
          )}

          {/* Login Social */}
          <div className="space-y-3 mb-6">
            <Button
              type="button"
              variant="secondary"
              className="w-full justify-center gap-3"
              onClick={handleGoogleLogin}
              disabled={socialLoading !== null}
            >
              {socialLoading === "google" ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
              )}
              Continuar com Google
            </Button>
            <Button
              type="button"
              variant="secondary"
              className="w-full justify-center gap-3"
              onClick={handleGithubLogin}
              disabled={socialLoading !== null}
            >
              {socialLoading === "github" ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Github className="w-5 h-5" />
              )}
              Continuar com GitHub
            </Button>
          </div>

          {/* Divisor */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#E5E5E6]" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-[#736F89]">
                ou continue com email
              </span>
            </div>
          </div>

          {/* Formulário de Login */}
          <form action={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-[#171A3D] mb-1"
              >
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#736F89]" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="seu@email.com"
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-[#E5E5E6] focus:outline-none focus:ring-2 focus:ring-[#263A68] focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-[#171A3D] mb-1"
              >
                Senha
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#736F89]" />
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="••••••••"
                  required
                  minLength={6}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-[#E5E5E6] focus:outline-none focus:ring-2 focus:ring-[#263A68] focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="remember"
                  className="w-4 h-4 rounded border-[#E5E5E6] text-[#263A68] focus:ring-[#263A68]"
                />
                <span className="text-[#736F89]">Lembrar de mim</span>
              </label>
              <Link
                href="/auth/forgot-password"
                className="text-[#263A68] hover:underline"
              >
                Esqueceu a senha?
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : null}
              Entrar
              {!isLoading && <ArrowRight className="w-4 h-4 ml-2" />}
            </Button>
          </form>

          {/* Link para registro */}
          <p className="text-center text-sm text-[#736F89] mt-6">
            Não tem uma conta?{" "}
            <Link
              href="/auth/register"
              className="text-[#263A68] font-medium hover:underline"
            >
              Criar conta grátis
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="max-w-md mx-auto">
      <Card className="bg-white border-none shadow-2xl">
        <CardContent className="pt-8 pb-8 text-center">
          <Loader2 className="w-8 h-8 animate-spin text-[#263A68] mx-auto" />
          <p className="text-[#736F89] mt-4">Carregando...</p>
        </CardContent>
      </Card>
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
