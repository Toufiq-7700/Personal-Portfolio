import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_API_URL || 'http://localhost:3001';

export async function GET(req: NextRequest) {
  // Try proxying to backend first
  try {
    const backendRes = await fetch(`${BACKEND_URL}/api/admin/auth/me`, {
      headers: { cookie: req.headers.get('cookie') || '' },
    });
    if (backendRes.ok) {
      const data = await backendRes.json();
      return NextResponse.json(data);
    }
  } catch {
    // Backend offline
  }

  // Check dev session
  const session = req.cookies.get('session_id');
  if (session?.value) {
    return NextResponse.json({
      user: { id: 'dev-admin', username: 'admin', email: 'toufiqimroz161055@gmail.com' },
    });
  }

  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}
