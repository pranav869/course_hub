Redesign the existing CourseHub application so that it looks and feels like a **real Indian government education/course portal**, rather than a modern startup or Udemy-style website.

The application should remain a legitimate fictional private/educational platform called:

**CourseHub Learning Portal**

IMPORTANT:
- Do NOT claim to be an Indian government website.
- Do NOT use Government of India logos, Emblem of India, official ministry logos, or real government branding.
- Do NOT impersonate any government department.
- Use original fictional branding while adopting the general visual conventions of formal government portals.

Keep the existing technology:

- HTML
- CSS
- Vanilla JavaScript
- Node.js
- Express
- Razorpay

---

# 1. OVERALL VISUAL STYLE

The website should feel like an old-school but professionally redesigned Indian government portal.

Avoid:
- Startup-style gradients
- Huge marketing hero sections
- Excessive rounded cards
- Glassmorphism
- Neon colors
- Fancy animations
- Excessive whitespace

Instead use:

- White/light-gray backgrounds
- Dark blue navigation bars
- Thin borders
- Compact layouts
- Square or slightly rounded buttons
- Dense information
- Formal typography
- Government-portal-style tables
- Notice boards
- Breadcrumbs
- Left-side navigation
- Search forms
- Dropdown menus
- Announcement strips
- Information panels
- Data tables
- Status badges

The site should look functional and information-heavy rather than promotional.

---

# 2. HEADER

Create a formal government-portal-style header.

Top strip:

"CourseHub Learning Portal"

Right side:

- Skip to Main Content
- Screen Reader Access
- Accessibility
- हिन्दी
- English
- Contact Us

Then main header:

LEFT:

CourseHub Learning Portal logo.

Under it:

"Online Learning & Skill Development Portal"

RIGHT:

Search box

"Search"

Then navigation bar:

- Home
- About Portal
- Courses
- Categories
- Institutions
- Learner Login
- Instructor Login
- Help

Use dark navy/blue colors.

---

# 3. ANNOUNCEMENT BAR

Immediately below the navbar:

NOTICE:

"Important Notice: Course enrollment and online payment services are available through the CourseHub Learning Portal."

Create a scrolling-style announcement area.

Example notices:

- "New courses added for October 2026."
- "Online certification programs are now available."
- "Learners are advised to verify course details before payment."

---

# 4. HOMEPAGE

Do NOT create a huge startup hero.

Instead create a government-portal-style homepage.

Layout:

LEFT:
"Important Links"

- Browse Courses
- My Courses
- Certificates
- Payment Status
- Helpdesk
- FAQs
- Download Resources

CENTER:
"Course Search"

Form:

Category
[Select Category]

Course Name
[Enter Course Name]

Course Type
[Online / Self Paced / Instructor Led]

[Search]

RIGHT:

"Portal Updates"

List:

• New courses available
• Examination schedule
• Certificate information
• Payment guidelines
• Learner support

---

# 5. COURSE CATEGORIES

Create a formal section:

"COURSE CATEGORIES"

Use compact rectangular blocks:

Information Technology

Data Science

Artificial Intelligence

Computer Applications

Management

Finance

Design

Cyber Security

Cloud Computing

Programming

Each category should open the corresponding course listing.

---

# 6. COURSE LISTING

Make this look like a government database/search result page.

Header:

HOME > COURSES > COURSE SEARCH

Title:

"Course Search Results"

Search/filter panel:

Course Category
[Dropdown]

Course Level
[Beginner / Intermediate / Advanced]

Course Duration
[Dropdown]

Fee Range
[Dropdown]

Course Status
[Active / Upcoming]

[Search] [Reset]

Below:

"Showing 1–10 of 20 courses"

Create a table:

| S.No | Course Name | Category | Duration | Mode | Fee | Status | Action |
|------|-------------|----------|----------|------|-----|--------|--------|

Example:

01 | Full Stack Web Development | IT | 12 Weeks | Online | ₹799 | Active | View

02 | Python Programming | Programming | 8 Weeks | Online | ₹499 | Active | View

Use compact rows.

---

# 7. COURSE DETAILS

Instead of a marketing landing page, create a formal information page.

Breadcrumb:

HOME > COURSES > COURSE DETAILS

Title:

"Course Details"

Information table:

Course Name:
Full Stack Web Development

Course Code:
CSE-FSWD-001

Category:
Information Technology

Duration:
12 Weeks

Mode:
Online

Language:
English

Course Fee:
₹799

Certificate:
Yes

Course Status:
Active

Then sections:

### Course Description

Formal paragraph.

### Course Objectives

Numbered list.

### Course Syllabus

Table:

| Module | Topic | Lectures | Duration |
|---|---|---|---|

### Eligibility

Anyone interested in web development.

### Certification

Certificate will be issued after successful completion of course requirements.

At the right:

"Enrollment"

Course Fee: ₹799

[ENROLL NOW]

---

# 8. LOGIN

Create a government-portal-style login page.

Title:

"LEARNER LOGIN"

Form:

Username / Email

Password

Captcha-style demo field

[Login]

Links:

Forgot Password?

New Learner Registration

Help

Use a formal bordered form rather than a modern SaaS card.

---

# 9. REGISTRATION

Create:

"NEW LEARNER REGISTRATION"

Fields:

Full Name

Email

Mobile Number

Date of Birth

State

District

Username

Password

Confirm Password

Captcha

[Register]

Add validation.

