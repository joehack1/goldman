'use strict';

const navbar = document.querySelector("[data-navbar]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");
const menuToggleBtn = document.querySelector("[data-menu-toggle-btn]");
const navOverlay = document.querySelector("[data-nav-overlay]");

if (menuToggleBtn) {
  menuToggleBtn.addEventListener("click", function () {
    navbar.classList.toggle("active");
    this.classList.toggle("active");
    if (navOverlay) navOverlay.classList.toggle("active");
    document.body.classList.toggle("active");
  });
}

if (navOverlay) {
  navOverlay.addEventListener("click", function () {
    navbar.classList.remove("active");
    menuToggleBtn.classList.remove("active");
    this.classList.remove("active");
    document.body.classList.remove("active");
  });
}

for (let i = 0; i < navbarLinks.length; i++) {
  navbarLinks[i].addEventListener("click", function () {
    navbar.classList.remove("active");
    menuToggleBtn.classList.remove("active");
    if (navOverlay) navOverlay.classList.remove("active");
    document.body.classList.remove("active");
  });
}

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

window.addEventListener("scroll", function () {
  if (window.scrollY >= 100) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
});

if (backTopBtn) {
  backTopBtn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

const searchBtn = document.querySelector("[data-search-btn]");
const searchContainer = document.querySelector("[data-search-container]");
const searchCloseBtn = document.querySelector("[data-search-close-btn]");

if (searchBtn && searchContainer) {
  searchBtn.addEventListener("click", function () {
    searchContainer.classList.add("active");
    document.body.classList.add("active");
  });
}

if (searchCloseBtn && searchContainer) {
  searchCloseBtn.addEventListener("click", function () {
    searchContainer.classList.remove("active");
    document.body.classList.remove("active");
  });
}

const revealElements = document.querySelectorAll(".reveal, .reveal-left, .reveal-right");

const revealOnScroll = function () {
  for (let i = 0; i < revealElements.length; i++) {
    const elementTop = revealElements[i].getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (elementTop < windowHeight - 80) {
      revealElements[i].classList.add("visible");
    }
  }
};

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

const counterElements = document.querySelectorAll("[data-counter]");

const startCounter = function () {
  for (let i = 0; i < counterElements.length; i++) {
    if (counterElements[i].dataset.counted) continue;

    const elementTop = counterElements[i].getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (elementTop < windowHeight - 50) {
      counterElements[i].dataset.counted = true;
      const target = parseInt(counterElements[i].getAttribute("data-counter"));
      const duration = 2000;
      const step = target / (duration / 16);
      let current = 0;

      const updateCounter = function () {
        current += step;
        if (current < target) {
          counterElements[i].textContent = Math.floor(current) + "+";
          requestAnimationFrame(updateCounter);
        } else {
          counterElements[i].textContent = target + "+";
        }
      };

      updateCounter();
    }
  }
};

window.addEventListener("scroll", startCounter);

const testimonialTrack = document.querySelector("[data-testimonial-track]");
const testimonialDots = document.querySelectorAll("[data-testimonial-dot]");
let currentSlide = 0;

const goToSlide = function (index) {
  if (!testimonialTrack) return;
  currentSlide = index;
  testimonialTrack.style.transform = `translateX(-${index * 100}%)`;
  testimonialDots.forEach(function (dot, i) {
    dot.classList.toggle("active", i === index);
  });
};

testimonialDots.forEach(function (dot, index) {
  dot.addEventListener("click", function () {
    goToSlide(index);
  });
});

if (testimonialTrack) {
  setInterval(function () {
    currentSlide = (currentSlide + 1) % testimonialDots.length;
    goToSlide(currentSlide);
  }, 5000);
}

const productCards = document.querySelectorAll("[data-product]");
const filterBtns = document.querySelectorAll("[data-filter-btn]");

filterBtns.forEach(function (btn) {
  btn.addEventListener("click", function () {
    filterBtns.forEach(function (b) { b.classList.remove("active"); });
    this.classList.add("active");

    const filter = this.getAttribute("data-filter-btn");

    productCards.forEach(function (card) {
      if (filter === "all" || card.getAttribute("data-product") === filter) {
        card.style.display = "";
        card.style.animation = "fadeInUp 0.5s ease forwards";
      } else {
        card.style.display = "none";
      }
    });
  });
});

const animateOnScroll = function () {
  const elements = document.querySelectorAll(".product-card, .promo-card, .value-card, .blog-card, .contact-card, .why-item");

  elements.forEach(function (el) {
    const elementTop = el.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (elementTop < windowHeight - 50) {
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    }
  });
};

document.addEventListener("DOMContentLoaded", function () {
  const elements = document.querySelectorAll(".product-card, .promo-card, .value-card, .blog-card, .contact-card, .why-item");

  elements.forEach(function (el, index) {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity 0.6s ease " + (index % 3) * 0.15 + "s, transform 0.6s ease " + (index % 3) * 0.15 + "s";
  });

  window.addEventListener("scroll", animateOnScroll);
  animateOnScroll();
});

const heroText = document.querySelector(".hero-title");
if (heroText) {
  heroText.style.opacity = "0";
  heroText.style.transform = "translateY(30px)";

  setTimeout(function () {
    heroText.style.transition = "opacity 0.8s ease, transform 0.8s ease";
    heroText.style.opacity = "1";
    heroText.style.transform = "translateY(0)";
  }, 200);
}

const contactForm = document.querySelector("[data-contact-form]");
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const btn = this.querySelector(".btn");
    const originalText = btn.textContent;
    btn.textContent = "Message Sent!";
    btn.style.background = "#28a745";
    btn.style.color = "#fff";

    setTimeout(function () {
      btn.textContent = originalText;
      btn.style.background = "";
      btn.style.color = "";
      contactForm.reset();
    }, 3000);
  });
}

