import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.7';
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

    } else {
      throw new Error('Invalid registration type');
    }

    // Generate PDF bytes
    const pdfBytes = await generateInvoicePdfBytes(invoiceData);

    return new Response(pdfBytes, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="invoice-${invoiceData.invoiceNumber}.pdf"`,
      },
    });

  } catch (error) {
    console.error('Error generating invoice:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});