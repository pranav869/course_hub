# CourseHub Learning Portal

**CourseHub Learning Portal** is a production-grade online course and skill development portal designed with the visual conventions, high information density, and formal structure of an **Indian government educational portal** (while remaining a fictional private educational platform).

It features a full backend with **Node.js, Express, and Razorpay payment integration**, secure server-side HMAC-SHA256 signature verification, a comprehensive course registry, official fee challans, digital certificates, and a central helpdesk.

---

## 🏛️ Portal Design & Aesthetic (plan3.md)

- **Indian Government Education Portal Style**:
  - Top Tricolor accent line (Saffron, White, Green)
  - Accessibility bar (Font resizing `A-` `A` `A+`, Hindi/English language toggle, Toll-free helpline `1800-266-9900`, live Indian Standard Time clock)
  - Formal circular educational seal/crest in Navy and Gold
  - Solid dark navy navigation bar (`#003366`)
  - Marquee announcement ticker (`[NOTICES & UPDATES]`)
  - 3-column portal homepage layout: *Important Links* (Left), *Search & Featured Offerings* (Center), *Circulars & Statistics* (Right)
  - Dense tabular data layouts with alternating row shading and dark navy headers
  - Rectangular government buttons and status badges (`ACTIVE`, `SUCCESS`, `PENDING`, `IN PROGRESS`)
  - Official Challan fee assessment invoice and printable receipts with `PAID & VERIFIED` stamp
  - Verifiable digital certificates with QR validation codes
  - Central Grievance Redressal Helpdesk with ticket generation and tracking

---

## ⚙️ Tech Stack

- **Frontend**: HTML5, CSS3 (Vanilla CSS Design System), Vanilla JavaScript (No React/Next.js)
- **Backend**: Node.js, Express.js
- **Payment Gateway**: Razorpay Node SDK & Razorpay Checkout Modal
- **Security**: Server-side price calculation in Paise, HMAC-SHA256 signature verification with `RAZORPAY_KEY_SECRET`

---

## 📁 Portal Pages

1. **Portal Home (`index.html`)**: 3-column portal homepage with Important Links, Course Search form, Featured courses registry table, Categories grid, and national statistics.
2. **Course Search & Directory (`courses.html`)**: Search results table with category, mode, level filters, course codes (e.g. `CSE-FSWD-001`), fees (all ≥ ₹6,000), and layout toggle (Table / Grid).
3. **Course Master Sheet (`course.html`)**: Information table, syllabus modules table, learning objectives, eligibility criteria, and sticky fee enrollment card.
4. **Learner Login (`login.html`)**: Formal login portal with username, password, security captcha, and instructions.
5. **New Learner Registration (`register.html`)**: Multi-field form with State/District dropdowns, ID generation (`CH-2026-XXXX`), and captcha verification.
6. **Learner Dashboard (`dashboard.html`)**: Sidebar navigation, learner identity badge, enrolled courses with progress bars, fee receipts, and metrics.
7. **Fee Payment Challan (`checkout.html`)**: Formal fee assessment invoice, learner particulars, tuition breakdown, Razorpay gateway selection, and payment trigger.
8. **Electronic Payment Receipt (`success.html`)**: Printable official receipt with `PAID & VERIFIED` stamp, Receipt No, Razorpay Payment ID, and action buttons.
9. **Registered Courses (`my-courses.html`)**: Enrolled courses registry table with progress % and learning classroom link.
10. **LMS Learning Classroom (`learn.html`)**: Module syllabus sidebar with lecture checkmarks, video player, previous/next controls, and lecture notes.
11. **Fee Payment History (`payment-history.html`)**: Audit trail of all fee transactions with downloadable receipts.
12. **Verifiable Digital Certificate (`certificate.html`)**: Institutional course completion certificate with CourseHub seal, distinction grade, and verification ID.
13. **Central Helpdesk (`helpdesk.html`)**: Grievance redressal filing form with ticket generation, ticket tracking, and FAQs accordion.

---

## 💳 Razorpay Configuration & Test Mode

1. Configure your Razorpay Test Mode credentials in `.env`:
   ```env
   RAZORPAY_KEY_ID=your_test_key_id
   RAZORPAY_KEY_SECRET=your_test_key_secret
   PORT=3000
   ```
2. In Test Mode with placeholder credentials, the server automatically enables the interactive sandbox flow allowing complete end-to-end testing of order creation, verification, enrollment, and receipt generation.
3. When valid Razorpay credentials are added, the system automatically uses the live Razorpay SDK and verifies transactions with `crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)`.

---

## 🚀 Running Locally

```bash
cd coursehub
npm install
node server/server.js
```

Open `http://localhost:3000` in your web browser.
