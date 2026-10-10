const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const crypto = require('crypto');

// Load env vars
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Load data
const courses = require('./data/courses.js');
const instructors = require('./data/instructors.js');

// In-memory enrollment store (replace with DB in production)
const enrollments = {};

// -----------------------------------------------------------------------
// COURSE ROUTES
// -----------------------------------------------------------------------

// GET all courses (supports search & category filter)
app.get('/api/courses', (req, res) => {
    let result = [...courses];
    const { search, category, sort, level, minPrice, maxPrice } = req.query;

    if (search) {
        const q = search.toLowerCase();
        result = result.filter(c =>
            c.title.toLowerCase().includes(q) ||
            c.description.toLowerCase().includes(q) ||
            (c.tags && c.tags.some(t => t.includes(q))) ||
            c.category.toLowerCase().includes(q)
        );
    }
    if (category) {
        result = result.filter(c => c.category.toLowerCase() === category.toLowerCase());
    }
    if (level) {
        result = result.filter(c => c.level.toLowerCase() === level.toLowerCase());
    }
    if (minPrice) {
        result = result.filter(c => c.price >= parseInt(minPrice));
    }
    if (maxPrice) {
        result = result.filter(c => c.price <= parseInt(maxPrice));
    }
    if (sort === 'popular') {
        result.sort((a, b) => b.students - a.students);
    } else if (sort === 'rating') {
        result.sort((a, b) => b.rating - a.rating);
    } else if (sort === 'price_low') {
        result.sort((a, b) => a.price - b.price);
    } else if (sort === 'price_high') {
        result.sort((a, b) => b.price - a.price);
    }

    res.json(result);
});

// GET course by ID
app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === req.params.id);
    if (course) {
        res.json(course);
    } else {
        res.status(404).json({ error: 'Course not found' });
    }
});

// -----------------------------------------------------------------------
// INSTRUCTOR ROUTES
// -----------------------------------------------------------------------

app.get('/api/instructors', (req, res) => {
    res.json(instructors);
});

app.get('/api/instructors/:id', (req, res) => {
    const instructor = instructors.find(i => i.id === req.params.id);
    if (!instructor) return res.status(404).json({ error: 'Instructor not found' });
    // Attach courses
    const instructorCourses = courses.filter(c => c.instructorId === instructor.id);
    res.json({ ...instructor, courses: instructorCourses });
});

// -----------------------------------------------------------------------
// ENROLLMENT / MY COURSES ROUTES
// -----------------------------------------------------------------------

app.get('/api/my-courses', (req, res) => {
    // Demo: use a fixed userId for now
    const userId = 'demo_user';
    const userEnrollments = enrollments[userId] || [];
    const myCourses = courses.filter(c => userEnrollments.includes(c.id));
    res.json(myCourses);
});

// -----------------------------------------------------------------------
// PAYMENT ROUTES
// -----------------------------------------------------------------------

// In-memory payment store
const payments = [
    {
        receiptNo: 'CH-RCP-2026-904128',
        paymentId: 'pay_demo_8829104',
        orderId: 'order_demo_102938',
        courseId: 'course_001',
        courseTitle: 'Complete Web Development Bootcamp 2026',
        courseCode: 'CSE-FSWD-001',
        amount: 7499,
        userId: 'demo_user',
        learnerName: 'PRANAV EASHWARAN G',
        date: new Date(Date.now() - 86400000 * 5).toISOString(),
        status: 'SUCCESS'
    }
];

// Pre-enroll demo_user in course_001 for demonstration
enrollments['demo_user'] = ['course_001'];

// Lazily initialize Razorpay to avoid crash if keys are missing
function getRazorpay() {
    const Razorpay = require('razorpay');
    return new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_placeholder',
        key_secret: process.env.RAZORPAY_KEY_SECRET || 'rzp_test_secret',
    });
}

