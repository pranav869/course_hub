// Handle Razorpay Payment Flow
async function initiatePayment(courseId) {
    const payBtn = document.getElementById('pay-btn');
    const errorMsg = document.getElementById('error-message');
    
    try {
        // 1. Disable button and show loading state
        payBtn.innerHTML = '<div class="loader"></div> Processing...';
        payBtn.disabled = true;
        errorMsg.style.display = 'none';
        
        // 2. Request order creation from backend
        const orderResponse = await fetch('/api/create-order', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ courseId })
        });
        
        const orderData = await orderResponse.json();
        
        if (!orderResponse.ok || !orderData.success) {
            throw new Error(orderData.error || 'Failed to create order');
        }
        
        // 3. Configure Razorpay Checkout options
        const options = {
            key: orderData.key, // Public Key ID
            amount: orderData.amount, // Amount in paise
            currency: orderData.currency,
            name: "CourseHub", // Merchant name
            description: "Secure payment for CourseHub",
            order_id: orderData.orderId,
            handler: async function (response) {
                // 4. Handle successful payment client-side
                await verifyPayment(response, courseId);
            },
            prefill: {
                name: "Demo Student",
                email: "student@example.com",
                contact: "9999999999"
            },
            theme: {
                color: "#6c5ce7"
            },
            modal: {
                ondismiss: function() {
                    // Handle payment modal closure
                    payBtn.innerHTML = 'Complete Payment';
                    payBtn.disabled = false;
                    errorMsg.textContent = 'Payment cancelled. Please try again.';
                    errorMsg.style.display = 'block';
                }
            }
        };
        
        // 5. Open Razorpay Checkout
        const rzp = new Razorpay(options);
        rzp.on('payment.failed', function (response) {
            console.error("Payment failed:", response.error);
            payBtn.innerHTML = 'Complete Payment';
            payBtn.disabled = false;
            errorMsg.textContent = `Payment failed: ${response.error.description}`;
            errorMsg.style.display = 'block';
        });
        
        rzp.open();
        
    } catch (error) {
        console.error(error);
        payBtn.innerHTML = 'Complete Payment';
        payBtn.disabled = false;
        errorMsg.textContent = error.message || 'An unexpected error occurred.';
        errorMsg.style.display = 'block';
    }
}

// 6. Verify Payment on Backend
async function verifyPayment(paymentResponse, courseId) {
    const payBtn = document.getElementById('pay-btn');
    const errorMsg = document.getElementById('error-message');
    
    payBtn.innerHTML = '<div class="loader"></div> Verifying...';
    
    try {
        const verifyResponse = await fetch('/api/verify-payment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                razorpay_order_id: paymentResponse.razorpay_order_id,
                razorpay_payment_id: paymentResponse.razorpay_payment_id,
                razorpay_signature: paymentResponse.razorpay_signature,
                courseId: courseId
            })
        });
        
        const verifyData = await verifyResponse.json();
        
        if (verifyResponse.ok && verifyData.success) {
            // Save to local storage for demo purposes
            let myCourses = JSON.parse(localStorage.getItem('myCourses')) || [];
            if (!myCourses.includes(courseId)) {
                myCourses.push(courseId);
                localStorage.setItem('myCourses', JSON.stringify(myCourses));
            }
            
            // Redirect to success page
            window.location.href = `/success.html?payment_id=${paymentResponse.razorpay_payment_id}`;
        } else {
            throw new Error(verifyData.error || 'Payment verification failed');
        }
        
    } catch (error) {
        console.error(error);
        payBtn.innerHTML = 'Complete Payment';
        payBtn.disabled = false;
        errorMsg.textContent = `Error verifying payment: ${error.message}. Please contact support.`;
        errorMsg.style.display = 'block';
    }
}
