import { NextRequest, NextResponse } from 'next/server';
import { FALLBACK_DOCTORS, normalizeDoctor } from '@/lib/doctors';

export async function GET() {
  try {
    // Return fallback doctors for now
    return NextResponse.json(FALLBACK_DOCTORS);
  } catch (error) {
    console.error('Doctors fetch error:', error);
    return NextResponse.json(FALLBACK_DOCTORS);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, specialization, email, phone, experience, consultationFee, location, hospital } =
      body;

    // For now, just return a mock doctor
    const newDoctor = normalizeDoctor({
      id: `doctor_${Date.now()}`,
      name,
      specialization,
      experience: experience ? Number(experience) : 5,
      rating: 4.5,
      consultationFee: consultationFee ? Number(consultationFee) : 2000,
      consultationCurrency: 'PKR',
      location: location || 'Lahore, Pakistan',
      hospital: hospital || 'Medical Center',
      phone: phone || '+92-3XX-XXXXXX',
      email: email || '',
      source: 'admin',
      imageUrl: `https://api.dicebear.com/7.x/personas/png?seed=${name.replace(/\s/g, '-')}&backgroundColor=d1fae5,99f6e4,ccfbf1&size=256`,
      profileUrl: '',
    });

    return NextResponse.json(newDoctor, { status: 201 });
  } catch (error) {
    console.error('Doctor create error:', error);
    return NextResponse.json({ error: 'Failed to create doctor' }, { status: 500 });
  }
}
