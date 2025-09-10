# Session 26 Implementation Plan

Based on my analysis of the Company and Contact pages, here's the detailed plan to complete all requested updates:

## Company Page Updates (client/src/pages/company.tsx)

### 1. Replace Hero Section with Vision/Roadmap
- Remove the current hero section (lines 47-134) that includes the animated background and stats
- Move the "Our Vision Timeline" section (lines 245-339) to become the new hero
- Styling changes:
    - Keep the gradient background and animations
    - Update the title to combine "OUR VISION" label with "Roadmap to the Future" 
    - Maintain responsive design for timeline on mobile/tablet

### 2. Update "View Our Work" Button
- Location: Bottom CTA section (line 488)
- Changes needed:
    - Change from variant="outline" with white border to a more vibrant color scheme
    - Add gradient background similar to primary button but with different colors
    - Enhance hover effect with scale transformation and shadow

### 3. Fix "OUR FOUNDATION" Section
- Current issue: Section appears to be working but may need visual improvements
- Updates:
    - Review spacing and alignment of Mission/Vision/Values cards
    - Ensure consistent card heights and padding
    - Verify hover effects are smooth and professional
    - Check responsive layout on mobile devices

## Contact Page Updates (client/src/pages/contact.tsx)

### 1. Reorganize Form Fields
- Move "Company Name" field (currently after email) to below phone number
- Move "Company Size" dropdown to immediately follow Company Name
- Result: Email → Phone → Company Name → Company Size → Message

### 2. Make Company Name Optional
- Remove the required attribute from Company Name input (line 144)
- Update the label from "Company Name *" to "Company Name (Optional)"
- Note: This change only applies to Contact page, not other forms

### 3. Add "Coming Soon" Banner to Brochure Button
- Current: Button text is "Download Solutions Brochure" (line 280)
- Update: Add ComingSoonBadge component to the button text
- Implementation: 
    - Import existing ComingSoonBadge component (already imported)
    - Integrate badge into button text with proper sizing
    - Adjust text size if needed to maintain visual balance

## Testing Requirements
- Verify all changes work on desktop, tablet, and mobile viewports
- Ensure form submission still works correctly with optional Company Name
- Check that the Vision/Roadmap timeline displays properly as hero section
- Confirm button hover effects and animations are smooth

## Files to Modify
1. client/src/pages/company.tsx - 3 main changes
2. client/src/pages/contact.tsx - 3 form-related changes
