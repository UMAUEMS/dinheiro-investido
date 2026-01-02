"use client";

import { useState } from "react";
import {
  Calendar,
  MapPin,
  Clock,
  Share2,
  Check,
  X,
  HelpCircle,
  Loader2,
  Heart,
  Gift,
  Music,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { submitRSVP } from "@/lib/services/invites";
import { INVITE_TYPE_LABELS } from "@/lib/types/store";
import type { Invite } from "@/lib/services/invites";

interface InviteViewerWrapperProps {
  invite: Invite;
}

export function InviteViewerWrapper({ invite }: InviteViewerWrapperProps) {
  const [showRSVP, setShowRSVP] = useState(false);
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rsvpData, setRsvpData] = useState({
    name: "",
    email: "",
    phone: "",
    guests: 1,
    status: "confirmed" as "confirmed" | "declined" | "maybe",
    message: "",
  });

  const eventType = INVITE_TYPE_LABELS[invite.event_type as keyof typeof INVITE_TYPE_LABELS] || invite.event_type;

  const formatDate = (dateString?: string) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString("pt-BR", {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const formatTime = (dateString?: string) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: invite.title,
          text: `Você está convidado para ${invite.title}!`,
          url,
        });
      } catch (err) {
        console.log("Share cancelled");
      }
    } else {
      await navigator.clipboard.writeText(url);
      alert("Link copiado para a área de transferência!");
    }
  };

  const handleSubmitRSVP = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const { error } = await submitRSVP({
      invite_id: invite.id,
      ...rsvpData,
    });

    setIsSubmitting(false);

    if (!error) {
      setRsvpSubmitted(true);
    } else {
      alert("Erro ao enviar confirmação. Tente novamente.");
    }
  };

  // Escolher ícone baseado no tipo de evento
  const iconMap: Record<string, typeof Sparkles> = {
    casamento: Heart,
    aniversario: Gift,
    formatura: Sparkles,
    "festa-infantil": Gift,
    batizado: Heart,
    "cha-de-bebe": Gift,
    "cha-de-panela": Gift,
    corporativo: Sparkles,
    debutante: Sparkles,
    outro: Sparkles,
  };
  const EventIcon = iconMap[invite.event_type] || Sparkles;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#171A3D] via-[#263A68] to-[#4F3D67]">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative max-w-2xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full mb-4">
            <EventIcon className="w-8 h-8 text-white" />
          </div>
          <p className="text-white/70 uppercase tracking-widest text-sm mb-2">
            {eventType}
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {invite.title}
          </h1>
        </div>

        {/* Main Card */}
        <Card className="bg-white/95 backdrop-blur shadow-2xl">
          <CardContent className="p-8">
            {/* Event Details */}
            <div className="space-y-4 mb-8">
              {invite.event_date && (
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#263A68]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-5 h-5 text-[#263A68]" />
                  </div>
                  <div>
                    <p className="font-medium text-[#171A3D]">
                      {formatDate(invite.event_date)}
                    </p>
                    {formatTime(invite.event_date) && (
                      <p className="text-[#736F89] text-sm flex items-center gap-1 mt-1">
                        <Clock className="w-4 h-4" />
                        {formatTime(invite.event_date)}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {invite.event_location && (
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#263A68]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-[#263A68]" />
                  </div>
                  <div>
                    <p className="font-medium text-[#171A3D]">
                      {invite.event_location}
                    </p>
                    {invite.event_address && (
                      <p className="text-[#736F89] text-sm mt-1">
                        {invite.event_address}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Custom Message */}
            {invite.custom_data?.message && (
              <div className="border-t border-b border-[#E5E5E6] py-6 mb-8">
                <p className="text-[#171A3D] text-center italic">
                  "{invite.custom_data.message}"
                </p>
              </div>
            )}

            {/* RSVP Section */}
            {invite.rsvp_enabled && !rsvpSubmitted && (
              <div className="text-center">
                {!showRSVP ? (
                  <div>
                    <p className="text-[#736F89] mb-4">
                      Confirme sua presença
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <Button
                        onClick={() => {
                          setRsvpData((prev) => ({ ...prev, status: "confirmed" }));
                          setShowRSVP(true);
                        }}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <Check className="w-4 h-4 mr-2" />
                        Vou comparecer
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setRsvpData((prev) => ({ ...prev, status: "maybe" }));
                          setShowRSVP(true);
                        }}
                      >
                        <HelpCircle className="w-4 h-4 mr-2" />
                        Talvez
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setRsvpData((prev) => ({ ...prev, status: "declined" }));
                          setShowRSVP(true);
                        }}
                        className="text-red-600 border-red-200 hover:bg-red-50"
                      >
                        <X className="w-4 h-4 mr-2" />
                        Não poderei ir
                      </Button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmitRSVP} className="space-y-4 text-left">
                    <div>
                      <label className="block text-sm font-medium text-[#171A3D] mb-1">
                        Seu nome *
                      </label>
                      <input
                        type="text"
                        required
                        value={rsvpData.name}
                        onChange={(e) => setRsvpData((prev) => ({ ...prev, name: e.target.value }))}
                        className="w-full px-4 py-2 rounded-lg border border-[#E5E5E6] focus:outline-none focus:ring-2 focus:ring-[#263A68]"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-[#171A3D] mb-1">
                          Email
                        </label>
                        <input
                          type="email"
                          value={rsvpData.email}
                          onChange={(e) => setRsvpData((prev) => ({ ...prev, email: e.target.value }))}
                          className="w-full px-4 py-2 rounded-lg border border-[#E5E5E6] focus:outline-none focus:ring-2 focus:ring-[#263A68]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#171A3D] mb-1">
                          Telefone
                        </label>
                        <input
                          type="tel"
                          value={rsvpData.phone}
                          onChange={(e) => setRsvpData((prev) => ({ ...prev, phone: e.target.value }))}
                          className="w-full px-4 py-2 rounded-lg border border-[#E5E5E6] focus:outline-none focus:ring-2 focus:ring-[#263A68]"
                        />
                      </div>
                    </div>
                    {rsvpData.status === "confirmed" && (
                      <div>
                        <label className="block text-sm font-medium text-[#171A3D] mb-1">
                          Quantas pessoas (incluindo você)
                        </label>
                        <select
                          value={rsvpData.guests}
                          onChange={(e) => setRsvpData((prev) => ({ ...prev, guests: parseInt(e.target.value) }))}
                          className="w-full px-4 py-2 rounded-lg border border-[#E5E5E6] focus:outline-none focus:ring-2 focus:ring-[#263A68]"
                        >
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                            <option key={n} value={n}>{n} {n === 1 ? "pessoa" : "pessoas"}</option>
                          ))}
                        </select>
                      </div>
                    )}
                    <div>
                      <label className="block text-sm font-medium text-[#171A3D] mb-1">
                        Mensagem (opcional)
                      </label>
                      <textarea
                        value={rsvpData.message}
                        onChange={(e) => setRsvpData((prev) => ({ ...prev, message: e.target.value }))}
                        rows={3}
                        className="w-full px-4 py-2 rounded-lg border border-[#E5E5E6] focus:outline-none focus:ring-2 focus:ring-[#263A68] resize-none"
                      />
                    </div>
                    <div className="flex gap-3">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setShowRSVP(false)}
                        className="flex-1"
                      >
                        Voltar
                      </Button>
                      <Button type="submit" className="flex-1" disabled={isSubmitting}>
                        {isSubmitting ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          "Enviar confirmação"
                        )}
                      </Button>
                    </div>
                  </form>
                )}
              </div>
            )}

            {/* RSVP Success */}
            {rsvpSubmitted && (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-[#171A3D] mb-2">
                  Confirmação enviada!
                </h3>
                <p className="text-[#736F89]">
                  {rsvpData.status === "confirmed"
                    ? "Obrigado por confirmar sua presença. Esperamos você!"
                    : rsvpData.status === "maybe"
                    ? "Obrigado por responder. Esperamos que possa comparecer!"
                    : "Obrigado por nos avisar. Sentiremos sua falta!"}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Share Button */}
        <div className="text-center mt-8">
          <Button
            variant="outline"
            onClick={handleShare}
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            <Share2 className="w-4 h-4 mr-2" />
            Compartilhar convite
          </Button>
        </div>

        {/* Footer */}
        <div className="text-center mt-12">
          <p className="text-white/50 text-sm">
            Criado com{" "}
            <a href="/" className="text-white/70 hover:text-white underline">
              Dinheiro Investido
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
