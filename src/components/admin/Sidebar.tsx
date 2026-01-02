"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  FileText,
  Package,
  ShoppingCart,
  Star,
  Settings,
  Shield,
  BarChart3,
  CreditCard,
  Mail,
  HelpCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/constants";

interface SidebarProps {
  profile: {
    id: string;
    email: string;
    full_name: string | null;
    avatar_url: string | null;
    role: string | null;
  };
}

const menuItems = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
    roles: ["admin", "moderator"],
  },
  {
    title: "Usuários",
    href: "/admin/usuarios",
    icon: Users,
    roles: ["admin"],
  },
  {
    title: "Publicações",
    href: "/admin/publicacoes",
    icon: FileText,
    roles: ["admin", "moderator"],
  },
  {
    title: "Produtos",
    href: "/admin/produtos",
    icon: Package,
    roles: ["admin"],
  },
  {
    title: "Pedidos",
    href: "/admin/pedidos",
    icon: ShoppingCart,
    roles: ["admin"],
  },
  {
    title: "Avaliações",
    href: "/admin/reviews",
    icon: Star,
    roles: ["admin", "moderator"],
  },
  {
    title: "Assinaturas",
    href: "/admin/assinaturas",
    icon: CreditCard,
    roles: ["admin"],
  },
  {
    title: "Analytics",
    href: "/admin/analytics",
    icon: BarChart3,
    roles: ["admin"],
  },
  {
    title: "Convites",
    href: "/admin/convites",
    icon: Mail,
    roles: ["admin", "moderator"],
  },
];

const bottomMenuItems = [
  {
    title: "Configurações",
    href: "/admin/configuracoes",
    icon: Settings,
    roles: ["admin"],
  },
  {
    title: "Voltar ao Site",
    href: "/dashboard",
    icon: HelpCircle,
    roles: ["admin", "moderator"],
  },
];

export function AdminSidebar({ profile }: SidebarProps) {
  const pathname = usePathname();
  const userRole = profile.role || "user";

  const filteredMenuItems = menuItems.filter((item) =>
    item.roles.includes(userRole)
  );

  const filteredBottomItems = bottomMenuItems.filter((item) =>
    item.roles.includes(userRole)
  );

  return (
    <aside className="fixed inset-y-0 left-0 z-50 hidden w-64 flex-col bg-[#1a1a2e] lg:flex">
      {/* Logo */}
      <div className="flex h-16 items-center gap-2 px-6 border-b border-white/10">
        <Link href="/admin" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <span className="text-white font-bold">Admin Panel</span>
        </Link>
      </div>

      {/* Role Badge */}
      <div className="px-6 py-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
            <span className="text-white font-medium">
              {profile.full_name?.charAt(0) || profile.email.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <p className="text-white text-sm font-medium truncate max-w-[140px]">
              {profile.full_name || profile.email}
            </p>
            <span className={`text-xs px-2 py-0.5 rounded-full ${
              userRole === "admin" 
                ? "bg-red-500/20 text-red-400" 
                : "bg-blue-500/20 text-blue-400"
            }`}>
              {userRole === "admin" ? "Administrador" : "Moderador"}
            </span>
          </div>
        </div>
      </div>

      {/* Menu Principal */}
      <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
        {filteredMenuItems.map((item) => {
          const isActive = pathname === item.href || 
            (item.href !== "/admin" && pathname.startsWith(item.href));
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

      {/* Menu Inferior */}
      <div className="px-4 pb-4 space-y-1 border-t border-white/10 pt-4">
        {filteredBottomItems.map((item) => {
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
