/**
 * Travlers Website - Main JavaScript
 * Handles mobile menu toggle and submenu functionality
 */

(function() {
    'use strict';
    
    // Wait for DOM to be fully loaded
    document.addEventListener('DOMContentLoaded', init);
    
    function init() {
        setupMobileMenu();
        setupSubmenu();
        setupAccessibility();
    }
    
    /**
     * Mobile Menu Toggle
     * Opens and closes the navigation menu on mobile devices
     */
    function setupMobileMenu() {
        const menuToggle = document.getElementById('menuToggle');
        const navMenu = document.getElementById('navMenu');
        
        if (!menuToggle || !navMenu) {
            console.warn('Menu elements not found');
            return;
        }
        
        menuToggle.addEventListener('click', function() {
            const isOpen = navMenu.classList.contains('active');
            
            if (isOpen) {
                closeMenu();
            } else {
                openMenu();
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideMenu = navMenu.contains(event.target);
            const isClickOnToggle = menuToggle.contains(event.target);
            
            if (!isClickInsideMenu && !isClickOnToggle && navMenu.classList.contains('active')) {
                closeMenu();
            }
        });
        
        // Close menu on Escape key
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && navMenu.classList.contains('active')) {
                closeMenu();
                menuToggle.focus(); // Return focus to toggle button
            }
        });
        
        function openMenu() {
            navMenu.classList.add('active');
            menuToggle.setAttribute('aria-expanded', 'true');
            
            // Focus first menu item for accessibility
            const firstLink = navMenu.querySelector('.nav-link');
            if (firstLink) {
                firstLink.focus();
            }
        }
        
        function closeMenu() {
            navMenu.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
            
            // Close any open submenus
            const openSubmenus = navMenu.querySelectorAll('.submenu.active');
            openSubmenus.forEach(function(submenu) {
                submenu.classList.remove('active');
                const toggle = submenu.previousElementSibling;
                if (toggle) {
                    toggle.setAttribute('aria-expanded', 'false');
                }
            });
        }
    }
    
    /**
     * Submenu Toggle
     * Expands and collapses submenu items (e.g., Services submenu)
     */
    function setupSubmenu() {
        const submenuToggles = document.querySelectorAll('.submenu-toggle');
        
        submenuToggles.forEach(function(toggle) {
            toggle.addEventListener('click', function(event) {
                event.preventDefault();
                
                const submenu = this.nextElementSibling;
                if (!submenu || !submenu.classList.contains('submenu')) {
                    return;
                }
                
                const isOpen = submenu.classList.contains('active');
                
                // Close all other submenus
                const allSubmenus = document.querySelectorAll('.submenu');
                allSubmenus.forEach(function(menu) {
                    if (menu !== submenu) {
                        menu.classList.remove('active');
                        const otherToggle = menu.previousElementSibling;
                        if (otherToggle) {
                            otherToggle.setAttribute('aria-expanded', 'false');
                        }
                    }
                });
                
                // Toggle current submenu
                if (isOpen) {
                    submenu.classList.remove('active');
                    this.setAttribute('aria-expanded', 'false');
                } else {
                    submenu.classList.add('active');
                    this.setAttribute('aria-expanded', 'true');
                }
            });
        });
    }
    
    /**
     * Accessibility Enhancements
     * Keyboard navigation and screen reader support
     */
    function setupAccessibility() {
        const navLinks = document.querySelectorAll('.nav-link, .submenu a');
        
        // Trap focus within menu when open on mobile
        const navMenu = document.getElementById('navMenu');
        const menuToggle = document.getElementById('menuToggle');
        
        if (!navMenu || !menuToggle) return;
        
        navMenu.addEventListener('keydown', function(event) {
            if (!navMenu.classList.contains('active')) return;
            
            // Get all focusable elements
            const focusableElements = navMenu.querySelectorAll(
                'a, button, [tabindex]:not([tabindex="-1"])'
            );
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];
            
            // Tab key navigation
            if (event.key === 'Tab') {
                if (event.shiftKey) { // Shift + Tab
                    if (document.activeElement === firstElement) {
                        event.preventDefault();
                        lastElement.focus();
                    }
                } else { // Tab
                    if (document.activeElement === lastElement) {
                        event.preventDefault();
                        firstElement.focus();
                    }
                }
            }
        });
        
        // Smooth scroll for anchor links
        navLinks.forEach(function(link) {
            link.addEventListener('click', function(event) {
                const href = this.getAttribute('href');
                
                if (href && href.startsWith('#')) {
                    const targetId = href.substring(1);
                    const targetElement = document.getElementById(targetId);
                    
                    if (targetElement) {
                        event.preventDefault();
                        
                        // Close mobile menu if open
                        if (navMenu.classList.contains('active')) {
                            navMenu.classList.remove('active');
                            menuToggle.setAttribute('aria-expanded', 'false');
                        }
                        
                        // Smooth scroll to target
                        targetElement.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                        
                        // Update URL without jumping
                        if (history.pushState) {
                            history.pushState(null, null, href);
                        }
                        
                        // Set focus to target for accessibility
                        targetElement.setAttribute('tabindex', '-1');
                        targetElement.focus();
                    }
                }
            });
        });
    }
    
    /**
     * Handle responsive behavior on window resize
     */
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            const navMenu = document.getElementById('navMenu');
            const menuToggle = document.getElementById('menuToggle');
            
            // On desktop, ensure menu is visible
            if (window.innerWidth >= 1200) {
                if (navMenu) {
                    navMenu.classList.add('active');
                }
                if (menuToggle) {
                    menuToggle.setAttribute('aria-expanded', 'true');
                }
            } else {
                // On mobile/tablet, close menu by default
                if (navMenu && !navMenu.matches(':hover')) {
                    navMenu.classList.remove('active');
                }
                if (menuToggle) {
                    menuToggle.setAttribute('aria-expanded', 'false');
                }
            }
        }, 250);
    });
    
})();
