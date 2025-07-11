// DOM Elements
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mobileMenu = document.querySelector('.mobile-menu');
const cartBtn = document.getElementById('cart-btn');
const cartSidebar = document.querySelector('.cart-sidebar');
const cartOverlay = document.querySelector('.cart-overlay');
const closeCart = document.querySelector('.close-cart');
const userBtn = document.getElementById('user-btn');
const loginModal = document.querySelector('.login-modal');
const modalOverlay = document.querySelector('.modal-overlay');
const closeModal = document.querySelector('.close-modal');
const signupLink = document.getElementById('signup-link');

// Sample Book Data
const books = [
    {
        id: 1,
        title: "The Silent Patient",
        author: "Alex Michaelides",
        price: 12.99,
        originalPrice: 16.99,
        image: "images/book1.jpg",
        category: "Mystery",
        rating: 4.5,
        badge: "Bestseller"
    },
    {
        id: 2,
        title: "Where the Crawdads Sing",
        author: "Delia Owens",
        price: 10.99,
        originalPrice: 14.99,
        image: "images/book2.jpg",
        category: "Fiction",
        rating: 4.8,
        badge: "Popular"
    },
    {
        id: 3,
        title: "Atomic Habits",
        author: "James Clear",
        price: 11.49,
        originalPrice: 15.99,
        image: "images/book3.jpg",
        category: "Self-Help",
        rating: 4.7
    },
    {
        id: 4,
        title: "Educated",
        author: "Tara Westover",
        price: 13.25,
        originalPrice: 17.50,
        image: "images/book4.jpg",
        category: "Memoir",
        rating: 4.6
    },
    {
        id: 5,
        title: "The Midnight Library",
        author: "Matt Haig",
        price: 9.99,
        originalPrice: 12.99,
        image: "images/book5.jpg",
        category: "Fiction",
        rating: 4.3,
        badge: "Sale"
    },
    {
        id: 6,
        title: "Project Hail Mary",
        author: "Andy Weir",
        price: 14.99,
        originalPrice: 19.99,
        image: "images/book6.jpg",
        category: "Sci-Fi",
        rating: 4.9,
        badge: "New"
    },
    {
        id: 7,
        title: "The Four Winds",
        author: "Kristin Hannah",
        price: 10.49,
        originalPrice: 13.99,
        image: "images/book7.jpg",
        category: "Historical Fiction",
        rating: 4.4
    },
    {
        id: 8,
        title: "Malibu Rising",
        author: "Taylor Jenkins Reid",
        price: 11.99,
        originalPrice: 15.99,
        image: "images/book8.jpg",
        category: "Fiction",
        rating: 4.2
    }
];

// Mobile Menu Toggle
mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
});

// Cart Toggle
cartBtn.addEventListener('click', (e) => {
    e.preventDefault();
    cartSidebar.classList.add('active');
    cartOverlay.classList.add('active');
});

closeCart.addEventListener('click', () => {
    cartSidebar.classList.remove('active');
    cartOverlay.classList.remove('active');
});

cartOverlay.addEventListener('click', () => {
    cartSidebar.classList.remove('active');
    cartOverlay.classList.remove('active');
});

// Login Modal Toggle
userBtn.addEventListener('click', (e) => {
    e.preventDefault();
    loginModal.classList.add('active');
    modalOverlay.classList.add('active');
});

closeModal.addEventListener('click', () => {
    loginModal.classList.remove('active');
    modalOverlay.classList.remove('active');
});

modalOverlay.addEventListener('click', () => {
    loginModal.classList.remove('active');
    modalOverlay.classList.remove('active');
});

signupLink.addEventListener('click', (e) => {
    e.preventDefault();
    alert('Sign up functionality will be implemented later!');
});

// Load Books
document.addEventListener('DOMContentLoaded', () => {
    // Load featured books
    const featuredBooksGrid = document.getElementById('featured-books-grid');
    const bestsellersGrid = document.getElementById('bestsellers-grid');
    
    // Display first 4 books as featured
    const featuredBooks = books.slice(0, 4);
    featuredBooks.forEach(book => {
        featuredBooksGrid.appendChild(createBookCard(book));
    });
    
    // Display all books as bestsellers (for demo)
    books.forEach(book => {
        bestsellersGrid.appendChild(createBookCard(book));
    });
    
    // Add fade-in animation to sections as they come into view
    const sections = document.querySelectorAll('section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    sections.forEach(section => {
        observer.observe(section);
    });
});

// Create Book Card Element
function createBookCard(book) {
    const bookCard = document.createElement('div');
    bookCard.className = 'book-card';
    
    let badgeHTML = '';
    if (book.badge) {
        badgeHTML = `<div class="book-badge">${book.badge}</div>`;
    }
    
    const discountPercentage = book.originalPrice ? 
        Math.round(((book.originalPrice - book.price) / book.originalPrice) * 100) : 0;
    
    bookCard.innerHTML = `
        ${badgeHTML}
        <div class="book-img">
            <img src="${book.image}" alt="${book.title}" loading="lazy">
        </div>
        <div class="book-info">
            <h3 class="book-title">${book.title}</h3>
            <p class="book-author">${book.author}</p>
            <div class="book-price">
                <span class="price">$${book.price.toFixed(2)}</span>
                ${book.originalPrice ? `
                    <span class="original-price">$${book.originalPrice.toFixed(2)}</span>
                    <span class="discount">${discountPercentage}% off</span>
                ` : ''}
            </div>
            <div class="book-actions">
                <button class="add-to-cart" data-id="${book.id}">Add to Cart</button>
                <button class="add-to-wishlist" data-id="${book.id}"><i class="far fa-heart"></i></button>
            </div>
        </div>
    `;
    
    return bookCard;
}

// Newsletter Form Submission
document.getElementById('newsletter-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('newsletter-email').value;
    // In a real app, you would send this to your server
    alert(`Thank you for subscribing with ${email}! You'll receive our newsletter soon.`);
    e.target.reset();
});

// Login Form Submission
document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    // In a real app, you would validate and send to your server
    alert('Login functionality will be implemented in the backend!');
    loginModal.classList.remove('active');
    modalOverlay.classList.remove('active');
    e.target.reset();
});