import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

export default function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("flex items-center", className)}>
      <Image
        src="/chatsuite_nobg.png"
        alt="Logo"
        width={400}
        height={100}
        quality={100}
        className="w-48"
      />
    </Link>
  );
}
