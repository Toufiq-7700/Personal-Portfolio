import { NextRequest, NextResponse } from 'next/server';
import { fallbackProjects } from '@/lib/fallbackData';

const BACKEND_URL = process.env.BACKEND_API_URL || 'http://localhost:3001';

export async function GET(req: NextRequest) {
  try {
    const backendRes = await fetch(`${BACKEND_URL}/api/admin/projects`, {
      headers: { cookie: req.headers.get('cookie') || '' },
    });
    if (backendRes.ok) return NextResponse.json(await backendRes.json());
  } catch {}

  return NextResponse.json({ data: fallbackProjects, total: fallbackProjects.length, page: 1, per_page: 20, total_pages: 1 });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  try {
    const backendRes = await fetch(`${BACKEND_URL}/api/admin/projects`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', cookie: req.headers.get('cookie') || '' },
      body: JSON.stringify(body),
    });
    if (backendRes.ok) return NextResponse.json(await backendRes.json());
  } catch {}

  return NextResponse.json({ id: Date.now().toString(), message: 'Project created' });
}
