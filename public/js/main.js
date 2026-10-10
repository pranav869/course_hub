// Format currency to INR
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
    }).format(amount);
}

// Generate course card HTML
function createCourseCard(course) {
    const discount = Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100);
    
    return `
        <a href="/course.html?id=${course.id}" class="course-card glass">
            ${discount > 0 ? `<div class="discount-badge">${discount}% OFF</div>` : ''}
            <img src="${course.thumbnail}" alt="${course.title}" class="course-thumbnail">
            <div class="course-content">
                <div class="course-category">${course.category}</div>
                <h3 class="course-title">${course.title}</h3>
                <div class="course-instructor">${course.instructor}</div>
                <div class="course-meta">
                    <span><i class="fa-solid fa-star"></i> ${course.rating}</span>
                    <span style="color: var(--text-secondary);"><i class="fa-solid fa-user"></i> ${course.students.toLocaleString()}</span>
                </div>
                <div class="course-price-container">
                    <span class="course-price">${formatCurrency(course.price)}</span>
                    ${course.originalPrice > course.price ? `<span class="course-original-price">${formatCurrency(course.originalPrice)}</span>` : ''}
                </div>
            </div>
        </a>
    `;
}

// Main logic for index.html
document.addEventListener('DOMContentLoaded', async () => {
    const featuredContainer = document.getElementById('featured-courses');
    
    if (featuredContainer) {
        try {
            const response = await fetch('/api/courses');
            if (!response.ok) throw new Error('Failed to fetch courses');
            
            const courses = await response.json();
            
            // Just show first 4 courses on home page
            const featuredCourses = courses.slice(0, 4);
            
            featuredContainer.innerHTML = featuredCourses.map(course => createCourseCard(course)).join('');
        } catch (error) {
            console.error(error);
            featuredContainer.innerHTML = `<div class="message error">Failed to load courses. Please try again later.</div>`;
        }
    }
});
