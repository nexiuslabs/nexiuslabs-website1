```typescript
import React, { useState } from 'react';
import { FileText, Download, Loader2, Mail, CheckCircle } from 'lucide-react';
import { generateInvoicePDF, sendInvoiceEmail, downloadInvoice } from '../lib/invoices';

interface InvoiceGeneratorProps {
  registration: any;
  type: 'workshop' | 'event';
  onInvoiceGenerated?: (result: { invoiceNumber?: string; sentTo?: string }) => void;
}

export function InvoiceGenerator({ 
  registration, 
  type, 
  onInvoiceGenerated 
}: InvoiceGeneratorProps) {
  const [loading, setLoading] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);
  const [lastResult, setLastResult] = useState<{ invoiceNumber?: string; sentTo?: string } | null>(null);

  const handleGenerateInvoice = async () => {
    try {
      setLoading(true);

      // Generate PDF using dynamic server-side data
      const pdfBlob = await generateInvoicePDF(registration.id, type);

      // Create a filename with timestamp
      const timestamp = new Date().toISOString().slice(0, 10);
      const filename = \`invoice-${type}-${timestamp}.pdf`;

      // Download the PDF
      downloadInvoice(pdfBlob, filename);

      // Callback with result
      const result = { invoiceNumber: \`Generated-${timestamp}` };
      setLastResult(result);
      onInvoiceGenerated?.(result);

    } catch (error) {
      console.error('Error generating invoice:', error);
      alert(\`Error generating invoice: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleEmailInvoice = async () => {
    try {
      setEmailLoading(true);

      // Send invoice email using dynamic server-side data
      const result = await sendInvoiceEmail(registration.id, type);

      // Update state with result
      setLastResult(result);
      onInvoiceGenerated?.(result);

      alert(`Invoice ${result.invoiceNumber} has been sent to ${result.sentTo}`);

    } catch (error) {
      console.error('Error sending invoice email:', error);
      alert(`Error sending invoice email: ${error.message}`);
    } finally {
      setEmailLoading(false);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-col sm:flex-row gap-2">
        <button
          onClick={handleGenerateInvoice}
          disabled={loading}
          className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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

        <button
          onClick={handleEmailInvoice}
          disabled={emailLoading}
          className="inline-flex items-center justify-center px-4 py-2 border border-surface rounded-lg shadow-sm text-sm font-medium text-muted bg-surface hover:bg-surface focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {emailLoading ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <Mail className="h-4 w-4 mr-2" />
              Email Invoice
            </>
          )}
        </button>
      </div>

      {lastResult && (
        <div className="flex items-center text-sm text-primary bg-primary/10 px-3 py-2 rounded-lg">
          <CheckCircle className="h-4 w-4 mr-2" />
          {lastResult.sentTo ? (
            <span>Invoice {lastResult.invoiceNumber} sent to {lastResult.sentTo}</span>
          ) : (
            <span>Invoice {lastResult.invoiceNumber} generated successfully</span>
          )}
        </div>
      )}
    </div>
  );
}