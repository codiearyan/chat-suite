import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { type CookieOptions, createServerClient } from "@supabase/ssr";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/";

  console.log("Received auth callback");
  console.log("Code:", code);
  console.log("SUPABASE_URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    console.error("Missing Supabase environment variables");
    return NextResponse.redirect(new URL("/auth/error", request.url));
  }

  if (code) {
    try {
      const cookieStore = cookies();
      const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        {
          cookies: {
            get(name: string) {
              return cookieStore.get(name)?.value;
            },
            set(name: string, value: string, options: CookieOptions) {
              cookieStore.set({ name, value, ...options });
            },
            remove(name: string, options: CookieOptions) {
              cookieStore.delete({ name, ...options });
            },
          },
          auth: {
            flowType: 'pkce',
            autoRefreshToken: true,
            detectSessionInUrl: true,
            persistSession: true
          }
        }
      );

      console.log("Attempting to exchange code for session...");
      const { error } = await supabase.auth.exchangeCodeForSession(code);
      
      if (error) {
        console.error("Error exchanging code for session:", error);
        return NextResponse.redirect(new URL("/auth/error", request.url));
      }

      console.log("Successfully exchanged code for session");
      const redirectUrl = new URL(next, request.url);
      console.log("Redirecting to:", redirectUrl.toString());
      return NextResponse.redirect(redirectUrl);
    } catch (error) {
      console.error("Error in auth callback:", error);
      return NextResponse.redirect(new URL("/auth/error", request.url));
    }
  }

  console.error("No code provided in auth callback");
  return NextResponse.redirect(new URL("/auth/error", request.url));
}
