// Preloader
window.addEventListener('load', function() {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.classList.add('fade-out');
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
    
    // Animate elements on page load
    animateOnScroll();
    
    // Initialize progress bars
    initProgressBars();
});

// Add preloader to DOM
document.body.insertAdjacentHTML('afterbegin', `
    <div class="preloader">
        <div class="loader"></div>
    </div>
`);

// Header scroll effect
const header = document.querySelector('.header');
window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a nav link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Active navigation link based on scroll position
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', function() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// Scroll to top button
const scrollTopBtn = document.getElementById('scrollToTop');

if (scrollTopBtn) {
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('active');
        } else {
            scrollTopBtn.classList.remove('active');
        }
    });
    
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Theme toggle
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle ? themeToggle.querySelector('i') : null;

// Check for saved theme preference
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-theme');
    if (themeIcon) themeIcon.classList.replace('fa-moon', 'fa-sun');
}

// Theme toggle functionality
if (themeToggle) {
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-theme');
        
        if (document.body.classList.contains('dark-theme')) {
            localStorage.setItem('theme', 'dark');
            themeIcon.classList.replace('fa-moon', 'fa-sun');
        } else {
            localStorage.setItem('theme', 'light');
            themeIcon.classList.replace('fa-sun', 'fa-moon');
        }
    });
}

// Project filtering
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        // Remove active class from all buttons
        filterBtns.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        this.classList.add('active');
        
        const filterValue = this.getAttribute('data-filter');
        
        projectCards.forEach(card => {
            if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 100);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Initialize progress bars
function initProgressBars() {
    const progressBars = document.querySelectorAll('.progress-bar');
    
    progressBars.forEach(bar => {
        const percent = bar.getAttribute('data-percent');
        bar.style.width = percent + '%';
    });
}

// Animate elements on scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.section-header, .about-content, .skills-category, .project-card, .contact-content');
    
    elements.forEach((element, index) => {
        element.classList.add('fade-in');
        element.classList.add(`delay-${index % 4 + 1}`);
    });
    
    // Create an Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    // Observe each element
    elements.forEach(element => {
        observer.observe(element);
    });
}

// Contact form submission
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Basic form validation
        if (!name || !email || !subject || !message) {
            alert('Por favor, preencha todos os campos.');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Por favor, insira um email válido.');
            return;
        }
        
        // Simulate form submission
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.disabled = true;
        submitBtn.textContent = 'Enviando...';
        
        const serviceID = 'service_akmu13q'; 
        const templateID = 'template_xisjba5'; 
        
        emailjs.sendForm(serviceID, templateID, this)
            .then(() => {
                
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
                alert('Mensagem enviada com sucesso! Logo mais eu respondo. 🚀');
                contactForm.reset(); 
            }, (err) => {
                
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
                
                alert(`Xiii, deu ruim! 😱 Ocorreu um erro: ${JSON.stringify(err)}. Tenta de novo?`);
            });

    });
}

// Typing effect for hero section
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
    const text = heroTitle.innerHTML;
    const highlight = heroTitle.querySelector('.highlight');
    const highlightText = highlight ? highlight.textContent : '';
    
    if (highlight) {
        // Replace the highlight span with a placeholder
        heroTitle.innerHTML = text.replace(/<span class="highlight">.*?<\/span>/, '{highlight}');
        
        // Split the text by the placeholder
        const parts = heroTitle.innerHTML.split('{highlight}');
        
        // Clear the title
        heroTitle.innerHTML = '';
        
        // Add the first part
        if (parts[0]) {
            heroTitle.innerHTML += parts[0];
        }
        
        // Add the highlight span
        const highlightSpan = document.createElement('span');
        highlightSpan.className = 'highlight';
        heroTitle.appendChild(highlightSpan);
        
        // Add the second part
        if (parts[1]) {
            heroTitle.innerHTML += parts[1];
        }
        
        // Typing effect for the highlight text
        let i = 0;
        const typeWriter = () => {
            if (i < highlightText.length) {
                highlightSpan.textContent += highlightText.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        // Start typing after a delay
        setTimeout(typeWriter, 500);
    }
}

// Add placeholder images if not present
document.addEventListener('DOMContentLoaded', function() {
    // Profile image placeholder
    const profileImage = document.querySelector('.profile-image');
    if (profileImage && profileImage.getAttribute('src') === 'images/profile-placeholder.jpg') {
        profileImage.setAttribute('src', 'https://via.placeholder.com/400x500?text=Foto+de+Perfil');
    }
    
    // Project image placeholders
    const projectImages = document.querySelectorAll('.project-image img');
    projectImages.forEach((img, index) => {
        if (img.getAttribute('src').includes('placeholder')) {
            img.setAttribute('src', `https://via.placeholder.com/600x400?text=Projeto+${index + 1}`);
        }
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Offset for header
                behavior: 'smooth'
            });
        }
    });
});
