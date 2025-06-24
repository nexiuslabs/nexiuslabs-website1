import { supabase } from './supabase';

export interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface InvoiceData {
  invoiceNumber: string;
  date: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  customerCompany?: string;
  items: InvoiceItem[];
  subtotal: number;
  gst: number;
  total: number;
  registrationId?: string;
  registrationType: 'workshop' | 'event';
}

export async function generateInvoicePDF(registrationId: string, registrationType: 'workshop' | 'event'): Promise<Blob> {
  try {
    const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-invoice`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify({
        registrationId,
        registrationType
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to generate invoice');
    }

    return await response.blob();
  } catch (error) {
    console.error('Error generating invoice PDF:', error);
    throw error;
  }
}

export async function sendInvoiceEmail(registrationId: string, registrationType: 'workshop' | 'event'): Promise<{ invoiceNumber: string; sentTo: string }> {
  try {
    const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-invoice-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify({
        registrationId,
        registrationType
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to send invoice email');
    }

    const result = await response.json();
    return {
      invoiceNumber: result.invoiceNumber,
      sentTo: result.sentTo
    };
  } catch (error) {
    console.error('Error sending invoice email:', error);
    throw error;
  }
}

export function downloadInvoice(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Legacy functions for backward compatibility - these are no longer used with dynamic generation
export function calculateGST(amount: number, gstRate: number = 0.09): number {
  return amount * gstRate;
}

export async function generateInvoiceNumber(): Promise<string> {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const timestamp = now.getTime();
  const sequential = String(timestamp).slice(-4);
  
  return `INV-${year}${month}-${sequential}`;
}

export function createWorkshopInvoiceData(
  registration: any,
  cohort: string,
  amount: number
): InvoiceData {
  const subtotal = amount;
  const gst = calculateGST(subtotal);
  const total = subtotal + gst;

  return {
    invoiceNumber: '',
    date: new Date().toLocaleDateString('en-SG'),
    customerName: `${registration.first_name} ${registration.last_name || ''}`.trim(),
    customerEmail: registration.email,
    customerPhone: registration.phone,
    customerCompany: registration.company,
    items: [
      {
        description: `Build With AI for Non-Coders Workshop - ${cohort}`,
        quantity: 1,
        unitPrice: amount,
        total: amount,
      }
    ],
    subtotal,
    gst,
    total,
    registrationId: registration.id,
    registrationType: 'workshop',
  };
}

export function createEventInvoiceData(
  registration: any,
  event: any
): InvoiceData {
  const subtotal = event.ticket_price || 0;
  const gst = calculateGST(subtotal);
  const total = subtotal + gst;

  return {
    invoiceNumber: '',
    date: new Date().toLocaleDateString('en-SG'),
    customerName: registration.full_name,
    customerEmail: registration.email,
    customerPhone: registration.phone,
    customerCompany: registration.company,
    items: [
      {
        description: `Event Registration - ${event.title}`,
        quantity: 1,
        unitPrice: subtotal,
        total: subtotal,
      }
    ],
    subtotal,
    gst,
    total,
    registrationId: registration.id,
    registrationType: 'event',
  };
}