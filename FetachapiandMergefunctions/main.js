//==============================================================================
// THE MERGE PATTERN - Your template for combining parent-child data
//==============================================================================
// WHAT THIS DOES: Takes two separate arrays and nests children inside parents
// PATTERN: This exact pattern works for ANY parent-child relationship!
//   - Authors & Books
//   - Developers & Games  
//   - Actors & Movies
//   - Artists & Albums (YOUR ASSIGNMENT!)
//   - Restaurants & Reviews (this example)
//==============================================================================

// PARENTS: Restaurants (independent - exist on their own)
const restaurants = [
  { name: 'The Golden Spoon', id: 1 },
  { name: 'Pizza Paradise', id: 2 },
  { name: 'Sushi Station', id: 3 }
];

// CHILDREN: Reviews (dependent - each references a parent by name)
const reviews = [
  { comment: 'Amazing food!', restaurantName: 'The Golden Spoon', rating: '5', date: '2024-01-15' },
  { comment: 'Great service', restaurantName: 'The Golden Spoon', rating: '4.5', date: '2024-02-20' },
  { comment: 'Best pasta ever', restaurantName: 'The Golden Spoon', rating: '5', date: '2024-03-10' },
  { comment: 'Love the pizza', restaurantName: 'Pizza Paradise', rating: '4.8', date: '2024-01-25' },
  { comment: 'Quick delivery', restaurantName: 'Pizza Paradise', rating: '4', date: '2024-02-14' },
  { comment: 'Fresh sushi!', restaurantName: 'Sushi Station', rating: '4.9', date: '2024-01-30' },
  { comment: 'Will come again', restaurantName: 'Sushi Station', rating: '5', date: '2024-03-05' },
  { comment: 'Authentic taste', restaurantName: 'Sushi Station', rating: '4.7', date: '2024-03-20' }
];

/**
 * 🎯 THE 3-STEP MERGE PATTERN
 * 
 * GOAL: Nest children (reviews) inside their parents (restaurants)
 * 
 * BEFORE (2 separate arrays):
 *   restaurants = [{ name: 'Golden Spoon', id: 1 }]
 *   reviews = [{ comment: 'Amazing!', restaurantName: 'Golden Spoon' }]
 * 
 * AFTER (nested structure):
 *   [{ 
 *     name: 'Golden Spoon', 
 *     id: 1,
 *     reviews: [{ comment: 'Amazing!', rating: 5, date: Date }]
 *   }]
 * 
 * THE PATTERN (memorize this!):
 *   1. .map() → Create empty structure
 *   2. .forEach() + .find() → Fill the structure
 *   3. return → Give back the result
 */
function mergeRestaurantsWithReviews(restaurants, reviews) {
  
  //============================================================================
  // STEP 1: CREATE EMPTY STRUCTURE
  //============================================================================
  // .map() = Transform each parent into a new object with an EMPTY children array
  // WHY? We need empty boxes before we can fill them!
  // RESULT: [{ name: 'Golden Spoon', id: 1, reviews: [] }, ...]
  //============================================================================
  
  const result = restaurants.map(restaurant => {
    return {
      name: restaurant.name,        // Copy original property
      id: restaurant.id,             // Copy original property
      reviews: []                    // 🔑 KEY: Start EMPTY! We fill this in Step 2
    };
  }); // ← CLOSE .map() immediately after return!

  //============================================================================
  // STEP 2: FILL THE STRUCTURE
  //============================================================================
  // .forEach() = Loop through ALL children
  // .find() = For each child, find its parent
  // .push() = Add the child to the parent's array
  // THINK: Sorting mail - each letter (review) goes to the right mailbox (restaurant)
  //============================================================================
  
  reviews.forEach(review => {
    
    // 🔍 FIND: Search for the restaurant that matches this review
    // MATCH ON: restaurant.name === review.restaurantName
    // RETURNS: The matching restaurant object OR undefined if not found
    const matchingRestaurant = result.find(restaurant => {
      return restaurant.name === review.restaurantName; // Match parent name to child's reference
    });

    // ✅ CHECK: Only push if we found a match (avoid errors if no match)
    if (matchingRestaurant) {
      
      // 📥 PUSH: Add this review to the restaurant's reviews array
      // IMPORTANT: Convert data types as needed!
      matchingRestaurant.reviews.push({
        comment: review.comment,              // Keep as string ✓
        rating: Number(review.rating),        // 🔄 CONVERT: '5' → 5 (string to number)
        date: new Date(review.date)           // 🔄 CONVERT: '2024-01-15' → Date object
      });
      // WHY CONVERT?
      //   - Numbers: So we can do math (calculate averages, compare ratings)
      //   - Dates: So we can sort by date, calculate age, etc.
    }
  }); // ← CLOSE .forEach() here

  //============================================================================
  // STEP 3: RETURN THE RESULT
  //============================================================================
  // Give back the fully merged data structure
  // NOW: Each restaurant has its reviews nested inside!
  //============================================================================
  return result;
}

