// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navButtons = document.querySelector('.nav-buttons');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Sticky Header
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    header.classList.toggle('scrolled', window.scrollY > 100);
});

// Menu Tab Switching
const tabBtns = document.querySelectorAll('.tab-btn');
const menuCategories = document.querySelectorAll('.menu-category');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons and categories
        tabBtns.forEach(btn => btn.classList.remove('active'));
        menuCategories.forEach(category => category.classList.remove('active'));
        
        // Add active class to clicked button
        btn.classList.add('active');
        
        // Show corresponding category
        const categoryId = btn.getAttribute('data-category');
        document.getElementById(categoryId).classList.add('active');
    });
});

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Form Submission
const reservationForm = document.querySelector('#booking-form');
if (reservationForm) {
    reservationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Show success message
        const successMessage = document.createElement('div');
        successMessage.className = 'form-success';
        successMessage.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <h3>Reservation Confirmed!</h3>
            <p>We've sent a confirmation to your email. See you soon!</p>
        `;
        
        this.parentNode.replaceChild(successMessage, this);
        
        // In a real implementation, you would send the form data to a server
    });
}

const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const emailInput = this.querySelector('input[type="email"]');
        
        // Show thank you message
        emailInput.value = '';
        const thankYou = document.createElement('p');
        thankYou.className = 'newsletter-thankyou';
        thankYou.textContent = 'Thank you for subscribing!';
        this.appendChild(thankYou);
        
        setTimeout(() => {
            thankYou.remove();
        }, 3000);
    });
}

// Initialize Swiper Testimonials
const testimonialSwiper = new Swiper('.testimonials-carousel', {
    loop: true,
    autoplay: {
        delay: 5000,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
});

// Lightbox Gallery
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.querySelector('.lightbox');
const lightboxImg = document.querySelector('.lightbox-image');
const lightboxCaption = document.querySelector('.lightbox-caption');
const closeLightbox = document.querySelector('.close-lightbox');

galleryItems.forEach(item => {
    item.addEventListener('click', function() {
        const imgSrc = this.getAttribute('style').match(/url\(["']?([^"']*)["']?\)/)[1];
        const caption = this.getAttribute('data-caption') || '';
        
        lightboxImg.src = imgSrc;
        lightboxCaption.textContent = caption;
        lightbox.classList.add('active');
    });
});

closeLightbox.addEventListener('click', () => {
    lightbox.classList.remove('active');
});

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        lightbox.classList.remove('active');
    }
});

// Animate Skill Bars on Scroll
const skillBars = document.querySelectorAll('.skill-progress');

function animateSkills() {
    skillBars.forEach(bar => {
        const barPosition = bar.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (barPosition < screenPosition) {
            const width = bar.getAttribute('data-width');
            bar.style.width = width;
        }
    });
}

window.addEventListener('scroll', animateSkills);
animateSkills(); // Run once on load

// Countdown Timer for Special Offers
function updateCountdown() {
    const now = new Date();
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 0);
    
    const diff = endOfDay - now;
    
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
}

setInterval(updateCountdown, 1000);
updateCountdown(); // Initial call

// Floating Reservation Button Animation
const floatingBtn = document.querySelector('.floating-reservation');
if (floatingBtn) {
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            floatingBtn.classList.remove('scroll-up');
            return;
        }
        
        if (currentScroll > lastScroll && !floatingBtn.classList.contains('scroll-down')) {
            floatingBtn.classList.remove('scroll-up');
            floatingBtn.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && floatingBtn.classList.contains('scroll-down')) {
            floatingBtn.classList.remove('scroll-down');
            floatingBtn.classList.add('scroll-up');
        }
        
        lastScroll = currentScroll;
    });
}

// Load Instagram Feed (simulated)
function loadInstagramFeed() {
    const instagramGrid = document.querySelector('.instagram-grid');
    if (instagramGrid) {
        // In a real implementation, you would fetch from Instagram API
        const instagramPosts = [
            { image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4', link: '#' },
            { image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5', link: '#' },
            // More posts would go here
        ];
        
        instagramPosts.forEach(post => {
            const postElement = document.createElement('a');
            postElement.href = post.link;
            postElement.target = '_blank';
            postElement.style.backgroundImage = `url(${post.image})`;
            instagramGrid.appendChild(postElement);
        });
    }
}

document.addEventListener('DOMContentLoaded', loadInstagramFeed);