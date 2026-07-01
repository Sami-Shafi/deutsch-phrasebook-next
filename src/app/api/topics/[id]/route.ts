import { NextResponse } from 'next/server';
import { getTopics, saveTopics, getTopic } from '@/lib/data';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const topic = getTopic(Number(id));
  if (!topic) return NextResponse.json({ error: 'Topic not found' }, { status: 404 });
  return NextResponse.json(topic);
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const body = await request.json();
    const topics = getTopics();
    const index = topics.findIndex(t => t.id === Number(id));
    if (index === -1) return NextResponse.json({ error: 'Topic not found' }, { status: 404 });
    topics[index] = { ...topics[index], ...body, id: Number(id) };
    saveTopics(topics);
    return NextResponse.json(topics[index]);
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const topics = getTopics();
  const index = topics.findIndex(t => t.id === Number(id));
  if (index === -1) return NextResponse.json({ error: 'Topic not found' }, { status: 404 });
  topics.splice(index, 1);
  saveTopics(topics);
  return NextResponse.json({ success: true });
}
