import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import Stripe from 'npm:stripe@14.18.0';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.7';

const stripeSecretKey = Deno.env.get('STRIPE_SECRET_KEY');
if (!stripeSecretKey) {
  throw new Error('Stripe secret key not configured');
}

const stripe = new Stripe(stripeSecretKey, {
  apiVersion: '2023-10-16',
});

const endpointSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET');
if (!endpointSecret) {
  throw new Error('Stripe webhook secret not configured');
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, stripe-signature',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Max-Age': '86400',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { 
      status: 204,
      headers: corsHeaders
    });
  }

  try {
    const signature = req.headers.get('stripe-signature');
    if (!signature) {
      throw new Error('Missing stripe signature');
    }

    const body = await req.text();
    const event = stripe.webhooks.constructEvent(body, signature, endpointSecret);

    // Handle the event
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      const { eventId, registrationId } = session.metadata;

      // Create Supabase client
      const supabaseClient = createClient(
        Deno.env.get('SUPABASE_URL') ?? '',
        Deno.env.get('SUPABASE_ANON_KEY') ?? ''
      );

      // Update registration status to confirmed
      const { error: updateError } = await supabaseClient
        .from('event_registrations')
        .update({ status: 'confirmed' })
        .eq('id', registrationId);

      if (updateError) throw updateError;

      // Send confirmation email
      try {
        await fetch(`${Deno.env.get('SUPABASE_URL')}/functions/v1/send-confirmation-email`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Deno.env.get('SUPABASE_ANON_KEY')}`,
          },
          body: JSON.stringify({
            to: session.customer_email,
            eventId,
            registrationId,
          }),
        });
      } catch (emailError) {
        console.error('Error sending confirmation email:', emailError);
      }
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    );
  }
});
