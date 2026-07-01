import { NextResponse } from 'next/server';
import { getTranslations, saveTranslations, getGroupTitles, saveGroupTitles } from '@/lib/data';

export async function GET() {
  return NextResponse.json({
    phrases: getTranslations(),
    groupTitles: getGroupTitles(),
  });
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    if (body.phrases) saveTranslations(body.phrases);
    if (body.groupTitles) saveGroupTitles(body.groupTitles);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}
