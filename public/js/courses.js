document.addEventListener('DOMContentLoaded', async () => {
    const allCoursesContainer = document.getElementById('all-courses');
    
    if (allCoursesContainer) {
        try {
            const response = await fetch('/api/courses');
            if (!response.ok) throw new Error('Failed to fetch courses');
            
            const courses = await response.json();
            
            allCoursesContainer.innerHTML = courses.map(course => createCourseCard(course)).join('');
        } catch (error) {
            console.error(error);
            allCoursesContainer.innerHTML = `<div class="message error">Failed to load courses. Please try again later.</div>`;
        }
    }
});
