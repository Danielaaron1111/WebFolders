

// fruits = ['banana', 'apple', 'cherry', 'blueberry', 'date', 'elderberry', 'fig', 'grape'];
//   searchFruit = 'ba';
//   let result = fruits.find(x => x.includes(searchFruit));
//   console.log(`\nI found ${result}`);


// ==========================================
// SPLICE() EXPLAINED STEP BY STEP
// ==========================================

console.log('===== UNDERSTANDING SPLICE() =====\n');
console.log('splice(startIndex, deleteCount, itemsToAdd...)');
console.log('  startIndex   = WHERE to start');
console.log('  deleteCount  = HOW MANY to remove');
console.log('  itemsToAdd   = WHAT to insert at that position\n');

// ===== EXAMPLE 1: REMOVE ONLY =====
console.log('--- Example 1: Remove Only ---');
let colors1 = ['red', 'green', 'blue', 'yellow', 'purple'];
console.log('Before:  ', colors1);
console.log('         Index: 0      1       2       3        4');
console.log('');
console.log('Call: colors1.splice(2, 2)  <- Start at index 2, remove 2 items');
console.log('      What happens:');
console.log('        - Go to index 2 (blue)');
console.log('        - Remove 2 items: blue and yellow');
console.log('        - Add nothing (no 3rd parameter)');
let removed1 = colors1.splice(2, 2);
console.log('');
console.log('After:   ', colors1);
console.log('Removed: ', removed1);
console.log('✓ Removed blue and yellow from the middle!\n');

// ===== EXAMPLE 2: ADD ONLY (DELETE 0) =====
console.log('--- Example 2: Add Only (deleteCount = 0) ---');
let colors2 = ['red', 'green', 'blue'];
console.log('Before:  ', colors2);
console.log('         Index: 0      1       2');
console.log('');
console.log('Call: colors2.splice(1, 0, "orange", "pink")');
console.log('      What happens:');
console.log('        - Go to index 1 (green)');
console.log('        - Remove 0 items (nothing deleted!)');
console.log('        - INSERT orange and pink BEFORE green');
colors2.splice(1, 0, 'orange', 'pink');
console.log('');
console.log('After:   ', colors2);
console.log('✓ Inserted orange and pink at position 1!\n');

// ===== EXAMPLE 3: REPLACE (REMOVE + ADD) =====
console.log('--- Example 3: Replace (Remove 2, Add 3) ---');
let colors3 = ['red', 'green', 'blue', 'yellow'];
console.log('Before:  ', colors3);
console.log('         Index: 0      1       2       3');
console.log('');
console.log('Call: colors3.splice(1, 2, "cyan", "magenta", "white")');
console.log('      What happens:');
console.log('        - Go to index 1 (green)');
console.log('        - Remove 2 items: green and blue');
console.log('        - INSERT cyan, magenta, white in that spot');
colors3.splice(1, 2, 'cyan', 'magenta', 'white');
console.log('');
console.log('After:   ', colors3);
console.log('✓ Replaced 2 items with 3 new items!\n');

// ===== EXAMPLE 4: NEGATIVE INDEX =====
console.log('--- Example 4: Negative Index (count from end) ---');
let colors4 = ['red', 'green', 'blue', 'yellow'];
console.log('Before:  ', colors4);
console.log('         Index:  0      1       2       3');
console.log('         Index: -4     -3      -2      -1  (negative)');
console.log('');
console.log('Call: colors4.splice(-2, 1)  <- -2 means "2nd from end"');
console.log('      What happens:');
console.log('        - Go to index -2 (blue, which is 2nd from end)');
console.log('        - Remove 1 item: blue');
console.log('        - Add nothing');
colors4.splice(-2, 1);
console.log('');
console.log('After:   ', colors4);
console.log('✓ Removed blue (2nd from end)!\n');

