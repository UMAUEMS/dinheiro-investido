import { redirect } from "next/navigation";
import { getUserWithProfile } from "@/lib/supabase/get-user";
import { DashboardSidebar } from "@/components/dashboard/Sidebar";
import { DashboardHeader } from "@/components/dashboard/Header";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, profile, subscription } = await getUserWithProfile();

  if (!user) {
    redirect("/auth/login");
  }

  return (
    <div className="min-h-screen bg-[#E5E5E6]/30">
      {/* Sidebar */}
      <DashboardSidebar profile={profile} subscription={subscription} />

      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Header */}
        <DashboardHeader user={user} profile={profile} />

        {/* Page Content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