---

# 10. LEARNER DASHBOARD

After login, create a formal dashboard.

Header:

"LEARNER DASHBOARD"

LEFT SIDEBAR:

- Dashboard
- My Profile
- My Courses
- Course Registration
- Payment History
- Certificates
- Downloads
- Helpdesk
- Logout

Main area:

### Learner Information

Name

Learner ID

Email

Registered Courses

Completed Courses

Certificates

### Current Courses

Use a table:

| Course | Enrollment Date | Progress | Status | Action |
|---|---|---|---|---|

---

# 11. PAYMENT PAGE

Make the payment page look like a formal government fee-payment portal.

Title:

"ONLINE COURSE FEE PAYMENT"

Course details:

Course Name

Course Code

Learner Name

Learner ID

Course Fee

Applicable Charges

Total Amount

Then:

"Payment Gateway"

Razorpay

[PROCEED TO PAYMENT]

IMPORTANT:

Use Razorpay Checkout for the actual payment.

Do NOT falsely claim that this is an official government payment portal.

Display:

"Payments are processed securely through Razorpay."

---

# 12. RAZORPAY

Keep the existing Razorpay implementation.

Flow:

ENROLL

↓

PAYMENT DETAILS

↓

RAZORPAY CHECKOUT

↓

PAYMENT

↓

SERVER-SIDE SIGNATURE VERIFICATION

↓

ENROLLMENT CONFIRMATION

↓

RECEIPT

Never mark payment successful from frontend alone.

Keep:

RAZORPAY_KEY_ID

RAZORPAY_KEY_SECRET

inside `.env`.

Never expose the secret key.

---

# 13. PAYMENT RECEIPT

After successful payment, generate a formal receipt.

Title:

"ONLINE PAYMENT RECEIPT"

Receipt Number

Transaction ID

Payment Date

Learner Name

Course Name

Course Code

Amount Paid

Payment Gateway

Payment Status: SUCCESS

Then:

[Print Receipt]

[Download Receipt]

Make it look like a formal institutional receipt.

---

# 14. PAYMENT HISTORY

Create:

"PAYMENT HISTORY"

Table:

| S.No | Receipt No | Course | Date | Amount | Transaction ID | Status |
|---|---|---|---|---|---|---|

Use:

SUCCESS

FAILED

PENDING

status badges.

---

# 15. MY COURSES

Create:

"MY REGISTERED COURSES"

Table:

| S.No | Course Code | Course Name | Enrollment Date | Progress | Status | Action |
|---|---|---|---|---|---|---|

Action:

[CONTINUE]

---

# 16. LEARNING PAGE

The learning page should still be realistic.

Top:

Course Name

Progress: 65%

Left sidebar:

MODULE 1

✓ Introduction

✓ Setup

✓ HTML

MODULE 2

✓ CSS

▶ Flexbox

○ Grid

○ Responsive Design

Main:

Large video player.

Below:

Lecture title

Description

[Previous Lecture]

[Mark Complete]

[Next Lecture]

---

# 17. CERTIFICATE

Create a formal certificate page.

Header:

"COURSE COMPLETION CERTIFICATE"

"This is to certify that"

Learner Name

"has successfully completed the course"

Course Name

Course Code

Completion Date

Certificate ID

CourseHub Learning Portal

[Download Certificate]

Make it look institutional and formal.

---

# 18. HELP DESK

Create:

"HELPDESK"

Categories:

Course Registration

Payment Issues

Certificate Issues

Login Issues

Technical Support

FAQ section.

Contact form:

Name

Email

Issue Category

Description

[Submit]

---

# 19. FOOTER

Formal footer:

CourseHub Learning Portal

Quick Links

About

Contact

Help

FAQs

Terms

Privacy Policy

Accessibility

Disclaimer

Important:

"CourseHub Learning Portal is a fictional educational platform and is not affiliated with or operated by the Government of India."

Add:

© 2026 CourseHub Learning Portal

---

# 20. DESIGN DETAILS

Use:

Primary:
Dark navy / government-style blue

Secondary:
Light gray

Accent:
Muted green for success

Typography:
Arial / system sans-serif

Borders:
1px solid #d0d0d0

Buttons:
Compact rectangular buttons.

Avoid:
- Huge border radius
- Excessive shadows
- Gradient backgrounds
- Animated hero sections
- Startup-style illustrations

Use subtle hover effects only.

---

# 21. RESPONSIVENESS

Desktop:
Two-column/three-column government portal layout.

Tablet:
Collapse sidebar appropriately.

Mobile:
- Hamburger menu
- Stacked forms
- Horizontally scrollable data tables
- Full-width buttons
- Compact header

Make sure there is no horizontal page overflow.

---

# 22. REALISTIC DATA

Use:

20 courses

10 fictional instructors

Multiple categories

Multiple course modules

Multiple learners

Payment records

Enrollment records

Certificates

Use fictional data only.

---

# 23. FINAL GOAL

The final website should feel like:

A formal Indian educational/skill-development portal with:

- Government-portal-style UI
- Course database
- Learner registration
- Learner login
- Course enrollment
- Payment gateway
- Razorpay integration
- Payment receipt
- Payment history
- Learning dashboard
- Course progress
- Certificates
- Helpdesk
- Notices
- Search
- Filters
- Tables
- Formal documentation

It should be **realistic and functional**, but must clearly remain a fictional private platform and must not impersonate an actual Indian government website.