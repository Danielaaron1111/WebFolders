// The following code demonstrates how to apply onclick functionality to multiple toggle menus that share the same class selector and CSS styles
// const toggleButtons = document.querySelectorAll('.toggle-btn');

// toggleButtons.forEach((toggleButtons) => {
//     toggleButtons.addEventListener("click", function (event) {
//         event.stopPropagation();
//         // this.nextElementSibling.classList.toggle('expanded');

//         // const nav = document.querySelector('nav');
//         // nav.classList.toggle('expanded');

//         document.querySelector('nav').classList.toggle('expanded');

// The following code is the equivalent of toggle, add and remove
//         // if (document.querySelector('nav').classList.contains('expanded')) {
//         //     document.querySelector('nav').classList.remove('expanded');
//         // } else {
//         //     document.querySelector('nav').classList.add('expanded');
//         // }
//     })
// });

// The following code demonstrates a arrow function in javascript
// function (event) is equal to (e) =>
// toggleButtons.forEach((toggleButtons) => {
//     toggleButtons.addEventListener("click", (e) => {

//     })
// });

const toggleButton = document.querySelector('.toggle-btn');

toggleButton.addEventListener('click', (e) => {
    e.stopPropagation();

    document.querySelector('nav').classList.toggle('expanded');
})