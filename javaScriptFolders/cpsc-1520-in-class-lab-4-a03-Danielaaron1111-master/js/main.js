
// Enter your code below.


// functions needed for assessment (do not change.)

/**
 * Checks if a value is not empty.
 *
 * @param {any} value - The value to check.
 * @returns {boolean} - Returns true if the value is not empty, false otherwise.
 */
const isValueNotEmpty = (value) => {
  if (value !== "") {
      return true
  }
  return false
}
// speaking of .trim(); we should trim that isValueNoempty but is not in the instructions :( )
/**
 *
 * Checks if a given value is greater than zero.
 * @param {number} value - The value to be checked.
 * @returns {boolean} - True if the value is greater than zero, otherwise false.
 */
const isGreaterThanFive = (value) => { // i want to learn to do function with the arrow 
  if (value > 5) {
      return true
  }
  return false
}

/**
 * Adds a new order item to the order list.
 *
 * @param {string} orderItemName - The name of the order item.
 * @param {number} orderItemPrice - The price of the order item.
 * @param {string} orderSize - The size of the order item.
 * @returns {void}
 */                  // my function
const addOrderItem = (orderItemName, orderItemPrice, orderSize) => {
  let orderItemList = document.querySelector("#order-item-list")
  let newOrderItem = `<li class="list-group-item d-flex justify-content-between">
    <div class="w-100 justify-content-between">
      <h5 class="mb-1">${orderItemName}</h5>
      <small>${orderSize}</small>
    </div>
    <p class="mb-1">${'$'+orderItemPrice}</p>
  </li>`
  orderItemList.innerHTML += newOrderItem
}
//to DO'S
// 1.- put your name in the readme.md and link your javascript folder 
//2.- SELECT the form with the id new-order-form
let newOrderForm = document.querySelector("#new-order-form");
//3.- Add an event listener  on the form that will handle the submit event 
newOrderForm.addEventListener("submit", (event) => {
  //prevent default behaviour of the form
  //4.  Using the `event` object, prevent the default action from happening.
  event.preventDefault();
  //look this is new : stopInmeadiatePropagation();
  // event.stopImmediatePropagation(); (not related here but ...)
  // reference: https://developer.mozilla.org/en-US/docs/Web/API/Event/stopImmediatePropagation
  //5.- Assign the form elements using the elements property on event.target to variables with appropiates names.
// names: order-item-name, order-item-price, order-size
const orderItemName = event.target.elements['order-item-name'];
const orderItemPrice = event.target.elements['order-item-price'];
const orderSize = event.target.elements['order-size'];
//6.- pass the form values to the addOrderItem function // WE WANT THI AT THE END PROBABLY 
// addOrderItem(orderItemName.value, orderItemPrice.value, orderItemSize.value); // ERROR HERE this is at the end after validation


//1.- there's a bug in our application. we get a blank row to our order if we submit our form with nothing in it.
//we only want to populated rows because that is what we expect in our application.
// so we need to add some validation to our form submission

//==That boolean is gonna track if all fields are ok or not
//Dan sat something about console log with color but i dont remember.
//  let isFormValid = true; // positive approach declare an after step 1 ? later? 
 let isFormValid = true; // positive approach declare an after step 1 ? later?
 //validate the item name :
 if (isValueNotEmpty(orderItemName.value)) { // checking if the item is not empy
  //
  //is is valid the item name is filled 
  //remove the is-invalid class (border red)
  orderItemName.classList.remove("is-invalid"); // if  (is valid ) => remove the invalid class :) 
 } else { 
  //if the value is is invalid the item is void/empty // ifinvalid - add the in-invalid class / like hide and show:
  orderItemName.classList.add("is-invalid");
  isFormValid = false; // set the form validity to false negative approeach.

 }

 //validate the order item price 
if (isValueNotEmpty(orderItemPrice.value) && isGreaterThanFive(orderItemPrice.value)) {
 
//(and) // if valid remove the is invalid class
 orderItemPrice.classList.remove("is-invalid");
} else {
  // if invalid add the is invalid class again 
  orderItemPrice.classList.add("is-invalid");
  isFormValid = false;
}

 //chec if a size option was selected not empty value
 if (isValueNotEmpty(orderSize.value)) {
  // valid remove the is invalid class
  orderSize.classList.remove("is-invalid");
 } else { 
  // if invalid add the is invalid class
  orderSize.classList.add("is-invalid");
  // isformvalid to false
  isFormValid = false;
// is that bootsrap ?
 }
 // addorderitem only will be run if isformavalid is real true 
 if (isFormValid) {
  addOrderItem(orderItemName.value, orderItemPrice.value, orderSize.value);

  // reset the values of each input on a successful form submission 
  orderItemName.value = '';
  orderItemPrice.value = '';
  orderSize.value = '';


 }





 
  


});


  // addOrderItem(orderItemName.value, orderItemPrice.value, orderItemSize.value);

// const nameInvalidFeedback = event.target.elements['name-invalid-feedback'];

// STUDENT_NAME

