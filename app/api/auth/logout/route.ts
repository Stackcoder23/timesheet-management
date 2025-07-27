import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ success: true, message: 'Logout successful' });
  response.cookies.set('session', '', {
    secure: process.env.NODE_ENV === 'production',
    maxAge: -1,
    path: '/',
  });
  return response;
}
