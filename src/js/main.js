/* ═══════════════════════════════════════════════════════════
   LÉSION — Main JavaScript Entry Point
   ═══════════════════════════════════════════════════════════ */

import '../styles/main.css';

import {
    initScrollReveal,
    initParallax,
    initSmoothScroll,
    initHeaderScroll
} from './scroll.js';

import {
    initCursorFollower
} from './animations.js';

import {
    initNavigation
} from './navigation.js';

function initLoader() {
    const loader = document.querySelector('.page-loader');

    if (loader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                loader.classList.add('is-hidden');
                setTimeout(() => {
                    loader.remove();
                }, 800);
            }, 500);
        });
    }
}

function initProductPage() {
    const thumbnails = document.querySelectorAll('.product-thumbnail');
    const mainImage = document.querySelector('.product-main-image img');

    if (thumbnails.length && mainImage) {
        thumbnails.forEach(thumb => {
            thumb.addEventListener('click', () => {
                const newSrc = thumb.querySelector('img').src;
                mainImage.src = newSrc;

                thumbnails.forEach(t => t.classList.remove('is-active'));
                thumb.classList.add('is-active');
            });
        });
    }

    const sizeOptions = document.querySelectorAll('.size-option');

    sizeOptions.forEach(option => {
        option.addEventListener('click', () => {
            if (option.disabled) return;

            sizeOptions.forEach(o => o.classList.remove('is-selected'));
            option.classList.add('is-selected');
        });
    });
}

function initContactForm() {
    const form = document.querySelector('.contact-form');

    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const inputs = form.querySelectorAll('input, textarea');
        let isValid = true;

        inputs.forEach(input => {
            if (input.required && !input.value.trim()) {
                isValid = false;
                input.style.borderColor = 'var(--rose-fane)';
            } else {
                input.style.borderColor = '';
            }
        });

        if (isValid) {
            const submitBtn = form.querySelector('.contact-form-submit');
            const originalText = submitBtn.textContent;

            submitBtn.textContent = 'Message envoyé';
            submitBtn.disabled = true;

            setTimeout(() => {
                form.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 3000);
        }
    });
}

function initNewsletter() {
    const form = document.querySelector('.newsletter-form');

    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const input = form.querySelector('.newsletter-input');
        const email = input.value.trim();

        if (email && email.includes('@')) {
            const submitBtn = form.querySelector('.newsletter-submit');
            const originalText = submitBtn.textContent;

            submitBtn.textContent = 'Inscrit';
            input.value = '';

            setTimeout(() => {
                submitBtn.textContent = originalText;
            }, 3000);
        }
    });
}

function initLazyLoad() {
    const images = document.querySelectorAll('img[data-src]');

    if (!images.length) return;

    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

function init() {
    initLoader();
    initNavigation();
    initHeaderScroll();
    initSmoothScroll();

    initScrollReveal();
    initParallax();

    if (window.innerWidth > 1024) {
        initCursorFollower();
    }

    initProductPage();
    initContactForm();
    initNewsletter();
    initLazyLoad();

    console.log('Lésion — Site initialized');
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
