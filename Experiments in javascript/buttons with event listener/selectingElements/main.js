/* ============================================
   COMPREHENSIVE LIST OF EVENT LISTENERS
   ============================================

   MOUSE EVENTS:
   - click          : When element is clicked
   - dblclick       : When element is double-clicked
   - mousedown      : When mouse button is pressed down
   - mouseup        : When mouse button is released
   - mousemove      : When mouse moves over element
   - mouseenter     : When mouse enters element (doesn't bubble)
   - mouseleave     : When mouse leaves element (doesn't bubble)
   - mouseover      : When mouse enters element (bubbles)
   - mouseout       : When mouse leaves element (bubbles)
   - contextmenu    : When right-click menu appears

   KEYBOARD EVENTS:
   - keydown        : When key is pressed down
   - keyup          : When key is released
   - keypress       : When key is pressed (deprecated, use keydown)

   FORM EVENTS:
   - submit         : When form is submitted
   - change         : When input value changes (after blur)
   - input          : When input value changes (real-time)
   - focus          : When element gets focus
   - blur           : When element loses focus
   - select         : When text is selected
   - reset          : When form is reset

   WINDOW/DOCUMENT EVENTS:
   - load           : When page/image finishes loading
   - unload         : When page is unloaded (leaving page)
   - beforeunload   : Before page is unloaded
   - resize         : When window is resized
   - scroll         : When element is scrolled
   - DOMContentLoaded : When DOM is fully loaded (without images)

   DRAG EVENTS:
   - drag           : While element is being dragged
   - dragstart      : When drag starts
   - dragend        : When drag ends
   - dragenter      : When dragged item enters drop target
   - dragover       : When dragged item is over drop target
   - dragleave      : When dragged item leaves drop target
   - drop           : When dragged item is dropped

   CLIPBOARD EVENTS:
   - copy           : When content is copied
   - cut            : When content is cut
   - paste          : When content is pasted

   MEDIA EVENTS:
   - play           : When media starts playing
   - pause          : When media is paused
   - ended          : When media finishes playing
   - volumechange   : When volume changes
   - timeupdate     : When playback position changes

   TOUCH EVENTS (Mobile):
   - touchstart     : When touch starts
   - touchmove      : When touch moves
   - touchend       : When touch ends
   - touchcancel    : When touch is interrupted

   ANIMATION/TRANSITION EVENTS:
   - animationstart : When CSS animation starts
   - animationend   : When CSS animation ends
   - animationiteration : When CSS animation repeats
   - transitionend  : When CSS transition completes

   OTHER USEFUL EVENTS:
   - error          : When error occurs
   - wheel          : When mouse wheel is scrolled
   - online         : When browser goes online
   - offline        : When browser goes offline
   - storage        : When localStorage/sessionStorage changes
   - visibilitychange : When page visibility changes (tab switch)

   ============================================ */

// Select the elements
let output = document.getElementById("output");
let button = document.getElementById("changeBtn");
let darkModeBtn = document.getElementById("darkModeBtn");

// Message saving elements
let saveMsgBtn = document.getElementById("saveMsgBtn");
let messageInput = document.getElementById("messageInput");
let messagesList = document.getElementById("messagesList");

// Load and display messages from localStorage
function loadMessages() {
    let messages = JSON.parse(localStorage.getItem("messages") || "[]");
    messagesList.innerHTML = "";
    if (messages.length === 0) {
        messagesList.innerHTML = "<em>No messages saved yet.</em>";
        return;
    }
    let ul = document.createElement("ul");
    messages.forEach(msg => {
        let li = document.createElement("li");
        li.textContent = msg;
        ul.appendChild(li);
    });
    messagesList.appendChild(ul);
}

// Save message to localStorage
saveMsgBtn.addEventListener("click", function() {
    let msg = messageInput.value.trim();
    if (!msg) return;
    let messages = JSON.parse(localStorage.getItem("messages") || "[]");
    messages.push(msg);
    localStorage.setItem("messages", JSON.stringify(messages));
    messageInput.value = "";
    loadMessages();
    console.log("Message saved:", msg);
});

// Initial load
loadMessages();

// Change text when button is clicked
button.addEventListener("click", function() {
    output.textContent = "Text has been changed!";
    output.style.color = "green";
});

// First event listener
button.addEventListener("click", function() {
    console.log("First listener executed");
});

// Second event listener
// button.addEventListener("click", function() {
//     console.log("Second listener executed");
// });

// // Third event listener
// button.addEventListener("click", function() {
//     console.log("Third listener executed");
// });

// Dark Mode Toggle
darkModeBtn.addEventListener("click", function() {
    document.body.classList.toggle("dark-mode");
    console.log("Dark mode toggled!");
});

// i will add another button and another events listener 


//get elemenet by id is not gonna work in node js environment
// --- IGNORE ---

// // Select by ID
// let element = document.getElementById("myElement");

// // Select by class (returns first match)
// let element = document.querySelector(".myClass");

// // Select all matching elements
// let elements = document.querySelectorAll(".myClass");

// // Select by tag name
// let paragraphs = document.getElementsByTagName("p");


// // Change text content
// element.textContent = "New text content";

// // Change HTML content
// element.innerHTML = "<strong>Bold text</strong>";

// // Modify styles
// element.style.backgroundColor = "blue";
// element.style.color = "white";
