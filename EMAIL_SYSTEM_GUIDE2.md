# Claude Chat talking about email best practices when using email system in website codebase #

User: If I'm using an SMTP emailing system on my company's website, what's the best way to create a beautiful template and design that I can put into the code base for when confirmation and notification emails are sent out? What code should be used? CSS? HTML? Or what? Think and come up with the best way to incorporate a professional email template for my websites codebase.


Claude: Strategized comprehensive email template design for SMTP system

Great question! Email templates require a specific approach since email clients have much more limited rendering capabilities than modern web browsers. Here's the best way to handle this:

Technologies to Use
HTML + Inline CSS is the answer, but with important caveats:

Key Principles for Email Templates:
Use Table-based layouts - Yes, like it's 1999! Email clients don't support modern flexbox/grid
Inline CSS only - Most email clients strip out <style> tags and external stylesheets
Avoid JavaScript - It's completely blocked in email clients
Keep it simple - Complex CSS properties often don't work
Recommended Approach
Here's a professional workflow:

1. Build with a Framework or Tool
MJML (recommended) - A markup language that compiles to email-safe HTML
Foundation for Emails - Responsive email framework
Maizzle - Modern email framework using Tailwind CSS syntax
2. Basic Structure Example
html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Template</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
        <tr>
            <td style="padding: 20px 0;">
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="margin: 0 auto; background-color: #ffffff;">
                    <!-- Header -->
                    <tr>
                        <td style="padding: 40px 30px; background-color: #0066cc; text-align: center;">
                            <h1 style="margin: 0; color: #ffffff; font-size: 24px;">Your Company Name</h1>
                        </td>
                    </tr>
                    <!-- Body -->
                    <tr>
                        <td style="padding: 40px 30px;">
                            <h2 style="margin: 0 0 20px 0; color: #333333; font-size: 20px;">Confirmation Email</h2>
                            <p style="margin: 0 0 15px 0; color: #666666; font-size: 16px; line-height: 1.5;">
                                Thank you for your order! Your confirmation number is #12345.
                            </p>
                        </td>
                    </tr>
                    <!-- Footer -->
                    <tr>
                        <td style="padding: 20px 30px; background-color: #f8f8f8; text-align: center;">
                            <p style="margin: 0; color: #999999; font-size: 14px;">© 2025 Your Company</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
3. Integration Strategy
Option A: Template Files

javascript
// Store templates as separate HTML files
const emailTemplate = fs.readFileSync('./templates/confirmation-email.html', 'utf8');

// Use template variables
const personalizedEmail = emailTemplate
    .replace('{{userName}}', user.name)
    .replace('{{orderNumber}}', order.id);
Option B: Template Engine (Better)

javascript
// Using Handlebars, EJS, or Pug
const template = handlebars.compile(emailTemplateHTML);
const html = template({
    userName: user.name,
    orderNumber: order.id,
    items: order.items
});
Option C: Email Service with Templates Services like SendGrid, Mailgun, or AWS SES have built-in template systems with version control and A/B testing.

Best Practices Checklist
✅ Width: Keep emails 600-650px wide
✅ Inline CSS: Use tools to automatically inline styles
✅ Testing: Test across clients (Gmail, Outlook, Apple Mail)
✅ Mobile: Use responsive techniques (media queries work in some clients)
✅ Images: Always include alt text; don't rely on images for critical info
✅ Links: Use absolute URLs
✅ Accessibility: Include proper semantic HTML and ARIA labels

Recommended Tools
Inliner tools: Juice, Premailer (auto-inline your CSS)
Testing: Litmus, Email on Acid
Preview: Mailtrap (dev environment)
Would you like me to create a complete, production-ready email template for your specific use case (confirmation, notification, etc.)?


## Section 2 of chat ##
User: How would I integrate the companies logo and other images/photos into the emails?


Claude: Great question! Images in emails require careful handling. Here are your options and best practices:

Methods to Include Images
1. Hosted Images (Recommended) - @Claude We are doing this method 
Host images on a web server and link to them:

html
<img src="https://yourdomain.com/images/logo.png" 
     alt="Company Logo" 
     width="200" 
     height="60"
     style="display: block; border: 0;" />
Pros:

Small email file size
Easy to update images
Most reliable method
Cons:

Requires web hosting
Images may be blocked by default in some clients

Here's the recommended setup:

