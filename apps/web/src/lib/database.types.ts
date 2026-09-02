/**
 * Hand-authored minimal database types that mirror supabase/migrations/0001_init.sql.
 *
 * Once a real Supabase project exists, regenerate with:
 *   supabase gen types typescript --project-id <id> > src/lib/database.types.ts
 */

export type Json = string | number | boolean | null | { [k: string]: Json } | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          display_name: string | null;
          locale: string;
          marketing_opt_in: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          display_name?: string | null;
          locale?: string;
          marketing_opt_in?: boolean;
        };
        Update: Partial<Database["public"]["Tables"]["profiles"]["Row"]>;
      };
      user_roles: {
        Row: {
          user_id: string;
          role: "owner" | "admin" | "editor" | "customer";
          granted_at: string;
        };
        Insert: { user_id: string; role: "owner" | "admin" | "editor" | "customer" };
        Update: Partial<Database["public"]["Tables"]["user_roles"]["Row"]>;
      };
      categories: {
        Row: { id: string; slug: string; name_en: string; created_at: string };
        Insert: { slug: string; name_en: string };
        Update: Partial<Database["public"]["Tables"]["categories"]["Row"]>;
      };
      books: {
        Row: {
          id: string;
          slug: string;
          category_id: string | null;
          isbn: string | null;
          pages: number | null;
          reading_minutes: number | null;
          status: "draft" | "review" | "published" | "archived";
          published_at: string | null;
          price_cents: number;
          audio_price_cents: number | null;
          bundle_price_cents: number | null;
          cover: Json;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["books"]["Row"], "id" | "created_at" | "updated_at">;
        Update: Partial<Database["public"]["Tables"]["books"]["Row"]>;
      };
      book_translations: {
        Row: {
          id: string;
          book_id: string;
          locale: string;
          title: string;
          subtitle: string | null;
          short_description: string | null;
          long_description: string | null;
        };
        Insert: Omit<Database["public"]["Tables"]["book_translations"]["Row"], "id">;
        Update: Partial<Database["public"]["Tables"]["book_translations"]["Row"]>;
      };
      products: {
        Row: {
          id: string;
          book_id: string;
          format: "ebook" | "audio" | "bundle" | "worksheet";
          price_cents: number;
          private_storage_path: string;
          is_active: boolean;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["products"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["products"]["Row"]>;
      };
      orders: {
        Row: {
          id: string;
          user_id: string | null;
          email: string;
          status: "pending" | "paid" | "refunded" | "failed";
          subtotal_cents: number;
          tax_cents: number;
          total_cents: number;
          currency: string;
          provider: string | null;
          provider_ref: string | null;
          created_at: string;
          paid_at: string | null;
        };
        Insert: Omit<Database["public"]["Tables"]["orders"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["orders"]["Row"]>;
      };
      order_items: {
        Row: {
          id: string;
          order_id: string;
          product_id: string;
          unit_price_cents: number;
          quantity: number;
        };
        Insert: Omit<Database["public"]["Tables"]["order_items"]["Row"], "id">;
        Update: Partial<Database["public"]["Tables"]["order_items"]["Row"]>;
      };
      purchases: {
        Row: {
          id: string;
          user_id: string;
          product_id: string;
          order_id: string | null;
          granted_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["purchases"]["Row"], "id" | "granted_at">;
        Update: Partial<Database["public"]["Tables"]["purchases"]["Row"]>;
      };
      download_log: {
        Row: {
          id: string;
          user_id: string;
          product_id: string;
          signed_at: string;
          ip: string | null;
          user_agent: string | null;
        };
        Insert: Omit<Database["public"]["Tables"]["download_log"]["Row"], "id" | "signed_at">;
        Update: Partial<Database["public"]["Tables"]["download_log"]["Row"]>;
      };
      articles: {
        Row: {
          id: string;
          slug: string;
          status: "draft" | "published" | "archived";
          published_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["articles"]["Row"], "id" | "created_at" | "updated_at">;
        Update: Partial<Database["public"]["Tables"]["articles"]["Row"]>;
      };
      article_translations: {
        Row: {
          id: string;
          article_id: string;
          locale: string;
          title: string;
          excerpt: string | null;
          body_markdown: string | null;
        };
        Insert: Omit<Database["public"]["Tables"]["article_translations"]["Row"], "id">;
        Update: Partial<Database["public"]["Tables"]["article_translations"]["Row"]>;
      };
    };
    Views: Record<string, never>;
    Functions: {
      is_staff: { Args: Record<string, never>; Returns: boolean };
    };
    Enums: Record<string, never>;
  };
}