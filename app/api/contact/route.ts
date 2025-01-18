// app/api/contact/route.ts
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
	try {
		const { name, email, phone } = await req.json();

		// cPanel email configuration
		const transporter = nodemailer.createTransport({
			host: "me.zero-31.com", // Your cPanel mail server
			port: 465, // Usually 465 for SSL
			secure: true, // true for 465, false for other ports
			auth: {
				user: "contact@zero-31.com", // Your cPanel email address
				pass: process.env.CPANEL_EMAIL_PASSWORD, // Your cPanel email password
			},
		});

		const mailOptions = {
			from: "contact@zero-31.com",
			to: "hany.rabah@gmail.com", //reach@zero-31.com
			replyTo: email, // Allows replying directly to the person who submitted the form
			subject: "New Contact Form Submission - ZERO31",
			html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px;">
          <h2 style="color: #333;">New Contact Form Submission</h2>
          <div style="margin: 20px 0; padding: 20px; background-color: #f5f5f5; border-radius: 5px;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
          </div>
          <p style="color: #666; font-size: 14px;">This email was sent from the ZERO31 website contact form.</p>
        </div>
      `,
		};

		await transporter.sendMail(mailOptions);

		return NextResponse.json({
			success: true,
			message: "Email sent successfully",
		});
	} catch (error) {
		console.error("Email send error:", error);
		return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
	}
}
