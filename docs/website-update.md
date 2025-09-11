### Entire implementation list for the website ###

# Entire Website # - Prompted in session 18

- Add small but noticable "Coming Soon" banner to "Chat Live with AI Specialist" button (Contact page) & "TRANSPARENCY, ACCOUNTABILITY, AND CONTROL" section (Home page) & the actual sign in / sign up pages (coming October 1st, 2025) - Also add the coming soon banner on the Chat bot icon in the bottom right corner of the screen

- Remove any double hyphens on the website - Make sure the sentences that are edited still make sense after doing this (don't change entire sentences, just make small tweaks to make the sentences make sense)

- Make sure that all routing is set up for when people send contact information or sign up for any type of meeting - We should all 3 recieve an email (plus Strive's contact email) - Here's the emails that should recieve the notification: 
    garrettholland@strivetech.ai
    jeffmeyer@strivetech.ai
    grantramey@strivetech.ai
    contact@strivetech.ai

- Use company email for any legal or customer support requests or anything else: contact@strivetech.ai

- Change all photos / pics out for photos that are relevant to what the photo is used for

##  📝 Notes from claude - session 18: ##

    - Image replacement task requires actual business images to be provided
    - Email service needs SMTP environment variables configured to actually send emails
    
  "Coming Soon" Badges - Created a reusable component and added to all 4 locations:
    - Chat Live with AI Specialist button (Contact page)
    - TRANSPARENCY section (Home page)
    - Sign In/Sign Up forms (Login page)
    - Floating chat bot icon
  2. Contact Information Updated:
    - Address: Nashville, TN
    - Phone: (731)-431-2320
    - Email: contact@strivetech.ai
  3. Double Hyphens - Searched and found none that needed removal
  4. Email Notifications - Set up complete email system that sends to all 4 addresses when
  contact forms are submitted

- User note: The chatbot icon is now messed up and all the way on the bottom of the page and on the left side of the screen. - Need to fix this ASAP
  - Same for the AI Specialist chat button on the contact page - This means we need to review this chat session and make sure everything was implemented properly and to fix any bugs that were introduced
- The contact page wasn't updated with the Address or email

- Make sure to change and update the FAQ section on the contact page - First question needs to be a shorter time period



# Home Page # - Session 19


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

### Session 19 - User Notes ###

- ROI calculator should show the time savings going up when investment amount increases - The maximum time savings should be 400% - Please make sure that all calculations align with investment amount along with the amount of solutions that the client is selecting - Each solution the client is selecting should have different weights for different parts of the calculations. Think hard and make the right calculations based on high quality research using high quality sources
 

# Solutions Page # - Session 20

- Deselect option on industry and solution type filter (should be able to click back on the filter item that was selected in the dropdown menu to deselect it)
Upgrade visuals on Solutions page to be on par with Portfolio

- Number that shows the total number of industries and solutions that are available in the filter isn't functioning properly

- "Speak with an AI specialist" maybe needs to go back to "Get Custom Solution?"

- Add Solution type: Offline Solutions / Local solutions - which is for all solutions that can operate locally on clients own hardware if they're hardware can handle it. - Make the actual card production ready and make sure that it matches the writing style and tone of the other solution cards - Add types of solutions that can actually be ran offline / locally
  - Slogan for locally ran solutions: If you have the hardware, we'll build you the software.

- Add the following industries to all applicable locations (filters, home page roi calculator filter, solutions page, etc.)
  - Add the gaming industry - Make sure to create more specific AI solutions for this industry as well
  - Add the eSports industry - Make sure to create more specific AI solutions for this industry as well

### Session 20 - User notes ###

- Put "View Demo" button back onto cards that we have a demo made for
  - Make it to where the user can see a preview on the pop out card and then also view the demo on the pop out card in full screen


# Additional Updates # - Session 21

- Change all images to .webp
  - Address bug where error is happening whenever I click the back button on the browser


### Home page additions ###

- add "source" hyperlink in the "AI SOLUTIONS TAILORED TO YOUR INDUSTRY'S BIGGEST CHALLENGES" section for each industries solutions card to show original source that backs up pain points and statistics claims - Check to make sure the source link is valid

- Try out "peek a boo" ui design with chatbot icon - hover effect makes the chat bot come onto screen fully, then when clicked the chat box fully appears

- ROI Calculator: When I click the HIPPA solutions option for healthcare, it brings all percentages down... Why is this? If it's a bug, can we please fix it and make sure that this isn't happening for any other industry and solution. If this isn't a bug, please explain.

- Please make the "Coming Soon" banner half it's current size in the "TRANSPARENCY, ACCOUNTABILITY, AND CONTROL" section of the home page.

- Remove flashing effect on the "Coming Soon" banners - Add the shiny effect that's used in the ROI calculator ROI return badges (make sure it's the same speed)

- Have it where if the user clicks the "Strive" logo in the nav bar it automatically brings them to the top of the home page even if they're on the home page, it should scroll them back to the top of the page
------------------------------------------------------------------------------
# Session 22 # (prompted one at a time after claudes project analysis) - I also added more task items in the actual chat log

-Site wide-
- Make sure that the "Coming Soon" banner below Sai's chat icon remains visible even after the chat icon is clicked and the chat box opens

- The ROI calculator still isn't fixed with the time saving issue - The HIPPA Compliance solution makes the time savings amount go down along with the ROI numbers... This is happening for multiple solutions when selected - Remake the entire algorithm to make sure that all calculations are representing the correct calculations for each solution for each specific industry

- Add scroll feature into the ROI calculator for when users are selection a industry - Also need to add the search ability (look at the solutions page filter to make sure that this dropdown filter for the ROI calculator works the exact same, the ordering of the industries should also match that pages dropdown filter as well)

- We also need to make sure that all of the solutions found for specific industries in the ROI calculator are on the solutions page (all industry specific solutions should be mentioned on the Industry pop out cards and then also placed in their respective solution type pop out cards as well)

- The source links in the "AI SOLUTIONS TAILORED TO YOUR INDUSTRY'S BIGGEST CHALLENGES" section are all the same... Please don't be lazy and fix this. Each source link should be specific to each solution and industry that's mentioned on each badge - If you have to change the statistics or pain point, please do it. Think hard and let's make this production ready.

----------------------------------------------------------------------------------------------------------------------

# Session 24 #

## Portfolio Page ## 

- The text in the hero section doesn't really have anything to do with the page being a portfolio... Is this ok?

- Change button wording on each card to be specific to the type of content (View Prototype, View Template, etc)

- Remove double "X's" on all pop cards - Then make sure to use the same "X" that's used on all pop out cards on the resource page

## Sai / AI Assistance Chat Page ##

- Please put the "Coming Soon" banner below the following text header: "Your AI-Powered Business Solutions Assistant - Available 24/7" - Make sure this banner uses the same exact design as the other Orange "Coming Soon" banners. 

## Solutions Page ##

- Please change the "View Demo" button - Make the color green and make the button much smaller please and move it to the upper right corner to match the current card layout. Make sure it looks good formatting wise.

--------------------------------------------------------------------------------

# Resources Page # - Session 25

- The bottom of the G in "Intelligence" is slightly hidden in the hero section

- Please make the filter buttons the same color scheme and hover color effect as the portfolio pages filter buttons

- The wording on the two buttons in the hero section isn't very clear. Please add "Let's Learn" as the button that takes the user lower onto the page to look further into our available resources. The other button should stay the same.

- Remove the download button from popouts
- Remove "Consulting" from the button and replace it with "Get Expert Insight"
  - Make sure after deleting the "download" button that the popout cards look good visually when it comes to the layout and format

- Completely update the quiz pop out cards - The current word color on the pop out card blends in with the dark blue card background so just make it the same blue color that's used for the brain icon on the pop out cards

-------------------------------------------------------------------------------

# Session 26 #

# Company Page #

- Remove everything above the "OUR VISION" roadmap section and then make the our vision section be this pages hero section 

- Change "view our work" button color scheme and hover effect


# Contact Page #

- Make the "Company name" and "company size" box inputs below the phone number text box
  - Also make the "Company Name" input option for users (only on the contact page form)

- Add "Coming Soon" banner to the Brochure button please. You can resize the text to make sure that it doesn't mess up the visual design of the page/section
- ----------------------------------------------------------------------------------
# Session 27 #

## Schedule Assessment Page ##

- Change text above the text boxes to dark blue that's used on the site

- Change "Contact Information" to orange that's used on the site

- Have error message pop up if the email isn't an actual email and the same goes for the phone number

- Fix the word "Advantage" - the bottom of the G is currently behind part of the hero section color somehow

- Change the home page hero section button, "Book Free Assessment" to be linked to the assessment page

- Need to allow the user to click "Other" when they're selecting their "Current Challenges" - This should then let them type in their own answer
----------------------------------------------------------------------------------------

# Session 28 #

## Request Pages ##
### Request Demo / Request Solution Page and 'steps' subpages ###

- Fix the formatting of the "3 Steps" - Make the step bubbles and text align (each bubble should be aligned with the middle of the actual text)

- Change wording on "Request Recieved" page from to be more specific the process and timeline of the showcase

- On step 3 card, please change the gradient color of the "Submit Request" button to use the orange in the text gradient. Leave the purple in the middle but just change out the orange.
  - Add another lightning bolt icon to the other side of the text on the submit button

- Change background color used in the user details box (located right below the calendly window) to match the off white background color
  - Change text color inside mentioned above text box to be orange and dark blue (orange used for the: Your Details, Contact, Email, Company, and dark blue is used for users/clients actual information)
  - ----------------------------------------------------------------------------------------

# FINAL SESSION #

# Final Step before deployment & Mobile Optimization #

- Follow the docs/optimization-guide.md to completely optimize the websites performance
  - We also need to clean the entire codebase to improve website performance

-    Make sure ROI calculator is fixed (import code files from perplexity)

- Need to fix my headshot because it looks hella pixelated
-------------------------------------------------------------------------------------------

# Mobile Session #

### Mobile Design List ###

- Make mobile specific design way more mobile centric - example: "What's New with Strive?" section should have a scroll feature where the different cards can be rotate horizontally

- Make ROI calculator one card where the user can see everything when adjusting the sliding bar

- Remove demo preview dots in home page hero section (only remove them on mobile or smaller displays)

- Make the arrows for the demo preview section (home page) on the inside of the actual display area, its currently below the demo display area - Make sure this doesnt block the view of the actual demo preview.

- Small chatbot icon isn't showing up on mobile until the very bottom of the page

- Make "TRANSPARENCY, ACCOUNTABILITY, AND CONTROL" section cards/badges 2 columns

- Make "WHY INDUSTRY LEADERS CHOOSE STRIVE" section cards/badges 2 columns (2x2)

- Make "Lead the AI Revolution in Your Industry" section a scroll through section where the user can click or scroll through the content cards 