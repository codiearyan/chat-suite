"use server";

import { createClient } from "@/lib/utils/supabase/server";
import { redirect } from "next/navigation";

export async function signOut() {
  const supabase = createClient();
  await supabase.auth.signOut();
  return redirect("/");
}

export async function getUser() {
  const supabase = createClient();
  return await supabase.auth.getUser();
} 