Step 1: Host Your Images
Option A: Your Own Server (our website)

https://yourdomain.com/email-assets/
├── logo.png
├── header-bg.jpg
├── icon-checkmark.png
└── social/
    ├── facebook.png
    ├── twitter.png
    └── linkedin.png

Step 2: Optimize Your Images
bash
# Keep file sizes small
- Logo: Under 50KB
- Hero images: Under 200KB
- Icons: Under 10KB each
Optimization tips:

Use PNG for logos (transparency support)
Use JPG for photos
Compress images (TinyPNG, ImageOptim)
Use 2x resolution for retina displays, but keep file size in check
Step 3: Code Images Properly
html
<!-- Full example with all best practices -->
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
    <tr>
        <td style="padding: 20px; text-align: center; background-color: #ffffff;">
            <!-- Logo -->
            <img src="https://yourdomain.com/email-assets/logo.png" 
                 alt="Company Name" 
                 width="200" 
                 height="60"
                 style="display: block; margin: 0 auto; border: 0; outline: none; text-decoration: none;" />
        </td>
    </tr>
    <tr>
        <td style="padding: 0;">
            <!-- Hero Image (full width) -->
            <img src="https://yourdomain.com/email-assets/hero.jpg" 
                 alt="Welcome to our service" 
                 width="600" 
                 height="300"
                 style="display: block; width: 100%; max-width: 600px; height: auto; border: 0;" />
        </td>
    </tr>
    <tr>
        <td style="padding: 30px;">
            <!-- Content with inline image -->
            <p style="margin: 0 0 15px 0;">
                <img src="https://yourdomain.com/email-assets/icon-check.png" 
                     alt="Checkmark" 
                     width="20" 
                     height="20"
                     style="display: inline-block; vertical-align: middle; margin-right: 10px;" />
                Your order has been confirmed
            </p>
        </td>
    </tr>
</table>
Step 4: Critical Attributes
Always include:

width and height - Prevents layout shift while loading
alt text - Shows when images are blocked
style="display: block;" - Removes extra spacing in some clients
border="0" - Removes default borders in older clients
Step 5: Handle Image Blocking
Many email clients block images by default. Design for this:

html
<!-- Use background colors that complement your logo --> @claude - everything used below are examples provided by claude and not our actual color scheme
<td style="padding: 20px; background-color: #0066cc; text-align: center;">
    <img src="https://yourdomain.com/email-assets/logo-white.png" 
         alt="Company Name" 
         width="200" 
         height="60"
         style="display: block; margin: 0 auto;" />
</td>

<!-- Or use background images as fallback -->
<td background="https://yourdomain.com/email-assets/header-bg.jpg" 
    bgcolor="#0066cc"
    style="background-image: url('https://yourdomain.com/email-assets/header-bg.jpg'); 
           background-color: #0066cc; 
           background-size: cover; 
           padding: 40px;">
    <!-- Content here -->
</td>
Implementation Example
javascript
// Node.js with Nodemailer
const nodemailer = require('nodemailer');

const mailOptions = {
    from: 'noreply@yourcompany.com',
    to: user.email,
    subject: 'Order Confirmation',
    html: `
        <!DOCTYPE html>
        <html>
        <body style="margin: 0; padding: 0;">
            <table role="presentation" width="600" style="margin: 0 auto;">
                <tr>
                    <td style="padding: 20px; text-align: center;">
                        <img src="https://cdn.yourcompany.com/email/logo.png" 
                             alt="${companyName}" 
                             width="180" 
                             height="60"
                             style="display: block; margin: 0 auto;" />
                    </td>
                </tr>
                <tr>
                    <td style="padding: 20px;">
                        <h2>Order #${orderNumber}</h2>
                        <p>Thank you for your purchase!</p>
                    </td>
                </tr>
            </table>
        </body>
        </html>
    `
};

transporter.sendMail(mailOptions);


Security & Performance Checklist
✅ Use HTTPS for all image URLs
✅ Set CORS headers if images are on different domain
✅ Cache headers for better performance
✅ Descriptive alt text for accessibility
✅ Track image opens (optional) with tracking pixels
✅ Test image blocking in major clients

Quick Tip: Image Testing
Test your emails with images blocked to ensure:

Alt text is descriptive
Layout doesn't break
Call-to-action buttons are HTML/CSS, not images
Critical information isn't image-only
