"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { User } from "@supabase/supabase-js";
import { signOut } from "@/lib/actions/auth";

interface AuthButtonProps {
  user: User | null;
  classProps?: {
    container?: string;
    emailText?: string;
    button?: string;
    loginButton?: string;
    showEmail?: boolean;
    showLoginIcon?: boolean;
    showLogoutIcon?: boolean;
    variant?: "default" | "ghost" | "outline";
  };
}

export default function AuthButton({ user, classProps }: AuthButtonProps) {
  return user ? (
    <div className={`flex flex-col gap-2 ${classProps?.container || ""}`}>
      {classProps?.showEmail && (
        <span
          className={`text-sm text-muted-foreground/70 ${
            classProps?.emailText || ""
          }`}
        >
          🏼 {user.email}
        </span>
      )}
      <form action={signOut}>
        <Button
          variant={classProps?.variant || "default"}
          className={classProps?.button || "w-full flex items-center gap-2"}
          type="submit"
        >
          {classProps?.showLogoutIcon && <ArrowLeft className="h-4 w-4" />}
          <span>Logout</span>
        </Button>
      </form>
    </div>
  ) : (
    <Link
      href="/auth"
      className={`inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-6 ${
        classProps?.loginButton || ""
      }`}
    >
      <span>Login</span>
      {classProps?.showLoginIcon !== false && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
          />
        </svg>
      )}
    </Link>
  );
}
