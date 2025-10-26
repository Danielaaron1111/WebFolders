import { getOwner, setOwner, removeOwner, loadPlaylist, savePlaylist, deletePlaylist } from './storage';

/**
 * setupOwnerHandler() is a function to manage the event listener and behaviours related to working with the ownerForm. That form manages switching between owners of playlists.
 * @param {HTMLFormElement} ownerForm - The form element for entering the owner name
 * @param {HTMLElement} inputControls - The element that contains the input controls for the {@link ownerForm} form (effectively, the Login part of the form)
 * @param {HTMLElement} displayContainer - The element that contains the display of the owner name for the {@link ownerForm} form (effectively, the currently logged-in user)
 * @param {HTMLFormElement} playlistForm - The form element where playlist owners add new playlists
 * @param {HTMLElement} playlistContainer - The container where the current owner's playlists are displayed
 */
export const setupOwnerHandler = function (ownerForm, inputControls, displayContainer, playlistForm, playlistContainer) {
  //(There are references which are at the very end of the code  and there is grouping by numbers )


  //i dont like the new image that Dan added in the last 
  //step 1: check if someones already logged in from last time
  // STEP 1: Check if there's an existing owner from localStorage (auto-login simulation)
  const currentOwner = getOwner(); //2.14
  const savedPlayList = loadPlaylist(currentOwner); //3.14
  playlistContainer.innerHTML = savedPlayList; //4.14 (this is the dangerous one)

  //step 2 => show the right stuff depending if logged in or not
  // STEP 2: Show the correct UI based on whether someone is logged in or not
  if (currentOwner) {
    showLoggedInState(currentOwner); // Someone is logged in - show their name and playlists
  } else {
    showSignInState(); // No one logged in - show the sign-in form
  }

  //step 3: listen for any button clicks on the form (4 buttons total)
  // STEP 3: Set up form submission handler for all 4 buttons (sign-in, log-out, save, clear)
  ownerForm.addEventListener("submit", handleFormSubmit); //1.14

  //   // STEP 1: Check if there's an existing owner from localStorage
  //     const currentOwner = getOwner();
  //     const savedPlayList = loadPlaylist(currentOwner);
  //     playlistContainer.innerHTML = savedPlayList;

  //     // STEP 2: Show the correct UI based on whether someone is logged in or not
  //     if (currentOwner) {
  //         showLoggedInState(currentOwner);
  //     } else {
  //         showSignInState();
  //     }

  //     // STEP 3: Set up form submission handler -  ONLY IF NOT ALREADY SET UP!!!
  //     if (!ownerForm.hasAttribute('data-handler-attached')) {
  //         ownerForm.setAttribute('data-handler-attached', 'true');
  //         ownerForm.addEventListener('submit', handleFormSubmit);
  //     }

  // I discovered that my setupOwnerHandler function was being called multiple times during testing, which was causing the event listener to be attached to the form
  //  more than once. Every time I called ownerForm.addEventListener('submit', handleFormSubmit), it was adding another copy of the same event listener without
  //  removing the old one. So when the form was submitted, my handleFormSubmit function was executing twice - once for each attached listener. This meant that
  //  functions like confirm(), savePlaylist(), and deletePlaylist() were all being called twice instead of once, which made my tests fail because they expected
  //  exactly one call. To fix this, I added a check before attaching the event listener: I use a custom HTML attribute called data-handler-attached as a flag
  //  on the form element. Before adding the listener, I first check if this attribute exists on the form. If it doesn't exist, I set the attribute to 'true'
  //  and then attach the listener. If it does exist (meaning the listener was already attached in a previous call), I skip adding it again. This way, no matter
  //  how many times setupOwnerHandler gets called, the event listener only gets attached once, and my functions only execute once per form submission.
  //or maybe there is a mistake in the unit test ... or maybe that was madde it on purpose.


  //In the instructions there is something that is not clear right now for me, 
  //it is said do not use global variables (so that make me think than this could be considered a global variable? i 
  //i think i am wrong.)
  //step 4 -- helper function to show signin form and hide evrything else
  // HELPER: Show the sign-in form (hide everything else)
  function showSignInState() {
    inputControls.classList.remove("hide"); // Show: name input + sign-in button //5.15
    displayContainer.classList.add("hide"); // Hide: logged-in user controls
    playlistForm.classList.add("hide"); // Hide: playlist creation form
    playlistContainer.classList.add("hide"); // Hide: saved playlists
  }

  //step 5: helper function to show logged in view with playlists
  // HELPER: Show logged-in state (hide sign-in form, show everything else)
  function showLoggedInState(ownerName) {
    inputControls.classList.add("hide"); // Hide: name input + sign-in button 
    displayContainer.classList.remove("hide"); // Show: logged-in user controls
    playlistForm.classList.remove("hide"); // Show: playlist creation form
    playlistContainer.classList.remove("hide"); // Show: saved playlists

    // Display the owner's name in the top bar
    ownerForm.elements.displayOwner.value = ownerName;
  }

/**
 * setupOwnerHandler() is a function to manage the event listener and behaviours related to working with the ownerForm. That form manages switching between owners of playlists.
 * @param {HTMLFormElement} ownerForm - The form element for entering the owner name
 * @param {HTMLElement} inputControls - The element that contains the input controls for the {@link ownerForm} form (effectively, the Login part of the form)
 * @param {HTMLElement} displayContainer - The element that contains the display of the owner name for the {@link ownerForm} form (effectively, the currently logged-in user)
 * @param {HTMLFormElement} playlistForm - The form element where playlist owners add new playlists
 * @param {HTMLElement} playlistContainer - The container where the current owner's playlists are displayed
 */



  //step 6 => main handler that figures out which button got clicked
  // MAIN FORM HANDLER: Determines which button was clicked and calls the right function
  function handleFormSubmit(event) {
    event.preventDefault(); // Stop the form from actually submitting (no page reload)
    const action = event.submitter.value; // Get which button was clicked
    //(Reference 1 )
    switch (action) {
      case "sign-in":
        handleSignIn();
        break;
      case "log-out":
        handleLogOut();
        break;
      case "save":
        handleSave();
        break;
      case "clear":
        handleClear();
        break;
    }
  }
 // when i do switch case i have to put the break statement at the end of each case to avoid fall through
 //to handle the 4 buttons i decide to keep the switch after read the new stuff that dan gave us . 
  //step 7: handle sign in button - check name and log them in
  // BUTTON hANDLER: Sign-in - validates input, saves owner, loads their playlist
  function handleSignIn() {
    const ownerName = ownerForm.elements.owner.value.trim(); // i actually use to trim in advance so beautifull 

    // Validation: name cannot be empty
    if (ownerName === "") {
      ownerForm.elements.owner.focus(); // Put cursor back in the input
      return; // Stop here - don't sign in 

      //pute a cite about the value and focus stuff that you found in the mozilla that was interesting and can help you for future reviews 
    }

    // Save the owner to localStorage (fake login)
    setOwner(ownerName);

    // Load any existing playlists for this owner
    const savedPlayList = loadPlaylist(ownerName);
    playlistContainer.innerHTML = savedPlayList;

    // Switch to logged-in view
    showLoggedInState(ownerName);
  }

  //step 8 -- handle logout button - clear evrything and go back to signin
  // HUTTON HANDLER: Log-out - clears everything and shows sign-in form
  function handleLogOut() {
    removeOwner(); // Remove from localStorage (fake logout)

    // clear all form values //clear all form values
    ownerForm.elements.owner.value = "";
    ownerForm.elements.displayOwner.value = "";
    playlistContainer.innerHTML = "";

    // Switch to sign-in view
    showSignInState();
  }

  //step 9: handle save button - save playlists to localstorage
  // BUTTON HANDLER: Save - saves current playlists to localStorage
  function handleSave() {
    const ownerName = ownerForm.elements.displayOwner.value;
    const playlistData = playlistContainer.innerHTML; // Get all playlist HTML
    savePlaylist(ownerName, playlistData); // Save to localStorage
  }

  //step 10 => handle clear button - ask first then delet all playlists
  // BUTTON HANDLER: Clear - asks for confirmation then deletes all playlists
  function handleClear() {
    const confirmed = confirm(
      "Are you sure you want to clear all playlists? This cannot be undone."
    );

    if (confirmed) {
      const ownerName = ownerForm.elements.displayOwner.value;
      deletePlaylist(ownerName); // Delete from localStorage
      playlistContainer.innerHTML = ""; // Clear the display
    }
  }



//FEEL FREE TO IGNORE THIS COMMENTS, THOSE ARE JUST PERSONAL NOTES FOR ME AND SOME LOGIC THAT IS MOST OF THE TIME MESSY BUT WORKS
// I JUST WANTED TO KEEP IT BECAUSE ITS PART OF MY LEARNING PROCESS AND ALSO PLEASE LET ME KNOW IF AFTER THE DEADLINE I CAN KEEP GOING UPDATING MY WORK
// OR SHOULD I CREATE A NEW REPO OR FORK THIS ONE 
// IT SEEMS THAT SOMES TEACHERS HAS A LOT OF TIME TO PROCESS STUDENT FOR ACADEMY INTEGRITY FOR JUST PUSH A COMMIT NEW VERSION OF OUR ASSIGMENTS 
//JUST FOR STUDY AND NOTE PURPOSES AND WITH EXPLICIT COMMENTS SO PLS LET US KNOW IF AFTER THE DEADLINE WE CAN KEEP PUSHING AND COMMITING (NOT FOR GRADES OF COURSE THANK YOU)



//TODO : KEEP GOING CLEEANING THE COMMENTS AND MAKE IT MORE READABLE 


   //NOTES FOR THE NEW PULLED (SYNC MY FORK OR one term that i still dont know xd)  - YOU DONT NEED TO READ THIS NOTES (ARE PRETTY PERSONAL AND CONTAINS DIALOGUES WITH MYSELF XD) :
   // considerate the button where i did a switch i think that maybe can not work on this version.
   // consider the new start guide to review my code, consider the .submitter (Investigate more this property to understand better even if i already use this i need to know more)
   // my relationship with the unit test is complicated now, so i dont know think  im gonna run these test again xd 
   // no active owner when we run the site (double double check that part)
   // The first job of setupOwnerHandler() is to make the appropriate parts of the page visible or hidden based on whether there's a current owner stored in localStorage. If there is, it shows the logged-in interface; if not, it shows the sign-in form.
  // // BUTTON HANDLER: Save - saves current playlists to localStorage
  // function handleSave() {
  //     const ownerName = ownerForm.elements.displayOwner.value;
  //     const playlistData = playlistContainer.innerHTML; // Get all playlist HTML
  //     savePlaylist(ownerName, playlistData); // Save to localStorage
  // }

  // what this means : "// TODO: 👀✨💡🚀 Pop up a toast on every Storage action!"// means that we need to implement a user feedback mechanism (like a toast notification)
  // to inform the user whenever a storage action occurs (e.g., save, delete). This will enhance the user experience by providing clear feedback on their actions.
  // i had to translate that phrase to understand it better doom by the english, but i already know that that i need to implement the feedback stuff 
  //CONFIRM() is a new one? i already did a const function with thtat 
  // 







  //     // BUTTON HANDLER: Clear - asks for confirmation then deletes all playlists
  // function handleClear() {
  //     const confirmed = confirm('Are you sure you want to clear all playlists? This cannot be undone.');

  //     if (confirmed) {
  //         const ownerName = getOwner() || ownerForm.elements.displayOwner.value;
  //         deletePlaylist(ownerName); // Delete from localStorage
  //         playlistContainer.innerHTML = ''; // Clear the display
  //     }
  // }

  // function handleClear() {
  //     const confirmed = confirm('Are you sure you want to clear all playlists? This cannot be undone.');

  //     if (confirmed) {
  //         const ownerName = ownerForm.elements.displayOwner.value.trim();
  //         deletePlaylist(ownerName);
  //         playlistContainer.innerHTML = '';
  //     }
  // }
};
///////////////////////////////////////////////////