app.post('/api/create-order', async (req, res) => {
    try {
        const { courseId } = req.body;
        if (!courseId) return res.status(400).json({ error: 'Course ID is required' });

        // Validate course - NEVER trust price from frontend
        const course = courses.find(c => c.id === courseId);
        if (!course) return res.status(404).json({ error: 'Course not found' });

        const amountInPaise = course.price * 100; // convert INR to paise
        const isPlaceholderKey = !process.env.RAZORPAY_KEY_ID || 
                                 process.env.RAZORPAY_KEY_ID.includes('placeholder') || 
                                 !process.env.RAZORPAY_KEY_SECRET ||
                                 process.env.RAZORPAY_KEY_SECRET.includes('placeholder');

        if (isPlaceholderKey) {
            // Test Mode Fallback when API keys have not yet been replaced with real credentials
            console.log(`[Test Mode] Generating simulated order for ${course.title} (₹${course.price})`);
            return res.json({
                success: true,
                orderId: 'order_test_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
                amount: amountInPaise,
                currency: 'INR',
                courseName: course.title,
                courseCode: course.code,
                key: process.env.RAZORPAY_KEY_ID || 'rzp_test_placeholder',
                isSandbox: true
            });
        }

        const razorpay = getRazorpay();
        const order = await razorpay.orders.create({
            amount: amountInPaise,
            currency: 'INR',
            receipt: `receipt_${courseId}_${Date.now()}`,
            notes: { courseId: course.id, courseName: course.title, courseCode: course.code }
        });

        res.json({
            success: true,
            orderId: order.id,
            amount: order.amount,
            currency: order.currency,
            courseName: course.title,
            courseCode: course.code,
            key: process.env.RAZORPAY_KEY_ID
        });
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ error: 'Failed to create payment order' });
    }
});

app.post('/api/verify-payment', (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, courseId, learnerName, userId: reqUserId } = req.body;

        if (!razorpay_order_id || !razorpay_payment_id) {
            return res.status(400).json({ error: 'Payment details missing' });
        }

        const isTestOrder = razorpay_order_id.startsWith('order_test_');

        if (!isTestOrder) {
            // SECURITY: Verify signature server-side using RAZORPAY_KEY_SECRET
            if (!razorpay_signature) {
                return res.status(400).json({ error: 'Signature missing for live transaction' });
            }
            const body = razorpay_order_id + '|' + razorpay_payment_id;
            const expectedSignature = crypto
                .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
                .update(body)
                .digest('hex');

            if (expectedSignature !== razorpay_signature) {
                return res.status(400).json({ success: false, error: 'Invalid payment signature' });
            }
        }

        // Payment verified — create enrollment
        const course = courses.find(c => c.id === courseId);
        const userId = reqUserId || 'demo_user';
        if (!enrollments[userId]) enrollments[userId] = [];
        if (courseId && !enrollments[userId].includes(courseId)) {
            enrollments[userId].push(courseId);
        }

        const receiptRecord = {
            receiptNo: `CH-RCP-2026-${Math.floor(100000 + Math.random() * 900000)}`,
            paymentId: razorpay_payment_id,
            orderId: razorpay_order_id,
            courseId: courseId,
            courseTitle: course ? course.title : 'Course Enrollment',
            courseCode: course ? course.code : 'CH-COURSE',
            amount: course ? course.price : 6000,
            userId: userId,
            learnerName: learnerName || 'PRANAV EASHWARAN G',
            date: new Date().toISOString(),
            status: 'SUCCESS'
        };

        payments.unshift(receiptRecord);

        res.json({
            success: true,
            message: 'Payment verified and enrollment created',
            paymentId: razorpay_payment_id,
            receipt: receiptRecord
        });
    } catch (error) {
        console.error('Error verifying payment:', error);
        res.status(500).json({ error: 'Internal server error during payment verification' });
    }
});

// GET Payment History
app.get('/api/payment-history', (req, res) => {
    const userId = req.query.userId || 'demo_user';
    const userPayments = payments.filter(p => p.userId === userId);
    res.json(userPayments);
});

// -----------------------------------------------------------------------
// START SERVER
// -----------------------------------------------------------------------
app.listen(PORT, () => {
    console.log(`✓ CourseHub server running on http://localhost:${PORT}`);
});
