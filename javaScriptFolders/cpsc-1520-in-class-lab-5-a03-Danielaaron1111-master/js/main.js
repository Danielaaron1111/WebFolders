

const innerCarousel = document.querySelector('.carousel-inner')
const savedList = document.querySelector('#saved-images')

// TODO: change the following array include the image names.
let images = ['cat.jpg', 'fox.jpg', 'gecko.jpg', 'leopard.jpg','panda.jpg', 'polar_bear.jpg']
console.log(images);



// 1.   Modify the `images` array to include the [image names](./ImageCredits.md) 
//     in the images folder.
// question 1 : do i have to added manually?
//question 2: there is any way to do it with a function that fetch the images from a folder?
// as we create html can we append the images from a folder directly?
//i added manually for now
// look at this it can be usefull: let currentImg = 0;




//this list gonna storage or save, hold the saved images
let savedImages = []
/**
 * Adds an item to the list with the specified index.
 * @param {string} imageName - The name of the image.
 * @returns {void}
 */



const addToSavedImageList = (imageName, index) => {
  savedList.innerHTML += `
    <li class="list-group-item d-flex justify-content-between align-items-start">
      <img src="img/${imageName}" class="img-thumbnail" alt="image at ${index}">
      <div class="ms-2 me-auto">
        <div class="fw-bold">Saved Image ${index + 1}</div>
      </div>
      <button class="btn btn-danger" data-index="${index}">remove</span>
    </li>`
}

/**
 * Creates a carousel item with the specified image name and index.
 * @param {string} imageName - The name of the image.
 * @param {number} index - The index of the carousel item.
 * @returns {void}
 */
const createCarouselItem = (imageName, index) => {
  let activeItem = 0
  if (index === 0) {
    activeItem = 'active'
  }
  innerCarousel.innerHTML += `<div class="carousel-item ${activeItem}">
      <img src="img/${imageName}" class="d-block w-100" alt=${imageName}">
      <div class="container">
        <div class="carousel-caption text-start">
          <h1>Image ${index + 1} (at index ${index})</h1>
          <p><button class="btn btn-lg btn-primary" data-index="${index}" href="#">Save Image</button></p>
        </div>
      </div>
    </div>
  `
} //why index +1 ? because index start from 0 (000)

// step 1: render the items to the the carousel..

// TODO: Enter your code below.
//2.-Create a function named renderCarousel that will call the function createCarouselItem with the correct arguments to render each image in a carousel item on the page. You will need to loop through the images array to achieve the desired results. You may use any type of loop to accomplish this.
// const renderCarousel = (imageName, index) => {
//   images.forEach(images, index) 

//this works better and is shorter 
const renderCarousel = () => {
  images.forEach((imageName, index) => {
    createCarouselItem(imageName, index)
  })
}

//this doesnt work (im missing something here immageName?)
// const renderCarousel = () => {
//   for (let i = 0; i < images.lenght; i++) {
//     createCarouselItem(images[i],i)
//   }
// }


//this works too 
// const renderCarousel = () => {
//   let index = 0;
//   for (const imageName of images) {
//     createCarouselItem(imageName, index)
//     index++
//   }
// }



// for (let suitIndex = 0; suitIndex < cardSuits.length; suitIndex++) {
//     let suit = cardSuits[suitIndex];
//     for (let valueIndex = 0; valueIndex <cardValues.length; valueIndex++) { 
//       let value = cardValues[valueIndex];
//       //create a card (object?)
//       let card = { suit, value };
//       deck.push(card);
//     }
//   }
// according to the instruction this function should be under step two, however 
// if i write that down there it doesnt work because is inside of the scope of 
//the event listener 
// probably im doing something wrong here works for now 

const renderImageList = () => {
  savedList.innerHTML = '' //limpiando the list to prevent duplicates 
  
  savedImages.forEach((imageName, index) => { //looping to the saved inages 
    addToSavedImageList(imageName, index) // call the funcion for each one and get html on each saved image 
  })
}

// 3.  Call the `renderCarousel` function you just created, and the page should change from
//     blank to images.

//3.-Call the renderCarousel function you just created, and the page should change from blank to images.
//3.-a call the renderCarousel function you just created, and the page should change from blank to images.
renderCarousel();


// step 2 - carousel button clicks adds to saved list
innerCarousel.addEventListener('click', (event) => { // event delegation ? yup
  if (event.target.tagName !== 'BUTTON') {
    return
  }
  const itemIndex = parseInt(event.target.getAttribute('data-index'))


  // TODO: your code for step 2 below
  
// # Exercise Step 2: Add to My Images

// 1.  Review the event listener given in the JavaScript file for step 2. 
// 2.  Using array methods, check if the `savedImages` array includes the image
//     in the `images` array at the corresponding `itemIndex`.
const imageName = images[itemIndex] //getting the img name 
console.log('pic clicked', imageName)

//     a.  If it does not, add the image name to the `savedImages` array using array methods.
//         You can use some debugging techniques (console.log etc.) here to display whether
//         the array has the item or not.

//     b.  If it does, don't do anything (we don't want any duplicates
//         here).\
//     > Note: this means if I click the "cat" image three times I should only see it once in my `savedImages` list.
if (!savedImages.includes(imageName)) { //beautiful is not! cgeking if not in the array
  savedImages.push(imageName) //adding to save images
  console.log('saving pics', savedImages) 
  renderImageList() // calling render list 
}
// if thats true is not there so addit if its false is already there so do not do nothing
// is basicallly prevent duplicates 

//ok so in this case includes is used like this, is a boolean array method which tell me if is true 
// or not that image name is in savedimages array, if is true the image is already saved if is false
// is not saved yet 

// 3.  Create a function named `renderImageList`. The function will loop
//     through the `savedImages` array and call the function
//     `addToSavedImageList` with the correct arguments.


//     a.  Call this function every time you add an item to the `savedImages`
//         array.    
//      > Note: Make sure to clear out the existing HTML for the saved list otherwise you'll have duplicates    


// 4.  If you click the "cat" image twice and the "polar bear" image three
//     times, the result should look like below.




})


// step 3 - my images button clicks removes from saved list
//to remove item from an array us .splice(parameters here) 
savedList.addEventListener('click', (event) => {
  if (event.target.tagName !== 'BUTTON') {
    return
  } //getting the button here as Dan mentioned 
  const itemIndexToRemove = parseInt(event.target.getAttribute('data-index'))
 
  
  // TODO: your code for step 3 below
// ## Exercise Step 3 -- Remove items from "My Image" list.

// 1.  Observe the `itemIndexToRemove` in the given event listener on the saved
//     list.
 //itemIndexToRemove
// 2.  Using array methods, remove the item at the index specified from the
//     `savedImages` array.
//     > You may want to look into the [splice](https://www.geeksforgeeks.org/javascript/javascript-array-splice-method/) method to accomplish this
  savedImages.splice(itemIndexToRemove, 1)
  console.log('removed itm, saves images: ', savedImages)
  //savedImages.splice(itemIndexToRemove, 1)
// 4.  Call the function `renderImageList` below that.
renderImageList()
// 5.  Once you have clicked "save Image" on the cat and the "polar bear"
//     and then clicked "remove" on the cat, your page should look
//     like below.\

})
//https://gist.github.com/ajeetkumarrauniyar/48d28c0c65b06c35bbeefdfc40453ac8
