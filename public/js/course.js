document.addEventListener('DOMContentLoaded', async () => {
    const container = document.getElementById('course-details-container');
    
    // Get course ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const courseId = urlParams.get('id');
    
    if (!courseId) {
        container.innerHTML = `<div class="message error" style="margin: 2rem;">Course not found.</div>`;
        return;
    }
    
    try {
        const response = await fetch(`/api/courses/${courseId}`);
        if (!response.ok) {
            if (response.status === 404) throw new Error('Course not found');
            throw new Error('Failed to fetch course details');
        }
        
        const course = await response.json();
        
        document.title = `${course.title} | CourseHub`;
        
        const discount = Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100);
        
        container.innerHTML = `
            <div class="course-details-hero">
                <div class="course-info">
                    <div style="color: var(--secondary-color); font-weight: 600; margin-bottom: 1rem;">${course.category}</div>
                    <h1 style="font-size: 2.5rem; margin-bottom: 1rem;">${course.title}</h1>
                    <p style="font-size: 1.2rem; color: var(--text-secondary); margin-bottom: 1.5rem; line-height: 1.6;">${course.description}</p>
                    
                    <div class="course-meta" style="font-size: 1.1rem; margin-bottom: 2rem;">
                        <span><i class="fa-solid fa-star"></i> ${course.rating} Rating</span>
                        <span><i class="fa-solid fa-users"></i> ${course.students.toLocaleString()} Students Enrolled</span>
                        <span><i class="fa-regular fa-clock"></i> ${course.duration}</span>
                        <span><i class="fa-solid fa-book"></i> ${course.lessons} Lessons</span>
                    </div>
                    
                    <div style="margin-top: 3rem;">
                        <h2>What you'll learn</h2>
                        <ul style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; list-style: none; padding: 0;">
                            <li><i class="fa-solid fa-check" style="color: var(--success-color); margin-right: 0.5rem;"></i> Master the fundamentals and advanced concepts.</li>
                            <li><i class="fa-solid fa-check" style="color: var(--success-color); margin-right: 0.5rem;"></i> Build real-world projects from scratch.</li>
                            <li><i class="fa-solid fa-check" style="color: var(--success-color); margin-right: 0.5rem;"></i> Industry best practices and design patterns.</li>
                            <li><i class="fa-solid fa-check" style="color: var(--success-color); margin-right: 0.5rem;"></i> Job-ready skills and portfolio building.</li>
                        </ul>
                    </div>
                </div>
                
                <div class="course-purchase-card glass">
                    <img src="${course.thumbnail}" alt="${course.title}">
                    
                    <div style="display: flex; align-items: baseline; gap: 1rem; margin-bottom: 1rem;">
                        <span style="font-size: 2.5rem; font-weight: 700;">${formatCurrency(course.price)}</span>
                        ${course.originalPrice > course.price ? `<span style="font-size: 1.2rem; text-decoration: line-through; color: var(--text-secondary);">${formatCurrency(course.originalPrice)}</span>` : ''}
                    </div>
                    
                    ${discount > 0 ? `<div style="color: var(--danger-color); font-weight: bold; margin-bottom: 1.5rem;">${discount}% OFF</div>` : ''}
                    
                    <button id="buy-now-btn" class="btn btn-primary btn-block" style="font-size: 1.2rem; padding: 1rem; margin-bottom: 1rem;">
                        Buy Now
                    </button>
                    
                    <p style="text-align: center; color: var(--text-secondary); font-size: 0.9rem;">
                        30-Day Money-Back Guarantee
                    </p>
                    
                    <div style="margin-top: 2rem;">
                        <h4 style="margin-bottom: 0.5rem; font-size: 1rem;">This course includes:</h4>
                        <ul style="list-style: none; padding: 0; color: var(--text-secondary); font-size: 0.9rem; line-height: 2;">
                            <li><i class="fa-solid fa-video" style="width: 20px;"></i> ${course.duration} on-demand video</li>
                            <li><i class="fa-solid fa-file" style="width: 20px;"></i> 15 articles</li>
                            <li><i class="fa-solid fa-mobile-screen" style="width: 20px;"></i> Access on mobile and TV</li>
                            <li><i class="fa-solid fa-certificate" style="width: 20px;"></i> Certificate of completion</li>
                        </ul>
                    </div>
                </div>
            </div>
        `;
        
        // Setup Buy Now button
        document.getElementById('buy-now-btn').addEventListener('click', () => {
            window.location.href = `/checkout.html?id=${course.id}`;
        });
        
    } catch (error) {
        console.error(error);
        container.innerHTML = `<div class="message error" style="margin: 2rem;">${error.message || 'Failed to load course details.'}</div>`;
    }
});
