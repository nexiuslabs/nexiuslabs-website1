import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createTransport } from 'npm:nodemailer@6.9.12';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { to, firstName } = await req.json();

    if (!to || !firstName) {
      throw new Error('Missing required fields');
    }

    // Get SMTP settings from environment variables
    const smtpHost = Deno.env.get('SMTP_HOST');
    const smtpPort = parseInt(Deno.env.get('SMTP_PORT') || '465');
    const smtpUser = Deno.env.get('SMTP_USER');
    const smtpPass = Deno.env.get('SMTP_PASS');

    if (!smtpHost || !smtpUser || !smtpPass) {
      throw new Error('SMTP configuration not found in environment variables');
    }

    // Create SMTP transporter
    const transporter = createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: true,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    // Send email
    await transporter.sendMail({
      from: `"NEXIUS Labs" <${smtpUser}>`,
      to: to,
      subject: "Thank You for Contacting NEXIUS Labs",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1D2A4D;">Thank You for Reaching Out!</h2>
          
          <p>Dear ${firstName},</p>
          
          <p>Thank you for your interest in NEXIUS Labs. We're excited to learn more about your business and discuss how our AI solutions can help drive your growth and efficiency.</p>
          
          <p>One of our AI consultants will be in touch with you within the next 24-48 business hours to schedule a personalized consultation.</p>
          
          <p>In the meantime, you might find these resources helpful:</p>
          <ul>
            <li>Our AI Implementation Guide</li>
            <li>Case Studies</li>
            <li>Client Success Stories</li>
          </ul>
          
          <p>If you have any immediate questions, feel free to reply to this email.</p>
          
          <p>Best regards,<br>
          The NEXIUS Labs Team</p>
          
          <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #666;">
            <p>NEXIUS Labs - Empowering Business Growth Through AI</p>
          </div>
        </div>
      `,
    });

    return new Response(
      JSON.stringify({ message: 'Email sent successfully' }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    );
  }
});
