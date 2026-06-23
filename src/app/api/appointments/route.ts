import { NextRequest, NextResponse } from 'next/server';

// In-memory storage for appointments (will reset on server restart)
const appointments: any[] = [];

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, doctor, doctorName, date, time, reason } = body;

    if (!name || !email || !date || !time) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const appointment = {
      id: `apt_${Date.now()}`,
      patientName: name,
      patientEmail: email,
      patientPhone: phone,
      doctorId: doctor,
      doctorName: doctorName || doctor,
      appointmentDate: new Date(date),
      timeSlot: time,
      reason: reason || null,
      status: 'pending',
      createdAt: new Date(),
    };

    appointments.push(appointment);

    return NextResponse.json(
      {
        id: appointment.id,
        message: 'Appointment booked successfully',
        appointment,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Appointment create error:', error);
    return NextResponse.json({ error: 'Failed to create appointment' }, { status: 500 });
  }
}

export async function GET() {
  try {
    return NextResponse.json(
      appointments.map((apt) => ({
        id: apt.id,
        patientName: apt.patientName,
        doctorName: apt.doctorName,
        date: apt.appointmentDate.toISOString().split('T')[0],
        time: apt.timeSlot,
        status: apt.status,
        reason: apt.reason ?? '',
        email: apt.patientEmail,
        phone: apt.patientPhone,
      }))
    );
  } catch (error) {
    console.error('Appointments fetch error:', error);
    return NextResponse.json([], { status: 200 });
  }
}
