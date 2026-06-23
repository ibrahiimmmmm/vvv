import { NextRequest, NextResponse } from 'next/server';

// In-memory storage for contact messages
const contactMessages: any[] = [];

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, subject, message } = body;

    if (!name?.trim() || !email?.trim() || !subject?.trim() || !message?.trim()) {
      return NextResponse.json({ error: 'All required fields must be filled' }, { status: 400 });
    }

    const contact = {
      id: `msg_${Date.now()}`,
      name: name.trim(),
      email: email.trim(),
      phone: phone?.trim() || '',
      subject: subject.trim(),
      message: message.trim(),
      status: 'new',
      createdAt: new Date(),
    };

    contactMessages.push(contact);

    return NextResponse.json(
      { message: 'Message sent successfully', id: contact.id },
      { status: 201 }
    );
  } catch (error) {
    console.error('Contact create error:', error);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}

export async function GET() {
  try {
    return NextResponse.json(
      contactMessages.map((msg) => ({
        id: msg.id,
        name: msg.name,
        email: msg.email,
        phone: msg.phone ?? '',
        subject: msg.subject,
        message: msg.message,
        status: msg.status,
        date: msg.createdAt.toISOString().split('T')[0],
        time: msg.createdAt.toLocaleTimeString('en-PK', {
          hour: '2-digit',
          minute: '2-digit',
        }),
      }))
    );
  } catch (error) {
    console.error('Contact fetch error:', error);
    return NextResponse.json([], { status: 200 });
  }
}