//  // Your code here // look at thos ingredientes  (using storage.js is a warehouse  🍾)

// // const currentOwner = getOwner(); //(1)there is a current owner when the page load?
// // // get owner from storage.js should be a warehouse (with poison and toxic stuff)

// // //(2)this.check.if.someone.is.already.loggedin.if.it.is.not.show.the.sign.in.info.
// // if (currentOwner) {
// //     showLoggedInState(currentOwner);
// //  } else {
// //     // No one logged in - show the signin form 
// //     showSignInState();
// //  }
//         // Get current owner and load their playlist ONCE
//     const currentOwner = getOwner();
//     const savedPlayList = loadPlaylist(currentOwner);
//     playlistContainer.innerHTML = savedPlayList;
 
//     //show appropiate state 
//     if (currentOwner) {
//             showLoggedInState(currentOwner);
//         } else {
//             showSignInState();
//         }



//  //Added the submit event listener to manage all button clicks 

//  //add event listener 
//  ownerForm.addEventListener('submit', handleFormSubmit);
// //(3) this.listener.handle.signin.signout.save.and.clear

// //we have helper fucntion in the other list too the current should be only available to use in this golder
// //Remember, 

//  //here show the loggein interface and hides sign in control (interface like a nav html no c# interface)
    

//   //Show sign-in interface
//    function showSignInState() {
//         inputControls.classList.remove('hide');
//         displayContainer.classList.add('hide');
//         playlistForm.classList.add('hide');
//         playlistContainer.classList.add('hide');
//     }