// ===== VISUAL DIAGRAM =====
console.log('========================================');
console.log('VISUAL GUIDE:');
console.log('========================================');
console.log('Array: [A, B, C, D, E]');
console.log('Index:  0  1  2  3  4');
console.log('');
console.log('splice(2, 1)');
console.log('       ↑  ↑');
console.log('       |  └─ Delete 1 item');
console.log('       └──── Start at index 2');
console.log('Result: [A, B, D, E]  (C removed)');
console.log('');
console.log('splice(2, 0, "X", "Y")');
console.log('       ↑  ↑   ↑');
console.log('       |  |   └─ Items to add');
console.log('       |  └───── Delete 0 items');
console.log('       └──────── Start at index 2');
console.log('Result: [A, B, X, Y, C, D, E]');
console.log('');
console.log('splice(1, 2, "Z")');
console.log('       ↑  ↑  ↑');
console.log('       |  |  └─ Add "Z"');
console.log('       |  └──── Delete 2 items');
console.log('       └─────── Start at index 1');
console.log('Result: [A, Z, D, E]  (B and C removed)');
console.log('========================================\n');

// ===== PRACTICAL USES =====
console.log('--- Practical Uses of splice() ---');

// Remove item by value
let fruitsDemo = ['apple', 'banana', 'cherry', 'date'];
let toRemove = 'cherry';
let index = fruitsDemo.indexOf(toRemove);
if (index !== -1) {
    fruitsDemo.splice(index, 1);
    console.log(`Removed ${toRemove}:`, fruitsDemo);
}

// Insert at beginning (like unshift)
let numsDemo = [2, 3, 4];
numsDemo.splice(0, 0, 1); // Insert 1 at start
console.log('Insert at start:', numsDemo); // [1, 2, 3, 4]

// Remove from end (like pop)
numsDemo.splice(-1, 1); // Remove last item
console.log('Remove from end:', numsDemo); // [1, 2, 3]

// Clear array from position
let itemsList = ['a', 'b', 'c', 'd', 'e'];
itemsList.splice(2); // Remove from index 2 to end
console.log('Clear from index 2:', itemsList); // ['a', 'b']

console.log('\n===== KEY POINTS =====');
console.log('1. splice CHANGES the original array (mutating)');
console.log('2. It RETURNS an array of removed items');
console.log('3. deleteCount of 0 means "just insert, don\'t remove"');
console.log('4. Negative index counts from the end');
console.log('5. Can remove MORE and add LESS (or vice versa)');
console.log('==========================================\n');

console.log('\n===== SPLICE() - The Swiss Army Knife =====');
// splice(startIndex, deleteCount, item1, item2, ...)
// - Modifies the ORIGINAL array (mutating)
// - Returns an array of deleted items
// - Can add, remove, or replace items at any position

let colors = ['red', 'green', 'blue', 'yellow', 'purple'];
console.log('Original:', colors);

// Example 1: Remove items only
let removed = colors.splice(2, 2); // Start at index 2, remove 2 items
console.log('After splice(2, 2):', colors); // ['red', 'green', 'purple']
console.log('Removed items:', removed); // ['blue', 'yellow']

// Example 2: Add items without removing
colors = ['red', 'green', 'blue'];
colors.splice(1, 0, 'orange', 'pink'); // At index 1, remove 0, add 2
console.log('After splice(1, 0, "orange", "pink"):', colors);
// ['red', 'orange', 'pink', 'green', 'blue']

// Example 3: Replace items (remove + add)
colors = ['red', 'green', 'blue', 'yellow'];
colors.splice(1, 2, 'cyan', 'magenta', 'white'); // Remove 2, add 3
console.log('After splice(1, 2, "cyan", "magenta", "white"):', colors);
// ['red', 'cyan', 'magenta', 'white', 'yellow']

// Example 4: Remove from end using negative index
colors = ['red', 'green', 'blue', 'yellow'];
colors.splice(-2, 1); // Start 2 from end, remove 1
console.log('After splice(-2, 1):', colors); // ['red', 'green', 'yellow']

console.log('\n===== FILTER() - Create New Array Based on Condition =====');
// filter(callback) - Does NOT modify original array
// Returns NEW array with items that pass the test
// If nothing passes, returns empty array []

let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log('Original numbers:', numbers);

// Example 1: Filter even numbers
let evens = numbers.filter(num => num % 2 === 0);
console.log('Even numbers:', evens); // [2, 4, 6, 8, 10]
console.log('Original unchanged:', numbers); // Still [1,2,3,4,5,6,7,8,9,10]

// Example 2: Filter with multiple conditions
let bigEvens = numbers.filter(num => num % 2 === 0 && num > 5);
console.log('Even numbers > 5:', bigEvens); // [6, 8, 10]

