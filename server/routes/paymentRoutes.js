const express = require('express');
const router = express.Router();
const razorpay = require('../services/razorpayService');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

// Simulated database
const coursesPath = path.join(__dirname, '../data/courses.js');
let courses = [];
try {
    const data = fs.readFileSync(coursesPath, 'utf8');
    // For simplicity, we are exporting a module or reading it directly. Since it's just an array, we can require it.
    courses = require('../data/courses.js');
} catch (err) {
    console.error("Error reading courses data:", err);
}

// 1. Create Order
router.post('/create-order', async (req, res) => {
    try {
        const { courseId } = req.body;

        if (!courseId) {
            return res.status(400).json({ error: 'Course ID is required' });
        }

        // Validate course
        const course = courses.find(c => c.id === courseId);
        if (!course) {
            return res.status(404).json({ error: 'Course not found' });
        }

        // Retrieve price from backend directly to prevent tampering
        const amountInPaise = course.price * 100;

        const options = {
            amount: amountInPaise,
            currency: 'INR',
            receipt: `receipt_course_${courseId}_${Date.now()}`,
            notes: {
                courseId: course.id,
                courseName: course.title
            }
        };

        const order = await razorpay.orders.create(options);

        if (!order) {
            return res.status(500).json({ error: 'Failed to create Razorpay order' });
        }

        res.json({
            success: true,
            orderId: order.id,
            amount: order.amount,
            currency: order.currency,
            key: process.env.RAZORPAY_KEY_ID // Send public key to frontend
        });
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ error: 'Internal server error while creating order' });
    }
});

// 2. Verify Payment
router.post('/verify-payment', (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, courseId } = req.body;

        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
            return res.status(400).json({ error: 'Payment details missing' });
        }

        // Verify signature
        const secret = process.env.RAZORPAY_KEY_SECRET;
        
        const body = razorpay_order_id + "|" + razorpay_payment_id;
        
        const expectedSignature = crypto
            .createHmac('sha256', secret)
            .update(body.toString())
            .digest('hex');
            
        const isAuthentic = expectedSignature === razorpay_signature;

        if (isAuthentic) {
            // Payment successful!
            // In a real application, save enrollment to database here
            
            res.json({
                success: true,
                message: 'Payment verified successfully',
                paymentId: razorpay_payment_id
            });
        } else {
            res.status(400).json({
                success: false,
                error: 'Invalid payment signature'
            });
        }
    } catch (error) {
        console.error('Error verifying payment:', error);
        res.status(500).json({ error: 'Internal server error while verifying payment' });
    }
});

module.exports = router;