// // function showSignInState() {
// // inputControls.classList.remove('hide'); // Show: input + sign-in button exported indirectly for lab 3 css class which this time is just display none; and  no visibility:hidden xxx /??
// // displayContainer.classList.add('hide'); // Hide: owner name + action buttons
// // playlistForm.classList.add('hide'); // Hide: playlist creation form  // hey this stuff is not intellicense or intelligente cal to elGato pls
// // playlistContainer.classList.add('hide');  // Hide: playlists display
// // }

//     //
// //when a someone is loggein shwo their name and action buttons 







//  //  Show logged-in interface - DON'T load playlist here
//     function showLoggedInState(ownerName) {
//         inputControls.classList.add('hide');
//         displayContainer.classList.remove('hide');
//         playlistForm.classList.remove('hide');
//         playlistContainer.classList.remove('hide');
  
//     ownerForm.elements.displayOwner.value = ownerName;
// //  ONLY set the display owner - DON'T load playlist again
//     ownerForm.elements.displayOwner.value = ownerName;

//     const savedPlayList = loadPlaylist(ownerName);
//     playlistContainer.innerHTML = savedPlayList;


// }

// function handleFormSubmit(event) { //THIS START HEREEEEEEEEEEEEE
//     event.preventDefault();
//      // stop the form from actually subtmitting (no page reload)
//     //which button was clicked using the submitt
//     const action = event.submitter.value; //sign in log out 

