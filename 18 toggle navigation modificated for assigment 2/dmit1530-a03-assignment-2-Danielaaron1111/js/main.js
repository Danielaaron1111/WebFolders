// Toggle dropdown (Services submenu)
document.querySelectorAll(".toggle-btn").forEach(btn => {
    btn.addEventListener("click", function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        // Toggle active class on button for icon rotation
        this.classList.toggle("active");
        
        // Toggle dropdown visibility
        const dropdown = this.nextElementSibling;
        dropdown.classList.toggle("collapsed");
    });
});

// Toggle hamburger menu (Mobile)
const hamburgerBtn = document.querySelector(".hamburger-btn");
const mainNav = document.querySelector(".main-nav");

hamburgerBtn.addEventListener("click", function() {
    const isCollapsed = mainNav.classList.contains("collapsed");
    
    mainNav.classList.toggle("collapsed");
    this.classList.toggle("active");
    
    // Toggle body scroll
    if (isCollapsed) {
        document.body.style.overflow = "hidden";
    } else {
        document.body.style.overflow = "";
    }
});

// Close mobile menu when clicking outside
document.addEventListener("click", function(e) {
    const isClickInsideNav = mainNav.contains(e.target);
    const isClickOnHamburger = hamburgerBtn.contains(e.target);
    
    if (!isClickInsideNav && !isClickOnHamburger && !mainNav.classList.contains("collapsed")) {
        mainNav.classList.add("collapsed");
        hamburgerBtn.classList.remove("active");
        document.body.style.overflow = "";
    }
});

// Close mobile menu on escape key
document.addEventListener("keydown", function(e) {
    if (e.key === "Escape" && !mainNav.classList.contains("collapsed")) {
        mainNav.classList.add("collapsed");
        hamburgerBtn.classList.remove("active");
        document.body.style.overflow = "";
    }
});

// Close mobile menu when window is resized to desktop size
window.addEventListener("resize", function() {
    if (window.innerWidth >= 768 && !mainNav.classList.contains("collapsed")) {
        document.body.style.overflow = "";
    }
});
