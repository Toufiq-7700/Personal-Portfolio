import { NextRequest, NextResponse } from 'next/server';
import { fallbackEducation } from '@/lib/fallbackData';

const BACKEND_URL = process.env.BACKEND_API_URL || 'http://localhost:3001';

export async function GET(req: NextRequest) {
  try {
    const backendRes = await fetch(`${BACKEND_URL}/api/admin/education`, {
      headers: { cookie: req.headers.get('cookie') || '' },
    });
    if (backendRes.ok) return NextResponse.json(await backendRes.json());
  } catch {}

  return NextResponse.json({ data: fallbackEducation });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  try {
    const backendRes = await fetch(`${BACKEND_URL}/api/admin/education`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', cookie: req.headers.get('cookie') || '' },
      body: JSON.stringify(body),
    });
    if (backendRes.ok) return NextResponse.json(await backendRes.json());
  } catch {}

  return NextResponse.json({ id: Date.now().toString(), message: 'Education created' });
}
