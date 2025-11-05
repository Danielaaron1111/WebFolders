/**
 * ============================================
 * MENÚ HAMBURGUESA RESPONSIVO
 * ============================================
 * Este script maneja la funcionalidad del menú
 * hamburguesa en dispositivos móviles
 */

// Espera a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    
    // Selecciona elementos del DOM
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    /**
     * Toggle del menú al hacer click en hamburguesa
     * Alterna la clase 'active' que muestra/oculta el menú
     */
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        
        // Animación del botón hamburguesa a X
        hamburger.classList.toggle('active');
    });

    /**
     * Cierra el menú al hacer click en un enlace
     * Mejora la UX al navegar en mobile
     */
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    /**
     * Cierra el menú si el usuario hace resize a desktop
     * Previene que el menú quede abierto al cambiar de tamaño
     */
    window.addEventListener('resize', function() {
        // Si el ancho es mayor a 599px (desktop/tablet)
        if (window.innerWidth > 599) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });

    /**
     * OPCIONAL: Smooth scroll para los enlaces del menú
     * Mejora la experiencia de navegación
     */
    navLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            // Solo aplica smooth scroll si el href comienza con #
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    /**
     * OPCIONAL: Añade animación al hacer scroll
     * Las tarjetas aparecen con fade-in al entrar en viewport
     */
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(20px)';
                
                setTimeout(function() {
                    entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observa todas las tarjetas para animarlas
    const cards = document.querySelectorAll('.card');
    cards.forEach(function(card) {
        observer.observe(card);
    });

    // Observa también las columnas
    const columns = document.querySelectorAll('.column');
    columns.forEach(function(column) {
        observer.observe(column);
    });

    /**
     * Log de confirmación en consola
     * Útil para debugging
     */
    console.log('✅ Flexbox Demo cargado correctamente');
    console.log('📱 Menú hamburguesa: Funcional');
    console.log('🎨 Animaciones: Activas');
});
