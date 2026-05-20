/* ═══════════════════════════════════════════════════════════
   LÉSION — Navigation
   ═══════════════════════════════════════════════════════════ */

export function initMobileNav() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');

    if (!menuToggle || !nav) return;

    menuToggle.addEventListener('click', () => {
        const isOpen = nav.classList.toggle('is-open');
        menuToggle.classList.toggle('is-active');

        document.body.style.overflow = isOpen ? 'hidden' : '';

        const spans = menuToggle.querySelectorAll('span');
        if (isOpen) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    nav.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('is-open');
            menuToggle.classList.remove('is-active');
            document.body.style.overflow = '';

            const spans = menuToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });
}

export function highlightCurrentPage() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');

        if (href === currentPath ||
            (currentPath === '/' && href === 'index.html') ||
            currentPath.includes(href.replace('.html', ''))) {
            link.classList.add('is-active');
        }
    });
}

export function initNavigation() {
    initMobileNav();
    highlightCurrentPage();
}
