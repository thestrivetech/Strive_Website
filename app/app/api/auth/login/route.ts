import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = loginSchema.parse(body);

    // Create Supabase client
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return request.cookies.get(name)?.value;
          },
          set(_name: string, _value: string, _options: unknown) {
            // We'll set cookies in the response
          },
          remove(_name: string, _options: unknown) {
            // We'll remove cookies in the response
          },
        },
      }
    );

    // Attempt to sign in
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 401 }
      );
    }

    // Check if user exists in our database
    let user = await prisma.user.findUnique({
      where: { email },
    });

    // If user doesn't exist in our database, create them
    if (!user && data.user) {
      user = await prisma.user.create({
        data: {
          email: data.user.email!,
          name: data.user.user_metadata?.full_name || email.split('@')[0],
          avatarUrl: data.user.user_metadata?.avatar_url,
        },
      });
    }

    // Create response with session cookies
    const response = NextResponse.json(
      {
        user: {
          id: user?.id,
          email: user?.email,
          name: user?.name,
          role: user?.role,
        },
        session: data.session,
      },
      { status: 200 }
    );

    // Set auth cookies
    if (data.session) {
      const { access_token, refresh_token } = data.session;

      response.cookies.set({
        name: 'sb-access-token',
        value: access_token,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60, // 1 hour
        path: '/',
      });

      response.cookies.set({
        name: 'sb-refresh-token',
        value: refresh_token,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/',
      });
    }

    return response;
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data' },
        { status: 400 }
      );
    }

    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}