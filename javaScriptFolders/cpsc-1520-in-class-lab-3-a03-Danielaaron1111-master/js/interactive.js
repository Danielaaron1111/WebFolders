// help me section: i hate you i hate you i hate you

const setTheme = function(themename) {
  document.documentElement.setAttribute('data-theme', themename);
}




// const setThemee = function(thename) {
// document.documentElement.setAttribute('data-shomething', thename);


// }

const toggleClass = function(el, className) {
  el.classList.toggle(className);
}



//hide a dom element by adding the hide css class from the workbook
const hide = function(el) {
  el.classList.add('hide');
}
//https://dgilleland.github.io/CPSC-1520/tutorials/0080/#styling-through-javascript

//turn on dark theme and add click listener to el, prevent default set data=theme dark on
//tutorial 007
const turnOnDarkTheme = function(el) { 
  el.addEventListener('click', function (event){
    event.preventDefault();
    setTheme('dark');
    
    });
  }
//https://dgilleland.github.io/CPSC-1520/tutorials/0070/

//if o declare all the functions and export all of them i can really test the "hide" function 
//so i declare all the functions empty and export at the end to test the hide
//otherwise hide does not work even if the test pass 
//show a dom element by removing the hide css class from the worbook too
function show(el) {
  el.classList.remove('hide');
} // removing the css hide  to show the buttons  only buttons are displayed.

//https://developer.mozilla.org/en-US/docs/Web/API/Element/setAttribute

const turnOffDarkTheme =  function(el) {
  el.addEventListener('click', function (event) {
    event.preventDefault();
    document.documentElement.setAttribute('data-theme', 'light');

  });
}
//https://dgilleland.github.io/CPSC-1520/tutorials/0070/#writing-event-handlers (Prvent default)
// /**
//  * showResources() shows/hides content on the page when a button is clicked. It also presents a `<dialog>` to the user (as a modal dialog) as additional information to display to the user. The dialog will be dismissed when clicked.
//  * @param {HTMLButtonElement} elBtn The element that must respond to click events
//  * @param {HTMLElement} elReveal The DOM element to be revealed in response to the click event
//  * @param {HTMLDialogElement} elDialog An HTML Dialog element to operate as a modal dialog
//  */



// lINKS FOR THE POP OVER :
// https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/popover
//links for the DIALOGUE ELEMENT 
// https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog
//LINKS FOR TOGGLE "
// https://developer.mozilla.org/en-US/docs/Web/API/DOMTokenList/toggle
//Links for remove: 
// https://developer.mozilla.org/en-US/docs/Web/API/DOMTokenList/remove
//LINKS FOR TOGGLE POPOVER:
// https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/togglePopover 
//IN THE FUNCTION BELOW I ADDED A CLICK LISTENER TO THE DIALOGUE ELEMENT TO STOP PROPAGATION
// Links of the document element :
// https://developer.mozilla.org/en-US/docs/Web/API/Document/documentElement



// WHAT THE DIALOGUE REALLY DO  methods: <dialog>.show()  and <dialog>.showModal() and <dialog>.close()
//https://developer.mozilla.org/en-US/docs/Web/API/HTMLDialogElement
//https://developer.mozilla.org/en-US/docs/Web/API/HTMLDialogElement/showModal
//https://developer.mozilla.org/en-US/docs/Web/API/HTMLDialogElement/show
//https://developer.mozilla.org/en-US/docs/Web/API/HTMLDialogElement/close


//https://dgilleland.github.io/CPSC-1520/tutorials/0070/ 
const showResources = function (elBtn,elReveal,elDialog){ 
  elBtn.addEventListener('click', function() {
    show(elReveal);
    elDialog.showModal();
    hide(elBtn);
  });
  //add click listener to dfialog to stop propagatioon close dialog
elDialog.addEventListener('click', function (event) {
  event.stopPropagation();
  elDialog.close();
});
}
//Stop progagation prevents the event from bubbling up the event chain 
// step 6 : https://dgilleland.github.io/CPSC-1520/tutorials/0070/
//// Put this below the last TODO comment
// let button = document.getElementById('register');
// button.addEventListener('dblclick', function(evt) {
//     evt.stopPropagation();
//     let name = prompt('What is your name?');
//     let email = prompt('What is your email address?');
//     feedback.innerText = `Glad to meet you ${name}! I've sent an invitation to join our JavaScript club. It was sent to you at ${email}.`;
// });

