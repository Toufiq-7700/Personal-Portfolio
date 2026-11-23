import { NextResponse } from 'next/server';
import { fallbackProjects, fallbackSkills, fallbackAchievements, fallbackEducation, fallbackExperience, fallbackResearch } from '@/lib/fallbackData';

const BACKEND_URL = process.env.BACKEND_API_URL || 'http://localhost:3001';

export async function GET() {
  try {
    const backendRes = await fetch(`${BACKEND_URL}/api/admin/stats`);
    if (backendRes.ok) return NextResponse.json(await backendRes.json());
  } catch {}

  return NextResponse.json({
    projects: { total: fallbackProjects.length, published: fallbackProjects.filter(p => p.status === 'published').length },
    skills: fallbackSkills.length,
    achievements: fallbackAchievements.length,
    education: fallbackEducation.length,
    experience: fallbackExperience.length,
    research: fallbackResearch.length,
    media: 4,
  });
}
