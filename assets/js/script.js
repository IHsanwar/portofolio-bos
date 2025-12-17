document.addEventListener('DOMContentLoaded', () => {
    // === Variables ===
    const navbar = document.getElementById('navbar');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    const fadeElements = document.querySelectorAll('.fade-up');

    // === Custom Cursor Logic ===
    const cursorDot = document.createElement('div');
    const cursorOutline = document.createElement('div');

    // Only add if not mobile (rough check)
    if (window.matchMedia("(min-width: 1024px)").matches) {
        cursorDot.className = 'cursor-dot hidden lg:block';
        cursorOutline.className = 'cursor-outline hidden lg:block';
        document.body.appendChild(cursorDot);
        document.body.appendChild(cursorOutline);

        window.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;

            // Dot follows instantly
            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;

            // Outline follows with slight delay (animation managed by CSS transition)
            cursorOutline.style.left = `${posX}px`;
            cursorOutline.style.top = `${posY}px`;
        });

        // Add hover effects for clickable elements
        const clickables = document.querySelectorAll('a, button, .group');
        clickables.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
                cursorOutline.style.backgroundColor = 'rgba(128, 128, 128, 0.1)';
                cursorDot.style.transform = 'translate(-50%, -50%) scale(0.5)';
            });
            el.addEventListener('mouseleave', () => {
                cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
                cursorOutline.style.backgroundColor = 'transparent';
                cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
            });
        });
    }

    // === Dark Mode Logic ===
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    const iconSun = document.querySelector('.fa-sun');
    const iconMoon = document.querySelector('.fa-moon');

    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
        htmlElement.classList.add('dark');
        updateIcon(true);
    } else {
        htmlElement.classList.remove('dark');
        updateIcon(false);
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            htmlElement.classList.toggle('dark');
            const isDark = htmlElement.classList.contains('dark');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            updateIcon(isDark);
        });
    }

    function updateIcon(isDark) {
        if (iconSun && iconMoon) {
            if (isDark) {
                iconSun.classList.remove('hidden');
                iconMoon.classList.add('hidden');
            } else {
                iconSun.classList.add('hidden');
                iconMoon.classList.remove('hidden');
            }
        }
    }

    // === Navbar Scroll Effect ===
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            navbar.classList.add('bg-white/95', 'dark:bg-black/95', 'shadow-sm');
            navbar.classList.remove('bg-transparent');
        } else {
            navbar.classList.remove('bg-white/95', 'dark:bg-black/95', 'shadow-sm');
            navbar.classList.add('bg-transparent');
        }
    });

    // === Mobile Menu Toggle ===
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            const isOpen = mobileMenu.classList.contains('hidden');
            if (isOpen) {
                mobileMenu.classList.remove('hidden');
                mobileMenu.classList.add('flex');
                document.body.classList.add('overflow-hidden');
            } else {
                mobileMenu.classList.add('hidden');
                mobileMenu.classList.remove('flex');
                document.body.classList.remove('overflow-hidden');
            }
        });
    }

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            mobileMenu.classList.remove('flex');
            document.body.classList.remove('overflow-hidden');
        });
    });

    // === Scroll Animations ===
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => observer.observe(el));

    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});
