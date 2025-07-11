// Cart Functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Update Cart Count
function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
}

// Update Cart UI
function updateCartUI() {
    const cartItems = document.getElementById('cart-items');
    const cartTotalPrice = document.getElementById('cart-total-price');
    
    cartItems.innerHTML = '';
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p>Your cart is empty</p>';
        cartTotalPrice.textContent = '$0.00';
        return;
    }
    
    let totalPrice = 0;
    
    cart.forEach(item => {
        const book = books.find(b => b.id === item.id);
        if (book) {
            const itemTotal = book.price * item.quantity;
            totalPrice += itemTotal;
            
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <div class="cart-item-img">
                    <img src="${book.image}" alt="${book.title}" loading="lazy">
                </div>
                <div class="cart-item-info">
                    <h4 class="cart-item-title">${book.title}</h4>
                    <p class="cart-item-author">${book.author}</p>
                    <p class="cart-item-price">$${book.price.toFixed(2)} x ${item.quantity} = $${itemTotal.toFixed(2)}</p>
                    <button class="cart-item-remove" data-id="${book.id}">Remove</button>
                </div>
            `;
            cartItems.appendChild(cartItem);
        }
    });
    
    cartTotalPrice.textContent = `$${totalPrice.toFixed(2)}`;
    
    // Add event listeners to remove buttons
    document.querySelectorAll('.cart-item-remove').forEach(button => {
        button.addEventListener('click', (e) => {
            const id = parseInt(e.target.getAttribute('data-id'));
            removeFromCart(id);
        });
    });
}

// Add to Cart
function addToCart(id) {
    const existingItem = cart.find(item => item.id === id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ id, quantity: 1 });
    }
    
    saveCart();
    updateCartCount();
    updateCartUI();
    
    // Show a quick notification
    const book = books.find(b => b.id === id);
    if (book) {
        showNotification(`${book.title} added to cart`);
    }
}


function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    saveCart();
    updateCartCount();
    updateCartUI();
}


function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}


function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}


updateCartCount();
updateCartUI();


document.addEventListener('click', (e) => {
    if (e.target.classList.contains('add-to-cart')) {
        const id = parseInt(e.target.getAttribute('data-id'));
        addToCart(id);
    }
    
    if (e.target.classList.contains('add-to-wishlist')) {
        const id = parseInt(e.target.getAttribute('data-id'));
        const book = books.find(b => b.id === id);
        if (book) {
            showNotification(`${book.title} added to wishlist`);
        }
    }
});


const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    .notification {
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        background-color: var(--primary-color);
        color: white;
        padding: 12px 24px;
        border-radius: 4px;
        box-shadow: var(--box-shadow);
        z-index: 2000;
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    .notification.show {
        opacity: 1;
    }
`;
document.head.appendChild(notificationStyles);