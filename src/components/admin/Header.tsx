"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Bell,
  Search,
  Menu,
  LogOut,
  User,
  Settings,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";

interface HeaderProps {
  profile: {
    id: string;
    email: string;
    full_name: string | null;
    avatar_url: string | null;
    role: string | null;
  };
}

export function AdminHeader({ profile }: HeaderProps) {
  const router = useRouter();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b bg-white px-6">
      {/* Mobile Menu Button */}
      <Button variant="ghost" size="sm" className="lg:hidden">
        <Menu className="w-5 h-5" />
      </Button>

      {/* Search */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#736F89]" />
          <input
            type="text"
            placeholder="Buscar..."
            className="w-full pl-10 pr-4 py-2 text-sm rounded-lg border border-[#E5E5E6] focus:outline-none focus:ring-2 focus:ring-[#263A68] focus:border-transparent"
          />
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        {/* View Site */}
        <Link href="/" target="_blank">
          <Button variant="outline" size="sm">
            <ExternalLink className="w-4 h-4 mr-2" />
            Ver Site
          </Button>
        </Link>

        {/* Notifications */}
        <button className="relative p-2 rounded-lg hover:bg-[#E5E5E6]/50">
          <Bell className="w-5 h-5 text-[#736F89]" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        {/* User Menu */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 p-2 rounded-lg hover:bg-[#E5E5E6]/50"
          >
            <div className="w-8 h-8 bg-[#263A68] rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">
                {profile.full_name?.charAt(0) || profile.email.charAt(0).toUpperCase()}
              </span>
            </div>
          </button>

          {showUserMenu && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setShowUserMenu(false)}
              />
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-[#E5E5E6] py-1 z-20">
                <div className="px-4 py-3 border-b border-[#E5E5E6]">
                  <p className="text-sm font-medium text-[#171A3D]">
                    {profile.full_name || "Usuário"}
                  </p>
                  <p className="text-xs text-[#736F89] truncate">
                    {profile.email}
                  </p>
                </div>
                <Link
                  href="/admin/configuracoes"
                  className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-[#E5E5E6]/50"
                  onClick={() => setShowUserMenu(false)}
                >
                  <Settings className="w-4 h-4" />
                  Configurações
                </Link>
                <Link
                  href="/perfil"
                  className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-[#E5E5E6]/50"
                  onClick={() => setShowUserMenu(false)}
                >
                  <User className="w-4 h-4" />
                  Meu Perfil
                </Link>
                <hr className="my-1" />
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left"
                >
                  <LogOut className="w-4 h-4" />
                  Sair
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
