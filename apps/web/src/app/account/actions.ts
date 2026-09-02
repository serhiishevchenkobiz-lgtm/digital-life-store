"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getSupabaseRouteHandler } from "@/lib/supabase";

export async function signOut() {
  const supabase = await getSupabaseRouteHandler();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/");
}