//==============================================================================
// TESTING & OUTPUT
//==============================================================================
// Call the function with our data
const mergedRestaurants = mergeRestaurantsWithReviews(restaurants, reviews);

// Display nicely formatted output
console.log('=== Restaurants with Reviews ===');

// JSON.stringify() EXPLAINED:
//   Parameter 1: mergedRestaurants = The object to convert
//   Parameter 2: null = "Show everything, don't filter"
//   Parameter 3: 2 = "Indent with 2 spaces for readability"
// WITHOUT stringify: Shows [Object] - can't see inside nested data
// WITH stringify: Shows full structure - can see everything!
console.log(JSON.stringify(mergedRestaurants, null, 2));

//==============================================================================
// 🎓 KEY CONCEPTS TO REMEMBER
//==============================================================================
// .map()     → Transforms array, returns NEW array (same length)
// .forEach() → Executes code for each item, returns NOTHING
// .find()    → Returns FIRST match or undefined
// .push()    → Adds item to END of array
// Number()   → Converts string to number: '5' → 5
// new Date() → Converts string to Date object: '2024-01-15' → Date
//
// CLOSING BRACES PATTERN:
//   }); ← Closes .map()
//   }); ← Closes .forEach()
//   }   ← Closes function (no semicolon!)
//
// COMMON MISTAKES TO AVOID:
//   ❌ reviews: reviews (puts ALL reviews in every restaurant)
//   ✅ reviews: [] (empty array - filled in Step 2)
//   
//   ❌ result.find(review => ...) (wrong parameter name)
//   ✅ result.find(restaurant => ...) (match what you're searching)
//   
//   ❌ Date.now(review.date) (Date.now() ignores parameters!)
//   ✅ new Date(review.date) (creates Date from string)
//==============================================================================

//==============================================================================
// 🚀 THIS EXACT PATTERN WORKS FOR YOUR ASSIGNMENT!
//==============================================================================
// Just replace:
//   restaurants → artists
//   reviews → albums
//   restaurantName → artistName
// 
// Add these conversions for albums:
//   genres: album.genres.split(', ')        → String to array
//   descriptors: album.descriptors.split(', ') → String to array
//   releaseDate: new Date(album.releaseDate)  → String to Date
//   numberRatings: Number(album.numberRatings) → String to number
//==============================================================================




//==============================================================================
// 🎴 MERGE PATTERN QUICK REFERENCE - Keep this handy!
//==============================================================================

function mergeParentsWithChildren(parents, children) {
  
  // STEP 1: .map() → Create structure with EMPTY arrays
  const result = parents.map(parent => ({
    ...parent,      // Copy all parent properties
    children: []    // Add EMPTY children array
  }));

  // STEP 2: .forEach() + .find() → Fill the structure
  children.forEach(child => {
    const match = result.find(parent => 
      parent.name === child.parentName  // Match by name
    );
    if (match) {
      match.children.push({
        ...child,                    // Copy child properties
        // Add conversions as needed:
        number: Number(child.number),
        date: new Date(child.date),
        array: child.string.split(', ')
      });
    }
  });

  // STEP 3: return → Done!
  return result;
}

//==============================================================================
// DATA TYPE CONVERSIONS CHEAT SHEET
//==============================================================================
Number('123')           → 123           (string to number)
new Date('2024-01-15')  → Date object   (string to Date)
'a,b,c'.split(',')      → ['a','b','c'] (string to array)
['a','b'].join(', ')    → 'a, b'        (array to string)
//==============================================================================
