# Agent Team Session 2 - Task Plan

## Critical Fixes from Session 1

### Nav Bar (HIGH PRIORITY)
- **Issue**: Nav bar now flickers when scrolling after Session 1 edits
- **Fix Required**: Debug and fix the translucent/transparent behavior in hero section
- **Expected Behavior**: Transparent in hero section, then carries hero gradient color after scrolling past hero

## Home Page Tasks

### 1. Demo Preview Section Fixes
- **Issue**: Still too small on large displays despite Session 1 updates
- **Tasks**:
  - Increase demo preview video section size for large displays
  - Fix arrow button formatting for bigger displays
  - Remove boxes around side arrows - keep only clean left/right arrows

### 2. Rollback Required Items
- **"Integrated Business Platform" Section**: 
  - Roll back to pre-Session 1 state
  - After rollback, implement existing modal/pop-out system (like other pages)
  - Keep "Why Choose Strive" as main text (don't rollback this part)

- **"Connect With Us" Section**:
  - Roll back to pre-Session 1 state (current version is "too much")
  - After rollback, update card titles to focus on company-centered aspects:
    - What it's like to work with Strive
    - Partnership benefits

### 3. Completed Items - Minor Tweaks Only
- ✅ "Watch Demos" → "View Demos" (Completed - looks good)
- ✅ Discord icon in footer (Completed - looks amazing)
- ✅ "Meet the Team" button (Completed - just add orange button outline to match "View Demos")

### 4. Logo Update
- Replace orange "Strive" logo/text in footer and nav bar
- Use new logo: `STRIVE_orange_text_transparent_1500x1500.png`
- Ensure proper formatting/appearance

## Solutions Page

### Industry & Solution Type Cards
- **Still Needs Work**: Change the small text under each card's main title
- Current: Generic "By Industry" or "Solution Type"
- Required: Specific descriptions matching the card content
  - Industries: Healthcare, Tech, Logistics, Law, etc.
  - Solution Types: Natural Language Processing, Computer Vision, Predictive Model, etc.

## Portfolio Page

### Header Text Refinement
- ✅ Main improvement done in Session 1
- **Fix Needed**: Remove gradient from sub-header (keep gradient only in main header text)

### Card/Badge Formatting
- ✅ Title text color changed to orange (looks good)
- **New Tasks**:
  - Change project type text color to dark blue (#020a1c)
  - Standardize all cards to match "Computer Vision Analytics" card:
    - Same dimensions
    - Same "View Details" button positioning
    - Keep all content unchanged - only adjust size/layout

## Resources Page

### Hero Section Update
1. Remove "Knowledge Center" text
2. Add bookcase lucid icon in its place
3. Match brain-circuit icon size from portfolio page

## Contact Page

### Visual Redesign
- Background: Use gradient design from hero sections
- Cards/badges: Off-white color (#ffffffeb)
- Text boxes: Dark blue background (#020a1c) with orange outline
- Ensure text colors don't blend with backgrounds

### Functionality Updates
- "Live Chat Support" → Opens ChatBot "Sai" window
  - Create chat page layout with placeholder content
  - Make visually appealing design
- Fix "Schedule a Demo" button → Route to Get Started page (or create dedicated demo request page)
- Update Schedule Consultation form → Gather more business information
- Change Business Hours to EST

## About Us Page → "Company" Page

### Restructure
- Rename to "Company"
- Create nav dropdown with sections:
  - Become a Partner
  - Community (Discord and more)
  - Meet the Team
  - [Additional sections to be determined]
- Decision needed: Single page with sections vs. separate pages vs. pop-out modals
  - For now let's do a single page layout with specific sections and then add the pop-out modals for any card/badges (this modal system is already being used on all other pages)
  - For the leadership cards/badges - When they pop out have an option for the user to get the specific Strive employees digital business card (QR code)
- Very important to create a rollback point for this!!!!!

## Login Page

### Improvements
- Add "Forgot Password" option
- Update "Welcome to Strive" card:
  - Use hero section gradient design
  - Match gradient look from rest of site

## Get Started Pages

### Step 3 of 3 Page
- Card/badge background: Change to off-white (#ffffffeb)
- "Last Step" text: Apply gradient color from hero sections
- Button: Apply same gradient color
- Ensure ALL white backgrounds throughout project use #ffffffeb

## Implementation Priority Order

1. **Critical Fixes**
   - Nav bar flickering issue
   - Demo preview section sizing

2. **Rollbacks & Refinements**
   - Home page sections requiring rollback
   - Portfolio page gradient adjustment

3. **New Features**
   - ChatBot "Sai" page creation
   - Company page restructure

4. **Visual Polish**
   - Logo updates
   - Color standardization
   - Card formatting consistency

## Notes for Session 2 Execution

- Use Edit/MultiEdit tools for all code changes
- Verify changes with execution-monitor every 30 seconds
- Keep files under 300 lines (use component-extractor if needed)
- Document all changes in change_log.md with rollback information
- Update plan.md immediately when tasks complete