import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_API_URL || 'http://localhost:3001';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { username, password } = body;

    // First try proxying to Rust Axum backend if running
    try {
      const backendRes = await fetch(`${BACKEND_URL}/api/admin/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (backendRes.ok) {
        const data = await backendRes.json();
        const res = NextResponse.json(data);
        const setCookie = backendRes.headers.get('set-cookie');
        if (setCookie) res.headers.set('set-cookie', setCookie);
        return res;
      }
    } catch {
      // Backend not running, proceed to local dev fallback
    }

    // Dev Fallback authentication:
    // Allows username: "admin" or "toufiq"
    // Password: "admin" or "admin123" or whatever ADMIN_PASSWORD is set in env
    const validUsername = username === 'admin' || username === 'toufiq';
    const envPassword = process.env.ADMIN_PASSWORD || 'admin123';
    const validPassword = password === 'admin123' || password === 'admin' || password === envPassword;

    if (!validUsername || !validPassword) {
      return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 });
    }

    const res = NextResponse.json({
      user: { id: 'dev-admin', username, email: 'toufiqimroz161055@gmail.com' },
      message: 'Logged in successfully',
    });

    res.cookies.set('session_id', 'dev-session-active', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });

    return res;
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Login error' }, { status: 500 });
  }
}
