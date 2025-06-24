import React, { useState } from 'react';
import { FileText, Download, Loader2 } from 'lucide-react';
import { generateInvoiceNumber, generateInvoicePDF, downloadInvoice, createWorkshopInvoiceData, createEventInvoiceData } from '../lib/invoices';
import type { InvoiceData } from '../lib/invoices';

interface InvoiceGeneratorProps {
  registration: any;
  type: 'workshop' | 'event';
  event?: any;
  cohort?: string;
  amount?: number;
  onInvoiceGenerated?: (invoiceData: InvoiceData) => void;
}

export function InvoiceGenerator({ 
  registration, 
  type, 
  event, 
  cohort, 
  amount = 180,
  onInvoiceGenerated 
}: InvoiceGeneratorProps) {
  const [loading, setLoading] = useState(false);

  const handleGenerateInvoice = async () => {
    try {
      setLoading(true);

      // Create invoice data based on type
      let invoiceData: InvoiceData;
      
      if (type === 'workshop') {
        if (!cohort) throw new Error('Cohort is required for workshop invoices');
        invoiceData = createWorkshopInvoiceData(registration, cohort, amount);
      } else {
        if (!event) throw new Error('Event is required for event invoices');
        invoiceData = createEventInvoiceData(registration, event);
      }

      // Generate invoice number
      invoiceData.invoiceNumber = await generateInvoiceNumber();

      // Generate PDF
      const pdfBlob = await generateInvoicePDF(invoiceData);

      // Download the PDF
      downloadInvoice(pdfBlob, `invoice-${invoiceData.invoiceNumber}.pdf`);

      // Callback with invoice data
      onInvoiceGenerated?.(invoiceData);

    } catch (error) {
      console.error('Error generating invoice:', error);
      alert('Error generating invoice. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleGenerateInvoice}
      disabled={loading}
      className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-nexius-teal hover:bg-nexius-teal/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-nexius-teal disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
    >
      {loading ? (
        <>
          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          Generating...
        </>
      ) : (
        <>
          <FileText className="h-4 w-4 mr-2" />
          Generate Invoice
        </>
      )}
    </button>
  );
}