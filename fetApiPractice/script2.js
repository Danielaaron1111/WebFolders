// const array1 = [5, 2, 8, 1, 9];
// const array2 = [3, 7, 4, 6, 0];

// // Sort both arrays
// array1.sort((a, b) => a - b);
// array2.sort((a, b) => a - b);

// // Merge the sorted arrays
// const merged = [...array1, ...array2];

// // Sort the merged array
// merged.sort((a, b) => a - b);

// console.log('Array 1 sorted:', array1);
// console.log('Array 2 sorted:', array2);
// console.log('Merged and sorted:', merged);

// const arraF = ["apple", "orange", "banana"];
// const arraD = ["grape", "kiwi", "cherry"];
// const mergedFruits = [...arraF, ...arraD];
// console.log(mergedFruits);
// mergedFruits.sort();
// mergedFruits.sort((a,b) => b.localeCompare(a));
// console.log(mergedFruits);
// mergedFruits.sort((b,a) => a.localeCompare(b));
// console.log('array merged:', mergedFruits);
 
// //asceding order
// //we can use reverse too
// numbers.reverse();
// console.log(numbers);

// //descending order
// numbers.sort((a,b) => (b - a));
// console.log(numbers);

// //ascedning by default
// const fruits = ['banana', 'apple', 'orange', 'mango'];
// fruits.sort();
// console.log(fruits);
// fruits.sort((a,b) => b.localeCompare(a));
// console.log(fruits);


// ===== MERGING ARRAYS OF OBJECTS =====

// Example: users and their orders
const users = [
  { id: 1, name: 'John', age: 25 },
  { id: 2, name: 'Jane', age: 30 },
  { id: 3, name: 'Bob', age: 35 }
];

const orders = [
  { userId: 1, product: 'Laptop', price: 1200 },
  { userId: 2, product: 'Phone', price: 800 },
  { userId: 1, product: 'Mouse', price: 25 }  // Note: John has 2 orders
];

// Method 1: Using map() and filter() to match by ID
// Loop through each user and find all orders that belong to them
const usersWithOrders = users.map(user => ({
  ...user,  // Spread operator copies all properties from user (id, name, age)
  orders: orders.filter(order => order.userId === user.id)  // Filter finds ALL orders matching this user's id
}));
// Result: Each user object now has an 'orders' array with their orders

console.log('\n1. Users with their orders:');
console.log(JSON.stringify(usersWithOrders, null, 2));

// Method 2: Using reduce() for better performance (creates lookup object)
// Step 1: Create a lookup object that groups orders by userId
// This is faster because we only loop through orders ONCE instead of for each user
const ordersByUserId = orders.reduce((acc, order) => {
  // acc is our accumulator object, starts as {}
  // Check if this userId already exists in our accumulator
  if (!acc[order.userId]) acc[order.userId] = [];  // If not, create an empty array
  acc[order.userId].push(order);  // Add this order to the array for this userId
  return acc;  // Return the accumulator for the next iteration
}, {});
// Result: { 1: [laptop, mouse], 2: [phone] }

// Step 2: Use the lookup object to add orders to each user
const usersWithOrdersFast = users.map(user => ({
  ...user,  // Copy all user properties
  orders: ordersByUserId[user.id] || []  // Look up orders by user.id, use empty array if none found
}));
// This is faster because we don't loop through ALL orders for EACH user

console.log('\n2. Same result, faster method:');
console.log(JSON.stringify(usersWithOrdersFast, null, 2));

// Method 3: Merge two arrays and update matching objects
// Use case: Adding additional properties to existing objects
const moreUserInfo = [
  { id: 1, email: 'john@email.com' },
  { id: 2, email: 'jane@email.com' }
];

const mergedUsers = users.map(user => {
  // find() looks through moreUserInfo and returns the FIRST match where id matches
  const additionalInfo = moreUserInfo.find(info => info.id === user.id);
  // Spread both objects - if they have same properties, the second one wins
  return { ...user, ...additionalInfo };  // Combines properties from both objects
});
// Result: Each user now has email property added (if it was found in moreUserInfo)

console.log('\n3. Merged user info:');
console.log(mergedUsers); 

