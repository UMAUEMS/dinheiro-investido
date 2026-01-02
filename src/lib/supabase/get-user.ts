import { createClient } from "./server";
import { Profile, Subscription } from "./types";

export async function getUser() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
}

export async function getUserWithProfile() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { user: null, profile: null, subscription: null };
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  const { data: subscription } = await supabase
    .from("subscriptions")
    .select("*")
    .eq("user_id", user.id)
    .eq("status", "active")
    .single();

  return {
    user,
    profile: profile as Profile | null,
    subscription: subscription as Subscription | null,
  };
}

export async function isAuthenticated() {
  const user = await getUser();
  return !!user;
}

export async function requireAuth() {
  const user = await getUser();
  if (!user) {
    throw new Error("Unauthorized");
  }
  return user;
}
