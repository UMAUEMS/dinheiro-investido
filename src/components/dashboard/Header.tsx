"use client";

import { useState } from "react";
import Link from "next/link";
import { User } from "@supabase/supabase-js";
import {
  Bell,
  Search,
  Menu,
  X,
  User as UserIcon,
  Settings,
  LogOut,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Profile } from "@/lib/supabase/types";
import { logout } from "@/app/auth/actions";

interface HeaderProps {
  user: User;
  profile: Profile | null;
}

export function DashboardHeader({ user, profile }: HeaderProps) {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const displayName = profile?.full_name || user.email?.split("@")[0] || "Usuário";
  const initials = displayName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-[#E5E5E6]">
      <div className="flex h-16 items-center justify-between px-6">
        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2 -ml-2"
          onClick={() => setShowMobileMenu(!showMobileMenu)}
        >
          {showMobileMenu ? (
            <X className="w-6 h-6 text-[#171A3D]" />
          ) : (
            <Menu className="w-6 h-6 text-[#171A3D]" />
          )}
        </button>

        {/* Search */}
        <div className="hidden md:flex flex-1 max-w-md">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#736F89]" />
            <input
              type="text"
              placeholder="Buscar publicações..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-[#E5E5E6] bg-[#E5E5E6]/30 focus:outline-none focus:ring-2 focus:ring-[#263A68] focus:border-transparent text-sm"
            />
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <button className="relative p-2 rounded-lg hover:bg-[#E5E5E6]/50 transition-colors">
            <Bell className="w-5 h-5 text-[#736F89]" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          </button>

          {/* User Menu */}
          <div className="relative">
            <button
              className="flex items-center gap-2 p-2 rounded-lg hover:bg-[#E5E5E6]/50 transition-colors"
              onClick={() => setShowUserMenu(!showUserMenu)}
            >
              {profile?.avatar_url ? (
                <img
                  src={profile.avatar_url}
                  alt={displayName}
                  className="w-8 h-8 rounded-full object-cover"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-[#263A68] flex items-center justify-center">
                  <span className="text-white text-sm font-medium">
                    {initials}
                  </span>
                </div>
              )}
              <span className="hidden md:block text-sm font-medium text-[#171A3D]">
                {displayName}
              </span>
              <ChevronDown className="w-4 h-4 text-[#736F89]" />
            </button>

            {/* Dropdown Menu */}
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-[#E5E5E6] py-2">
                <div className="px-4 py-2 border-b border-[#E5E5E6]">
                  <p className="text-sm font-medium text-[#171A3D]">
                    {displayName}
                  </p>
                  <p className="text-xs text-[#736F89]">{user.email}</p>
                </div>
                <Link
                  href="/perfil"
                  className="flex items-center gap-2 px-4 py-2 text-sm text-[#171A3D] hover:bg-[#E5E5E6]/50"
                  onClick={() => setShowUserMenu(false)}
                >
                  <UserIcon className="w-4 h-4" />
                  Meu Perfil
                </Link>
                <Link
                  href="/dashboard/configuracoes"
                  className="flex items-center gap-2 px-4 py-2 text-sm text-[#171A3D] hover:bg-[#E5E5E6]/50"
                  onClick={() => setShowUserMenu(false)}
                >
                  <Settings className="w-4 h-4" />
                  Configurações
                </Link>
                <div className="border-t border-[#E5E5E6] mt-2 pt-2">
                  <form action={logout}>
                    <button
                      type="submit"
                      className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full"
                    >
                      <LogOut className="w-4 h-4" />
                      Sair
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
