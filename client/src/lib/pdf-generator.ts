import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export interface PDFOptions {
  filename?: string;
  quality?: number;
  format?: 'a4' | 'letter';
  orientation?: 'portrait' | 'landscape';
}

export const generatePDF = async (
  elementId: string,
  options: PDFOptions = {}
): Promise<void> => {
  const {
    filename = 'Strive-Business-Solutions-Brochure.pdf',
    quality = 1.0,
    format = 'a4',
    orientation = 'portrait'
  } = options;

  try {
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error(`Element with id "${elementId}" not found`);
    }

    // Create canvas from the element
    const canvas = await html2canvas(element, {
      scale: 2, // Higher resolution
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      width: element.scrollWidth,
      height: element.scrollHeight,
      scrollX: 0,
      scrollY: 0
    });

    const imgData = canvas.toDataURL('image/png', quality);

    // Calculate dimensions
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;

    // PDF dimensions (A4: 210 x 297 mm)
    const pdfWidth = format === 'a4' ? 210 : 216; // letter: 216 x 279 mm
    const pdfHeight = format === 'a4' ? 297 : 279;

    // Calculate scaling to fit content
    const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
    const scaledWidth = imgWidth * ratio;
    const scaledHeight = imgHeight * ratio;

    // Create PDF
    const pdf = new jsPDF({
      orientation,
      unit: 'mm',
      format: format === 'a4' ? 'a4' : 'letter'
    });

    // If content is taller than one page, we need to split it
    const pageHeight = pdfHeight;
    const totalPages = Math.ceil(scaledHeight / pageHeight);

    for (let page = 0; page < totalPages; page++) {
      if (page > 0) {
        pdf.addPage();
      }

      const yOffset = -page * pageHeight;

      pdf.addImage(
        imgData,
        'PNG',
        0,
        yOffset,
        scaledWidth,
        scaledHeight
      );
    }

    // Save the PDF
    pdf.save(filename);

    return Promise.resolve();
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw new Error('Failed to generate PDF. Please try again.');
  }
};

// Alternative method using print-friendly styling
export const generatePDFFromPrint = async (options: PDFOptions = {}): Promise<void> => {
  const { filename = 'Strive-Business-Solutions-Brochure.pdf' } = options;

  try {
    // Create a new window for printing
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      throw new Error('Failed to open print window');
    }

    // Get the brochure content
    const brochureElement = document.getElementById('professional-brochure');
    if (!brochureElement) {
      throw new Error('Brochure element not found');
    }

    // Create print-optimized HTML
    const printHTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Strive Business Solutions Brochure</title>
          <style>
            @page {
              margin: 15mm;
              size: A4;
            }
            body {
              margin: 0;
              padding: 0;
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
              line-height: 1.5;
              color: #333;
              background: white;
            }
            .page-break {
              page-break-before: always;
            }
            .no-break {
              page-break-inside: avoid;
            }
            img {
              max-width: 100%;
              height: auto;
            }
            .gradient-text {
              background: linear-gradient(to right, #ff7033, #9333ea);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              background-clip: text;
              color: #ff7033; /* fallback */
            }
            .text-primary {
              color: #ff7033 !important;
            }
            .bg-primary {
              background-color: #ff7033 !important;
            }
            .border-primary {
              border-color: #ff7033 !important;
            }
          </style>
        </head>
        <body>
          ${brochureElement.innerHTML}
        </body>
      </html>
    `;

    printWindow.document.write(printHTML);
    printWindow.document.close();

    // Wait for content to load
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Trigger print
    printWindow.print();
    printWindow.close();

    return Promise.resolve();
  } catch (error) {
    console.error('Error generating PDF from print:', error);
    throw new Error('Failed to generate PDF. Please try again.');
  }
};

// Utility to download any content as PDF
export const downloadAsPDF = async (
  content: string,
  filename: string = 'document.pdf'
): Promise<void> => {
  try {
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    // Split content into lines that fit the page width
    const splitText = pdf.splitTextToSize(content, 180);

    // Add text to PDF
    pdf.text(splitText, 15, 20);

    // Save the PDF
    pdf.save(filename);

    return Promise.resolve();
  } catch (error) {
    console.error('Error downloading as PDF:', error);
    throw new Error('Failed to download PDF. Please try again.');
  }
};