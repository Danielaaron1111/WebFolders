/**
 * ============================================
 * CSS GRID DEMO - INTERACTIVE FEATURES
 * ============================================
 */

// Espera a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    
    console.log('📐 CSS Grid Demo iniciado');

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
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(30px)';
                
                setTimeout(function() {
                    entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);
                
                fadeInObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observa todos los contenedores de ejemplo
    const exampleContainers = document.querySelectorAll('.example-container');
    exampleContainers.forEach(function(container) {
        fadeInObserver.observe(container);
    });

    /**
     * ============================================
     * TOOLTIP PARA BLOQUES DE CÓDIGO
     * ============================================
     */
    const codeDisplays = document.querySelectorAll('.code-display');
    
    codeDisplays.forEach(function(codeDisplay) {
        // Efecto hover
        codeDisplay.addEventListener('mouseenter', function() {
            this.style.borderLeftColor = '#03dac6';
            this.style.transform = 'translateX(5px)';
            this.style.transition = 'all 0.3s ease';
        });

        codeDisplay.addEventListener('mouseleave', function() {
            this.style.borderLeftColor = '#bb86fc';
            this.style.transform = 'translateX(0)';
        });

        // Click para copiar
        codeDisplay.addEventListener('click', function() {
            const codeText = this.innerText;
            
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
        notification.textContent = '✓ Copiado al portapapeles';
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
            top: -40px;
            left: 50%;
            transform: translateX(-50%);
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

        setTimeout(function() {
            notification.remove();
            style.remove();
        }, 2000);
    }

    /**
     * ============================================
     * INTERACTIVIDAD EN GRID ITEMS
     * ============================================
     */
    const gridItems = document.querySelectorAll('.grid-item');
    
    gridItems.forEach(function(item, index) {
        // Muestra información del grid al hacer click
        item.addEventListener('click', function() {
            const computedStyle = window.getComputedStyle(this);
            const gridColumn = computedStyle.gridColumn;
            const gridRow = computedStyle.gridRow;
            const gridArea = computedStyle.gridArea;
            
            console.log(`Grid Item ${index + 1} propiedades:`, {
                'grid-column': gridColumn,
                'grid-row': gridRow,
                'grid-area': gridArea
            });

            // Feedback visual
            this.style.boxShadow = '0 0 20px rgba(3, 218, 198, 0.8)';
            setTimeout(() => {
                this.style.boxShadow = '';
            }, 500);
        });

        // Numera los items para debugging visual
        if (!item.textContent.trim() || item.textContent.length < 3) {
            // Solo numera si no tiene contenido significativo
            const originalContent = item.innerHTML;
            item.dataset.originalContent = originalContent;
        }
    });

    /**
     * ============================================
     * RESALTAR LÍNEAS DEL GRID AL HOVER
     * ============================================
     */
    const gridDemos = document.querySelectorAll('.grid-demo');
    
    gridDemos.forEach(function(demo) {
        demo.addEventListener('mouseenter', function() {
            // Agrega outline temporal para visualizar el grid
            this.style.outline = '2px solid rgba(3, 218, 198, 0.5)';
        });

        demo.addEventListener('mouseleave', function() {
            this.style.outline = '';
        });
    });

    /**
     * ============================================
     * TOGGLE GRID LINES (Visualizador de Grid)
     * ============================================
     */
    // Crea botón para mostrar/ocultar líneas del grid
    const toggleButton = document.createElement('button');
    toggleButton.textContent = '📐 Mostrar Líneas del Grid';
    toggleButton.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        padding: 1rem 1.5rem;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        border-radius: 8px;
        font-weight: bold;
        cursor: pointer;
        z-index: 1000;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
        transition: all 0.3s ease;
    `;

    toggleButton.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px)';
        this.style.boxShadow = '0 6px 12px rgba(187, 134, 252, 0.5)';
    });

    toggleButton.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.3)';
    });

    let gridLinesVisible = false;

    toggleButton.addEventListener('click', function() {
        gridLinesVisible = !gridLinesVisible;
        
        gridDemos.forEach(function(demo) {
            if (gridLinesVisible) {
                // Muestra líneas del grid usando background
                demo.style.backgroundImage = `
                    repeating-linear-gradient(
                        0deg,
                        rgba(3, 218, 198, 0.3) 0px,
                        rgba(3, 218, 198, 0.3) 1px,
                        transparent 1px,
                        transparent
                    ),
                    repeating-linear-gradient(
                        90deg,
                        rgba(3, 218, 198, 0.3) 0px,
                        rgba(3, 218, 198, 0.3) 1px,
                        transparent 1px,
                        transparent
                    )
                `;
                demo.style.backgroundSize = '50px 50px';
            } else {
                demo.style.backgroundImage = '';
            }
        });

        this.textContent = gridLinesVisible ? '📐 Ocultar Líneas' : '📐 Mostrar Líneas del Grid';
    });

    document.body.appendChild(toggleButton);

    /**
     * ============================================
     * ANIMACIÓN PARA HOLY GRAIL
     * ============================================
     */
    const holyGrail = document.querySelector('.holy-grail');
    
    if (holyGrail) {
        const holyGrailObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    // Anima cada área del Holy Grail
                    const areas = holyGrail.querySelectorAll('[class^="hg-"]');
                    areas.forEach(function(area, index) {
                        setTimeout(function() {
                            area.style.opacity = '0';
                            area.style.transform = 'scale(0.9)';
                            area.style.transition = 'all 0.5s ease';
                            
                            requestAnimationFrame(function() {
                                area.style.opacity = '1';
                                area.style.transform = 'scale(1)';
                            });
                        }, index * 100);
                    });
                    
                    holyGrailObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        holyGrailObserver.observe(holyGrail);
    }

    /**
     * ============================================
     * INTERACTIVIDAD EN CHEAT SHEET
     * ============================================
     */
    const cheatItems = document.querySelectorAll('.cheat-item');
    
    cheatItems.forEach(function(item) {
        item.addEventListener('click', function() {
            // Copia el contenido del cheat item
            const codes = this.querySelectorAll('code');
            let textToCopy = this.querySelector('h4').textContent + '\n';
            
            codes.forEach(function(code) {
                textToCopy += code.textContent + '\n';
            });

            if (navigator.clipboard) {
                navigator.clipboard.writeText(textToCopy).then(function() {
                    showCopyNotification(item);
                });
            }
        });
    });

    /**
     * ============================================
     * RESIZE DETECTOR CON FEEDBACK
     * ============================================
     */
    let resizeTimeout;
    const resizeIndicator = document.createElement('div');
    resizeIndicator.style.cssText = `
        position: fixed;
        top: 2rem;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(187, 134, 252, 0.95);
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        font-weight: bold;
        z-index: 1000;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.3s ease;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
    `;
    document.body.appendChild(resizeIndicator);

    window.addEventListener('resize', function() {
        const width = window.innerWidth;
        let breakpoint = '';

        if (width < 600) {
            breakpoint = '📱 Mobile (< 600px)';
        } else if (width < 1024) {
            breakpoint = '📟 Tablet (600px - 1023px)';
        } else {
            breakpoint = '💻 Desktop (≥ 1024px)';
        }

        resizeIndicator.textContent = breakpoint + ' | ' + width + 'px';
        resizeIndicator.style.opacity = '1';

        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            resizeIndicator.style.opacity = '0';
        }, 2000);
    });

    /**
     * ============================================
     * COMPARADOR AUTO-FIT VS AUTO-FILL
     * ============================================
     */
    const demo31 = document.querySelector('.demo-3-1');
    const demo32 = document.querySelector('.demo-3-2');

    if (demo31 && demo32) {
        const observer = new ResizeObserver(function(entries) {
            entries.forEach(function(entry) {
                const width = entry.contentRect.width;
                const columns = Math.floor(width / 150);
                
                console.log('Grid columns:', {
                    'Container width': width + 'px',
                    'Approximate columns': columns,
                    'Demo': entry.target.classList.contains('demo-3-1') ? 'auto-fill' : 'auto-fit'
                });
            });
        });

        observer.observe(demo31);
        observer.observe(demo32);
    }

    /**
     * ============================================
     * LOG DE CONFIRMACIÓN
     * ============================================
     */
    console.log('✅ Todas las características interactivas cargadas');
    console.log('📐 Haz click en el botón flotante para visualizar líneas del grid');
    console.log('🎯 Haz click en los grid items para ver sus propiedades');
    console.log('💡 Haz click en los bloques de código para copiar');
});

/**
 * ============================================
 * MODO INSPECTOR DE GRID
 * ============================================
 */
(function() {
    let inspectorMode = false;

    // Atajo de teclado: Ctrl/Cmd + Shift + G
    document.addEventListener('keydown', function(e) {
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'G') {
            e.preventDefault();
            inspectorMode = !inspectorMode;

            const gridItems = document.querySelectorAll('.grid-item');
            
            gridItems.forEach(function(item, index) {
                if (inspectorMode) {
                    // Añade overlay con información
                    const overlay = document.createElement('div');
                    overlay.className = 'grid-inspector-overlay';
                    overlay.style.cssText = `
                        position: absolute;
                        top: 5px;
                        left: 5px;
                        background: rgba(3, 218, 198, 0.9);
                        color: #0a0a15;
                        padding: 0.25rem 0.5rem;
                        border-radius: 4px;
                        font-size: 0.75rem;
                        font-weight: bold;
                        pointer-events: none;
                        z-index: 10;
                    `;
                    
                    const computedStyle = window.getComputedStyle(item);
                    overlay.textContent = `${computedStyle.gridColumn} / ${computedStyle.gridRow}`;
                    
                    item.style.position = 'relative';
                    item.appendChild(overlay);
                } else {
                    // Remueve overlay
                    const overlay = item.querySelector('.grid-inspector-overlay');
                    if (overlay) {
                        overlay.remove();
                    }
                }
            });

            console.log(inspectorMode ? '🔍 Modo Inspector activado' : '🔍 Modo Inspector desactivado');
        }
    });
})();

/**
 * ============================================
 * PERFORMANCE MONITOR
 * ============================================
 */
if (window.performance && window.performance.memory) {
    setInterval(function() {
        const memory = window.performance.memory;
        const used = (memory.usedJSHeapSize / 1048576).toFixed(2);
        const total = (memory.totalJSHeapSize / 1048576).toFixed(2);
        
        if (used / total > 0.9) {
            console.warn('⚠️ Alto uso de memoria:', used + 'MB / ' + total + 'MB');
        }
    }, 30000); // Check cada 30 segundos
}