// Example 3: Filter strings by length
let words = ['cat', 'elephant', 'dog', 'butterfly', 'ant'];
let longWords = words.filter(word => word.length > 3);
console.log('Words longer than 3 letters:', longWords);
// ['elephant', 'butterfly']

// Example 4: Filter objects
let people = [
    { name: 'Alice', age: 25 },
    { name: 'Bob', age: 17 },
    { name: 'Charlie', age: 30 },
    { name: 'Diana', age: 16 }
];
let adults = people.filter(person => person.age >= 18);
console.log('Adults only:', adults);
// [{name: 'Alice', age: 25}, {name: 'Charlie', age: 30}]

// Example 5: Remove specific item from array
let fruits = ['apple', 'banana', 'cherry', 'banana', 'date'];
let noBananas = fruits.filter(fruit => fruit !== 'banana');
console.log('Without bananas:', noBananas);
// ['apple', 'cherry', 'date']

console.log('\n===== MAP() - Transform Every Item =====');
// map(callback) - Does NOT modify original
// Returns NEW array with transformed items
// Always returns array of same length

let nums = [1, 2, 3, 4, 5];
let doubled = nums.map(num => num * 2);
console.log('Original:', nums); // [1, 2, 3, 4, 5]
console.log('Doubled:', doubled); // [2, 4, 6, 8, 10]

let names = ['alice', 'bob', 'charlie'];
let capitalized = names.map(name => name.toUpperCase());
console.log('Capitalized:', capitalized); // ['ALICE', 'BOB', 'CHARLIE']

// Transform objects
let prices = [10, 20, 30];
let products = prices.map((price, index) => ({
    id: index + 1,
    price: price,
    tax: price * 0.1
}));
console.log('Products:', products);

console.log('\n===== REDUCE() - Combine Into Single Value =====');
// reduce(callback, initialValue)
// Accumulates array into single value
// Callback: (accumulator, currentValue) => newAccumulator

let scores = [10, 20, 30, 40];
let total = scores.reduce((sum, score) => sum + score, 0);
console.log('Sum of scores:', total); // 100

let max = scores.reduce((maximum, score) => score > maximum ? score : maximum);
console.log('Highest score:', max); // 40

// Build object from array
let items = ['apple', 'banana', 'apple', 'cherry', 'banana', 'apple'];
let count = items.reduce((acc, item) => {
    acc[item] = (acc[item] || 0) + 1;
    return acc;
}, {});
console.log('Item count:', count); // {apple: 3, banana: 2, cherry: 1}

console.log('\n===== FIND() & FINDINDEX() - Locate Items =====');
// find() - Returns FIRST matching item (or undefined)
// findIndex() - Returns FIRST matching index (or -1)

let students = [
    { id: 1, name: 'Alice', grade: 85 },
    { id: 2, name: 'Bob', grade: 92 },
    { id: 3, name: 'Charlie', grade: 78 }
];

let topStudent = students.find(student => student.grade > 90);
console.log('First student with grade > 90:', topStudent);
// {id: 2, name: 'Bob', grade: 92}

let bobIndex = students.findIndex(student => student.name === 'Bob');
console.log('Bob is at index:', bobIndex); // 1

console.log('\n===== SOME() & EVERY() - Test Conditions =====');
// some() - Returns true if AT LEAST ONE passes test
// every() - Returns true if ALL pass test

let ages = [18, 21, 25, 30];
let hasMinor = ages.some(age => age < 18);
console.log('Has anyone under 18?', hasMinor); // false

let allAdults = ages.every(age => age >= 18);
console.log('Are all adults?', allAdults); // true

console.log('\n===== INCLUDES() & INDEXOF() - Check Existence =====');
// includes() - Returns true/false if value exists
// indexOf() - Returns index of first match (or -1)

let myFruits = ['apple', 'banana', 'cherry'];
console.log('Has banana?', myFruits.includes('banana')); // true
console.log('Has orange?', myFruits.includes('orange')); // false
console.log('Index of cherry:', myFruits.indexOf('cherry')); // 2
console.log('Index of grape:', myFruits.indexOf('grape')); // -1

console.log('\n===== SLICE() - Copy Part of Array =====');
// slice(start, end) - Does NOT modify original
// Returns NEW array with copied portion
// end index is NOT included

