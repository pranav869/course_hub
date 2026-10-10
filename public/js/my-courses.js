document.addEventListener('DOMContentLoaded', async () => {
    const container = document.getElementById('my-courses');
    
    if (container) {
        try {
            // Get enrolled courses from local storage (demo purposes)
            const enrolledCourseIds = JSON.parse(localStorage.getItem('myCourses')) || [];
            
            if (enrolledCourseIds.length === 0) {
                container.innerHTML = `
                    <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 0;">
                        <i class="fa-solid fa-folder-open" style="font-size: 4rem; color: var(--text-secondary); margin-bottom: 1rem;"></i>
                        <h2 style="color: var(--text-secondary); margin-bottom: 1.5rem;">You haven't enrolled in any courses yet.</h2>
                        <a href="/courses.html" class="btn btn-primary">Browse Courses</a>
                    </div>
                `;
                return;
            }
            
            // Fetch all courses
            const response = await fetch('/api/courses');
            if (!response.ok) throw new Error('Failed to fetch courses');
            
            const allCourses = await response.json();
            
            // Filter courses user has purchased
            const myCourses = allCourses.filter(course => enrolledCourseIds.includes(course.id));
            
            // Create special card for enrolled courses
            container.innerHTML = myCourses.map(course => {
                return `
                    <div class="course-card glass">
                        <img src="${course.thumbnail}" alt="${course.title}" class="course-thumbnail">
                        <div class="course-content">
                            <div class="course-category">${course.category}</div>
                            <h3 class="course-title">${course.title}</h3>
                            <div class="course-instructor">${course.instructor}</div>
                            
                            <div style="margin-top: auto;">
                                <div style="display: flex; justify-content: space-between; font-size: 0.8rem; margin-bottom: 0.5rem; color: var(--text-secondary);">
                                    <span>0% Complete</span>
                                </div>
                                <div style="width: 100%; background: rgba(255,255,255,0.1); height: 6px; border-radius: 3px; margin-bottom: 1rem;">
                                    <div style="width: 0%; background: var(--primary-color); height: 100%; border-radius: 3px;"></div>
                                </div>
                                
                                <button class="btn btn-outline btn-block">Continue Learning</button>
                            </div>
                        </div>
                    </div>
                `;
            }).join('');
            
        } catch (error) {
            console.error(error);
            container.innerHTML = `<div class="message error">Failed to load your courses. Please try again later.</div>`;
        }
    }
});
