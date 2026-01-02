import { Metadata } from "next";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { InviteViewerWrapper } from "./InviteViewerWrapper";
import { INVITE_TYPE_LABELS } from "@/lib/types/store";
import type { Invite } from "@/lib/services/invites";

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getInvite(slug: string): Promise<Invite | null> {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from("invites")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (error || !data) {
    return null;
  }

  // Incrementar visualizações
  await supabase
    .from("invites")
    .update({ views: (data.views || 0) + 1 })
    .eq("id", data.id);

  return data;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const invite = await getInvite(slug);

  if (!invite) {
    return {
      title: "Convite não encontrado",
    };
  }

  const eventType = INVITE_TYPE_LABELS[invite.event_type as keyof typeof INVITE_TYPE_LABELS] || invite.event_type;
  const description = `Você está convidado para ${invite.title}. ${eventType}${invite.event_date ? ` - ${new Date(invite.event_date).toLocaleDateString("pt-BR")}` : ""}`;

  return {
    title: `${invite.title} | Convite Virtual`,
    description,
    openGraph: {
      title: invite.title,
      description,
      type: "website",
    },
  };
}

export default async function ConvitePage({ params }: PageProps) {
  const { slug } = await params;
  const invite = await getInvite(slug);

  if (!invite) {
    notFound();
  }

  return <InviteViewerWrapper invite={invite} />;
}
