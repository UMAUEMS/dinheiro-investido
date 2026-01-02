"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  FolderOpen,
  ShoppingBag,
  BarChart3,
  Settings,
  HelpCircle,
  Crown,
  Plus,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Profile, Subscription } from "@/lib/supabase/types";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/constants";

interface SidebarProps {
  profile: Profile | null;
  subscription: Subscription | null;
}

const menuItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Minhas Publicações",
    href: "/dashboard/publicacoes",
    icon: FileText,
  },
  {
    title: "Modelos",
    href: "/dashboard/modelos",
    icon: FolderOpen,
  },
  {
    title: "Loja",
    href: "/dashboard/loja",
    icon: ShoppingBag,
  },
  {
    title: "Analytics",
    href: "/dashboard/analytics",
    icon: BarChart3,
  },
];

const bottomMenuItems = [
  {
    title: "Configurações",
    href: "/dashboard/configuracoes",
    icon: Settings,
  },
  {
    title: "Ajuda",
    href: "/ajuda",
    icon: HelpCircle,
  },
];

export function DashboardSidebar({ profile, subscription }: SidebarProps) {
  const pathname = usePathname();
  const isPro = subscription?.plan !== "free";

  return (
    <aside className="fixed inset-y-0 left-0 z-50 hidden w-64 flex-col bg-[#171A3D] lg:flex">
      {/* Logo */}
      <div className="flex h-16 items-center gap-2 px-6 border-b border-white/10">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
            <span className="text-[#171A3D] font-bold text-sm">DI</span>
          </div>
          <span className="text-white font-bold">{siteConfig.name}</span>
        </Link>
      </div>

      {/* Botão Nova Publicação */}
      <div className="p-4">
        <Link href="/dashboard/publicacoes/nova">
          <Button className="w-full bg-white text-[#171A3D] hover:bg-white/90">
            <Plus className="w-4 h-4 mr-2" />
            Nova Publicação
          </Button>
        </Link>
      </div>

      {/* Menu Principal */}
      <nav className="flex-1 px-4 space-y-1">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
                isActive
                  ? "bg-white/10 text-white"
                  : "text-white/70 hover:bg-white/5 hover:text-white"
              )}
            >
              <item.icon className="w-5 h-5" />
              {item.title}
            </Link>
          );
        })}
      </nav>

      {/* Upgrade Card */}
      {!isPro && (
        <div className="mx-4 mb-4 p-4 bg-gradient-to-br from-[#263A68] to-[#4F3D67] rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Crown className="w-5 h-5 text-yellow-400" />
            <span className="text-white font-medium">Upgrade Pro</span>
          </div>
          <p className="text-white/70 text-sm mb-3">
            Desbloqueie publicações ilimitadas e recursos avançados.
          </p>
          <Link href="/precos">
            <Button
              size="sm"
              className="w-full bg-white text-[#171A3D] hover:bg-white/90"
            >
              Ver Planos
            </Button>
          </Link>
        </div>
      )}

      {/* Menu Inferior */}
      <div className="px-4 pb-4 space-y-1 border-t border-white/10 pt-4">
        {bottomMenuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
                isActive
                  ? "bg-white/10 text-white"
                  : "text-white/70 hover:bg-white/5 hover:text-white"
              )}
            >
              <item.icon className="w-5 h-5" />
              {item.title}
            </Link>
          );
        })}
      </div>
    </aside>
  );
}
