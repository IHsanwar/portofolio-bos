/**
 * Enhanced Portfolio Script
 * Main functionality for animations, interactions, and timeline
 */

document.addEventListener('DOMContentLoaded', () => {
  // ===========================
  // Variables & DOM References
  // ===========================
  const navbar = document.getElementById('navbar');
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-link');
  const fadeElements = document.querySelectorAll('[class*="fade"], [class*="slide"], .scale-in');
  const timelineItems = document.querySelectorAll('.timeline-item');
  const themeToggleBtn = document.getElementById('theme-toggle');
  const htmlElement = document.documentElement;
  const yearSpan = document.getElementById('year');

  // ===========================
  // Dark Mode Functionality
  // ===========================
  function initializeDarkMode() {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
      htmlElement.classList.add('dark');
      updateThemeIcon(true);
    } else {
      htmlElement.classList.remove('dark');
      updateThemeIcon(false);
    }

    if (themeToggleBtn) {
      themeToggleBtn.addEventListener('click', toggleTheme);
    }
  }

  function toggleTheme() {
    htmlElement.classList.toggle('dark');
    const isDark = htmlElement.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    updateThemeIcon(isDark);
  }

  function updateThemeIcon(isDark) {
    const iconSun = document.querySelector('.fa-sun');
    const iconMoon = document.querySelector('.fa-moon');
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

  // ===========================
  // Navbar Scroll Effect
  // ===========================
  function handleNavbarScroll() {
    const scrollThreshold = 20;
    if (window.scrollY > scrollThreshold) {
      navbar.classList.add('bg-white/80', 'dark:bg-black/80', 'backdrop-blur-md', 'shadow-sm');
      navbar.classList.remove('bg-transparent');
    } else {
      navbar.classList.remove('bg-white/80', 'dark:bg-black/80', 'backdrop-blur-md', 'shadow-sm');
      navbar.classList.add('bg-transparent');
    }
  }

  window.addEventListener('scroll', handleNavbarScroll);

  // ===========================
  // Mobile Menu Toggle
  // ===========================
  function initializeMobileMenu() {
    if (mobileMenuBtn) {
      mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    }

    mobileLinks.forEach(link => {
      link.addEventListener('click', closeMobileMenu);
    });
  }

  function toggleMobileMenu() {
    const isOpen = mobileMenu.classList.contains('hidden');
    if (isOpen) {
      mobileMenu.classList.remove('hidden');
      mobileMenu.classList.add('flex');
      document.body.classList.add('overflow-hidden');
    } else {
      closeMobileMenu();
    }
  }

  function closeMobileMenu() {
    mobileMenu.classList.add('hidden');
    mobileMenu.classList.remove('flex');
    document.body.classList.remove('overflow-hidden');
  }

  // ===========================
  // Scroll Animations
  // ===========================
  function initializeScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    fadeElements.forEach(el => observer.observe(el));
  }

  // ===========================
  // Timeline Scroll Animation
  // ===========================
  function initializeTimelineAnimation() {
    const timelineContainer = document.querySelector('.timeline-container');
    if (!timelineContainer) return;

    timelineContainer.addEventListener('scroll', updateTimelineProgress);
    updateTimelineProgress(); // Initial call
  }

  function updateTimelineProgress() {
    const timelineContainer = document.querySelector('.timeline-container');
    if (!timelineContainer) return;

    const scrollHeight = timelineContainer.scrollHeight - timelineContainer.clientHeight;
    const scrollTop = timelineContainer.scrollTop;
    const scrollPercent = scrollHeight > 0 ? scrollTop / scrollHeight : 0;

    // Update active timeline items based on scroll
    timelineItems.forEach((item, index) => {
      const itemPosition = (index / timelineItems.length);
      
      if (scrollPercent >= itemPosition - 0.1 && scrollPercent <= itemPosition + 0.2) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  }

  // ===========================
  // Projects Slider Enhancement
  // ===========================
  function initializeProjectsSlider() {
    const projectsSlider = document.querySelector('.projects-slider');
    if (!projectsSlider) return;

    // Add smooth scrolling with keyboard
    projectsSlider.addEventListener('keydown', handleSliderKeyboard);
  }

  function handleSliderKeyboard(e) {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      e.currentTarget.scrollBy({ left: -400, behavior: 'smooth' });
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      e.currentTarget.scrollBy({ left: 400, behavior: 'smooth' });
    }
  }

  // ===========================
  // Skill Cards Stagger Animation
  // ===========================
  function initializeSkillCards() {
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach((card, index) => {
      card.style.setProperty('--animation-delay', `${index * 50}ms`);
    });
  }

  // ===========================
  // Smooth Scroll Enhancement
  // ===========================
  function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;

        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  // ===========================
  // Year Update in Footer
  // ===========================
  function updateYear() {
    if (yearSpan) {
      yearSpan.textContent = new Date().getFullYear();
    }
  }

  // ===========================
  // Performance Optimization
  // ===========================
  let scrollTimeout;
  function optimizedScroll() {
    if (scrollTimeout) {
      window.cancelAnimationFrame(scrollTimeout);
    }
    scrollTimeout = window.requestAnimationFrame(() => {
      handleNavbarScroll();
      updateTimelineProgress();
    });
  }

  window.addEventListener('scroll', optimizedScroll, { passive: true });


    // ===========================
  // Special Cursor (Smooth Follow)
  // ===========================
  const cursor = document.getElementById('special-cursor');

  if (cursor) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let cursorX = mouseX;
    let cursorY = mouseY;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function animateCursor() {
      cursorX += (mouseX - cursorX) * 0.12;
      cursorY += (mouseY - cursorY) * 0.12;

      cursor.style.left = cursorX + 'px';
      cursor.style.top = cursorY + 'px';

      requestAnimationFrame(animateCursor);
    }

    animateCursor();
  }

  // ===========================
  // Initialize All Features
  // ===========================
  function initializeAll() {
    initializeDarkMode();
    initializeMobileMenu();
    initializeScrollAnimations();
    initializeTimelineAnimation();
    initializeProjectsSlider();
    initializeSkillCards();
    initializeSmoothScroll();
    updateYear();
  }

  // Run initialization
  initializeAll();

  // ===========================
  // Window Resize Handler
  // ===========================
  window.addEventListener('resize', () => {
    // Handle responsive changes if needed
  });
});

// ===========================
// Expose global functions if needed
// ===========================
window.portfolioHelpers = {
  scrollToSection: (sectionId) => {
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  },
  toggleDarkMode: () => {
    const htmlElement = document.documentElement;
    htmlElement.classList.toggle('dark');
    const isDark = htmlElement.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }
};

c