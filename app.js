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
        id: 0,
        title: "Portfolio Website",
        tags: ["JavaScript", "CSS"],
        description: "Responsive portfolio with dark mode and animations",
        image: "Portfolio.png",
        gitLink: "https://github.com/web19a/Portfolio",
        display: "none"
    },
    {
        id: 1,
        title: "3D Molecule Visualizer",
        tags: ["THREE.JS", "JavaScript", "CSS"],
        description: "Interactive 3D molecular visualizer with detailed information, search functionality, and educational content for chemistry enthusiasts.",
        image: "screenshot.png",
        gitLink: "https://github.com/web19a/3D-molecule-visualizer",
        demo: "https://3dmoles.netlify.app"
    },
    {
        id: 2,
        title: "Modern To-Do List",
        tags: ["JavaScript", "CSS"],
        description: "To-Do list that has priority and due date with modern design",
        image: "Screenshot_2025-03-26-23-53-08.png",
        gitLink: "https://github.com/web19a/Modern-to-do-list",
        demo: "https://moderntodos.netlify.app/"
    },
    {
        id: 3,
        title: "LuminaNexus",
        tags: ["JavaScript"],
        description: "Glowing particles connect/react to touch. HTML5 Canvas. 🌌",
        image: "Screenshot_2025-03-27-02-57-33-1.png",
        gitLink: "https://github.com/web19a/LuminaNexus",
        demo: "https://luminanexus.netlify.app/"
    },
    {
        id: 4,
        title: "BookHub",
        tags: ["JavaScript", "CSS"],
        description: "BookHub: Educational resource manager with PDF, themes, responsive design. For educators.",
        image: "bookhub.png",
        gitLink: "https://github.com/web19a/bookhub",
        demo: "https://book19hub.netlify.app/"
    },
    {
        id: 5,
        title: "MatrixRain",
        tags: ["JavaScript"],
        description: "Matrix-style digital rain animation using HTML Canvas & JavaScript. Green ASCII characters cascade down a black screen. #WebDesign #JavaScript",
        image: "2025-06-14 09.26.12.jpg",
        gitLink: "https://github.com/web19a/MatrixRain",
        demo: "https://matrixrain19.netlify.app"
    },
    {
        id: 6,
        title: "Postcard",
        tags: ["CSS"],
        description: "Happy Fathers' Day <br> Postcard for Fathers",
        image: "Screenshot_2025-06-15-10-29-05.png",
        gitLink: "https://github.com/web19a/father-s-postcard",
        demo: "https://movieflix19tx.netlify.app"
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
    document.getElementById('project-container').innerHTML = projects
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
                    style="background-color: blue; display: ${project.display}"
                    aria-label="Try demo website">
                    TRY DEMO
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
