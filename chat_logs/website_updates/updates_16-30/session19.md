# Home Page # - Session 19

## Session Progress Log

### ✅ Completed Tasks

1. **ROI Calculator Investment Range Updated**
   - Changed maximum investment from $1M to $250,000
   - Changed minimum investment from $10,000 to $1,000  
   - Updated slider range and display values
   - Set default investment amount to $50,000

2. **Industries Added to ROI Calculator**
   - Added 8 additional industries to the dropdown:
     - Hospitality & Tourism
     - Energy & Utilities
     - Transportation & Logistics
     - Agriculture & Food
     - Media & Entertainment
     - Non-profit Organizations
     - Government & Public Sector
     - Other Industry (catch-all for custom)
   - All industries now have proper icons and data

3. **Custom Industry Input Implemented**
   - Replaced simple dropdown with searchable combobox
   - Users can now type custom industry names
   - Autocomplete functionality for existing industries
   - "Other Industry" option uses custom text when entered

4. **Verified Statistics & Citations Added**
   - Created new file: `client/src/data/industry-statistics.ts`
   - Added verified statistics for all industries with sources:
     - Healthcare: Nature Medicine, CMS, IBM reports
     - Finance: Nilson Report, McKinsey, Bain & Company
     - Manufacturing: Aberdeen Research, Federal Reserve
     - Retail: Shopify, Baymard Institute, IHL Group
     - Technology: GitLab, Stack Overflow, Flexera
     - Education: NCES, OECD, RAND Corporation
     - Real Estate: Census Bureau, NAR, Zillow
     - Legal: ABA, Thomson Reuters, ACC
   - Added ROI methodology tooltip with validation info

5. **Button Text Updated**
   - Changed "Try the Calculator" to "Request Solution Showcase"
   - Updated button in ROI calculator component

6. **Business Hub Section Enhanced**
   - Added orange gradient to "Strive client portal" text
   - Enhanced card styling with:
     - Gradient backgrounds (white to gray-50)
     - Hover effects with shadow and scale
     - Gradient overlay on hover
     - Icon scaling on hover
     - Border color transitions
   - Made cards less plain and more visually appealing

### 📝 Original Task List


- Need to fix ROI calculator to be more accurate (Use verified statistics through verified high quality sources and cite the source in the calculator section) - Also need to scale down the total investment to $500k max instead of $1M (Might need to change copy on this page to match this change after this is updated) - Also need to lower the total investment amount on ROI calculator - Move it down to be a maximum of $250,000 and a minimum of $1,000

- Add all industries from the solutions page into the ROI dropdown and also give the user the ability to type in a industry
  - Additonally, please tell the user (the chat user, not the website user) of any additional industries that should be added that aren't already on the website

- Fix button end points after copy is finalized

- (MAYBE) We also want to advertise that we create different levels of automation on the home page for any company need or want - We want to still express the importance of humans rather than appearing to be fully "AI positive," because many people are still skeptical of AI and it taking jobs away from people.
  - Here's our automation levels:
    - Level 1: Straight software with no automation- Pure human
Level 2: Human workflow w/ AI assistance & eval (Strive is here)
Level 3: Human directed AI workflow & Step by step Human monitoring/eval
Level 4: Mostly autonomous workflow/system/software - Step by step agentic monitoring & eval -> End of workflow human eval
YOLO 5: Fully automated system and workflow - Human eval at end of each day or human decided review frequency

- "TRANSPARENCY, ACCOUNTABILITY, AND CONTROL" section is where we are advertising our fully integrated "Business HUB" that will be released soon (October 1st, 2025) - This will give clients and users the ability to view project progress (progress bar and snapshots when project is updated by Strive team, & clients can also leave comments if they want for feedback on certain things) - I like the existing header and subheader text... Maybe give "Strive client portal" the orange gradient color that's used for other text in the hero section
  - Try and make the cards not look so plain in this section

- ROI calculator button needs to be changed to "Request Solution Showcase"

- Make sure the "AI SOLUTIONS TAILORED TO YOUR INDUSTRY'S BIGGEST CHALLENGES" sections statistics and are accurate and that we have high quality sources to back the statistics