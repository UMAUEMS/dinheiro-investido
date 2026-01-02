"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Mail, ArrowRight, RefreshCw, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

function VerifyContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  return (
    <div className="max-w-md mx-auto">
      <Card className="bg-white border-none shadow-2xl">
        <CardContent className="pt-8 pb-8 text-center">
          <div className="w-16 h-16 bg-[#263A68]/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Mail className="w-8 h-8 text-[#263A68]" />
          </div>
          <h2 className="text-2xl font-bold text-[#171A3D] mb-2">
            Verifique seu email
          </h2>
          <p className="text-[#736F89] mb-2">
            Enviamos um link de confirmação para:
          </p>
          <p className="font-medium text-[#171A3D] mb-6">
            {email || "seu email"}
          </p>
          <p className="text-sm text-[#736F89] mb-6">
            Clique no link no email para ativar sua conta. Se não encontrar,
            verifique a pasta de spam.
          </p>

          <div className="space-y-3">
            <Link href="/auth/login">
              <Button className="w-full">
                Ir para o login
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Button variant="outline" className="w-full">
              <RefreshCw className="w-4 h-4 mr-2" />
              Reenviar email
            </Button>
          </div>

          <p className="text-xs text-[#736F89] mt-6">
            Não recebeu o email? Verifique se digitou o endereço corretamente ou
            tente novamente em alguns minutos.
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

export default function VerifyPage() {
  return (
    <Suspense fallback={<LoadingState />}>
      <VerifyContent />
    </Suspense>
  );
}
