document.addEventListener('DOMContentLoaded', async () => {
    const container = document.getElementById('checkout-container');
    
    // Get course ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const courseId = urlParams.get('id');
    
    if (!courseId) {
        container.innerHTML = `<div class="message error">Course not found. Return to <a href="/courses.html" style="text-decoration: underline;">courses</a>.</div>`;
        return;
    }
    
    try {
        const response = await fetch(`/api/courses/${courseId}`);
        if (!response.ok) throw new Error('Course not found');
        
        const course = await response.json();
        
        const discountAmount = course.originalPrice - course.price;
        
        container.innerHTML = `
            <h2>Checkout</h2>
            
            <div class="checkout-item">
                <img src="${course.thumbnail}" alt="${course.title}">
                <div>
                    <h3 style="margin-bottom: 0.5rem;">${course.title}</h3>
                    <div style="color: var(--text-secondary); margin-bottom: 1rem;">Instructor: ${course.instructor}</div>
                    <div style="font-weight: bold; font-size: 1.2rem;">${formatCurrency(course.price)}</div>
                </div>
            </div>
            
            <div class="checkout-summary">
                <h3 style="margin-bottom: 1.5rem;">Order Summary</h3>
                <div class="summary-row">
                    <span>Original Price:</span>
                    <span>${formatCurrency(course.originalPrice)}</span>
                </div>
                <div class="summary-row" style="color: var(--success-color);">
                    <span>Discount:</span>
                    <span>-${formatCurrency(discountAmount)}</span>
                </div>
                <div class="summary-row total">
                    <span>Total:</span>
                    <span>${formatCurrency(course.price)}</span>
                </div>
            </div>
            
            <div class="secure-payment">
                <i class="fa-solid fa-lock"></i> Secure payment for CourseHub
            </div>
            
            <div id="error-message" class="message error"></div>
            
            <button id="pay-btn" class="btn btn-primary btn-block" style="font-size: 1.2rem; padding: 1rem;">
                Complete Payment
            </button>
        `;
        
        document.getElementById('pay-btn').addEventListener('click', () => {
            initiatePayment(course.id);
        });
        
    } catch (error) {
        console.error(error);
        container.innerHTML = `<div class="message error">Failed to load checkout details.</div>`;
    }
});
