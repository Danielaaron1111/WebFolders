const toggleButtons = document.querySelectorAll('.toggle-btn');

toggleButtons.forEach(toggleButtons => {
    toggleButtons.addEventListener('click', function(event) {
        event.stopPropagation();
        this.nextElementSibling.classList.toggle('expanded');
    });
});