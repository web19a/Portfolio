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
        title: "Portfolio Website",
        tags: ["JavaScript", "CSS"],
        description: "Responsive portfolio with dark mode and animations",
        image: "Portfolio.png",
        gitLink: "https://github.com/web19a/Portfolio"
    },
    {
        id: 2,
        title: "Modern To-Do List",
        tags: ["React", "Node.js"],
        description: "To-Do list that has priority and due date with modern design",
        image: "to-do.jpg",
        gitLink: "https://github.com/web19a/Modern-to-do-list",
        demo: "https://moderntodos.netlify.app/"
    },
    
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
                <a href="${project.gitLink}" 
                    target="_blank" 
                    class="github-btn"
                    aria-label="View source code on GitHub">
                    <i class="fab fa-github"></i>
                    Source Code
                </a>
                <a href="${project.demo}" 
                    target="_blank" 
                    class="github-btn"
                    style="background-color: lightblue;"
                    aria-label="View source code on GitHub">
                    <i class="fab fa-demo"></i>
                    Source Code
                </a>
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
// Add this to app.js for 3D tilt effect
document.querySelectorAll('.skill-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 8;
        const rotateY = (centerX - x) / 8;

        card.style.transform = `
            perspective(1000px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            scale(1.05)
        `;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
});
