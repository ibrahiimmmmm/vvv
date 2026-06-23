import { NextRequest, NextResponse } from 'next/server';
import { FALLBACK_DOCTORS, normalizeDoctor } from '@/lib/doctors';

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Search in fallback doctors
    const fallback = FALLBACK_DOCTORS.find((d) => d.id === id);
    if (fallback) {
      return NextResponse.json(fallback);
    }

    return NextResponse.json({ error: 'Doctor not found' }, { status: 404 });
  } catch (error) {
    console.error('Doctor fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch doctor' }, { status: 500 });
  }
}
