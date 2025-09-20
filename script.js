// DOM Elements
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const header = document.getElementById('header');
const contactForm = document.getElementById('contact-form');
const faqItems = document.querySelectorAll('.faq-item');
const progressBars = document.querySelectorAll('.progress-fill');
const statNumbers = document.querySelectorAll('.stat-number');

// Mobile Navigation Toggle
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const headerHeight = header.offsetHeight;
            const targetPosition = targetSection.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Scroll to section function
function scrollToSection(sectionId) {
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        const headerHeight = header.offsetHeight;
        const targetPosition = targetSection.offsetTop - headerHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// Header scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 30px rgba(10, 35, 66, 0.15)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 2px 20px rgba(10, 35, 66, 0.1)';
    }
});

// Active navigation link highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// FAQ Accordion
faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all FAQ items
        faqItems.forEach(faqItem => {
            faqItem.classList.remove('active');
        });
        
        // Open clicked item if it wasn't active
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// Optimized scroll animations
let animationElements = [];
let isAnimating = false;

function initAnimationElements() {
    animationElements = Array.from(document.querySelectorAll('[data-aos]'));
}

function animateOnScroll() {
    if (isAnimating) return;
    isAnimating = true;
    
    requestAnimationFrame(() => {
        const windowHeight = window.innerHeight;
        const triggerPoint = windowHeight - 100;
        
        animationElements.forEach(element => {
            if (element.classList.contains('aos-animate')) return;
            
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < triggerPoint) {
                element.classList.add('aos-animate');
            }
        });
        
        isAnimating = false;
    });
}

// Optimized counter animation for stats
function animateCounters() {
    const allStatNumbers = document.querySelectorAll('.stat-number');
    allStatNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        const duration = 1500; // Reduced to 1.5 seconds
        const startTime = performance.now();
        
        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const current = Math.floor(progress * target);
            
            stat.textContent = current;
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            }
        }
        
        requestAnimationFrame(updateCounter);
    });
}

// Progress bar animation
function animateProgressBars() {
    progressBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        bar.style.width = width + '%';
    });
}

// Optimized Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains('stats-container')) {
                animateCounters();
                setTimeout(animateProgressBars, 300);
            }
            entry.target.classList.add('aos-animate');
            observer.unobserve(entry.target); // Stop observing once animated
        }
    });
}, observerOptions);

// Initialize animations
document.addEventListener('DOMContentLoaded', () => {
    initAnimationElements();
    
    const animatedElements = document.querySelectorAll('[data-aos]');
    animatedElements.forEach(el => observer.observe(el));
    
    // Observe stats container separately
    const statsContainer = document.querySelector('.stats-container');
    if (statsContainer) {
        observer.observe(statsContainer);
    }
});

//FORM VALIDATION REMOVED - DARSHAN'S PAGE
//UODATING WITH HUBSPOT INTEGRATION

