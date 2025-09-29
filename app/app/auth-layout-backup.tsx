import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth/auth-helpers';

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  // If user is already logged in, redirect to dashboard
  if (session) {
    redirect('/dashboard');
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <div className="flex min-h-screen flex-col items-center justify-center p-4">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-primary">Strive Tech</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Enterprise B2B SaaS Platform
            </p>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}