let letters = ['a', 'b', 'c', 'd', 'e'];
let middle = letters.slice(1, 4); // From index 1 to 3
console.log('Slice(1, 4):', middle); // ['b', 'c', 'd']
console.log('Original unchanged:', letters);

let lastTwo = letters.slice(-2); // Last 2 items
console.log('Last two:', lastTwo); // ['d', 'e']

let copy = letters.slice(); // Copy entire array
console.log('Full copy:', copy);

console.log('\n===== CONCAT() & SPREAD - Combine Arrays =====');
// concat() - Combine arrays without modifying originals
// Spread operator [...] - Modern way to combine

let arr1 = [1, 2, 3];
let arr2 = [4, 5, 6];
let combined = arr1.concat(arr2);
console.log('Concat:', combined); // [1, 2, 3, 4, 5, 6]

let spread = [...arr1, ...arr2];
console.log('Spread:', spread); // [1, 2, 3, 4, 5, 6]

// Add items in middle
let withMiddle = [...arr1, 99, ...arr2];
console.log('With 99 in middle:', withMiddle); // [1, 2, 3, 99, 4, 5, 6]

console.log('\n===== JOIN() & SPLIT() - Array ↔ String =====');
// join() - Array to string
// split() - String to array

let words2 = ['Hello', 'World', 'JavaScript'];
let sentence = words2.join(' ');
console.log('Joined:', sentence); // "Hello World JavaScript"

let csv = words2.join(',');
console.log('CSV:', csv); // "Hello,World,JavaScript"

let backToArray = sentence.split(' ');
console.log('Split back:', backToArray); // ['Hello', 'World', 'JavaScript']

console.log('\n===== REVERSE() & SORT() - Reorder (MUTATING!) =====');
// Both MODIFY the original array

let nums2 = [3, 1, 4, 1, 5];
nums2.reverse();
console.log('Reversed:', nums2); // [5, 1, 4, 1, 3]

nums2.sort((a, b) => a - b); // Numeric sort
console.log('Sorted:', nums2); // [1, 1, 3, 4, 5]

// String sort (alphabetical)
let fruit2 = ['banana', 'apple', 'cherry'];
fruit2.sort();
console.log('Sorted fruits:', fruit2); // ['apple', 'banana', 'cherry']

console.log('\n===== QUICK REFERENCE =====');
console.log('MUTATING (change original):');
console.log('  push, pop, shift, unshift, splice, reverse, sort');
console.log('\nNON-MUTATING (return new):');
console.log('  filter, map, slice, concat, join');
console.log('\nTESTING:');
console.log('  find, findIndex, some, every, includes, indexOf');
console.log('\nAGGREGATING:');
console.log('  reduce, join');

// // ===== ADDING & REMOVING FROM ARRAYS =====
// console.log('\n===== ADDING & REMOVING FROM ARRAYS =====');

// // Starting with a simple array
// let myFruits = ['apple', 'banana', 'cherry'];
// console.log('Original array:', myFruits);

// // 1. PUSH - Add to the END
// myFruits.push('orange');
// console.log('After push("orange"):', myFruits); // ['apple', 'banana', 'cherry', 'orange']

// // 2. UNSHIFT - Add to the BEGINNING
// myFruits.unshift('mango');
// console.log('After unshift("mango"):', myFruits); // ['mango', 'apple', 'banana', 'cherry', 'orange']

// // 3. POP - Remove from the END (returns removed item)
// let removed = myFruits.pop();
// console.log('After pop():', myFruits); // ['mango', 'apple', 'banana', 'cherry']
// console.log('Removed item:', removed); // 'orange'

// // 4. SHIFT - Remove from the BEGINNING (returns removed item)
// removed = myFruits.shift();
// console.log('After shift():', myFruits); // ['apple', 'banana', 'cherry']
// console.log('Removed item:', removed); // 'mango'

// // 5. SPLICE - Add/Remove at ANY position
// // splice(startIndex, deleteCount, itemsToAdd...)
// myFruits.splice(1, 0, 'kiwi', 'grape'); // At index 1, delete 0, add 'kiwi' & 'grape'
// console.log('After splice(1, 0, "kiwi", "grape"):', myFruits); // ['apple', 'kiwi', 'grape', 'banana', 'cherry']

