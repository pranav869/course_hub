/* ==========================================================================
   COURSEHUB LEARNING PORTAL — SHARED JAVASCRIPT UTILITIES (app.js)
   Fictional Private Educational Portal adhering to Formal Portal UI Conventions
   ========================================================================== */

// --- 1. LOCAL STORE & USER SESSION ---
const GovStore = {
  USER_KEY: 'gov_portal_user_v3',
  PAYMENTS_KEY: 'gov_portal_payments_v3',
  PROGRESS_KEY: 'gov_portal_progress_v3',

  getCurrentUser() {
    try {
      const stored = localStorage.getItem(this.USER_KEY);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.warn('Error reading user:', e);
    }
    // Default demo learner
    const defaultUser = {
      id: 'demo_user',
      name: 'PRANAV EASHWARAN G',
      email: 'pranav@example.in',
      phone: '+91 98765 43210',
      dob: '1998-05-14',
      gender: 'Male',
      state: 'Tamil Nadu',
      district: 'Chennai',
      learnerId: 'CH-2026-9482',
      regDate: '15-Aug-2026',
      enrolledCourses: ['course_001'],
      isLoggedIn: true
    };
    this.saveUser(defaultUser);
    return defaultUser;
  },

  saveUser(user) {
    try {
      localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    } catch (e) {
      console.error(e);
    }
  },

  getEnrollments() {
    const user = this.getCurrentUser();
    return user.enrolledCourses || ['course_001'];
  },

  addEnrollment(courseId) {
    const user = this.getCurrentUser();
    if (!user.enrolledCourses) user.enrolledCourses = [];
    if (!user.enrolledCourses.includes(courseId)) {
      user.enrolledCourses.push(courseId);
      this.saveUser(user);
    }
  },

  isEnrolled(courseId) {
    return this.getEnrollments().includes(courseId);
  },

  getPayments() {
    try {
      const stored = localStorage.getItem(this.PAYMENTS_KEY);
      if (stored) return JSON.parse(stored);
    } catch (e) {}
    const defaultPayments = [
      {
        receiptNo: 'CH-RCP-2026-904128',
        paymentId: 'pay_demo_8829104',
        orderId: 'order_demo_102938',
        courseId: 'course_001',
        courseTitle: 'Complete Web Development Bootcamp 2026',
        courseCode: 'CSE-FSWD-001',
        amount: 7499,
        date: '2026-10-05T10:30:00.000Z',
        status: 'SUCCESS'
      }
    ];
    this.savePayments(defaultPayments);
    return defaultPayments;
  },

  savePayments(payments) {
    try {
      localStorage.setItem(this.PAYMENTS_KEY, JSON.stringify(payments));
    } catch (e) {}
  },

  addPayment(receipt) {
    const list = this.getPayments();
    list.unshift(receipt);
    this.savePayments(list);
    this.addEnrollment(receipt.courseId);
  },

  getProgress(courseId) {
    try {
      const stored = localStorage.getItem(this.PROGRESS_KEY);
      const data = stored ? JSON.parse(stored) : {};
      return data[courseId] || (courseId === 'course_001' ? 65 : 0);
    } catch (e) {
      return 0;
    }
  },

  setProgress(courseId, percent) {
    try {
      const stored = localStorage.getItem(this.PROGRESS_KEY);
      const data = stored ? JSON.parse(stored) : {};
      data[courseId] = percent;
      localStorage.setItem(this.PROGRESS_KEY, JSON.stringify(data));
    } catch (e) {}
  }
};

// --- 2. FORMATTERS ---
function formatINR(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
}

function formatGovDate(dateStr) {
  if (!dateStr) return '10-Oct-2026';
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  const day = String(d.getDate()).padStart(2, '0');
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const month = months[d.getMonth()];
  const year = d.getFullYear();
  return `${day}-${month}-${year}`;
}