//     switch (action) {
//         case 'sign-in':
//             handleSignIn();
//             break;
//         case 'log-out': // syntax stuff: colon
//             handleLogOut(); //semi colon 
//             break; // semi colon  //console.WriteLine("is this c#?");
//         case 'save':
//             handleSave();
//             break;
//         case 'clear':
//             handleClear();
//             break;
//     }


// }

// //we have many ways to do this (we have:"sign-in, 'log-out', 'save', 'clear'") so nested if-else or switch,
// // we haven seen switch on the demos (maybe i havent check all te demos ) BUT a nested if else would be inneficient but ill try to do both and choose one 

// //which button was clicked with switch (the syntax is pretty the same that c# )

// //JAVASCRIPT FROM BEGGINER TO PROFESIONAL CHAPTER 4  PAGE 77 
// //control + f to look it up by word 

////////////////////Reference 1 
// //COULD BE IN THIS WAY too: lets keep the switch for now is more cool
// // if (action === 'sign-in') {
// //     handleSignIn(); 
// // } else if  (action === 'log-out') {
// //     handleLogOut();
// // } else if (action === 'save') {
// //     handleSave();
// // } else if (action === 'clear') {
// //     handleClear();
// // }

// //according to eloquent javascript there is another way:
// // is like a LINQ in c# but not really like" action: 'sign-in' : handleSignIn,
// // but nah. this options is called object lookUp similar to Linq queries in c# well idk 


//  //lets handle the sign in process (sleeping sounds)
//     function handleSignIn() {
//         const ownerName = ownerForm.elements.owner.value.trim();
//         //rember "daniel" != to "  daniel  "

//         //validation of owner name cannot be empty !NULLORWHITESPACEEEEEEEEEE.notreally
//         if (ownerName === '') {
//             ownerForm.elements.owner.focus();
//             return; 
//         }

//         //save the owner name to localstorage (we have a csv folder or something like c# .write and .read ? in javascript ? i will investigate)
//             setOwner(ownerName);

//         // update the interface to show loggin state
//         showLoggedInState(ownerName);
        
//     }

//     // handle the log-out process
//     function handleLogOut() {
//         removeOwner();
        
//         ownerForm.elements.owner.value = '';
//         ownerForm.elements.displayOwner.value = '';

//         playlistContainer.innerHTML = '';

//         showSignInState();

//     }

//     //how to handle the save and local store

//     //ERROR 2 
//     function handleSave() {
//         const ownerName = ownerForm.elements.displayOwner.value; 
//         const playlistData = playlistContainer.innerHTML; // get all the content form the playlist container 

//         savePlaylist(ownerName, playlistData); // save it to local stre using the modelule(import-ex[prt])
//     }

//     //how to handle the clearing all playlistm
     