// Shopping Cart
let cart = JSON.parse(localStorage.getItem('goldman-cart')) || [];

function saveCart() {
  localStorage.setItem('goldman-cart', JSON.stringify(cart));
  updateCartUI();
}

function updateCartUI() {
  const cartCount = document.querySelector('[data-cart-count]');
  const cartItems = document.querySelector('[data-cart-items]');
  const cartTotal = document.querySelector('[data-cart-total]');
  const cartFooter = document.querySelector('[data-cart-footer]');
  
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  if (cartCount) {
    cartCount.textContent = totalItems;
    cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
  }
  
  if (cartItems) {
    if (cart.length === 0) {
      cartItems.innerHTML = '<div class="cart-empty"><svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg><p>Your cart is empty</p></div>';
      if (cartFooter) cartFooter.style.display = 'none';
    } else {
      cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
          <div class="cart-item-info">
            <h4>${item.name}</h4>
            <p>KES ${item.price} each</p>
          </div>
          <div class="cart-item-controls">
            <button class="qty-btn" data-action="decrease" data-id="${item.id}">-</button>
            <span class="qty-value">${item.quantity}</span>
            <button class="qty-btn" data-action="increase" data-id="${item.id}">+</button>
            <button class="cart-item-remove" data-action="remove" data-id="${item.id}">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>
        </div>
      `).join('');
      if (cartFooter) cartFooter.style.display = 'block';
    }
  }
  
  if (cartTotal) {
    cartTotal.textContent = `KES ${totalPrice}`;
  }
}

function addToCart(id, name, price) {
  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ id, name, price: parseInt(price), quantity: 1 });
  }
  saveCart();
  
  const btn = document.querySelector(`[data-product-id="${id}"]`);
  if (btn) {
    btn.classList.add('added');
    btn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> Added!';
    setTimeout(() => {
      btn.classList.remove('added');
      btn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg> Add to Cart';
    }, 1500);
  }
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  saveCart();
}

function updateQuantity(id, action) {
  const item = cart.find(item => item.id === id);
  if (item) {
    if (action === 'increase') {
      item.quantity++;
    } else if (action === 'decrease') {
      item.quantity--;
      if (item.quantity <= 0) {
        removeFromCart(id);
        return;
      }
    }
  }
  saveCart();
}

document.addEventListener('click', function(e) {
  if (e.target.closest('[data-action="increase"]')) {
    const id = e.target.closest('[data-action]').dataset.id;
    updateQuantity(id, 'increase');
  }
  if (e.target.closest('[data-action="decrease"]')) {
    const id = e.target.closest('[data-action]').dataset.id;
    updateQuantity(id, 'decrease');
  }
  if (e.target.closest('[data-action="remove"]')) {
    const id = e.target.closest('[data-action]').dataset.id;
    removeFromCart(id);
  }
});

document.addEventListener('click', function(e) {
  const addBtn = e.target.closest('.add-to-cart-btn');
  if (addBtn) {
    e.preventDefault();
    const id = addBtn.dataset.productId;
    const name = addBtn.dataset.productName;
    const price = addBtn.dataset.productPrice;
    addToCart(id, name, price);
  }
});

const cartBtn = document.querySelector('[data-cart-btn]');
const cartSidebar = document.querySelector('[data-cart-sidebar]');
const cartOverlay = document.querySelector('[data-cart-overlay]');
const cartCloseBtn = document.querySelector('[data-cart-close]');

function openCart() {
  if (cartSidebar) cartSidebar.classList.add('active');
  if (cartOverlay) cartOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  if (cartSidebar) cartSidebar.classList.remove('active');
  if (cartOverlay) cartOverlay.classList.remove('active');
  document.body.style.overflow = '';
}

if (cartBtn) cartBtn.addEventListener('click', openCart);
if (cartCloseBtn) cartCloseBtn.addEventListener('click', closeCart);
if (cartOverlay) cartOverlay.addEventListener('click', closeCart);

updateCartUI();