//VERCEL ME UPDATE KRDE
// Service card hover effects
document.addEventListener('DOMContentLoaded', () => {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Button ripple effect
function createRipple(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Add ripple effect to buttons
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.cta-button, .service-button, .submit-button');
    
    buttons.forEach(button => {
        button.addEventListener('click', createRipple);
    });
});

// Add ripple CSS
const rippleCSS = `
.ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    transform: scale(0);
    animation: ripple-animation 0.6s linear;
    pointer-events: none;
}

@keyframes ripple-animation {
    to {
        transform: scale(4);
        opacity: 0;
    }
}
`;

// Inject ripple CSS
const style = document.createElement('style');
style.textContent = rippleCSS;
document.head.appendChild(style);

// Scroll to top functionality
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Add scroll to top button
document.addEventListener('DOMContentLoaded', () => {
    const scrollToTopButton = document.createElement('button');
    scrollToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTopButton.className = 'scroll-to-top';
    scrollToTopButton.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        font-size: 1.2rem;
        box-shadow: 0 5px 20px rgba(37, 99, 235, 0.3);
        transition: all 0.3s ease;
        opacity: 0;
        visibility: hidden;
        z-index: 1000;
    `;
    
    document.body.appendChild(scrollToTopButton);
    
    scrollToTopButton.addEventListener('click', scrollToTop);
    
    // Show/hide scroll to top button
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollToTopButton.style.opacity = '1';
            scrollToTopButton.style.visibility = 'visible';
        } else {
            scrollToTopButton.style.opacity = '0';
            scrollToTopButton.style.visibility = 'hidden';
        }
    });
    
    // Hover effect for scroll to top button
    scrollToTopButton.addEventListener('mouseenter', () => {
        scrollToTopButton.style.transform = 'translateY(-3px)';
        scrollToTopButton.style.boxShadow = '0 8px 25px rgba(37, 99, 235, 0.4)';
    });
    
    scrollToTopButton.addEventListener('mouseleave', () => {
        scrollToTopButton.style.transform = 'translateY(0)';
        scrollToTopButton.style.boxShadow = '0 5px 20px rgba(37, 99, 235, 0.3)';
    });
});

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Trigger initial scroll animation check
    animateOnScroll();
    
    // Add scroll event listener for animations
    window.addEventListener('scroll', animateOnScroll);
    
    // Initialize AOS animations
    const aosElements = document.querySelectorAll('[data-aos]');
    aosElements.forEach((element, index) => {
        element.style.transitionDelay = `${index * 0.1}s`;
    });
});

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply throttling to scroll events - reduced frequency for better performance
window.addEventListener('scroll', throttle(() => {
    animateOnScroll();
}, 50)); // Reduced from 16ms to 50ms for better performance

// Service Modal Functions
const serviceData = {
    brokerage: {
        title: "Software Brokerage",
        content: `
            <h3>Expert Software Brokerage Services</h3>
            <p>Our software brokerage service acts as a trusted intermediary between buyers and sellers, ensuring transparent and fair transactions that benefit all parties involved.</p>
            
            <h3>What We Offer:</h3>
            <ul>
                <li>Expert negotiation and deal structuring</li>
                <li>Market valuation and pricing analysis</li>
                <li>Legal documentation and contract management</li>
                <li>Due diligence coordination</li>
                <li>Transaction security and escrow services</li>
                <li>Post-deal support and relationship management</li>
            </ul>
            
            <h3>Why Choose Our Brokerage:</h3>
            <p>With over 15 years of experience in software transactions, we understand the complexities of the market and can help you navigate the process with confidence. Our team of experts ensures that every deal is structured to maximize value while minimizing risk.</p>
        `
    },
    acquisition: {
        title: "Acquisition Assistance",
        content: `
            <h3>Comprehensive Acquisition Support</h3>
            <p>We provide end-to-end support throughout the software acquisition process, from initial evaluation to final purchase, ensuring you make informed decisions every step of the way.</p>
            
            <h3>Our Process:</h3>
            <ul>
                <li>Initial market research and opportunity identification</li>
                <li>Technical and business due diligence</li>
                <li>Financial analysis and valuation</li>
                <li>Risk assessment and mitigation strategies</li>
                <li>Negotiation support and deal structuring</li>
                <li>Legal and regulatory compliance</li>
            </ul>
            
            <h3>Benefits:</h3>
            <p>Our acquisition assistance helps you avoid common pitfalls, secure better deals, and ensure that your software investments align with your business objectives. We've helped over 200 companies successfully acquire software solutions.</p>
        `
    },
    setup: {
        title: "Post-Acquisition Setup",
        content: `
            <h3>Seamless Integration Services</h3>
            <p>After acquisition, we ensure your new software integrates seamlessly into your existing infrastructure, maximizing its value from day one.</p>
            
            <h3>Setup Services Include:</h3>
            <ul>
                <li>Technical installation and configuration</li>
                <li>Data migration and system integration</li>
                <li>User training and onboarding programs</li>
                <li>Performance optimization and tuning</li>
                <li>Security configuration and compliance</li>
                <li>Documentation and knowledge transfer</li>
            </ul>
            
            <h3>Ongoing Support:</h3>
            <p>We don't just set up your software and leave. Our team provides ongoing support to ensure optimal performance and helps you leverage all available features to achieve your business goals.</p>
        `
    },
    marketing: {
        title: "Marketing & Promotion",
        content: `
            <h3>Strategic Marketing Solutions</h3>
            <p>We help you maximize the market presence and value of your software through comprehensive marketing and promotion strategies.</p>
            
            <h3>Marketing Services:</h3>
            <ul>
                <li>Digital marketing strategy development</li>
                <li>Content creation and brand positioning</li>
                <li>Social media marketing and management</li>
                <li>SEO optimization and online presence</li>
                <li>Lead generation and conversion optimization</li>
                <li>Performance tracking and analytics</li>
            </ul>
            
            <h3>Results-Driven Approach:</h3>
            <p>Our marketing strategies are designed to increase visibility, generate qualified leads, and drive revenue growth. We use data-driven insights to optimize campaigns and ensure maximum ROI.</p>
        `
    },
    consultation: {
        title: "Consultation & Strategy",
        content: `
            <h3>Expert Strategic Guidance</h3>
            <p>Our consultation services provide expert guidance for software investments, helping you make informed decisions that align with your long-term business objectives.</p>
            
            <h3>Consultation Areas:</h3>
            <ul>
                <li>Software investment strategy and planning</li>
                <li>Market analysis and trend identification</li>
                <li>Technology roadmap development</li>
                <li>Risk assessment and mitigation</li>
                <li>ROI analysis and business case development</li>
                <li>Competitive analysis and positioning</li>
            </ul>
            
            <h3>Strategic Value:</h3>
            <p>Our consultants bring decades of industry experience to help you navigate complex software decisions. We provide actionable insights that drive business growth and competitive advantage.</p>
        `
    },
    support: {
        title: "Ongoing Support",
        content: `
            <h3>Continuous Support & Maintenance</h3>
            <p>We provide comprehensive ongoing support to ensure your software investments continue to deliver value and remain competitive in the market.</p>
            
            <h3>Support Services:</h3>
            <ul>
                <li>24/7 technical support and troubleshooting</li>
                <li>Regular system maintenance and updates</li>
                <li>Performance monitoring and optimization</li>
                <li>Security updates and compliance management</li>
                <li>User training and skill development</li>
                <li>Strategic guidance and best practices</li>
            </ul>
            
            <h3>Peace of Mind:</h3>
            <p>With our ongoing support, you can focus on your core business while we ensure your software investments continue to perform optimally. Our support team is always available when you need us.</p>
        `
    }
};

function openServiceModal(serviceType) {
    const modal = document.getElementById('service-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    
    if (serviceData[serviceType]) {
        modalTitle.textContent = serviceData[serviceType].title;
        modalBody.innerHTML = serviceData[serviceType].content;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

// Enhanced modal CTA function
function modalGetStarted() {
    closeServiceModal();
    setTimeout(() => {
        scrollToSection('contact');
    }, 300);
}

function closeServiceModal() {
    const modal = document.getElementById('service-modal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
document.addEventListener('click', (e) => {
    const modal = document.getElementById('service-modal');
    if (e.target === modal) {
        closeServiceModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeServiceModal();
    }
});

// HubSpot chat is embedded via script; custom chat code removed
