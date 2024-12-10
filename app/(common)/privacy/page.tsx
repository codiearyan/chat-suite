import { Metadata } from "next";
import ReactMarkdown from "react-markdown";
import fs from "fs";
import path from "path";

export const metadata: Metadata = {
  title: "Privacy Policy | Pivot With AI",
  description: "Privacy policy for using Pivot With AI services",
};

function getPrivacyContent() {
  const filePath = path.join(process.cwd(), "app/(common)/privacy/content.md");
  const content = fs.readFileSync(filePath, "utf8");
  return content;
}

export default function PrivacyPage() {
  const content = getPrivacyContent();

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8 md:py-12 lg:py-16">
        <article className="prose prose-gray dark:prose-invert mx-auto max-w-4xl">
          <ReactMarkdown
            components={{
              h1: ({ children }) => (
                <h1 className="mb-8 text-4xl font-bold tracking-tight">
                  {children}
                </h1>
              ),
              h2: ({ children }) => (
                <h2 className="mt-10 mb-4 text-2xl font-semibold tracking-tight">
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="mt-8 mb-3 text-xl font-semibold tracking-tight">
                  {children}
                </h3>
              ),
              p: ({ children }) => (
                <p className="mb-4 leading-7 text-muted-foreground">
                  {children}
                </p>
              ),
              ul: ({ children }) => (
                <ul className="my-6 ml-6 list-disc [&>li]:mt-2">{children}</ul>
              ),
              ol: ({ children }) => (
                <ol className="my-6 ml-6 list-decimal [&>li]:mt-2">
                  {children}
                </ol>
              ),
              li: ({ children }) => (
                <li className="text-muted-foreground">{children}</li>
              ),
              a: ({ href, children }) => (
                <a
                  href={href}
                  className="font-medium text-primary underline underline-offset-4"
                >
                  {children}
                </a>
              ),
            }}
          >
            {content}
          </ReactMarkdown>
        </article>
      </main>
    </div>
  );
}