//add mouse handelers listen for over and out to add and remove class emphazize
const openPopoverOnClick = function(clickedEl, popoverEl){
  clickedEl.addEventListener('click', function(event){
    event.preventDefault();
    popoverEl.togglePopover();


  });
}
//step one https://dgilleland.github.io/CPSC-1520/tutorials/0070/#writing-event-handlers ([prevent default])
// const handleClick = function(event) {
//     // TODO: Use for exploration purposes
//     event.preventDefault();
//     const target = event.target;
//     feedback.innerText = `Clicked from ${target.tagName}`;
// }

const addMouseHandlers = function (el){
  el.addEventListener('mouseover', function(event){
    event.target.classList.add('emphasize'); 
  });
  el.addEventListener('mouseout', function(event){
    event.target.classList.remove('emphasize');
  });
}


const toggleTagEmphasis = function(el){
  el.addEventListener('dblclick', function(event){
    window.getSelection().empty();  // throw an exception "default do not pass here"
   toggleClass(event.target, 'tag-emphasize');
  });
}
export { hide, show, turnOnDarkTheme, turnOffDarkTheme, toggleTagEmphasis, openPopoverOnClick, addMouseHandlers, showResources }






// ¯\_(ツ)_/¯¯\_(ツ)_/¯¯\_(ツ)_/¯¯\_(ツ)_/¯¯\_(ツ)_/¯¯\_(ツ)_/¯¯\_(ツ)_/¯¯\_(ツ)_/¯¯\_(ツ)_/¯¯\_(ツ)_/¯¯\_(ツ)_/¯¯\_(ツ)_/¯¯\_(ツ)_/¯¯\_(ツ)_/¯¯\_(ツ)_/¯¯\_(ツ)_/¯¯\_(ツ)_/¯¯\_(ツ)_/¯¯\_(ツ)_/¯¯\_(ツ)_/¯¯\_(ツ)_/¯¯\_(ツ)_/¯¯\_(ツ)_/¯¯\_(ツ)_/¯¯\_(ツ)_/¯¯\_(ツ)_/¯¯\_(ツ)_/¯¯\_(ツ)_/¯¯\_(ツ)_/¯¯\_(ツ)_/¯¯\_(ツ)_/¯¯\_(ツ)_/¯¯\_(ツ)_/¯¯\_(ツ)_/¯¯\_(ツ)_/¯¯\_(ツ)_/¯¯\_(ツ)_/¯¯\_(ツ)_/¯¯\_(ツ)_/¯
//ignore comments below this line":

// const showResources = function (elBtn,elReveal,elDialog){
//   elBtn.addEventListener('click', function() {
//     show(elReveal);
//     elDialog.showModal;
//     hide(elBtn);

//   });
// elDialog.addEventListener('click', function (event) {
//   event.stopPropagation();
//   elDialog.close();
// });

// }





// const toggleTagEmphasis = function(el){}
// const openPopoverOnClick = function(el){}
// https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/popover

// const addMouseHandlers = function (el){}





/**
 * showResources() shows/hides content on the page when a button is clicked. It also presents a `<dialog>` to the user (as a modal dialog) as additional information to display to the user. The dialog will be dismissed when clicked.
 * @param {HTMLButtonElement} elBtn The element that must respond to click events
 * @param {HTMLElement} elReveal The DOM element to be revealed in response to the click event
 * @param {HTMLDialogElement} elDialog An HTML Dialog element to operate as a modal dialog
 */







//so my consy hide is a function with a placeholder for "element" using el as a (element) then using clasList 
// on the css and add hide which is a class in css that hide
// const show = function(el) {
//   el.classList.remove('hide');
// }

// const show = function(el) {
//   el.classList.remove('hide');
// }
// export { hide  }
//show


// const hide = function( clickElement, hideElememnt){ 
//   clickElement.addEventListener('click', function(){
//     hideElememnt.classList,

//   }
  
  
// myElement.style.display = 'none'; 
// }

// const div = document.createElement('div');
// do i have to declare and no assigned function and called from main.js 
// to be filled?



// const div = document.createElement('div');

// const showElementOnClick = function(clickElement, revealElement){
//   clickElement.addEventListener('click', function(){
//     console.log(`${clickElement.tagName} was clicked...`);
//     // the next line will remove the css class 'hidde' from the element 
//     revealElement.classList.remove('hidden');
//   });

// }

// const hideElementOnDoubleClick = function(clickElement, hideElememnt){
//   clickElement.addEventListener('dbclick', function(){
//     hideElememnt.classList.addEventListener("hidden");
//   } );
// }
