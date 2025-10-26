// Let's define a constant that selects all dropdown buttons for us.
const dropdowns = document.querySelectorAll('.nav-item.dropdown');

/* ... I mean, we don't really need it in this itty bitty script. We couldddd just string it all together with the forEach method, like this:

  querySelectorAll('.nav-item.dropdown').forEach(dropdown => { ... })

*/

// Now, let's add a click event to each top level link.
dropdowns.forEach(dropdown => {
    dropdown.addEventListener('click', function(event) {
        // This little method prevents the click from immediately propagating (bubbling up) to higher or parent elements. Basically, it says 'only do the thing to the child and nothing else'.
        event.stopPropagation();
        // Toggle visibility of the dropdown content
        // this.querySelector('.dropdown-content').classList.toggle('show');
        this.querySelector('.dropdown-content').classList.add('show');        
    });
});

/*
  ... and that's technically all we need.
  
  Right now, you can only close the dropdown by clicking the top-level link again. However, a common usability pattern that we see on the modern web is that if you 'click off' (i.e. click anywhere else on the screen), the menu will close.
  
  We can add a few other things to make this happen. 
  
  Everything from here onwards is 'nice to have' but not 'need to have'.
*/

// Function to close all dropdowns

// Note: functions are normally defined under variables and constants, buuuut I wanted to lump this in with the 'nice to have' stuff, so it's down here. 
function closeAllDropdowns() {
    document.querySelectorAll('.dropdown-content').forEach(dropdownContent => {
        dropdownContent.classList.remove('show');
    });
}

// Add click event to the whole document
document.addEventListener('click', () => {
    // Close all dropdowns when clicking anywhere in the document
    closeAllDropdowns();
});

// Prevent dropdown contents from closing when clicked
// document.querySelectorAll('.dropdown-content').forEach(content => {
//     content.addEventListener('click', function(event) {
//         // Stop the click inside dropdown content from propagating up
//         event.stopPropagation();
//     });
// });

const dropdownContent = document.querySelectorAll('.dropdown-content');
dropdownContent.forEach(content => {
    content.addEventListener('click', function(event) {
        // Stop the click inside dropdown content from propagating up
        event.stopPropagation();
    });
});

