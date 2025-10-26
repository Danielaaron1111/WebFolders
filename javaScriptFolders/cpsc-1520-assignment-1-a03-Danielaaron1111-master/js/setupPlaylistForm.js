/**
 * setupPlaylistHandler() is a function to gather and display top-level information (metadata) about a playlist.
 * @param {HTMLFormElement} playlistForm The form used to enter playlist metadata
 * @param {HTMLElement} outputContainer The DOM element in which playlist albums are to be displayed
 */
export const setupPlaylistHandler = function (playlistForm, outputContainer) {
  // Your code here
//THE ASSIGMENT 4 LOOK LIKE A HELP GUIDE FOR THIS ASSIGMENT AT SOME POINT TY MR DONUTS
  //step 1: listen for when user submits the form
  playlistForm.addEventListener("submit", handlePlaylistSubmit); // add event ltsner to manage form submission
  // handle the playlist form submission event the submit event, validates all inputs and creates playlist if valid
  function handlePlaylistSubmit(event) {
    event.preventDefault();
    // stop loading form from loading page
    
    //step 2 => grab the input feilds from the form
    //get form fields: elements name, description, cover .
    const nameField = playlistForm.elements.name; // const name trim();
    const descriptionField = playlistForm.elements.description; // const description  trim();
    const coverField = playlistForm.elements.cover; // const cover trim();

    // i should have start for setupowner

    //step 3: get the actual values and remove extra spaces
    // gonna get the actual values and trimmed same.syntax.that.c#(almost)
    const name = nameField.value.trim();
    const description = descriptionField.value.trim();
    const cover = coverField.value;

    //step 4 -- keep track of whether everythings valid or not
    //track if the form is valid
    let isValid = true;
    let firstInvalidField = null; // track the first error

    //VALIDATION value.dation

    //i will split the validation sutff because i cant handle all in one

    //step 5: check if name is emty or too long (max 20 characters)
    //validation 1 :
    // i will use name.length
    //
    // if (name === "" || name.length > 20) {
    //   setInvalid(nameField); //dan method
    //   isValid = false; // i declare true to be positive
    //   if (!firstInvalidField) firstInvalidField = nameField;
    // } else {
    //   clearInvalid(nameField); // helper Dan method
    // }

    // Always validate all fields on every submit
    if (name === "" || name.length > 20) {
      setInvalid(nameField);
      isValid = false;
      if (!firstInvalidField) firstInvalidField = nameField;
    } else {
      clearInvalid(nameField); // ✅ Clear when valid
    }

    //step 6 => make sure description is between 10 and 40 charactrs
    //validation 2 :
    // validate the description which should be between 10 and 40 characters
    // again i use .length because is csharpie
    // if (description.length < 10 || description.length > 40) {
    //   setInvalid(descriptionField); // helpter Dan method
    //   isValid = false;
    //   if (!firstInvalidField) firstInvalidField = descriptionField;
    // } else {
    //   clearInvalid(descriptionField); // helper Dan method
    // }

        if (description.length < 10 || description.length > 40) {
          setInvalid(descriptionField);
          isValid = false;
          if (!firstInvalidField) firstInvalidField = descriptionField;
        } else {
          clearInvalid(descriptionField); // ✅ Clear when valid
        }


    //step 7: check if they selected a cover image
    // //validation 3:
    // //validate cover which cannot be empty
    // if (cover === "") {
    //   setInvalid(coverField); // show any error
    //   isValid = false;
    //   if (!firstInvalidField) firstInvalidField = coverField;
    // } else {
    //   clearInvalid(coverField); //CLEAR ANY ERROR
    // }

      if (cover === "") {
        setInvalid(coverField);
        isValid = false;
        if (!firstInvalidField) firstInvalidField = coverField;
      } else {
        clearInvalid(coverField); // ✅ Clear when valid
      }

    //step 8 -- if anythings wrong, focus on the first bad field and dont submit
    // if form is not valid, use return to prevent creating theplaylist
    if (!isValid) {
      firstInvalidField.focus(); // i use focus stuff here provide documentation: ?:??
      return; // just dont create the playlist
    }
    
    //step 9: evrything looks good so create the playlist and clear the form
    //if form is valid, create the playlist pls
    createPlaylistItem(name, description, cover);
    //clear the form for the next entry
    playlistForm.reset(); // i use reset here provide documentation

    //step 10 => this function builds the html for a new playlist
    function createPlaylistItem(name, description, cover) {
      //step 11: find where the images are stored (hidden feild has the path)
      //get the folder path for images from the hidden input
      const imgFolder = playlistForm.elements["img-folder"].value; // i use value provide documentation

      //step 12 -- put together the full image path (folder + filename)
      // build the full image path
      const imagePath = imgFolder + cover;

      //IGNORE:
      // i addd string interpolation here with ${value} why : accept any java script expression/ placeholder/ also concatenation is to mouch +++++++ and doesnt work
      //also we use `` in javascript interpolation
      // concatenation when i join string together  we use single or double quotes (dont forget)
      //extrapolation is for math formulas,   inter between  / con together  / extra beyond
      // in summary: i pass variables, math operators, function calls ${callThePolice()}
      //object properties (we havent seen this ) array elements (we havnet sen either ) , ternary operator
      // let ternaryOperator = same than c#; , method calls like : const text = "bye"; /toupper
      // const status = `you have to ignore this comments please ${text.toUpperCase()}`;

      //step 13: make the html with backtiks and ${} to plug in the values
      //so i add some to the Dan example without change the
      //we have to use this html instead of the old one which pass the test suspecfully i thought the old unit test call my function two times 
      //AH! I AM PASSING VARIABLES HERE SO I DONT LIKE MY TEACHER ARTICLE I WILL USE MINE :)
      // the thing is now the test pass all so i dont believe on  the unit test anymore 
      const playlistHTML = `<article>
    <header>
        <h2>${name}</h2>
    </header>
    <img src="${imagePath}" alt="cover image"/>
    <footer>
        <p>
            ${description}
        </p>
        <p>
            <input name="public" type="checkbox" role="switch" /> <i>Make Public</i>
        </p>
    </footer>
</article>`;


// this is not content for this lab but it clearly related at some point.
//button.addeventlistener('click', function(){
//         incrementID++;
//         var newID ='player' + incrementID;
//         var youtubeBlock = document.createElement('div');
//         youtubeBlock.id =newID;
       
//        $(this).parent().find(".loveplayer video").appendChild(youtubeBlock) 

// )}


//using `` and ${} to insert my vars 
//so i replace actual values 
// if i dont put the ${} i just get literal text 
 

//I DONT LIKE YOU : 

// <article>
//     <header>
//         <h2>Name</h2>
//     </header>
//     <img src="ImagePath" alt="cover image"/>
//     <footer>
//         <p>
//             Description
//         </p>
//         <p>
//             <input name="public" type="checkbox" role="switch" /> <i>Make Public</i>
//         </p>
//     </footer>
// </article>
















              //this was more nice to the new article  

              // <article>
              //     <header>
              //         <h2>${name}</h2>
              //     </header>
              //     <img src="${imagePath}" alt="cover image"/>
              //     <footer> 
              //      <p>${description}</p>    
                    
              //             <input name="public" type="checkbox" role="switch" /> <i>Make Public</i>
                      
                    
              //     </footer>
              // </article>

      //caregull this is case sensitive / unit test failing  i change the p2 to p 1

      //step 14 => add the new playlist at the top of the list (prepend means add to begining)
      //the instruction say pre end which is not clear for me, that means add to start? lets try this:
      //new playlist go at the top so:

      outputContainer.innerHTML = playlistHTML + outputContainer.innerHTML;

      // When generating the HTML for the playlist, use the following markup as a sample of how the data should be presented to the user. This information is to be prepended to the start of the inner HTML of the outputcontainer. In other words, every time the user adds a new playlist, it should be placed before the existing playlists.
    }
  }//https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML
    //https://developer.mozilla.org/en-US/docs/Web/API/Element/ariaValueText
};
// Commands:
//ctrl + p =>  quick open to go file :
// ctrl + k ctrol + 0 => open a specific folder in a new windows  (this just minimize the current section if this is a section)
// ctrl k + o do that actually
//shift + control o shift for function (which is pretty cool for this )
// ctrl g go to the line
// control shift e to go to the files inside the folder
// ctrl = shift + f open global search
//control for explorer focus
//control tab to altab

// Additional private methods/variables within the module

// HELPER FUNCTIONS i dont think i need to export to another folder  :

// Makes an input field show as INVALID
const setInvalid = (field) => {
  field.setAttribute("aria-invalid", "true"); // mark field as invalid (boo)
  const id = field.getAttribute("aria-describedby"); // find a error message id
  if (id) document.getElementById(id)?.classList.remove("hide"); // show error message
};

// Makes an input field show as valid (clears errors) // we never learned how to use the arrow for functions thats sad
const clearInvalid = (field) => {
  field.removeAttribute("aria-invalid"); // Remove invalid marking
  const id = field.getAttribute("aria-describedby"); // Find error message id
  if (id) document.getElementById(id)?.classList.add("hide"); // hide error message also the "?" is not the same than in c#, intead prevents errors if elements isnt found
};
