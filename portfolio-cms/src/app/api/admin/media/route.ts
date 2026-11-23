import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_API_URL || 'http://localhost:3001';

const sampleMedia = [
  { id: '1', filename: 'P1.webp', original_name: 'AuraLink Preview', url: '/assets/projects/P1.webp', mime_type: 'image/webp', size_bytes: 45000, uploaded_at: new Date().toISOString() },
  { id: '2', filename: 'P2.webp', original_name: 'CompeteX Preview', url: '/assets/projects/P2.webp', mime_type: 'image/webp', size_bytes: 52000, uploaded_at: new Date().toISOString() },
  { id: '3', filename: 'P3.webp', original_name: 'Research Hub Preview', url: '/assets/projects/P3.webp', mime_type: 'image/webp', size_bytes: 48000, uploaded_at: new Date().toISOString() },
  { id: '4', filename: 'P4.webp', original_name: 'SmartWallet Preview', url: '/assets/projects/P4.webp', mime_type: 'image/webp', size_bytes: 51000, uploaded_at: new Date().toISOString() },
];

export async function GET(req: NextRequest) {
  try {
    const backendRes = await fetch(`${BACKEND_URL}/api/admin/media`, {
      headers: { cookie: req.headers.get('cookie') || '' },
    });
    if (backendRes.ok) return NextResponse.json(await backendRes.json());
  } catch {}

  return NextResponse.json({ data: sampleMedia });
}

export async function POST(req: NextRequest) {
  try {
    const backendRes = await fetch(`${BACKEND_URL}/api/admin/media`, {
      method: 'POST',
      headers: { cookie: req.headers.get('cookie') || '' },
      body: req.body,
    });
    if (backendRes.ok) return NextResponse.json(await backendRes.json());
  } catch {}

  return NextResponse.json({ uploaded: [] });
}
