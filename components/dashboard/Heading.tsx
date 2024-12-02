import React from "react";

import { Outfit } from "next/font/google";
import { twMerge } from "tailwind-merge";

// Replace the local font with Outfit from Google Fonts
const outfit = Outfit({
  subsets: ["latin"],
  weight: ["600"], // SemiBold weight to match the previous font
  display: "swap",
});

export const Heading = ({
  className,
  children,
  as: Tag = "p",
}: {
  className?: string;
  children: React.ReactNode;
  as?: keyof JSX.IntrinsicElements;
}) => {
  return (
    <Tag
      className={twMerge(
        outfit.className,
        "text-base md:text-xl lg:text-4xl font-semibold text-[#505050]",
        className
      )}
    >
      {children}
    </Tag>
  );
};
