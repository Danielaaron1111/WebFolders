/**
 * ============================================
 * CSS POSITIONING DEMO - INTERACTIVE FEATURES
 * ============================================
 */

document.addEventListener('DOMContentLoaded', function() {
    
    console.log('📍 CSS Positioning Demo started');

    /**
     * ============================================
     * BACK TO TOP BUTTON (Fixed Positioning)
     * ============================================
     */
    const backToTop = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        // Show button when scrolled down 300px
        if (window.scrollY > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', function() {
        // Smooth scroll to top
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    /**
     * ============================================
     * MODAL FUNCTIONALITY (Fixed + Absolute)
     * ============================================
     */
    const openModalBtn = document.getElementById('openModal');
    const closeModalBtn = document.getElementById('closeModal');
    const modalOverlay = document.getElementById('modalOverlay');

    openModalBtn.addEventListener('click', function() {
        modalOverlay.classList.add('active');
        // Prevent body scroll when modal is open
        document.body.style.overflow = 'hidden';
    });

    closeModalBtn.addEventListener('click', function() {
        modalOverlay.classList.remove('active');
        // Restore body scroll
        document.body.style.overflow = '';
    });

    // Close modal when clicking outside
    modalOverlay.addEventListener('click', function(e) {
        if (e.target === modalOverlay) {
            modalOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
            modalOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    /**
     * ============================================
     * SMOOTH SCROLLING FOR NAVIGATION
     * ============================================
     */
    const navLinks = document.querySelectorAll('.sticky-nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Offset for sticky nav
                const navHeight = document.querySelector('.sticky-nav').offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    /**
     * ============================================
     * HIGHLIGHT ACTIVE SECTION IN NAV
     * ============================================
     */
    const sections = document.querySelectorAll('.demo-section');
    
    window.addEventListener('scroll', function() {
        let current = '';
        const navHeight = document.querySelector('.sticky-nav').offsetHeight;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - navHeight - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && 
                window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.style.background = '';
            link.style.color = '';
            
            if (link.getAttribute('href') === '#' + current) {
                link.style.background = 'rgba(187, 134, 252, 0.3)';
                link.style.color = '#bb86fc';
            }
        });
    });

    /**
     * ============================================
     * ANIMATIONS FOR DEMO BOXES
     * ============================================
     */
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    entry.target.style.transition = 'all 0.6s ease';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all example containers
    const exampleContainers = document.querySelectorAll('.example-container');
    exampleContainers.forEach(container => observer.observe(container));

    /**
     * ============================================
     * INTERACTIVE DEMO BOXES
     * ============================================
     */
    const demoBoxes = document.querySelectorAll('.box');
    
    demoBoxes.forEach((box, index) => {
        box.addEventListener('click', function() {
            const computedStyle = window.getComputedStyle(this);
            const position = computedStyle.position;
            const top = computedStyle.top;
            const right = computedStyle.right;
            const bottom = computedStyle.bottom;
            const left = computedStyle.left;
            
            console.log(`Box ${index + 1} properties:`, {
                position,
                top,
                right,
                bottom,
                left
            });

            // Visual feedback
            this.style.boxShadow = '0 0 20px rgba(3, 218, 198, 0.8)';
            setTimeout(() => {
                this.style.boxShadow = '';
            }, 500);
        });
    });

    /**
     * ============================================
     * CODE BLOCK COPY FUNCTIONALITY
     * ============================================
     */
    const codeDisplays = document.querySelectorAll('.code-display');
    
    codeDisplays.forEach(codeBlock => {
        codeBlock.style.cursor = 'pointer';
        codeBlock.title = 'Click to copy';
        
        codeBlock.addEventListener('click', function() {
            const codeText = this.innerText;
            
            if (navigator.clipboard) {
                navigator.clipboard.writeText(codeText).then(() => {
                    showCopyNotification(this);
                });
            }
        });
    });

    function showCopyNotification(element) {
        const notification = document.createElement('div');
        notification.textContent = '✓ Copied!';
        notification.style.cssText = `
            position: absolute;
            top: -40px;
            left: 50%;
            transform: translateX(-50%);
            background: #03dac6;
            color: #0a0a15;
            padding: 0.5rem 1rem;
            border-radius: 4px;
            font-size: 0.9rem;
            font-weight: bold;
            pointer-events: none;
            animation: fadeOut 2s forwards;
        `;

        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeOut {
                0% { opacity: 1; transform: translateX(-50%) translateY(0); }
                70% { opacity: 1; transform: translateX(-50%) translateY(-10px); }
                100% { opacity: 0; transform: translateX(-50%) translateY(-20px); }
            }
        `;
        document.head.appendChild(style);

        element.style.position = 'relative';
        element.appendChild(notification);

        setTimeout(() => {
            notification.remove();
            style.remove();
        }, 2000);
    }

    /**
     * ============================================
     * SCROLL PROGRESS INDICATOR
     * ============================================
     */
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });

    /**
     * ============================================
     * LOG CONFIRMATION
     * ============================================
     */
    console.log('✅ All interactive features loaded');
    console.log('📍 Click on boxes to see their position properties');
    console.log('💡 Click on code blocks to copy');
    console.log('📊 Scroll to see sticky navigation and back-to-top button');
});