// Convert number to Indian currency words
function numberToWordsINR(amount) {
  const a = ['', 'One ', 'Two ', 'Three ', 'Four ', 'Five ', 'Six ', 'Seven ', 'Eight ', 'Nine ', 'Ten ', 'Eleven ', 'Twelve ', 'Thirteen ', 'Fourteen ', 'Fifteen ', 'Sixteen ', 'Seventeen ', 'Eighteen ', 'Nineteen '];
  const b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

  function inWords(num) {
    if ((num = num.toString()).length > 9) return 'Overflow';
    const n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
    if (!n) return '';
    let str = '';
    str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'Crore ' : '';
    str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'Lakh ' : '';
    str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'Thousand ' : '';
    str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'Hundred ' : '';
    str += (n[5] != 0) ? ((str != '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) : '';
    return str.trim();
  }
  return 'Rupees ' + inWords(amount) + ' Only';
}

// --- 3. FICTIONAL GOVERNMENT / EDUCATIONAL CREST SEAL (SVG) ---
function getPortalSealSvg(size = 60) {
  return `
    <svg width="${size}" height="${size}" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="CourseHub Official Seal">
      <!-- Outer Decorative Rings -->
      <circle cx="50" cy="50" r="48" stroke="#003366" stroke-width="2.5" fill="#ffffff" />
      <circle cx="50" cy="50" r="44" stroke="#c59b27" stroke-width="1.5" />
      <circle cx="50" cy="50" r="42" stroke="#003366" stroke-width="1" stroke-dasharray="2 2" />
      <!-- Inner Dark Blue Field -->
      <circle cx="50" cy="50" r="30" fill="#002244" />
      <!-- Torch of Knowledge / Wisdom -->
      <path d="M48 30 L52 30 L53 45 L47 45 Z" fill="#c59b27" />
      <!-- Flame in Saffron & Gold -->
      <path d="M50 20 C46 25 45 28 50 30 C55 28 54 25 50 20 Z" fill="#ff9933" />
      <!-- Open Book / Learning Emblem -->
      <path d="M38 52 C44 50 49 51 50 54 C51 51 56 50 62 52 L62 60 C56 58 51 59 50 62 C49 59 44 58 38 60 Z" fill="#ffffff" />
      <!-- Laurel Wreath Leaves (Left & Right) -->
      <path d="M32 38 C30 42 30 48 33 52 C31 48 32 44 34 40 Z" fill="#c59b27" />
      <path d="M68 38 C70 42 70 48 67 52 C69 48 68 44 66 40 Z" fill="#c59b27" />
      <!-- Star of Excellence at base -->
      <polygon points="50,68 51.5,72 55,72 52,74 53.5,78 50,75.5 46.5,78 48,74 45,72 48.5,72" fill="#c59b27" />
    </svg>
  `;
}

// --- 4. STANDARDIZED PORTAL HEADER RENDERER ---
function renderGovPortalHeader(activeId = '') {
  const headerContainer = document.getElementById('gov-header-root');
  if (!headerContainer) return;

  const user = GovStore.getCurrentUser();
  const enrolledCount = GovStore.getEnrollments().length;

  headerContainer.innerHTML = `
    <!-- Top Tricolor Accent Line -->
    <div class="gov-tricolor-strip"></div>

    <!-- Accessibility & Utility Top Bar -->
    <div class="gov-top-bar">
      <div class="gov-container">
        <div class="gov-top-left">
          <span>🇮🇳 <strong>CourseHub Learning Portal</strong> | Official Digital Skills Initiative</span>
          <span class="gov-divider">|</span>
          <span id="gov-live-clock">Saturday, 10-Oct-2026</span>
        </div>
        <div class="gov-top-right">
          <a href="#main-content" title="Skip to main content">Skip to Main Content</a>
          <span class="gov-divider">|</span>
          <a href="helpdesk.html" title="Screen Reader Information">Screen Reader Access</a>
          <span class="gov-divider">|</span>
          <div style="display:flex; align-items:center; gap:2px;">
            <span style="font-size:10px; margin-right:2px;">Text:</span>
            <button class="gov-text-size-btn" onclick="setPortalFontSize('small')" title="Decrease Text Size">A-</button>
            <button class="gov-text-size-btn active" onclick="setPortalFontSize('normal')" title="Default Text Size">A</button>
            <button class="gov-text-size-btn" onclick="setPortalFontSize('large')" title="Increase Text Size">A+</button>
          </div>
          <span class="gov-divider">|</span>
          <select class="gov-lang-select" onchange="switchPortalLanguage(this.value)" aria-label="Language Selector">
            <option value="en" selected>English</option>
            <option value="hi">हिन्दी (Hindi)</option>
          </select>
          <span class="gov-divider">|</span>
          <a href="helpdesk.html">Contact Us</a>
        </div>
      </div>
    </div>

    <!-- Main Portal Branding Header -->
    <header class="gov-main-header">
      <div class="gov-container gov-header-inner">
        <a href="index.html" class="gov-brand" title="CourseHub Learning Portal Home">
          <div class="gov-emblem">
            ${getPortalSealSvg(62)}
          </div>
          <div class="gov-brand-text">
            <h1>CourseHub Learning Portal</h1>
            <div class="gov-subtitle">Online Learning & Skill Development Portal</div>
            <div class="gov-disclaimer-pill">A Fictional Private Educational Portal • Test Gateway</div>
          </div>
        </a>

        <div class="gov-header-right">
          <div class="gov-helpline-box">
            <div class="gov-helpline-title">Learner Support Toll-Free</div>
            <div class="gov-helpline-number">📞 1800-266-9900</div>
          </div>
          <form class="gov-header-search" action="courses.html" method="GET">
            <input type="text" name="search" placeholder="Search Courses, Code, Topic..." aria-label="Search Courses" required>
            <button type="submit">Search</button>
          </form>
        </div>
      </div>
    </header>

    <!-- Navigation Bar -->
    <nav class="gov-navbar">
      <div class="gov-container gov-nav-container">
        <button class="gov-mobile-toggle" onclick="toggleGovMobileMenu()" aria-label="Toggle Navigation">
          ☰ MENU
        </button>
        <ul class="gov-nav-menu" id="gov-nav-links">
          <li class="gov-nav-item"><a href="index.html" class="gov-nav-link ${activeId === 'home' ? 'active' : ''}">Home</a></li>
          <li class="gov-nav-item"><a href="courses.html" class="gov-nav-link ${activeId === 'courses' ? 'active' : ''}">Course Search</a></li>
          <li class="gov-nav-item"><a href="courses.html?filter=categories" class="gov-nav-link ${activeId === 'categories' ? 'active' : ''}">Categories</a></li>
          <li class="gov-nav-item"><a href="my-courses.html" class="gov-nav-link ${activeId === 'my-courses' ? 'active' : ''}">My Courses (${enrolledCount})</a></li>
          <li class="gov-nav-item"><a href="dashboard.html" class="gov-nav-link ${activeId === 'dashboard' ? 'active' : ''}">Learner Dashboard</a></li>
          <li class="gov-nav-item"><a href="payment-history.html" class="gov-nav-link ${activeId === 'payments' ? 'active' : ''}">Fee History</a></li>
          <li class="gov-nav-item"><a href="helpdesk.html" class="gov-nav-link ${activeId === 'helpdesk' ? 'active' : ''}">Helpdesk & FAQs</a></li>
        </ul>
        <div class="gov-nav-user-area">
          <a href="dashboard.html" class="gov-nav-user-btn" title="Logged in as ${user.name}">
            👤 ${user.name.split(' ')[0]} (${user.learnerId})
          </a>
        </div>
      </div>
    </nav>

    <!-- Announcement Ticker Bar -->
    <div class="gov-ticker-bar">
      <div class="gov-ticker-badge">NOTICES & UPDATES</div>
      <div class="gov-ticker-marquee">
        <div class="gov-ticker-content">
          ★ Important Notice: Online registration and fee payment for October 2026 certification batches are now active. 
          &nbsp;&nbsp;&nbsp;★ Mandatory: Verify course syllabus, code, and eligibility before online fee payment. 
          &nbsp;&nbsp;&nbsp;★ Razorpay 256-bit encrypted secure payment gateway active for UPI, NetBanking, Debit/Credit Cards. 
          &nbsp;&nbsp;&nbsp;★ Digital verified certificates are issued directly upon course completion with verification QR code.
        </div>
      </div>
    </div>
  `;

  // Start live clock
  updatePortalClock();
}

// Live Clock in Indian Format
function updatePortalClock() {
  const el = document.getElementById('gov-live-clock');
  if (!el) return;
  const now = new Date();
  const options = {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  };
  el.textContent = now.toLocaleString('en-IN', options) + ' IST';
}
setInterval(updatePortalClock, 1000);

// --- 5. STANDARDIZED PORTAL FOOTER RENDERER ---
function renderGovPortalFooter() {
  const footerContainer = document.getElementById('gov-footer-root');
  if (!footerContainer) return;

  footerContainer.innerHTML = `
    <footer class="gov-footer">
      <div class="gov-container">
        <div class="gov-footer-grid">
          <div class="gov-footer-col">
            <div style="display:flex; align-items:center; gap:10px; margin-bottom:10px;">
              ${getPortalSealSvg(42)}
              <h4 style="margin:0; color:#ff9933;">CourseHub Learning Portal</h4>
            </div>
            <p style="color:#cfd8dc; font-size:12px; margin-bottom:10px;">
              A comprehensive online skill development and digital vocational education portal providing industry-aligned curriculum, verifiable digital certifications, and secure online fee payment.
            </p>
            <p style="color:#b0bec5; font-size:11px;">
              📍 National Skills Complex, Sector 4, Technical Institutional Area, New Delhi - 110001<br>
              ✉️ Email: support@coursehub-portal.org | 📞 Helpline: 1800-266-9900
            </p>
          </div>

          <div class="gov-footer-col">
            <h4>Quick Links</h4>
            <ul class="gov-footer-links">
              <li><a href="index.html">Portal Home</a></li>
              <li><a href="courses.html">Course Directory</a></li>
              <li><a href="dashboard.html">Learner Dashboard</a></li>
              <li><a href="my-courses.html">Enrolled Courses</a></li>
              <li><a href="payment-history.html">Fee Payment History</a></li>
              <li><a href="certificate.html?courseId=course_001">Verify Certificate</a></li>
            </ul>
          </div>

          <div class="gov-footer-col">
            <h4>Support & Help</h4>
            <ul class="gov-footer-links">
              <li><a href="helpdesk.html">Central Helpdesk</a></li>
              <li><a href="helpdesk.html#faqs">Frequently Asked Questions</a></li>
              <li><a href="login.html">Learner Login</a></li>
              <li><a href="register.html">New Registration</a></li>
              <li><a href="checkout.html?courseId=course_001">Online Fee Payment</a></li>
            </ul>
          </div>

          <div class="gov-footer-col">
            <h4>Portal Policies</h4>
            <ul class="gov-footer-links">
              <li><a href="helpdesk.html">Terms & Conditions</a></li>
              <li><a href="helpdesk.html">Privacy Policy</a></li>
              <li><a href="helpdesk.html">Fee Refund Guidelines</a></li>
              <li><a href="helpdesk.html">Hyperlinking Policy</a></li>
              <li><a href="helpdesk.html">Accessibility Statement</a></li>
            </ul>
          </div>
        </div>

        <div class="gov-disclaimer-box">
          <strong>IMPORTANT STATUTORY DISCLAIMER:</strong> CourseHub Learning Portal is a fictional private educational demonstration platform designed for technical skill training and payment workflow demonstration. It is <strong>NOT</strong> an official Government of India website and is not affiliated with, authorized by, or operated by any Ministry, Department, or State Government. All trademarks and registered names belong to their respective holders.
        </div>
      </div>

      <div class="gov-footer-bottom">
        <div class="gov-container">
          <div>© 2026 CourseHub Learning Portal. All Rights Reserved.</div>
          <div>Last Reviewed & Updated: 10 October 2026 | Portal Version 3.4.1</div>
          <div>Security: 256-bit SSL Encrypted • Razorpay Gateway Compliant</div>
        </div>
      </div>
    </footer>
  `;
}

// --- 6. ACCESSIBILITY TOGGLES ---
function setPortalFontSize(size) {
  document.body.classList.remove('font-small', 'font-normal', 'font-large');
  document.body.classList.add('font-' + size);
  document.querySelectorAll('.gov-text-size-btn').forEach(btn => btn.classList.remove('active'));
  const activeBtn = Array.from(document.querySelectorAll('.gov-text-size-btn')).find(b => b.textContent.includes(size === 'small' ? 'A-' : size === 'large' ? 'A+' : 'A'));
  if (activeBtn) activeBtn.classList.add('active');
}

function switchPortalLanguage(lang) {
  if (lang === 'hi') {
    showGovToast('भाषा परिवर्तन', 'पोर्टल का हिन्दी संस्करण लोड हो रहा है। (Hindi localization enabled)', 'info');
  } else {
    showGovToast('Language', 'Switched to English interface.', 'info');
  }
}

function toggleGovMobileMenu() {
  const menu = document.getElementById('gov-nav-links');
  if (menu) menu.classList.toggle('show');
}

// --- 7. TOAST SYSTEM ---
function showGovToast(title, message, type = 'info') {
  let container = document.getElementById('gov-toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'gov-toast-container';
    container.className = 'gov-toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `gov-toast ${type}`;
  toast.innerHTML = `
    <div class="gov-toast-title">${title}</div>
    <div>${message}</div>
  `;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.transition = 'opacity 0.3s';
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

// --- 8. CAPTCHA GENERATOR ---
function generateGovCaptcha() {
  const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
  let captcha = '';
  for (let i = 0; i < 5; i++) {
    captcha += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return captcha;
}

// --- 9. SECURE RAZORPAY PAYMENT ORCHESTRATION ---
async function initiateGovRazorpayPayment(courseId, customLearnerName) {
  const user = GovStore.getCurrentUser();
  const learnerName = customLearnerName || user.name;

  showGovToast('Processing Order', 'Communicating with CourseHub order service...', 'info');

  try {
    // 1. Create order on backend (Backend calculates exact price securely in Paise)
    const orderRes = await fetch('/api/create-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ courseId })
    });

    const orderData = await orderRes.json();
    if (!orderRes.ok || !orderData.success) {
      throw new Error(orderData.error || 'Failed to generate payment order');
    }

    const { orderId, amount, currency, courseName, courseCode, key, isSandbox } = orderData;

    // Check if Razorpay SDK is loaded
    if (typeof Razorpay !== 'undefined' && key && !key.includes('placeholder')) {
      // 2. Open standard Razorpay Checkout Modal
      const options = {
        key: key,
        amount: amount,
        currency: currency,
        name: 'CourseHub Learning Portal',
        description: `Fee Payment: ${courseCode} - ${courseName}`,
        image: 'data:image/svg+xml;utf8,' + encodeURIComponent(getPortalSealSvg(100)),
        order_id: orderId,
        prefill: {
          name: learnerName,
          email: user.email,
          contact: user.phone
        },
        theme: {
          color: '#003366'
        },
        notes: {
          learnerId: user.learnerId,
          courseCode: courseCode
        },
        handler: async function (response) {
          showGovToast('Verifying Signature', 'Cryptographically verifying payment with server...', 'info');
          try {
            const verifyRes = await fetch('/api/verify-payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                courseId: courseId,
                learnerName: learnerName,
                userId: user.id
              })
            });

            const verifyData = await verifyRes.json();
            if (verifyRes.ok && verifyData.success) {
              const receipt = verifyData.receipt;
              GovStore.addPayment(receipt);
              window.location.href = `success.html?receiptNo=${receipt.receiptNo}&courseId=${courseId}&paymentId=${receipt.paymentId}`;
            } else {
              alert('Signature verification failed: ' + (verifyData.error || 'Payment not accepted'));
            }
          } catch (err) {
            console.error(err);
            alert('Verification network error: ' + err.message);
          }
        },
        modal: {
          ondismiss: function () {
            showGovToast('Payment Cancelled', 'Fee payment was cancelled by user.', 'warning');
          }
        }
      };

      const rzp = new Razorpay(options);
      rzp.on('payment.failed', function (response) {
        alert('Payment Failed: ' + response.error.description);
      });
      rzp.open();

    } else {
      // Test Mode / Sandbox Simulation Flow (When placeholder API keys are configured)
      console.log('Running in Razorpay Test / Sandbox verification mode');
      const simulatedPaymentId = 'pay_sim_' + Math.floor(1000000 + Math.random() * 9000000);
      
      const verifyRes = await fetch('/api/verify-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          razorpay_order_id: orderId,
          razorpay_payment_id: simulatedPaymentId,
          courseId: courseId,
          learnerName: learnerName,
          userId: user.id
        })
      });

      const verifyData = await verifyRes.json();
      if (verifyRes.ok && verifyData.success) {
        const receipt = verifyData.receipt;
        GovStore.addPayment(receipt);
        showGovToast('Payment Success', 'Fee payment recorded successfully!', 'success');
        setTimeout(() => {
          window.location.href = `success.html?receiptNo=${receipt.receiptNo}&courseId=${courseId}&paymentId=${receipt.paymentId}`;
        }, 1200);
      } else {
        throw new Error(verifyData.error || 'Test verification failed');
      }
    }

  } catch (error) {
    console.error('Payment Error:', error);
    showGovToast('Payment Error', error.message, 'error');
    alert('Payment Initiation Error: ' + error.message);
  }
}
