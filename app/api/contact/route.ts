// app/api/contact/route.ts
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject,message } = body;

    // Validate the incoming data
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Configure the secure SMTP transport
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER, 
      to: process.env.EMAIL_USER,  
      replyTo: email,               
      subject: ` New Portfolio Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: monospace; color: #0f172a;">
          <h2 style="color: #ea580c;">Incoming Portfolio Message</h2>
          <p><strong>From:</strong> ${name} (${email})</p>
          <hr style="border-color: #cbd5e1;" />
          <p><strong>Subject:</strong> ${subject}</p>
          <hr style="border-color: #cbd5e1;" />
          <p style="white-space: pre-wrap;">${message}</p>
        </div>
      `,
    };

    // Execute the transmission
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'Transmission successful' }, { status: 200 });
  } catch (error) {
    console.error('Server error during email transmission:', error);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}