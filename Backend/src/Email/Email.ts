import nodemailer from 'nodemailer'; 
import { Transporter, SendMailOptions } from 'nodemailer';
import { invitationEmail } from '../EmailTemplate/emailTemplate'; 


const transporter: Transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure:true,
    auth: {
        user: process.env.EMAIL as string,
        pass: process.env.EMAIL_PASSWORD as string
    },
    tls: {
        rejectUnauthorized: false 
    }
});
async function sendInviteEmail(userEmail: string, adminHomePageLink: string): Promise<void> {
  const mailOptions: SendMailOptions = {
    from: process.env.EMAIL as string,
    to: userEmail,
    subject: 'You are invited!',
    html: invitationEmail.replace("{resetURL}", adminHomePageLink)
  };
  try {
    await transporter.sendMail(mailOptions);
    console.log('Invite email sent successfully to', userEmail);
  } catch (error) {
    console.error('Error sending invite email:', error);
  }
}

export { sendInviteEmail };
