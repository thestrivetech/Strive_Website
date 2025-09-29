import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { cache } from 'react';
import { prisma } from '@/lib/prisma';
import { AUTH_ROUTES, UserRole } from './constants';

export const createSupabaseServerClient = async () => {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: unknown) {
          cookieStore.set({ name, value, ...(options as Record<string, unknown>) });
        },
        remove(name: string, options: unknown) {
          cookieStore.set({ name, value: '', ...(options as Record<string, unknown>) });
        },
      },
    }
  );
};

export const getSession = cache(async () => {
  const supabase = await createSupabaseServerClient();

  try {
    const { data: { session }, error } = await supabase.auth.getSession();

    if (error) {
      console.error('Error getting session:', error);
      return null;
    }

    return session;
  } catch (error) {
    console.error('Error in getSession:', error);
    return null;
  }
});

export const getCurrentUser = cache(async () => {
  const session = await getSession();

  if (!session?.user) {
    return null;
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email!,
      },
      include: {
        organizationMembers: {
          include: {
            organization: true,
          },
        },
      },
    });

    return user;
  } catch (error) {
    console.error('Error fetching user from database:', error);
    return null;
  }
});

export const requireAuth = async () => {
  const session = await getSession();

  if (!session) {
    redirect(AUTH_ROUTES.LOGIN);
  }

  return session;
};

export const requireRole = async (requiredRole: UserRole) => {
  const user = await getCurrentUser();

  if (!user) {
    redirect(AUTH_ROUTES.LOGIN);
  }

  if (user.role !== requiredRole && user.role !== 'ADMIN') {
    redirect('/unauthorized');
  }

  return user;
};

export const requireOrganization = async () => {
  const user = await getCurrentUser();

  if (!user) {
    redirect(AUTH_ROUTES.LOGIN);
  }

  if (!user.organizationMembers || user.organizationMembers.length === 0) {
    redirect('/onboarding/organization');
  }

  return user.organizationMembers[0].organization;
};

export async function signOut() {
  const supabase = await createSupabaseServerClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error('Error signing out:', error);
    throw error;
  }

  redirect(AUTH_ROUTES.LOGIN);
}

export async function signIn(email: string, password: string) {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw error;
  }

  // Check if user exists in our database
  const user = await prisma.user.findUnique({
    where: { email },
  });

  // If user doesn't exist in our database, create them
  if (!user && data.user) {
    await prisma.user.create({
      data: {
        email: data.user.email!,
        name: data.user.user_metadata?.full_name || email.split('@')[0],
        avatarUrl: data.user.user_metadata?.avatar_url,
      },
    });
  }

  return data;
}

export async function signUp(email: string, password: string, name?: string) {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: name,
      },
    },
  });

  if (error) {
    throw error;
  }

  // Create user in our database
  if (data.user) {
    await prisma.user.create({
      data: {
        email: data.user.email!,
        name: name || email.split('@')[0],
        avatarUrl: data.user.user_metadata?.avatar_url,
      },
    });
  }

  return data;
}