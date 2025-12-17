// PDF libraries are loaded dynamically to reduce initial bundle size (~80KB saved)
// html2canvas and jsPDF are only loaded when PDF generation is triggered

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
    // Dynamically import PDF libraries
    const [{ default: html2canvas }, { default: jsPDF }] = await Promise.all([
      import('html2canvas'),
      import('jspdf')
    ]);

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
    // Dynamically import jsPDF
    const { default: jsPDF } = await import('jspdf');

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

// Professional PDF Generator - Programmatic approach
export const generateProfessionalBrochurePDF = async (
  options: PDFOptions = {}
): Promise<void> => {
  const {
    filename = 'Strive-Business-Solutions-Brochure.pdf'
  } = options;

  try {
    // Dynamically import jsPDF
    const { default: jsPDF } = await import('jspdf');

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 15;
    const contentWidth = pageWidth - (margin * 2);
    let yPos = margin;

    // Brand colors
    const orangeColor: [number, number, number] = [255, 112, 51]; // #ff7033
    const grayColor: [number, number, number] = [148, 163, 184]; // #94a3b8

    // Helper function to add a new page if needed
    const checkPageBreak = (spaceNeeded: number) => {
      if (yPos + spaceNeeded > pageHeight - margin) {
        pdf.addPage();
        yPos = margin;
        return true;
      }
      return false;
    };

    // Helper function to draw a colored box
    const drawBox = (x: number, y: number, width: number, height: number, color: [number, number, number], alpha: number = 1) => {
      pdf.setFillColor(...color);
      pdf.setGState(new (pdf as any).GState({ opacity: alpha }));
      pdf.rect(x, y, width, height, 'F');
      pdf.setGState(new (pdf as any).GState({ opacity: 1 }));
    };

    // ===== COVER PAGE =====
    // Orange gradient background (simulated with rectangles)
    for (let i = 0; i < pageHeight; i += 2) {
      const ratio = i / pageHeight;
      const r = 255;
      const g = Math.floor(112 + (51 - 112) * ratio);
      const b = Math.floor(51 + (234 - 51) * ratio);
      pdf.setFillColor(r, g, b);
      pdf.rect(0, i, pageWidth, 2, 'F');
    }

    // Add logo placeholder (would need actual logo image)
    yPos = 60;
    pdf.setFillColor(255, 255, 255);
    pdf.setGState(new (pdf as any).GState({ opacity: 0.2 }));
    pdf.rect(pageWidth / 2 - 20, yPos, 40, 40, 'F');
    pdf.setGState(new (pdf as any).GState({ opacity: 1 }));

    // Company name
    yPos = 115;
    pdf.setFontSize(40);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(255, 255, 255);
    pdf.text('SAI PLATFORM', pageWidth / 2, yPos, { align: 'center' });

    // Tagline
    yPos += 12;
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'bold');
    pdf.text('The All-in-One Real Estate Platform', pageWidth / 2, yPos, { align: 'center' });

    // Description
    yPos += 10;
    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'normal');
    const description = pdf.splitTextToSize(
      'Empowering real estate professionals to close more deals, manage transactions effortlessly, and scale their business with one unified platform',
      contentWidth - 40
    );
    pdf.text(description, pageWidth / 2, yPos, { align: 'center' });

    // ===== PAGE 2: COMPANY OVERVIEW =====
    pdf.addPage();
    yPos = margin;
    pdf.setFillColor(255, 255, 255);
    pdf.rect(0, 0, pageWidth, pageHeight, 'F');

    // Section title
    pdf.setFontSize(20);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(...orangeColor);
    pdf.text('Company Overview', pageWidth / 2, yPos, { align: 'center' });
    yPos += 12;

    // Company description
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(80, 80, 80);
    const companyDesc = pdf.splitTextToSize(
      'SAI Platform is the all-in-one solution for modern real estate professionals. We combine CRM, transaction management, marketing automation, market intelligence, and AI assistance into a single unified platform. Built specifically for real estate, SAI eliminates the chaos of managing multiple disconnected tools while providing institutional-grade capabilities to every agent, team, and brokerage.',
      contentWidth
    );
    pdf.text(companyDesc, margin, yPos);
    yPos += companyDesc.length * 5 + 10;

    // Mission, Vision, Values boxes
    const boxWidth = (contentWidth - 10) / 3;
    const boxHeight = 35;
    const boxY = yPos;

    // Mission
    drawBox(margin, boxY, boxWidth, boxHeight, [255, 112, 51], 0.1);
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(...orangeColor);
    pdf.text('Our Mission', margin + boxWidth / 2, boxY + 10, { align: 'center' });
    pdf.setFontSize(8);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(80, 80, 80);
    const missionText = pdf.splitTextToSize(
      'Democratizing AI to make intelligent solutions accessible to businesses of all sizes',
      boxWidth - 6
    );
    pdf.text(missionText, margin + boxWidth / 2, boxY + 17, { align: 'center' });

    // Vision
    drawBox(margin + boxWidth + 5, boxY, boxWidth, boxHeight, [255, 112, 51], 0.1);
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(...orangeColor);
    pdf.text('Our Vision', margin + boxWidth + 5 + boxWidth / 2, boxY + 10, { align: 'center' });
    pdf.setFontSize(8);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(80, 80, 80);
    const visionText = pdf.splitTextToSize(
      'Creating a future where AI amplifies human potential and drives innovation',
      boxWidth - 6
    );
    pdf.text(visionText, margin + boxWidth + 5 + boxWidth / 2, boxY + 17, { align: 'center' });

    // Values
    drawBox(margin + (boxWidth + 5) * 2, boxY, boxWidth, boxHeight, [255, 112, 51], 0.1);
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(...orangeColor);
    pdf.text('Our Values', margin + (boxWidth + 5) * 2 + boxWidth / 2, boxY + 10, { align: 'center' });
    pdf.setFontSize(8);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(80, 80, 80);
    const valuesText = pdf.splitTextToSize(
      'Innovation, integrity, and impact in everything we deliver',
      boxWidth - 6
    );
    pdf.text(valuesText, margin + (boxWidth + 5) * 2 + boxWidth / 2, boxY + 17, { align: 'center' });

    yPos += boxHeight + 15;

    // ===== SERVICES & SOLUTIONS =====
    checkPageBreak(60);
    pdf.setFontSize(20);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(...orangeColor);
    pdf.text('Services & Solutions', pageWidth / 2, yPos, { align: 'center' });
    yPos += 12;

    const services = [
      { title: 'AI & Machine Learning Solutions', desc: 'Custom AI models, machine learning pipelines, and intelligent automation systems tailored to your business needs.' },
      { title: 'Intelligent Process Automation', desc: 'Streamline operations with AI-powered automation that reduces costs and improves efficiency.' },
      { title: 'Predictive Analytics & BI', desc: 'Transform data into actionable insights with advanced analytics and real-time business intelligence.' },
      { title: 'Custom AI Development', desc: 'End-to-end development of bespoke AI solutions that integrate seamlessly with your existing systems.' },
      { title: 'Data Engineering & Architecture', desc: 'Robust data infrastructure design and implementation for scalable AI and analytics platforms.' },
      { title: 'Cloud Infrastructure & DevOps', desc: 'Modern cloud architecture with automated deployment pipelines and infrastructure management.' }
    ];

    services.forEach((service, index) => {
      checkPageBreak(25);
      pdf.setFontSize(11);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(...orangeColor);
      pdf.text(service.title, margin, yPos);
      yPos += 6;

      pdf.setFontSize(9);
      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(100, 100, 100);
      const serviceDesc = pdf.splitTextToSize(service.desc, contentWidth);
      pdf.text(serviceDesc, margin, yPos);
      yPos += serviceDesc.length * 4.5 + 6;
    });

    // ===== INDUSTRY EXPERTISE =====
    checkPageBreak(60);
    pdf.setFontSize(20);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(...orangeColor);
    pdf.text('Industry Expertise - 20+ Industries Served', pageWidth / 2, yPos, { align: 'center' });
    yPos += 8;

    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(...grayColor);
    const industryDesc = pdf.splitTextToSize(
      'We bring deep domain knowledge and industry-specific AI solutions across 20+ industries to help you navigate unique challenges and opportunities.',
      contentWidth
    );
    pdf.text(industryDesc, pageWidth / 2, yPos, { align: 'center' });
    yPos += industryDesc.length * 5 + 8;

    const industries = [
      'Healthcare & Life Sciences',
      'Financial Services & Banking',
      'Manufacturing & Supply Chain',
      'Retail & E-commerce',
      'Technology & SaaS',
      'Education & EdTech',
      'Real Estate & PropTech',
      'Legal & Compliance'
    ];

    industries.forEach((industry, index) => {
      if (index % 2 === 0 && index > 0) {
        yPos += 8;
        checkPageBreak(8);
      }
      const xPos = index % 2 === 0 ? margin : pageWidth / 2 + 5;
      pdf.setFontSize(9);
      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(100, 100, 100);
      pdf.text('• ' + industry, xPos, yPos);
      if (index % 2 === 1) {
        yPos += 6;
      }
    });
    yPos += 10;

    // ===== PROVEN RESULTS =====
    checkPageBreak(50);
    pdf.setFontSize(20);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(...orangeColor);
    pdf.text('Proven Results', pageWidth / 2, yPos, { align: 'center' });
    yPos += 12;

    const metrics = [
      { number: '500+', label: 'AI Models Deployed' },
      { number: '95%', label: 'Client Retention Rate' },
      { number: '40%', label: 'Average Cost Reduction' },
      { number: '3x', label: 'ROI Within First Year' }
    ];

    const metricBoxWidth = (contentWidth - 15) / 4;
    let metricX = margin;

    metrics.forEach((metric, index) => {
      drawBox(metricX, yPos, metricBoxWidth, 25, [255, 112, 51], 0.05);
      pdf.setFontSize(18);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(...orangeColor);
      pdf.text(metric.number, metricX + metricBoxWidth / 2, yPos + 12, { align: 'center' });
      pdf.setFontSize(8);
      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(...grayColor);
      pdf.text(metric.label, metricX + metricBoxWidth / 2, yPos + 19, { align: 'center' });
      metricX += metricBoxWidth + 5;
    });
    yPos += 35;

    // ===== TECHNOLOGY STACK =====
    checkPageBreak(80);
    pdf.setFontSize(20);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(...orangeColor);
    pdf.text('Technology Stack', pageWidth / 2, yPos, { align: 'center' });
    yPos += 12;

    const technologies = [
      { category: 'AI/ML', tools: ['TensorFlow', 'PyTorch', 'Scikit-learn', 'OpenAI GPT', 'Hugging Face'] },
      { category: 'Cloud', tools: ['AWS', 'Azure', 'Google Cloud', 'Kubernetes', 'Docker'] },
      { category: 'Data', tools: ['Snowflake', 'Databricks', 'Apache Spark', 'PostgreSQL', 'MongoDB'] },
      { category: 'DevOps', tools: ['Jenkins', 'GitLab CI/CD', 'Terraform', 'Ansible', 'Prometheus'] }
    ];

    technologies.forEach((tech, index) => {
      if (index % 2 === 0) {
        checkPageBreak(40);
      }
      const xPos = index % 2 === 0 ? margin : pageWidth / 2 + 5;
      const techWidth = (contentWidth - 5) / 2;

      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(...orangeColor);
      pdf.text(tech.category, xPos, yPos);

      let toolY = yPos + 6;
      tech.tools.forEach(tool => {
        pdf.setFontSize(8);
        pdf.setFont('helvetica', 'normal');
        pdf.setTextColor(100, 100, 100);
        pdf.text('✓ ' + tool, xPos, toolY);
        toolY += 5;
      });

      if (index % 2 === 1) {
        yPos += 32;
      }
    });
    yPos += 10;

    // ===== WHY CHOOSE STRIVE =====
    checkPageBreak(70);
    pdf.setFontSize(20);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(...orangeColor);
    pdf.text('Why Choose Strive?', pageWidth / 2, yPos, { align: 'center' });
    yPos += 12;

    const reasons = [
      { title: 'Proven Track Record', desc: '500+ successful AI implementations across diverse industries' },
      { title: 'Expert Team', desc: 'Certified AI engineers, data scientists, and business strategists' },
      { title: 'End-to-End Solutions', desc: 'From strategy to deployment, we handle every aspect of your AI journey' },
      { title: '24/7 Support', desc: 'Continuous monitoring, maintenance, and optimization of your AI systems' }
    ];

    reasons.forEach((reason) => {
      checkPageBreak(18);
      pdf.setFontSize(11);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(...orangeColor);
      pdf.text('• ' + reason.title, margin, yPos);
      yPos += 6;

      pdf.setFontSize(9);
      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(100, 100, 100);
      const reasonDesc = pdf.splitTextToSize(reason.desc, contentWidth - 10);
      pdf.text(reasonDesc, margin + 5, yPos);
      yPos += reasonDesc.length * 4.5 + 4;
    });

    // ===== GET STARTED TODAY =====
    checkPageBreak(60);
    pdf.setFontSize(20);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(...orangeColor);
    pdf.text('Get Started Today', pageWidth / 2, yPos, { align: 'center' });
    yPos += 12;

    // Contact Information
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(...orangeColor);
    pdf.text('Contact Information', margin, yPos);
    yPos += 8;

    const contactInfo = [
      '📞 (731)-431-2320',
      '✉️ contact@strivetech.ai',
      '📍 Nashville, TN',
      '🕐 Mon-Fri: 8:00 AM - 8:00 PM EST',
      '🌐 www.strivetech.ai'
    ];

    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(...grayColor);
    contactInfo.forEach(info => {
      pdf.text(info, margin, yPos);
      yPos += 6;
    });

    yPos += 8;
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(...orangeColor);
    pdf.text('Ready to Transform Your Business?', margin, yPos);
    yPos += 6;

    pdf.setFontSize(9);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(...grayColor);
    const ctaText = pdf.splitTextToSize(
      'Schedule a free consultation to discuss how AI can accelerate your growth and competitive advantage.',
      contentWidth
    );
    pdf.text(ctaText, margin, yPos);
    yPos += ctaText.length * 5 + 8;

    pdf.text('✓ Free initial consultation', margin, yPos);
    yPos += 5;
    pdf.text('✓ Custom AI strategy development', margin, yPos);
    yPos += 5;
    pdf.text('✓ ROI-focused implementation', margin, yPos);

    // ===== FOOTER =====
    pdf.addPage();
    yPos = pageHeight / 2;
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(150, 150, 150);
    pdf.text('© 2025 Strive Tech. All rights reserved.', pageWidth / 2, yPos, { align: 'center' });
    yPos += 6;
    pdf.text('Transforming Business Through AI Innovation', pageWidth / 2, yPos, { align: 'center' });

    // Save the PDF
    pdf.save(filename);

    return Promise.resolve();
  } catch (error) {
    console.error('Error generating professional PDF:', error);
    throw new Error('Failed to generate professional PDF. Please try again.');
  }
};