//     //First error 
//     function handleClear() {
//         //ask the user to confirm this action
//         const confirmed = confirm('Are you sure you want to clear all playlists? This cannot be undone.');
//        //if the user confirm :
//         if (confirmed) {
//              // get the current owner:
//             const ownerName = ownerForm.elements.displayOwner.value;
//             //delete the csv file 
//             deletePlaylist(ownerName);
//             //clear the display
//             playlistContainer.innerHTML = ''; // if there is no confirmation nothing happen here 
//         }
//     }


// }; 

//  //ownerForm
//  //inputControls
//  //displayContainer
//  //playlistForm
//  //playlistContainer 
//  //pl


// // traps in the unit test mocking stuff x>X>X>X>X>X
// //Mocking:When writing tests it's only a matter of time before you need to create a "fake" version of an internal — or external — service. This is commonly referred to as mocking. Vitest provides utility functions to help you out through its vi helper. You can import it from vitest or access it globally if global configuration is enabled.
// // https://vitest.dev/guide/mocking#modules
 
 

//   //REFERENCES not really usefull ones :
//     //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/return
//     //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch
//    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch
//     //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/using

//     //References whith are really useful ones : 

//     //Javascript from begginer to profesional:
//     //chapter 6 functions // page 129 returning with arrow function (NOT IN CLASS)
//     //variable scope and nested fucntions (do we do this all the time ? why is so unorganize i get lost in the curly braces :C )
//     //Chapter 11 interactive content and evnet listeners // chapter 9 the document object projects, chapter 10 dynamic 'manipulation' using the dom 




// // Additional private methods/variables within the module
// // ☠️poison☠️☠️poison☠️☠️poison☠️☠️poison☠️☠️poison☠️☠️poison☠️☠️poison☠️☠️poison☠️☠️poison☠️☠️poison☠️☠️poison☠️☠️poison☠️☠️poison☠️☠️poison☠️☠️poison☠️
//folder 10 from the workbook just added for future review 
// const container = document.getElementById('players');

// const form = document.querySelector('form');
// // TODO: Add Event Listener
// form.addEventListener('submit', function (evt) {
//     evt.preventDefault(); // ALWAYS for our submit event handlers/forms in CPSC-1520
//     console.log('Adding players...');

//     // Get the names
//     const inputNames = evt.target.elements.playerNames;
//     const names = inputNames.value.split(',').map(name => name.trim());
//     // What does the line above do??

//     if(names.length > 0) {
//         // Add players to the container
//         names.forEach((player, index) => {
//             container.innerHTML += `<div id="player-${index}"><h2>${player}</h2></div>`;
//         });
//         // console.log(container); // un-comment this if you are having problems....

//         // Disable button, hide form, show container
//         evt.target.elements.createPlayers.setAttribute('disabled', 'true');
//         evt.target.classList.add('hidden');
//         container.classList.remove('hidden');
//     }
// });

// const dealButton = document.getElementById('deal-me-in');
// // TODO: Add Event Listener
// dealButton.addEventListener('click', function(evt) {
//     console.clear();
//     const players = container.querySelectorAll('div');
//     // I can use the .forEach() function that comes with the NodeList data type
//     players.forEach(playerHand => {
//         // TODO: Make sure there are enough cards left in the deck....
//         const card = shuffledCards.pop();
//         const img = `<img src="/img/${card}.svg" alt="${card}" />`;
//         playerHand.innerHTML += img;
//         // console.log(playerHand); // uncomment if you are having problems
//     });
// });

// const shuffledCards = [
//     "4D",
//     "3D",
//     "4H",
//     "6S",
//     "3H",
//     "4S",
//     "JC",
//     "3C",
//     "7C",
//     "6C",
//     "8H",
//     "KD",
//     "KH",
//     "JH",
//     "QH",
//     "7H",
//     "AS",
//     "8S",
//     "3S",
//     "8C",
//     "0S",
//     "7S",
//     "6H",
//     "4C",
//     "JD",
//     "9S",
//     "0D",
//     "5S",
//     "AC",
//     "9H",
//     "2C",
//     "0H",
//     "9C",
//     "8D",
//     "6D",
//     "KS",
//     "QC",
//     "KC",
//     "5H",
//     "2S",
//     "JS",
//     "QD",
//     "2H",
//     "7D",
//     "AD",
//     "2D",
//     "0C",
//     "AH",
//     "9D",
//     "5C",
//     "QS",
//     "5D"
// ]
