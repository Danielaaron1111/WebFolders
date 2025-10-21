# CPSC1520 - Lab 2: Introduction to Functions

> ***Are you able to infer technical requirements from general instructions?** You must use what you have learned so far in order to create the desired solution.*
> 
> *This lab doesn't tell you **how** to create the solution. Rather, it focuses on outlining **what** you must achieve. There are certain parameters you are expected to stay within, but the details of the solution are up to you.*

## Introduction

The aim of this course is to use JavaScript as a means of programmatically controlling HTML content and user interactions.

> ***Take a mastery approach to these labs.*  The material you learn in this course is cumulative. If you are having difficulties with material in prior labs, you are encouraged to revisit those labs and work through them again.**

In order to view the results of this lab in your browser, you are required to modify `index.html` to load an external script file (`js/main.js`). The job of that script file is to act as a "driver" for the JavaScript code you are required to create. The scripts in this and subsequent labs are ES6-compatible, and should be treated as such.

> The bulk of your work is to be done in the JavaScript file(s) identified below. You do have to modify `index.html`, but those are *very limited changes*.

## Functions, Math and DOM Manipulation

Your starter kit consists of an HTML file with numerous elements that you need to access and manipulate programmatically. Those elements are all located in a `<table>` and have unique `id` attributes. You have also been given two JavaScript files as a starting point. The first file - `main.js` - simply imports and calls a function from a file that you have to create. The second file - `populate.js` - exports a function that will put random numbers in the elements provided.

You are to create a file called `calculate.js` that will perform the math operations identified in the table. One of those operations involves the calculation of the length of the hypotenuse of a right triangle. For the hypotenuse, round the result to two decimal places. The code in your `calculate.js` file must include at least two functions in addition to the one that needs to be exported; all of the functions must be utilized in producing the correct results.

> The exported function must be called `calculateResult`. The other functions are not exported and you are free to choose your own names for those functions.

Every time you reload the page, new values should be randomly generated along with the correct results of the various calculations.

## Other Items

Don't forget to put your name in the ReadMe document and your GitHub username as the author in the `package.json` file.

----

## Marking Guide

Your project has been set up as a Node project complete with automated tests. The project is already configured with a built-in web server; instructions on how to launch the server will be given in class. Automated tests are included, and your instructor will guide you in running the tests locally. Do **not** modify the tests or the project settings.

> **NOTE:** A certain set of tests (marked by "PROVIDED CODE:") are provided as an internal check that the supplied code is working correctly. These tests should run "green", and you will not be given credit for these passing tests. HOWEVER, you may be docked marks if any of these tests should wind up failing and going "red". This is to ensure that you do not break the functionality of code that has been provided to you at the start of this assignment.

- **ReadMe Documentation** (2)
  - [ ] should have the student *full* name in the third line<sup>&dagger;</sup>
  - [ ] (✓) should have the prompt for the student name in the third line
- **`package.json` documentation** (1)
  - [ ] should have your GitHub username as the author
- **`index.html` Content** (2)
  - [ ] should have one `<script>` tag inside the document `<head>`
  - [ ] should reference `main.js` as the source for the script
- **`calculator.js` Script** (13)
  - [ ] should be calling populateWithRandomValues()
  - [ ] `(x2)` should perform addition
  - [ ] `(x2)` should perform subtraction
  - [ ] `(x2)` should perform multiplication
  - [ ] `(x2)` should divide by 5
  - [ ] `(x2)` should modulus by 7
  - [ ] `(x2)` should calculate the hypotenuse
- **Coding Standards and Other Requirements<sup>&ddagger;</sup>** (*deductions*)
  - [ ] -2 - JavaScript formatting and structure
  - [ ] -2 - Failure to include/use two additional functions besides the exported function.
  - [ ] -1 (Each) - Breaking/altering unit tests that are checking your code.
  - [ ] -1 (Each) - Breaking/altering unit tests for *PROVIDED CODE*

> Notes:
>
> - (✓) - Indicates a test that passes without really doing anything. But if you break the test, you lose the mark.
> - <sup>&dagger;</sup> - It's assumed that your name will be at least three characters long. You should use your **full name**. Including your full name where indicated in your assignments is a regular expectation for this course, and you may be docked marks if it is not included.
> - <sup>&ddagger;</sup> - A manual review of your code will be performed to ensure it adheres to proper standards and meets any additional requirements not covered by the automated tests. Failure to meet these requirements will result in deductions indicated in the marking guide.
