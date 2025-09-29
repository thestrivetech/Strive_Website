'use server';

import { redirect } from 'next/navigation';
import { createServerSupabaseClientWithAuth } from '@/lib/supabase-server';

export async function signOutAction() {
  const supabase = await createServerSupabaseClientWithAuth();

  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error('Failed to sign out');
  }

  redirect('/auth/login');
}