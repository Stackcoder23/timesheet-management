import { NextResponse } from 'next/server';
import { users } from '@/lib/mock-data';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    const user = users.find((u) => u.email === email && u.password === password);

    if (!user) {
      return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
    }

    const session = JSON.stringify({ id: user.id, email: user.email, name: user.name });

    const response = NextResponse.json({ success: true, message: 'Login successful' });
    response.cookies.set('session', session, {
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });

    return response;
  } catch {
    return NextResponse.json({ message: 'An error occurred' }, { status: 500 });
  }
}
