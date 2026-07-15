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
