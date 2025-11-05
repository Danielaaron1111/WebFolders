/**
 * ============================================
 * FLEXBOX SHORTHAND DEMO - INTERACTIVE FEATURES
 * ============================================
 */

// Espera a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    
    console.log('🎯 Flexbox Shorthand Demo iniciado');

    /**
     * ============================================
     * ANIMACIÓN DE ENTRADA PARA EJEMPLOS
     * ============================================
     */
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const fadeInObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                // Añade animación de fade-in
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(30px)';
                
                setTimeout(function() {
                    entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);
                
                // Deja de observar una vez animado
                fadeInObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observa todos los contenedores de ejemplo
    const exampleContainers = document.querySelectorAll('.example-container');
    exampleContainers.forEach(function(container) {
        fadeInObserver.observe(container);
    });

    // Observa las tarjetas del cheatsheet
    const cheatsheetCards = document.querySelectorAll('.cheatsheet-card');
    cheatsheetCards.forEach(function(card) {
        fadeInObserver.observe(card);
    });

    /**
     * ============================================
     * TOOLTIP INTERACTIVO PARA CÓDIGO
     * ============================================
     */
    const codeDisplays = document.querySelectorAll('.code-display');
    
    codeDisplays.forEach(function(codeDisplay) {
        // Añade tooltip al hacer hover
        codeDisplay.addEventListener('mouseenter', function() {
            this.style.borderLeftColor = '#03dac6';
            this.style.transform = 'translateX(5px)';
            this.style.transition = 'all 0.3s ease';
        });

        codeDisplay.addEventListener('mouseleave', function() {
            this.style.borderLeftColor = '#bb86fc';
            this.style.transform = 'translateX(0)';
        });

        // Copia código al hacer click
        codeDisplay.addEventListener('click', function() {
            const codeText = this.innerText;
            
            // Intenta copiar al portapapeles
            if (navigator.clipboard) {
                navigator.clipboard.writeText(codeText).then(function() {
                    showCopyNotification(codeDisplay);
                });
            }
        });
    });

    /**
     * Muestra notificación de copiado
     */
    function showCopyNotification(element) {
        const notification = document.createElement('div');
        notification.textContent = '✓ Copiado';
        notification.style.cssText = `
            position: absolute;
            background: #03dac6;
            color: #0a0a15;
            padding: 0.5rem 1rem;
            border-radius: 4px;
            font-size: 0.9rem;
            font-weight: bold;
            pointer-events: none;
            z-index: 1000;
            animation: fadeOut 2s forwards;
        `;

        // Añade animación CSS
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeOut {
                0% { opacity: 1; transform: translateY(0); }
                70% { opacity: 1; transform: translateY(-10px); }
                100% { opacity: 0; transform: translateY(-20px); }
            }
        `;
        document.head.appendChild(style);

        // Posiciona relativo al elemento
        element.style.position = 'relative';
        element.appendChild(notification);

        // Elimina después de la animación
        setTimeout(function() {
            notification.remove();
            style.remove();
        }, 2000);
    }

    /**
     * ============================================
     * INTERACTIVIDAD EN FLEX ITEMS
     * ============================================
     */
    const flexItems = document.querySelectorAll('.flex-item');
    
    flexItems.forEach(function(item, index) {
        // Muestra propiedades flex al hacer click
        item.addEventListener('click', function() {
            const computedStyle = window.getComputedStyle(this);
            const flexGrow = computedStyle.flexGrow;
            const flexShrink = computedStyle.flexShrink;
            const flexBasis = computedStyle.flexBasis;
            
            console.log(`Item ${index + 1} propiedades:`, {
                'flex-grow': flexGrow,
                'flex-shrink': flexShrink,
                'flex-basis': flexBasis,
                'flex shorthand': `flex: ${flexGrow} ${flexShrink} ${flexBasis}`
            });

            // Feedback visual
            this.style.boxShadow = '0 0 20px rgba(3, 218, 198, 0.8)';
            setTimeout(() => {
                this.style.boxShadow = '';
            }, 500);
        });
    });

    /**
     * ============================================
     * SMOOTH SCROLL PARA NAVEGACIÓN
     * ============================================
     */
    const dashboardNavLinks = document.querySelectorAll('.dashboard-nav a');
    
    dashboardNavLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Efecto de ripple
            this.style.background = 'rgba(187, 134, 252, 0.3)';
            setTimeout(() => {
                this.style.background = '';
            }, 300);
        });
    });

    /**
     * ============================================
     * CONTADOR ANIMADO PARA MÉTRICAS
     * ============================================
     */
    const metricValues = document.querySelectorAll('.metric-value');
    
    const animateMetrics = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                const target = entry.target;
                const text = target.textContent;
                
                // Solo anima números
                if (text.match(/[\d,]+/)) {
                    const numberMatch = text.match(/[\d,]+/)[0];
                    const finalNumber = parseInt(numberMatch.replace(/,/g, ''));
                    const prefix = text.split(numberMatch)[0];
                    
                    let currentNumber = 0;
                    const increment = finalNumber / 50;
                    const duration = 1500;
                    const stepTime = duration / 50;
                    
                    const counter = setInterval(function() {
                        currentNumber += increment;
                        if (currentNumber >= finalNumber) {
                            target.textContent = prefix + finalNumber.toLocaleString();
                            clearInterval(counter);
                        } else {
                            target.textContent = prefix + Math.floor(currentNumber).toLocaleString();
                        }
                    }, stepTime);
                }
                
                animateMetrics.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    metricValues.forEach(function(metric) {
        animateMetrics.observe(metric);
    });

    /**
     * ============================================
     * SIDEBAR INTERACTIVO
     * ============================================
     */
    const sidebarItems = document.querySelectorAll('.dashboard-sidebar li');
    
    sidebarItems.forEach(function(item) {
        item.addEventListener('click', function() {
            // Remueve activo de todos
            sidebarItems.forEach(i => i.style.background = '');
            
            // Marca este como activo
            this.style.background = 'rgba(187, 134, 252, 0.3)';
            
            console.log('📊 Sección seleccionada:', this.textContent);
        });
    });

    /**
     * ============================================
     * LOG DE CONFIRMACIÓN
     * ============================================
     */
    console.log('✅ Todas las características interactivas cargadas');
    console.log('💡 Haz click en los bloques de código para copiar');
    console.log('🎯 Haz click en los flex items para ver sus propiedades');
});

/**
 * ============================================
 * EASTER EGG: KONAMI CODE
 * ============================================
 */
(function() {
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;

    document.addEventListener('keydown', function(e) {
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                activateEasterEgg();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });

    function activateEasterEgg() {
        document.body.style.animation = 'rainbow 2s linear infinite';
        const style = document.createElement('style');
        style.textContent = `
            @keyframes rainbow {
                0% { filter: hue-rotate(0deg); }
                100% { filter: hue-rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
        
        console.log('🌈 ¡Easter Egg activado! ¡Modo arcoíris!');
        
        setTimeout(function() {
            document.body.style.animation = '';
            style.remove();
        }, 10000);
    }
})();
