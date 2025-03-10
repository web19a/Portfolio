// Theme Toggle
function toggleTheme() {
    const body = document.body;
    const themeIcon = document.querySelector('.theme-toggle i');
    body.classList.toggle('light-mode');
    themeIcon.classList.toggle('fa-sun');
    themeIcon.classList.toggle('fa-moon');
    localStorage.setItem('theme', body.classList.contains('light-mode') ? 'light' : 'dark');
}

// Project Data
const projects = [
    {
        id: 1,
        title: "E-Commerce Platform",
        tags: ["React", "Node.js"],
        description: "Full-stack shopping platform with payment integration",
        image: "project1.jpg"
    },
    {
        id: 2,
        title: "Portfolio Website",
        tags: ["JavaScript", "CSS"],
        description: "Responsive portfolio with dark mode and animations",
        image: "project2.jpg"
    }
];

// Scroll Animations
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                entry.target.classList.add('reveal');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('[data-scroll-animation]').forEach(el => observer.observe(el));
}

// Project Filtering
function renderProjects() {
    const searchQuery = document.getElementById('search-input').value.toLowerCase();
    const filter = document.getElementById('filter-select').value;
    
    const filteredProjects = projects.filter(project => 
        project.title.toLowerCase().includes(searchQuery) && 
        (filter === 'all' || project.tags.includes(filter))
    );

    document.getElementById('project-container').innerHTML = filteredProjects
        .map(project => `
            <div class="glass-card" data-scroll-animation="fade-up">
                ${project.image ? `<img src="${project.image}" alt="${project.title}" loading="lazy">` : ''}
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="tags">
                    ${project.tags.map(tag => `<span>${tag}</span>`).join('')}
                </div>
            </div>
        `).join('');
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Theme
    if(localStorage.getItem('theme') === 'light') {
        document.body.classList.add('light-mode');
        document.querySelector('.theme-toggle i').classList.replace('fa-moon', 'fa-sun');
    }
    
    // Projects
    renderProjects();
    initScrollAnimations();
    
    // Event Listeners
    document.getElementById('search-input').addEventListener('input', renderProjects);
    document.getElementById('filter-select').addEventListener('change', renderProjects);
});