export interface InvoiceData {
  invoiceNumber: string;
  date: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  customerCompany?: string;
  items: {
    description: string;
    quantity: number;
    unitPrice: number;
    total: number;
  }[];
  subtotal: number;
  gst: number;
  total: number;
  registrationId?: string;
  registrationType: 'workshop' | 'event';
}

export function generateInvoiceNumber(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const timestamp = now.getTime();
  const sequential = String(timestamp).slice(-4);
  
  return `INV-${year}${month}-${sequential}`;
}

export function calculateGST(amount: number, gstRate: number = 0.09): number {
  return amount * gstRate;
}

export async function generateInvoicePdfBytes(invoiceData: InvoiceData): Promise<Uint8Array> {
  const { PDFDocument, StandardFonts, rgb } = await import('npm:pdf-lib@1.17.1');
  
  // Create PDF document
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595, 842]); // A4 size in points
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const { width, height } = page.getSize();

  // Colors
  const primaryColor = rgb(0.11, 0.16, 0.30); // #1D2A4D (nexius-navy)
  const accentColor = rgb(0, 0.79, 0.73); // #00CABA (nexius-teal)
  const grayColor = rgb(0.5, 0.5, 0.5);
  const blackColor = rgb(0, 0, 0);

  let currentY = height - 50;

  // Company Header
  page.drawText('NEXIUS Labs Pte Ltd', {
    x: 50,
    y: currentY,
    size: 20,
    font: boldFont,
    color: primaryColor,
  });
  currentY -= 25;

  page.drawText('AI-Powered Business Automation & Consulting', {
    x: 50,
    y: currentY,
    size: 10,
    font: font,
    color: grayColor,
  });
  currentY -= 15;

  page.drawText('Email: hello@nexiuslabs.com | Website: www.nexiuslabs.com', {
    x: 50,
    y: currentY,
    size: 10,
    font: font,
    color: grayColor,
  });
  currentY -= 40;

  // Invoice Title and Number
  page.drawText('INVOICE', {
    x: width - 150,
    y: height - 50,
    size: 24,
    font: boldFont,
    color: accentColor,
  });

  page.drawText(`Invoice #: ${invoiceData.invoiceNumber}`, {
    x: width - 150,
    y: height - 80,
    size: 12,
    font: boldFont,
    color: blackColor,
  });

  page.drawText(`Date: ${invoiceData.date}`, {
    x: width - 150,
    y: height - 100,
    size: 12,
    font: font,
    color: blackColor,
  });

  // Horizontal line
  page.drawLine({
    start: { x: 50, y: currentY },
    end: { x: width - 50, y: currentY },
    thickness: 1,
    color: grayColor,
  });
  currentY -= 30;

  // Bill To Section
  page.drawText('BILL TO:', {
    x: 50,
    y: currentY,
    size: 12,
    font: boldFont,
    color: primaryColor,
  });
  currentY -= 20;

  page.drawText(invoiceData.customerName, {
    x: 50,
    y: currentY,
    size: 12,
    font: boldFont,
    color: blackColor,
  });
  currentY -= 15;

  page.drawText(invoiceData.customerEmail, {
    x: 50,
    y: currentY,
    size: 11,
    font: font,
    color: blackColor,
  });
  currentY -= 15;

  if (invoiceData.customerPhone) {
    page.drawText(invoiceData.customerPhone, {
      x: 50,
      y: currentY,
      size: 11,
      font: font,
      color: blackColor,
    });
    currentY -= 15;
  }

  if (invoiceData.customerCompany) {
    page.drawText(invoiceData.customerCompany, {
      x: 50,
      y: currentY,
      size: 11,
      font: font,
      color: blackColor,
    });
    currentY -= 15;
  }

  currentY -= 30;

  // Items Table Header
  const tableY = currentY;
  const tableHeaders = ['Description', 'Qty', 'Unit Price (SGD)', 'Total (SGD)'];
  const columnX = [50, 350, 400, 500];

  // Draw table header background
  page.drawRectangle({
    x: 50,
    y: tableY - 20,
    width: width - 100,
    height: 25,
    color: rgb(0.95, 0.95, 0.95),
  });

  // Draw table headers
  for (let i = 0; i < tableHeaders.length; i++) {
    page.drawText(tableHeaders[i], {
      x: columnX[i],
      y: tableY - 10,
      size: 11,
      font: boldFont,
      color: primaryColor,
    });
  }

  currentY = tableY - 35;

  // Draw items
  invoiceData.items.forEach((item) => {
    page.drawText(item.description, {
      x: columnX[0],
      y: currentY,
      size: 10,
      font: font,
      color: blackColor,
    });

    page.drawText(item.quantity.toString(), {
      x: columnX[1],
      y: currentY,
      size: 10,
      font: font,
      color: blackColor,
    });

    page.drawText(`$${item.unitPrice.toFixed(2)}`, {
      x: columnX[2],
      y: currentY,
      size: 10,
      font: font,
      color: blackColor,
    });

    page.drawText(`$${item.total.toFixed(2)}`, {
      x: columnX[3],
      y: currentY,
      size: 10,
      font: font,
      color: blackColor,
    });

    currentY -= 20;
  });

  // Draw horizontal line above totals
  currentY -= 10;
  page.drawLine({
    start: { x: 350, y: currentY },
    end: { x: width - 50, y: currentY },
    thickness: 1,
    color: grayColor,
  });
  currentY -= 20;

  // Totals section
  const totalsX = 400;
  const amountsX = 500;

  page.drawText('Subtotal:', {
    x: totalsX,
    y: currentY,
    size: 11,
    font: font,
    color: blackColor,
  });
  page.drawText(`$${invoiceData.subtotal.toFixed(2)}`, {
    x: amountsX,
    y: currentY,
    size: 11,
    font: font,
    color: blackColor,
  });
  currentY -= 15;

  page.drawText('GST (9%):', {
    x: totalsX,
    y: currentY,
    size: 11,
    font: font,
    color: blackColor,
  });
  page.drawText(`$${invoiceData.gst.toFixed(2)}`, {
    x: amountsX,
    y: currentY,
    size: 11,
    font: font,
    color: blackColor,
  });
  currentY -= 20;

  // Total with background
  page.drawRectangle({
    x: 350,
    y: currentY - 5,
    width: 195,
    height: 20,
    color: rgb(0.95, 0.95, 0.95),
  });

  page.drawText('TOTAL SGD:', {
    x: totalsX,
    y: currentY,
    size: 12,
    font: boldFont,
    color: primaryColor,
  });
  page.drawText(`$${invoiceData.total.toFixed(2)}`, {
    x: amountsX,
    y: currentY,
    size: 12,
    font: boldFont,
    color: primaryColor,
  });

  currentY -= 50;

  // Payment Terms
  page.drawText('PAYMENT TERMS:', {
    x: 50,
    y: currentY,
    size: 12,
    font: boldFont,
    color: primaryColor,
  });
  currentY -= 20;

  const paymentTerms = [
    '• Payment is due within 7 days of invoice date',
    '• Payment method: PayNow to UEN: 202334449W',
    '• Please include invoice number in payment reference',
    '• For questions, contact: hello@nexiuslabs.com'
  ];

  paymentTerms.forEach((term) => {
    page.drawText(term, {
      x: 50,
      y: currentY,
      size: 10,
      font: font,
      color: blackColor,
    });
    currentY -= 15;
  });

  // Footer
  currentY = 80;
  page.drawText('Thank you for your business!', {
    x: 50,
    y: currentY,
    size: 12,
    font: boldFont,
    color: accentColor,
  });
  currentY -= 20;

  page.drawText('NEXIUS Labs Pte Ltd | UEN: 202334449W', {
    x: 50,
    y: currentY,
    size: 9,
    font: font,
    color: grayColor,
  });

  // Generate and return PDF bytes
  return await pdfDoc.save();
}