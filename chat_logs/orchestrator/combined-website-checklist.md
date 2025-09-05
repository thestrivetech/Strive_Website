# Combined Website Update Checklist

## All Tasks

### Navigation Bar
- [ ] Fix nav bar flickering when scrolling
- [ ] Transparent in hero section, gradient when scrolled

### Demo Preview Section
- [ ] Increase demo preview size for large displays
- [ ] Fix arrow button formatting
- [ ] Remove boxes around arrows - clean arrows only

### Logo Updates
- [ ] Replace orange logo in footer Using STRIVE_orange_text_transparent_1500x1500.png
- [ ] Replace orange logo in nav bar Using STRIVE_orange_text_transparent_1500x1500.png
- [ ] Make sure that the logo is formatted correctly and doesn't look to small or too big in either section (do this for all devices and screen sizes please)

### Home Page
- [ ] Change "Watch Demos" to "View Demos" in hero section
- [ ] Add Discord icon to footer (link to: https://discord.gg/q3djnrvP29)
- [ ] Change "View Success Stories" to "Meet the Team"
- [ ] Keep "Why Choose Strive" as main text in that section of home page
- [ ] Add orange outline to "Meet the Team" button with hover effects in "Why Choose Strive" section
- [ ] Roll back "Integrated Business Platform" section to pre-Session 1
- [ ] After rollback, implement modal/pop-out system for cards/badges
- [ ] Roll back "Connect With Us" section to pre-Session 1
- [ ] Update Connect With Us cards to focus on company aspects:
  - [ ] What it's like to work with Strive
  - [ ] Becoming a partner with Strive

### Contact Page - Complete Redesign
- [ ] Add gradient background from hero sections
- [ ] Change cards/badges to off-white (#ffffffeb)
- [ ] Text boxes: Dark blue (#020a1c) with orange outline
- [ ] Ensure text colors don't blend with badge/card colors
- [ ] Fix "Schedule a Demo" button routing (to Get Started page or dedicated demo request page)
- [ ] Update Schedule Consultation form for more business information
- [ ] Change Business Hours to EST
- [ ] Connect "Live Chat Support" to ChatBot Sai

### About Us → Company Page Restructure
- [ ] Rename page to "Company"
- [ ] Create nav dropdown with sections:
  - [ ] Become a Partner
  - [ ] Community (Discord and more)
  - [ ] Meet the Team
  - [ ] Additional company sections
- [ ] Implement single page layout with sections OR separate pages
- [ ] Add pop-out modals for cards/badges (for detailed information)
- [ ] Add QR code option for leadership cards
- [ ] Create rollback point after updates

### Login Page
- [ ] Add "Forgot Password" option
- [ ] Update "Welcome to Strive" card with gradient design
- [ ] Match gradient from rest of site

### Get Started Page (Step 3 of 3)
- [ ] Change card backgrounds to off-white (#ffffffeb)
- [ ] Apply gradient to "Last Step" text
- [ ] Apply gradient to button
- [ ] Ensure ALL white backgrounds use #ffffffeb

### Infrastructure & Technical Tasks
- [ ] Create separate config for local vs Replit ports
- [ ] Extract files over 300 lines (resources.tsx: 1540 lines!)
- [ ] Extract home.tsx (886 lines)
- [ ] Implement proper rollback mechanisms

## Priority Order for Remaining Tasks

### Priority 1 - Critical Infrastructure
1. Extract large files (resources.tsx: 1540 lines, home.tsx: 886 lines)
2. Create local vs Replit port configuration
3. Implement rollback mechanisms

### Priority 2 - Incomplete Rollbacks
1. Home page "Integrated Business Platform" rollback
2. Home page "Connect With Us" rollback
3. Implement modal/pop-out system after rollbacks

### Priority 3 - Major Page Updates
1. Contact page complete redesign
2. About Us → Company page restructure
3. Portfolio page card standardization

### Priority 4 - Polish & Enhancements
1. Login page gradient updates
2. Get Started Step 3 styling
3. Form functionality improvements
4. Button hover effects and outlines

## Task Statistics
- **Total Tasks**: 51
- **Completed**: 24 (47%)
- **Partially Complete**: 2 (4%)
- **Not Started**: 25 (49%)

## Critical Notes
- Nav bar issues need monitoring after fixes
- File size violations need immediate attention (300 line limit)
- Rollback points should be created before major changes
- All white backgrounds should consistently use #ffffffeb
- Gradient design should be consistent across all hero sections