"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, ArrowLeft, Loader2, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { forgotPassword } from "../actions";

export default function ForgotPasswordPage() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setIsLoading(true);
    setError(null);

    const result = await forgotPassword(formData);

    if (result?.error) {
      setError(result.error);
      setIsLoading(false);
    } else if (result?.success) {
      setSuccess(true);
      setIsLoading(false);
    }
  }

  if (success) {
    return (
      <div className="max-w-md mx-auto">
        <Card className="bg-white border-none shadow-2xl">
          <CardContent className="pt-8 pb-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
            <h2 className="text-2xl font-bold text-[#171A3D] mb-2">
              Email enviado!
            </h2>
            <p className="text-[#736F89] mb-6">
              Verifique sua caixa de entrada e siga as instruções para redefinir
              sua senha.
            </p>
            <Link href="/auth/login">
              <Button variant="secondary" className="w-full">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar para o login
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto">
      <Card className="bg-white border-none shadow-2xl">
        <CardHeader className="text-center pb-0">
          <CardTitle className="text-2xl text-[#171A3D]">
            Esqueceu sua senha?
          </CardTitle>
          <p className="text-[#736F89] mt-2">
            Digite seu email e enviaremos um link para redefinir sua senha.
          </p>
        </CardHeader>

        <CardContent className="pt-6">
          {/* Mensagem de erro */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
              {error}
            </div>
          )}

          {/* Formulário */}
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

            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : null}
              Enviar link de recuperação
            </Button>
          </form>

          {/* Link para voltar */}
          <div className="mt-6 text-center">
            <Link
              href="/auth/login"
              className="inline-flex items-center text-sm text-[#263A68] hover:underline"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Voltar para o login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
