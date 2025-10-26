// Here, we're looking for something in our HTML document. The thing we're looking for is any element with a class of .toggle-btn – and, when we find it, we're putting it in a little storage container to access later, called `toggleButtons`. 

// The reason we're doing this here, right at the very top, is so that our script only has to search the document once. This speeds up performance.
const toggleButtons = document.querySelectorAll(".toggle-btn");

// We're now assigning a behaviour to each .toggle-btn that we found. 
toggleButtons.forEach((toggleButtons) => {
    // On this line, we're adding an event listener. This tells our toggle buttons to wait for or to anticipate something. In this case, we're telling it to wait for a user-driven event called a click-event – or, simple put, we're telling it to do something whenever the users clicks on it. 
    toggleButtons.addEventListener("click", function (event) {
        // This line restricts the behaviour to only this one single toggle button that's being pressed, not anything else in the document (i.e. it prevents bubbling up).
        event.stopPropagation();
        // This is where the magic happens. We are adding or removing a class called .expanded to the .toggle-btn's next sibling, or the element that comes immediately after it. This should either reveal or hide the dropdown menu. 
        this.nextElementSibling.classList.toggle("expanded");
    });
});

// We could add additional code here to collapse or dismiss the menu when we click elsewhere in the document, but we will keep it simple for this lesson.
