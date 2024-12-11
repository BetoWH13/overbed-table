document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuButton = document.querySelector('.mobile-menu-button');
    const navMenu = document.querySelector('nav ul');
    
    menuButton.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        menuButton.classList.toggle('active');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('nav') && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            menuButton.classList.remove('active');
        }
    });

    // Close mobile menu when window is resized to desktop size
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            menuButton.classList.remove('active');
        }
    });

    // Quick Navigation Shrink Effect
    const quickNav = document.querySelector('.quick-nav');
    if (quickNav) {
        let lastScrollTop = 0;
        const SCROLL_THRESHOLD = 200; // Adjust this value to control when shrinking starts

        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Add or remove shrink class based on scroll position
            if (scrollTop > SCROLL_THRESHOLD) {
                quickNav.classList.add('shrink');
            } else {
                quickNav.classList.remove('shrink');
            }
            
            lastScrollTop = scrollTop;
        });
    }
});
