export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type UserRole = "user" | "moderator" | "admin";
export type SubscriptionPlan = "free" | "professional" | "enterprise";
export type SubscriptionStatus = "active" | "canceled" | "past_due" | "trialing";

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          avatar_url: string | null;
          role: UserRole;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          avatar_url?: string | null;
          role?: UserRole;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          avatar_url?: string | null;
          role?: UserRole;
          created_at?: string;
          updated_at?: string;
        };
      };
      subscriptions: {
        Row: {
          id: string;
          user_id: string;
          plan: SubscriptionPlan;
          status: SubscriptionStatus;
          current_period_start: string;
          current_period_end: string;
          cancel_at_period_end: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          plan?: SubscriptionPlan;
          status?: SubscriptionStatus;
          current_period_start?: string;
          current_period_end?: string;
          cancel_at_period_end?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          plan?: SubscriptionPlan;
          status?: SubscriptionStatus;
          current_period_start?: string;
          current_period_end?: string;
          cancel_at_period_end?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      publications: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          slug: string;
          description: string | null;
          category: string | null;
          cover_url: string | null;
          file_url: string | null;
          is_public: boolean;
          is_published: boolean;
          views_count: number;
          likes_count: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          slug: string;
          description?: string | null;
          category?: string | null;
          cover_url?: string | null;
          file_url?: string | null;
          is_public?: boolean;
          is_published?: boolean;
          views_count?: number;
          likes_count?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          title?: string;
          slug?: string;
          description?: string | null;
          category?: string | null;
          cover_url?: string | null;
          file_url?: string | null;
          is_public?: boolean;
          is_published?: boolean;
          views_count?: number;
          likes_count?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      user_role: UserRole;
      subscription_plan: SubscriptionPlan;
      subscription_status: SubscriptionStatus;
    };
  };
}

export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
export type Subscription = Database["public"]["Tables"]["subscriptions"]["Row"];
export type Publication = Database["public"]["Tables"]["publications"]["Row"];
