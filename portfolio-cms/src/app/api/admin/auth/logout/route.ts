import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_API_URL || 'http://localhost:3001';

export async function POST(req: NextRequest) {
  try {
    await fetch(`${BACKEND_URL}/api/admin/auth/logout`, {
      method: 'POST',
      headers: { cookie: req.headers.get('cookie') || '' },
    }).catch(() => {});
  } catch {}

  const res = NextResponse.json({ message: 'Logged out' });
  res.cookies.set('session_id', '', { path: '/', maxAge: 0 });
  return res;
}
