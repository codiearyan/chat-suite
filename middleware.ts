import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/lib/utils/supabase/middleware";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if this is an auth callback
  if (pathname === "/" && request.nextUrl.searchParams.has("code")) {
    // Redirect to the confirm route with the code
    const code = request.nextUrl.searchParams.get("code");
    const redirectUrl = new URL("/auth/confirm", request.url);
    redirectUrl.searchParams.set("code", code!);
    return NextResponse.redirect(redirectUrl);
  }

  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