// myFruits.splice(2, 1); // At index 2, delete 1 item
// console.log('After splice(2, 1):', myFruits); // ['apple', 'kiwi', 'banana', 'cherry']

// myFruits.splice(1, 2, 'watermelon'); // At index 1, delete 2, add 'watermelon'
// console.log('After splice(1, 2, "watermelon"):', myFruits); // ['apple', 'watermelon', 'cherry']

// // 6. DELETE (NOT RECOMMENDED - leaves empty slot)
// let testArray = ['a', 'b', 'c', 'd'];
// delete testArray[1];
// console.log('After delete testArray[1]:', testArray); // ['a', empty, 'c', 'd']
// console.log('Length:', testArray.length); // Still 4!

// // 7. FILTER - Create new array without certain items
// let numbers = [1, 2, 3, 4, 5, 6];
// let evenNumbers = numbers.filter(num => num % 2 === 0);
// console.log('Original numbers:', numbers); // [1, 2, 3, 4, 5, 6]
// console.log('Even numbers (filtered):', evenNumbers); // [2, 4, 6]

// // Quick Reference Summary:
// console.log('\n--- Quick Reference ---');
// console.log('push()    - Add to end');
// console.log('pop()     - Remove from end');
// console.log('unshift() - Add to beginning');
// console.log('shift()   - Remove from beginning');
// console.log('splice()  - Add/remove at any position');
// console.log('filter()  - Create new array without unwanted items');



//searching in arrays  find and includes 
// searchName = 'Ph';
// result = names.find(x => x.includes(searchName));
// console.log(`\nNow I found ${result}`);
// result = names.findLast(x => x.includes(searchName));
// console.log(`\nThe last matching item is ${result}`);









// // node --watch another-array-note.js
// //open in integrated terminal 
// console.clear();
// console.log('Sorting Arrays');
// console.log('================');
// // create a short alias we can call directly
// const show = console.log;

// //A) Sorting an array of numbers 
// let numbers = [2 ,8, 4, 6, 3, 7, 12, 1];
// show('The original numbers:\n', numbers);
// // .sort() is a mutating function. For numeric sort provide a comparator.
// numbers.sort(numberCompare);
// show('The sorted numbers:\n', numbers);
// //THE KEY to sorting is building a comparator function
// function numberCompare(a, b) {
//   return parseFloat(a) - parseFloat(b);
// }


// //b) Sorting an array of strings 
// let strings = 'sorting an array of strings'.split(' ');
// strings.sort();
// show('My Words in alphabetical order:\n', strings);



// //
// let fruits = ['banana', 'apple', 'cherry', 'date', 'elderberry', 'fig', 'grape'];
//  searchFruit = 'cherry';
//  let result;
//  result = fruits.find(fruit => fruits.includes(searchFruit));
//  console.log(`\nI found ${result}`);


// there are some concepts that i want to learn look ;// node --watch arrays-and-arrows.js
// console.log('loaded script...');

// let names = ['Stewart Dent', 'Anna Lyst', 'Phobe Nomiminal', 'Phil Smith'];

// names.forEach((name, position) => {
//     // I don't care about what this array function returns
//     console.log(`${position}) Has the name ${name}`);
// });

// // .find and .findLast
// let result; // I'll re-use this for several examples
// let searchName = 'Anna';
// result = names.find(name => name.includes(searchName));
// //                          \_______ boolean _______/
// console.log(`\nI found ${result}`);

// searchName = 'Ph';
// result = names.find(x => x.includes(searchName));
// console.log(`\nNow I found ${result}`);
// result = names.findLast(x => x.includes(searchName));
// console.log(`\nThe last matching item is ${result}`);

// // Mapping - transform data in an array
// result = names.map(x => {
//     let parts = x.split(' ');
//     return { firstName: parts[0], lastName: parts[1] };
// });
// console.log('\nI transformed the data:');
// console.table(result);

// let alias = 'Guido Andropov Drozdowski';
// result = alias.split(' ');
// //            \_________/
// //             string[]
// console.table(result);

// // Filtering the results
// result = names.filter(x => x.startsWith('Ph'));
// console.log(`\nI found ${result.length} names that start with 'Ph':`);
// console.log(result);


