import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.7';
import { createTransport } from 'npm:nodemailer@6.9.12';
import { 
  generateInvoiceNumber, 
  calculateGST, 
  generateInvoicePdfBytes,
  type InvoiceData 
} from '../_shared/invoice_generator.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { registrationId, registrationType } = await req.json();

    if (!registrationId || !registrationType) {
      throw new Error('Missing registrationId or registrationType');
    }

    // Create Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    );

    let invoiceData: InvoiceData;
    let emailSubject: string;
    let emailContent: string;

    if (registrationType === 'workshop') {
      // Fetch workshop registration data
      const { data: registration, error: regError } = await supabaseClient
        .from('workshop_registrations')
        .select('*')
        .eq('id', registrationId)
        .single();

      if (regError || !registration) {
        throw new Error('Workshop registration not found');
      }

      // Workshop pricing (SGD 180)
      const workshopPrice = 180;
      const subtotal = workshopPrice;
      const gst = calculateGST(subtotal);
      const total = subtotal + gst;

      invoiceData = {
        invoiceNumber: generateInvoiceNumber(),
        date: new Date().toLocaleDateString('en-SG'),
        customerName: `${registration.first_name} ${registration.last_name || ''}`.trim(),
        customerEmail: registration.email,
        customerPhone: registration.phone,
        customerCompany: registration.company,
        items: [
          {
            description: `Build With AI for Non-Coders Workshop - ${registration.cohort || 'TBD'}`,
            quantity: 1,
            unitPrice: workshopPrice,
            total: workshopPrice,
          }
        ],
        subtotal,
        gst,
        total,
        registrationId: registration.id,
        registrationType: 'workshop',
      };

      emailSubject = `Invoice for Build With AI Workshop - ${registration.cohort || 'TBD'}`;
      emailContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1D2A4D;">Invoice for Your Workshop Registration</h2>
          
          <p>Dear ${registration.first_name},</p>
          
          <p>Thank you for registering for our "Build With AI for Non-Coders" workshop! Please find your invoice attached.</p>
          
          <div style="background-color: #f5f7fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1D2A4D; margin-top: 0;">Workshop Details:</h3>
            <ul>
              <li><strong>Workshop:</strong> Build With AI for Non-Coders</li>
              <li><strong>Cohort:</strong> ${registration.cohort || 'TBD'}</li>
              <li><strong>Amount:</strong> SGD $${total.toFixed(2)} (inclusive of GST)</li>
              <li><strong>Invoice #:</strong> ${invoiceData.invoiceNumber}</li>
            </ul>
          </div>
          
          <p><strong>Payment Instructions:</strong></p>
          <ul>
            <li>Payment is due within 7 days of invoice date</li>
            <li>Payment method: PayNow to UEN: 202334449W</li>
            <li>Please include invoice number "${invoiceData.invoiceNumber}" in payment reference</li>
          </ul>
          
          <p>After payment, please email us the payment confirmation for our records.</p>
          
          <p>We're excited to have you join our workshop! If you have any questions, please don't hesitate to contact us.</p>
          
          <p>Best regards,<br>
          The NEXIUS Labs Team</p>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #666;">
            <p>NEXIUS Labs Pte Ltd | UEN: 202334449W<br>
            Email: hello@nexiuslabs.com | Website: www.nexiuslabs.com</p>
          </div>
        </div>
      `;

    } else if (registrationType === 'event') {
      // Fetch event registration data with event details
      const { data: registration, error: regError } = await supabaseClient
        .from('event_registrations')
        .select(`
          *,
          events:event_id (
            title,
            ticket_price,
            start_date,
            location
          )
        `)
        .eq('id', registrationId)
        .single();

      if (regError || !registration) {
        throw new Error('Event registration not found');
      }

      const event = registration.events;
      if (!event) {
        throw new Error('Event details not found');
      }

      const eventPrice = event.ticket_price || 0;
      const subtotal = eventPrice;
      const gst = calculateGST(subtotal);
      const total = subtotal + gst;

      invoiceData = {
        invoiceNumber: generateInvoiceNumber(),
        date: new Date().toLocaleDateString('en-SG'),
        customerName: registration.full_name,
        customerEmail: registration.email,
        customerPhone: registration.phone,
        customerCompany: registration.company,
        items: [
          {
            description: `Event Registration - ${event.title}`,
            quantity: 1,
            unitPrice: eventPrice,
            total: eventPrice,
          }
        ],
        subtotal,
        gst,
        total,
        registrationId: registration.id,
        registrationType: 'event',
      };

      emailSubject = `Invoice for Event Registration - ${event.title}`;
      emailContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1D2A4D;">Invoice for Your Event Registration</h2>
          
          <p>Dear ${registration.full_name},</p>
          
          <p>Thank you for registering for our event! Please find your invoice attached.</p>
          
          <div style="background-color: #f5f7fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1D2A4D; margin-top: 0;">Event Details:</h3>
            <ul>
              <li><strong>Event:</strong> ${event.title}</li>
              <li><strong>Date:</strong> ${new Date(event.start_date).toLocaleDateString('en-SG')}</li>
              <li><strong>Location:</strong> ${event.location}</li>
              <li><strong>Amount:</strong> SGD $${total.toFixed(2)} (inclusive of GST)</li>
              <li><strong>Invoice #:</strong> ${invoiceData.invoiceNumber}</li>
            </ul>
          </div>
          
          <p><strong>Payment Instructions:</strong></p>
          <ul>
            <li>Payment is due within 7 days of invoice date</li>
            <li>Payment method: PayNow to UEN: 202334449W</li>
            <li>Please include invoice number "${invoiceData.invoiceNumber}" in payment reference</li>
          </ul>
          
          <p>After payment, please email us the payment confirmation for our records.</p>
          
          <p>We look forward to seeing you at the event! If you have any questions, please don't hesitate to contact us.</p>
          
          <p>Best regards,<br>
          The NEXIUS Labs Team</p>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #666;">
            <p>NEXIUS Labs Pte Ltd | UEN: 202334449W<br>
            Email: hello@nexiuslabs.com | Website: www.nexiuslabs.com</p>
          </div>
        </div>
      `;

    } else {
      throw new Error('Invalid registration type');
    }

    // Generate PDF bytes
    const pdfBytes = await generateInvoicePdfBytes(invoiceData);

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

    // Send email with PDF attachment
    await transporter.sendMail({
      from: `"NEXIUS Labs" <${smtpUser}>`,
      to: invoiceData.customerEmail,
      subject: emailSubject,
      html: emailContent,
      attachments: [
        {
          filename: `invoice-${invoiceData.invoiceNumber}.pdf`,
          content: pdfBytes,
          contentType: 'application/pdf'
        }
      ]
    });

    return new Response(
      JSON.stringify({ 
        message: 'Invoice email sent successfully',
        invoiceNumber: invoiceData.invoiceNumber,
        sentTo: invoiceData.customerEmail
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );

  } catch (error) {
    console.error('Error sending invoice email:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});