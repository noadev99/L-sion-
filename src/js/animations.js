/* ═══════════════════════════════════════════════════════════
   LÉSION — Custom Animations
   ═══════════════════════════════════════════════════════════ */

export function animateTextSplit(element) {
    if (!element) return;

    const text = element.textContent;
    element.innerHTML = '';
    element.setAttribute('aria-label', text);

    text.split('').forEach((char, i) => {
        const span = document.createElement('span');
        span.textContent = char === ' ' ? '\u00A0' : char;
        span.style.opacity = '0';
        span.style.transform = 'translateY(20px)';
        span.style.display = 'inline-block';
        span.style.transition = `opacity 0.6s ease ${i * 30}ms, transform 0.6s ease ${i * 30}ms`;
        element.appendChild(span);
    });

    requestAnimationFrame(() => {
        element.querySelectorAll('span').forEach(span => {
            span.style.opacity = '1';
            span.style.transform = 'translateY(0)';
        });
    });
}

export function animateStagger(elements, options = {}) {
    const {
        delay = 100,
        duration = 600,
        translateY = 30,
        ease = 'cubic-bezier(0.16, 1, 0.3, 1)'
    } = options;

    elements.forEach((el, i) => {
        el.style.opacity = '0';
        el.style.transform = `translateY(${translateY}px)`;
        el.style.transition = `opacity ${duration}ms ${ease} ${i * delay}ms, transform ${duration}ms ${ease} ${i * delay}ms`;

        requestAnimationFrame(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        });
    });
}

export function initCursorFollower() {
    const cursor = document.createElement('div');
    cursor.className = 'cursor-follower';
    cursor.style.cssText = `
    position: fixed;
    width: 40px;
    height: 40px;
    border: 1px solid var(--gris-cendre);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.5);
    transition: opacity 0.3s, transform 0.3s;
    mix-blend-mode: difference;
  `;
    document.body.appendChild(cursor);

    let cursorX = 0;
    let cursorY = 0;
    let targetX = 0;
    let targetY = 0;

    document.addEventListener('mousemove', (e) => {
        targetX = e.clientX;
        targetY = e.clientY;
        cursor.style.opacity = '1';
    });

    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
    });

    const interactiveElements = document.querySelectorAll('a, button, .product-card');

    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursor.style.borderColor = 'var(--bleu-souvenir)';
        });

        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursor.style.borderColor = 'var(--gris-cendre)';
        });
    });

    function animateCursor() {
        cursorX += (targetX - cursorX) * 0.15;
        cursorY += (targetY - cursorY) * 0.15;

        cursor.style.left = `${cursorX}px`;
        cursor.style.top = `${cursorY}px`;

        requestAnimationFrame(animateCursor);
    }

    animateCursor();
}

export function initPageTransitions() {
    const overlay = document.createElement('div');
    overlay.className = 'page-transition-overlay';
    overlay.style.cssText = `
    position: fixed;
    inset: 0;
    background: var(--blanc-casse);
    z-index: 9998;
    transform: translateY(100%);
    transition: transform 0.6s cubic-bezier(0.65, 0, 0.35, 1);
  `;
    document.body.appendChild(overlay);

    document.querySelectorAll('a[href]').forEach(link => {
        const href = link.getAttribute('href');

        if (href && !href.startsWith('#') && !href.startsWith('http') && !href.startsWith('mailto')) {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                overlay.style.transform = 'translateY(0)';
                setTimeout(() => {
                    window.location.href = href;
                }, 600);
            });
        }
    });

    window.addEventListener('load', () => {
        overlay.style.transform = 'translateY(-100%)';
    });
}
