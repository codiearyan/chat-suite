import { createClient } from "@/lib/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";

interface AuthButtonProps {
  classProps?: {
    primaryTextColor?: string;
    bgColor?: string;
    buttonClassName?: string;
    svgClassName?: string;
  };
}

export default async function AuthButton({ classProps }: AuthButtonProps) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const signOut = async () => {
    "use server";

    const supabase = createClient();
    await supabase.auth.signOut();
    return redirect("/");
  };

  const primaryTextColor = classProps?.primaryTextColor || "primary-content";
  const bgColor = classProps?.bgColor || "primary";
  const buttonClassName =
    classProps?.buttonClassName || "hidden sm:flex relative group scale-[.9]";
  const svgClassName = classProps?.svgClassName || "";

  return user ? (
    <div className="flex items-center gap-4">
      <span className="hidden sm:block text-muted-foreground">
        👋🏼 Hey, {user.email}!
      </span>
      <form action={signOut}>
        <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background hover:bg-muted hover:text-muted-foreground h-9 px-4 py-2 border border-border">
          Logout
        </button>
      </form>
    </div>
  ) : (
    <Link
      href="/auth"
      className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-6"
    >
      <span>Login</span>
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
    </Link>
  );
}
