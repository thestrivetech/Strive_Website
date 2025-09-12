# Session 18 - Website Updates

## Task List Status

### ✅ Completed Tasks:

1. **Created reusable ComingSoon component** (`client/src/components/ui/coming-soon-badge.tsx`)
   - Animated "Coming October 1st, 2025" badge with size and variant options

2. **Added "Coming Soon" banners to:**
   - ✅ Chat Live with AI Specialist button in contact.tsx
   - ✅ TRANSPARENCY section on home.tsx  
   - ✅ Login/Sign Up forms in login.tsx
   - ✅ Floating chat bot icon in floating-chat.tsx

3. **Updated company contact information:**
   - ✅ Address changed to: Nashville, TN
   - ✅ Phone number changed to: (731)-431-2320
   - ✅ Email changed to: contact@strivetech.ai
   - Updated in: footer.tsx, contact.tsx, onboarding.tsx, request.tsx, assessment.tsx

4. **Searched for double hyphens (--)**
   - No double hyphens found in content that needed removal

5. **Set up email notification system:**
   - ✅ Created email service module (`server/email.ts`)
   - ✅ Installed nodemailer and types
   - ✅ Configured to send notifications to all 4 email addresses:
     - garrettholland@strivetech.ai
     - jeffmeyer@strivetech.ai
     - grantramey@strivetech.ai
     - contact@strivetech.ai
   - ✅ Integrated with contact form and newsletter endpoints

### ⚠️ Pending/Notes:

1. **Replace placeholder images** - This task requires actual business images to be provided. Current placeholder images identified:
   - Healthcare, Financial, Manufacturing, Retail, Technology, Education industry icons
   - Business resources and portfolio category icons
   - All currently using generated placeholder images

2. **Email Configuration** - The email service requires environment variables to be set:
   - SMTP_HOST (defaults to smtp.gmail.com)
   - SMTP_PORT (defaults to 587)
   - SMTP_USER (required for sending)
   - SMTP_PASS (required for sending)
   - SMTP_FROM (defaults to noreply@strivetech.ai)

## Original Task List

# Entire Website # 

- Add small but noticable "Coming Soon" banner to "Chat Live with AI Specialist" button (Contact page) & "TRANSPARENCY, ACCOUNTABILITY, AND CONTROL" section (Home page) & the actual sign in / sign up pages (coming October 1st, 2025) - Also add the coming soon banner on the Chat bot icon in the bottom right corner of the screen

- Remove any double hyphens on the website - Make sure the sentences that are edited still make sense after doing this (don't change entire sentences, just make small tweaks to make the sentences make sense)

- Make sure that all routing is set up for when people send contact information or sign up for any type of meeting - We should all 3 recieve an email (plus Strive's contact email) - Here's the emails that should recieve the notification: 
    garrettholland@strivetech.ai
    jeffmeyer@strivetech.ai
    grantramey@strivetech.ai
    contact@strivetech.ai

- Use company email for any legal or customer support requests or anything else: contact@strivetech.ai

- Change all photos / pics out for photos that are relevant to what the photo is used for

- Change company address anywhere that it's used to: Nashville, TN
  - Same goes for Phone number: (731)-431-2320