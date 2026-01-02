"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  User,
  Mail,
  Camera,
  Save,
  Loader2,
  Shield,
  CreditCard,
  Bell,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/client";
import { Profile, Subscription } from "@/lib/supabase/types";

export default function ProfilePage() {
  const router = useRouter();
  const supabase = createClient();
  
  const [profile, setProfile] = useState<Profile | null>(null);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
  });

  useEffect(() => {
    async function loadProfile() {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        router.push("/auth/login");
        return;
      }

      const { data: profileData } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      const { data: subscriptionData } = await supabase
        .from("subscriptions")
        .select("*")
        .eq("user_id", user.id)
        .eq("status", "active")
        .single();

      if (profileData) {
        setProfile(profileData as Profile);
        setFormData({
          full_name: profileData.full_name || "",
          email: profileData.email || "",
        });
      }

      if (subscriptionData) {
        setSubscription(subscriptionData as Subscription);
      }

      setIsLoading(false);
    }

    loadProfile();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSaving(true);
    setMessage(null);

    const { error } = await supabase
      .from("profiles")
      .update({
        full_name: formData.full_name,
      })
      .eq("id", profile?.id);

    if (error) {
      setMessage({ type: "error", text: "Erro ao salvar perfil. Tente novamente." });
    } else {
      setMessage({ type: "success", text: "Perfil atualizado com sucesso!" });
      setProfile((prev) => prev ? { ...prev, full_name: formData.full_name } : null);
    }

    setIsSaving(false);
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#263A68]" />
      </div>
    );
  }

  const displayName = profile?.full_name || profile?.email?.split("@")[0] || "Usuário";
  const initials = displayName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const planNames = {
    free: "Grátis",
    professional: "Profissional",
    enterprise: "Empresarial",
  };

  return (
    <div className="min-h-screen bg-[#E5E5E6]/30 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-2xl font-bold text-[#171A3D] mb-6">Meu Perfil</h1>

        <div className="grid gap-6">
          {/* Avatar e Info Básica */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="relative">
                  {profile?.avatar_url ? (
                    <img
                      src={profile.avatar_url}
                      alt={displayName}
                      className="w-24 h-24 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-[#263A68] flex items-center justify-center">
                      <span className="text-white text-2xl font-bold">
                        {initials}
                      </span>
                    </div>
                  )}
                  <button className="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-[#E5E5E6] transition-colors">
                    <Camera className="w-4 h-4 text-[#171A3D]" />
                  </button>
                </div>
                <div className="text-center md:text-left">
                  <h2 className="text-xl font-bold text-[#171A3D]">
                    {displayName}
                  </h2>
                  <p className="text-[#736F89]">{profile?.email}</p>
                  <div className="mt-2">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-[#263A68]/10 text-[#263A68]">
                      Plano {planNames[subscription?.plan || "free"]}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Formulário de Edição */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Informações Pessoais
              </CardTitle>
            </CardHeader>
            <CardContent>
              {message && (
                <div
                  className={`mb-4 p-3 rounded-lg text-sm ${
                    message.type === "success"
                      ? "bg-green-50 text-green-700 border border-green-200"
                      : "bg-red-50 text-red-700 border border-red-200"
                  }`}
                >
                  {message.text}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="full_name"
                    className="block text-sm font-medium text-[#171A3D] mb-1"
                  >
                    Nome completo
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#736F89]" />
                    <input
                      type="text"
                      id="full_name"
                      value={formData.full_name}
                      onChange={(e) =>
                        setFormData({ ...formData, full_name: e.target.value })
                      }
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-[#E5E5E6] focus:outline-none focus:ring-2 focus:ring-[#263A68] focus:border-transparent"
                    />
                  </div>
                </div>

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
                      value={formData.email}
                      disabled
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-[#E5E5E6] bg-[#E5E5E6]/30 text-[#736F89] cursor-not-allowed"
                    />
                  </div>
                  <p className="text-xs text-[#736F89] mt-1">
                    O email não pode ser alterado.
                  </p>
                </div>

                <Button type="submit" disabled={isSaving}>
                  {isSaving ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4 mr-2" />
                  )}
                  Salvar Alterações
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Assinatura */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Assinatura
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between p-4 bg-[#E5E5E6]/30 rounded-lg">
                <div>
                  <p className="font-medium text-[#171A3D]">
                    Plano {planNames[subscription?.plan || "free"]}
                  </p>
                  <p className="text-sm text-[#736F89]">
                    {subscription?.plan === "free"
                      ? "3 publicações disponíveis"
                      : "Publicações ilimitadas"}
                  </p>
                </div>
                <Button variant="outline" asChild>
                  <a href="/precos">
                    {subscription?.plan === "free" ? "Fazer Upgrade" : "Gerenciar"}
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Segurança */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Segurança
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-[#E5E5E6]/30 rounded-lg">
                <div>
                  <p className="font-medium text-[#171A3D]">Senha</p>
                  <p className="text-sm text-[#736F89]">
                    Última alteração: nunca
                  </p>
                </div>
                <Button variant="outline">Alterar Senha</Button>
              </div>
              <div className="flex items-center justify-between p-4 bg-[#E5E5E6]/30 rounded-lg">
                <div>
                  <p className="font-medium text-[#171A3D]">
                    Autenticação em duas etapas
                  </p>
                  <p className="text-sm text-[#736F89]">
                    Adicione uma camada extra de segurança
                  </p>
                </div>
                <Button variant="outline">Configurar</Button>
              </div>
            </CardContent>
          </Card>

          {/* Notificações */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Notificações
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-[#171A3D]">
                    Notificações por email
                  </p>
                  <p className="text-sm text-[#736F89]">
                    Receba atualizações sobre suas publicações
                  </p>
                </div>
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-5 h-5 rounded border-[#E5E5E6] text-[#263A68] focus:ring-[#263A68]"
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-[#171A3D]">
                    Newsletter
                  </p>
                  <p className="text-sm text-[#736F89]">
                    Dicas e novidades da plataforma
                  </p>
                </div>
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-5 h-5 rounded border-[#E5E5E6] text-[#263A68] focus:ring-[#263A68]"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
