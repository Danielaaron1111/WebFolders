import { populateWithRandomValues } from "./populate"

export function calculateResult() {
    let first = document.getElementById('first-value');
    let second = document.getElementById('second-value');
    populateWithRandomValues(first, second);
    let a = parseInt(first.innerText);
    let b = parseInt(second.innerText);
    // document.getElementById('add-result')
    // .innerText = a + b; 
    // document.getElementById(first, second);
        addition(a,b);
    //  document.getElementById('subtract-result')
    //  .innerText = a - b;
        substraction(a,b);
    //  document.getElementById('multiply-result')
    //  .innerText = a * b;
        multiplication(a,b);
    //  document.getElementById('divide-result')
    //  .innerText = a / b;
        division(a);
    //  document.getElementById('modulus-result')
    //  .innerText = a % b;
        modulus(a);
     document.getElementById('hypotenuse-result')
    .innerText = Math.round(Math.hypot(a,b)* 100) / 100;
    //  .innerText = Math.hypot (a, b).toFixed(2); // THIS WORKS
    //TOO AND IS ON THE NOTES CLASSES 
    // .innerText = Math.round(Math.hypot(a, b), 2);
    //THIS DOESNT WORK WHYYYYYY!!! BECAUSE IS INT? what about
    //if i parse to floats?
    
     //  round(Math.hypot(a, b), 2);


    //  document.getElementById()
    

}

//Functions that looks good but i dont really need it 
function  addition(a,b) {  document.getElementById('add-result')
    .innerText = a + b; 
}
function  substraction(a,b) { document.getElementById('subtract-result')
     .innerText = a - b;
    }
function multiplication(a,b) {
    document.getElementById('multiply-result')
     .innerText = a * b;
     
    }
    function division(a) { 
        let f = 5;
        document.getElementById('divide-result').innerText = a / f;
    }

function modulus(a) { 
    let g = 7;
    document.getElementById('modulus-result').innerText = a % g;

}
 // function calculateResult {



// }


//should include at least 
//parse

//The exported function must be called calculateResult


// Another triangle
// adjacent = 5;
// opposite = 12;
// hypotenuse = Math.hypot(adjacent, opposite);
// message = `My other triangle has sides of length ${adjacent}, ${opposite} and ${hypotenuse}.`;
// console.log(message);

// // Declare our own function
// function roundToDecimals(num, decimals) {
//     let factor = Math.pow(10, decimals);
//     return Math.round(num * factor) / factor;
// }

// Functions, Math and DOM Manipulation
// Your starter kit consists of an HTML file with numerous elements that you need to access and manipulate programmatically. Those elements are all located in a <table> and have unique id attributes. You have also been given two JavaScript files as a starting point. The first file - main.js - simply imports and calls a function from a file that you have to create. The second file - populate.js - exports a function that will put random numbers in the elements provided.

// You are to create a file called calculate.js that will perform the math operations identified in the table. One of those operations involves the calculation of the length of the hypotenuse of a right triangle. For the hypotenuse, round the result to two decimal places. The code in your calculate.js file must include at least two functions in addition to the one that needs to be exported; all of the functions must be utilized in producing the correct results.

// The exported function must be called calculateResult. The other functions are not exported and you are free to choose your own names for those functions.

// Every time you reload the page, new values should be randomly generated along with the correct results of the various calculations.