// Enter your code below.
console.log('loaded');
const myName = "by Daniel Arancibia";
const currentYear = new Date().getFullYear();
document.querySelector("#copyright").innerText = currentYear;
document.querySelector('[data-byline]').innerText = myName;
document.querySelector('[data-byline="byline"]').innerText = myName;



// document.querySelector('span[data-byline]').innerText = myName;
//this works too 

//also i just think about this 
// this solution probrably just works because we only have one h2, if we would have more than one h2, we should
// asign a class or something and target it separately.

// const myName = "by Daniel Arancibia";
// const currentYear = new Date().getFullYear();
// document.querySelector("copyright").innerText = currentYear;
// document.querySelector("h2").innerText = myName;
// document.querySelector('data-byline').innerText = myName;




//olders solutions to think about: 

//coments and tries (i did manytries )

// document.querySelector('[data-byline="byline"]').innerText = name;
//npm run test  

// const name = "by Daniel Arancibia";
// let currentYear = document.getElementById("copyright"); // getting the element by id 
// currentYear.innerText = new Date().getFullYear(); // using date object and getfull year method to change the year.
// let changeLine = document.querySelector('[data-byline]'); //selecting h2 dataline i could use just h2 maybe
// changeLine.innerText = name; //setting the h2
// let changeLine2 = document.querySelector('[data-byline="byline"]');
// changeLine2.innerText = "by Daniel Arancibia";

//data-byline = "by Daniel Arancibia";

// 'single quotes'   // String
// "double quotes"   // String (same as single)
// `template literal` // String with special powers (variables with ${})

// document.querySelector('data-byline');
// innerText.name;

//To run the tests in the terminal, enter pnpm run test. To open the tests in the browser, run pnpm run test:ui.


//im confusing with the '',``,"" 


//those are some solutions that i didnt use (but it was a nice try)
// // Enter your code below.
// console.log('loaded');
// let currentYear = document.getElementById("copyright"); // getting the element by id 
// currentYear.innerText = new Date().getFullYear(); // using date object and getfull year method to change the year.
// let changeLine = document.querySelector('h2[data-byline]'); //selecting h2 dataline i could use just h2 maybe
// changeLine.innerText = "Daniel Arancibia"; //setting the h2
// let changeLine2 = document.querySelector('span[data-byline]');
// changeLine2.innerText = "By Daniel Arancibia";
// //im confusing with the '',``,"" 

// // Enter your code below.
// console.log('loaded');
// let currentYear = document.getElementById("copyright"); // getting the element by id 
// currentYear.innerText = new Date().getFullYear(); // using date object and getfull year method to change the year.
// let changeLine = document.querySelector('h2[data-byline]'); //selecting h2 dataline i could use just h2 maybe
// changeLine.innerText = "by Daniel Arancibia"; //setting the h2
// let changeLine2 = document.querySelector('span[data-byline]');
// changeLine2.innerText = "by Daniel Arancibia";
// //im confusing with the '',``,"" 









































//let currentYear = document.querySelector('#copyright');
//currentYear.innerText = '2025';


// let 
// we can use something like this here but i dont remember:
// currentYear.getFullYear().innerText

