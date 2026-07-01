import { NextResponse } from 'next/server';
import { getTopics, saveTopics } from '@/lib/data';
import type { Topic } from '@/types';

export async function GET() {
  const topics = getTopics();
  return NextResponse.json(topics);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const topics = getTopics();
    const maxId = topics.reduce((max, t) => Math.max(max, t.id), 0);
    const newTopic: Topic = { id: maxId + 1, ...body };
    topics.push(newTopic);
    saveTopics(topics);
    return NextResponse.json(newTopic, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}
