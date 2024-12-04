import Link from 'next/link';

export default function AuthErrorPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="max-w-md w-full p-6 bg-card rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-foreground mb-4">Authentication Error</h1>
        <p className="text-muted-foreground mb-6">
          There was an error during the authentication process. This could be due to:
        </p>
        <ul className="list-disc list-inside text-muted-foreground mb-6">
          <li>Invalid or expired authentication code</li>
          <li>Network connectivity issues</li>
          <li>Server configuration problems</li>
        </ul>
        <div className="flex justify-center">
          <Link
            href="/auth"
            className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
          >
            Try Again
          </Link>
        </div>
      </div>
    </div>
  );
}
