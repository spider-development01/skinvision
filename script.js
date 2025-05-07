document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // --- Theme Switching ---
    function applyTheme(theme) {
        if (theme === 'dark') {
            body.classList.add('dark-mode');
            body.classList.remove('light-mode');
        } else {
            body.classList.add('light-mode');
            body.classList.remove('dark-mode');
        }
    }

    // Detect prefers-color-scheme
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    if (prefersDarkScheme.matches && !localStorage.getItem('themePreference')) {
        applyTheme('dark');
    } else if (localStorage.getItem('themePreference')) {
        applyTheme(localStorage.getItem('themePreference'));
    } else {
        applyTheme('light'); // Default to light if no preference and no storage
    }

    // Optional: Add a theme toggle button (not in requirements, but good for testing)
    // const themeToggleButton = document.createElement('button');
    // themeToggleButton.textContent = 'Toggle Theme';
    // themeToggleButton.style.position = 'fixed';
    // themeToggleButton.style.bottom = '10px';
    // themeToggleButton.style.right = '10px';
    // themeToggleButton.style.zIndex = '1001';
    // themeToggleButton.style.padding = '10px';
    // body.appendChild(themeToggleButton);
    // themeToggleButton.addEventListener('click', () => {
    //     const currentTheme = body.classList.contains('dark-mode') ? 'dark' : 'light';
    //     const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    //     applyTheme(newTheme);
    //     localStorage.setItem('themePreference', newTheme);
    // });


    // --- Mobile Navigation ---
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            const isExpanded = navMenu.classList.contains('active');
            hamburger.setAttribute('aria-expanded', isExpanded.toString());
            // Toggle body scroll
            if (isExpanded) {
                body.style.overflow = 'hidden';
            } else {
                body.style.overflow = '';
            }
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navMenu.classList.contains('active')) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                    hamburger.setAttribute('aria-expanded', 'false');
                    body.style.overflow = '';
                }
            });
        });
    }
    
    // --- Active Nav Link Highlighting on Scroll ---
    const sections = document.querySelectorAll('section[id]');
    function updateActiveNavLink() {
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    }
    window.addEventListener('scroll', updateActiveNavLink);
    updateActiveNavLink(); // Initial call


    // --- Scroll-triggered Animations (Framer Motion style) ---
    if (!prefersReducedMotion) {
        const animatedElements = document.querySelectorAll('.animate-on-scroll');
        const observerOptions = {
            root: null, // viewport
            rootMargin: '0px',
            threshold: 0.1 // 10% of item visible
        };

        const observerCallback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target); // Optional: stop observing after animation
                }
            });
        };

        const intersectionObserver = new IntersectionObserver(observerCallback, observerOptions);
        animatedElements.forEach(el => intersectionObserver.observe(el));
    } else {
        // If reduced motion, make all elements visible immediately
        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            el.classList.add('is-visible');
        });
    }

    // --- Footer Current Year ---
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // --- Iframe Loading (already handled by onload in HTML, but for reference) ---
    // const iframe = document.querySelector('#model-display iframe');
    // const loadingIndicator = document.querySelector('.loading-indicator');
    // if (iframe && loadingIndicator) {
    //     iframe.addEventListener('load', () => {
    //         loadingIndicator.style.display = 'none';
    //         iframe.style.opacity = '1';
    //     });
    //     iframe.addEventListener('error', () => {
    //         loadingIndicator.innerHTML = '<p>Error loading AI model. Please try again later.</p>';
    //     });
    // }

    // --- Smooth scroll for CTA buttons to specific section (if not using #hash directly) ---
    // This is mostly handled by html `scroll-behavior: smooth;` but can be extended if needed
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            // Ensure it's a page anchor and not just '#'
            if (href.length > 1 && document.querySelector(href)) {
                // e.preventDefault(); // Uncomment if you want to override default # navigation
                // document.querySelector(href).scrollIntoView({
                //     behavior: 'smooth'
                // });
                // Close mobile nav if open after click
                if (navMenu && navMenu.classList.contains('active')) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                    hamburger.setAttribute('aria-expanded', 'false');
                    body.style.overflow = '';
                }
            }
        });
    });

});

document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.getElementById('contactForm');
    const statusMessage = document.getElementById('statusMessage');

    contactForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent default form submission

        // Clear previous status messages
        statusMessage.textContent = '';
        statusMessage.className = 'status-message'; // Reset classes

        // Get form data
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        // Basic Validation
        if (!name || !email || !message) {
            displayStatus('All fields are required.', 'error');
            return;
        }

        if (!isValidEmail(email)) {
            displayStatus('Please enter a valid email address.', 'error');
            return;
        }

        // --- Simulate form submission ---
        // In a real application, you would send this data to a server
        // using fetch() or XMLHttpRequest.

        console.log('Form Submitted:');
        console.log('Name:', name);
        console.log('Email:', email);
        console.log('Message:', message);

        displayStatus('Message sent successfully!', 'success');

        // Optionally, reset the form after successful submission
        contactForm.reset();

        // Hide status message after a few seconds
        setTimeout(() => {
            statusMessage.style.display = 'none';
        }, 5000);
    });

    function isValidEmail(email) {
        // Basic email validation regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function displayStatus(message, type) {
        statusMessage.textContent = message;
        statusMessage.classList.add(type); // 'success' or 'error'
        statusMessage.style.display = 'block';
    }
});