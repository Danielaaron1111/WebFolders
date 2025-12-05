const people = [
  { name: "Alice", age: 25 },
  { name: "Bob", age: 30 },
  { name: "Charlie", age: 25 },
];

const result = people.find((person) => person.age === 25);

console.log(result);
// { name: 'Alice', age: 25 }
// ↑ Stops here! Doesn't keep looking

const pets = [
  { name: "Fido", type: "dog" },
  { name: "Whiskers", type: "cat" },
  { name: "Rover", type: "dog" },
];
const resultt = pets.filter((pet) => pet.type === "dog");
console.log(resultt);

const dogNames = pets
  .filter((animal) => animal.type === "dog")
  .map((animal) => animal.name);
console.log(dogNames);
// {name : 'Fido', type: 'dog'}
// ↑ Stops here! Doesn't keep looking
//filter return for each match the condition , find just return the fist one.
// node short-testing/main.js
//node --watch short-testing/main.js
// node --watch short-testing/main.js
//Alt+Up/Down - Move line up/down
//Ctrl+L then keep pressing L - Extends selection line by line

const fruits = [
  { name: "apple", color: "red", IsHighOnFiber: true },
  { name: "blueberry", color: "purple", IsHighOnFiber: true },
  { name: "orange", color: "orange", IsHighOnFiber: true },
  { name: "Redapple", color: "red", IsHighOnFiber: true },
  { name: "banana", color: "yellow", IsHighOnFiber: false },
];

const redFruits = fruits.filter((fruit) => fruit.color === "red");
console.log(redFruits);
const findRedApple = fruits.find((fruit) => fruit.color === "red");
console.log(findRedApple);

// const redFruits = [];
// fruits.forEach((fruit) => {
//   if (fruit.color === "red") {
//     redFruits.push(fruit);
//   }
// });


// const directors = [
//   { name: 'Christopher Nolan', id: 1 },
//   { name: 'Steven Spielberg', id: 2 }
// ];

// const movies = [
//   { title: 'Inception', directorName: 'Christopher Nolan', year: '2010', rating: '8.8' },
//   { title: 'Interstellar', directorName: 'Christopher Nolan', year: '2014', rating: '8.6' },
//   { title: 'Jaws', directorName: 'Steven Spielberg', year: '1975', rating: '8.0' }
// ];

// function mergeDirectorsWithMovies(directors, movies) {
//   // Your task: Merge these two arrays!
//   const result = directors.map(director => {
//     return {
//       name: director.name,
//       id: director.id, 
//       movies: []
//     };

//   });
  
 
// //step 2 loop through movies and add them to the right director 
// movies.forEach(movie => { 
//   //find the matching director 
//   const matchingDirector = result.find(director => {
//     return director.name === movie.directorName;

//   });

//  // Add the movie to that director's array
//  if (matchingDirector) {
//   matchingDirector.movies.push({
//     title: movie.title,
//     year: Number(movie.year), // string to number (again)
//     rating: Number(movie.rating) // string to number 

//   });
//  }
// });
// return result;

// }
// const merged = mergeDirectorsWithMovies(directors, movies);
// console.log(JSON.stringify(merged, null, 2));



// Expected output:
// [
//   {
//     name: 'Christopher Nolan',
//     id: 1,
//     movies: [
//       { title: 'Inception', year: 2010, rating: 8.8 },
//       { title: 'Interstellar', year: 2014, rating: 8.6 }
//     ]
//   },
//   ...
// ]


// const authors = [
//   { name: 'J.K. Rowling', id: 1 },
//   { name: 'George R.R. Martin', id: 2 },
//   { name: 'Stephen King', id: 3 }
// ];

// const books = [
//   { title: 'Harry Potter', authorName: 'J.K. Rowling', pages: '309', price: '19.99' },
//   { title: 'Fantastic Beasts', authorName: 'J.K. Rowling', pages: '256', price: '15.99' },
//   { title: 'Game of Thrones', authorName: 'George R.R. Martin', pages: '694', price: '29.99' },
//   { title: 'The Shining', authorName: 'Stephen King', pages: '447', price: '24.99' },
//   { title: 'It', authorName: 'Stephen King', pages: '1138', price: '32.99' }
// ];

// function mergeAuthorsWithBooks(authors, books) {
//   // YOUR CODE HERE - everything inside this function!
//   // Step 1: Create result with .map()
//   // Step 2: Loop with .forEach() and .find()
//   // Step 3: return result
// }

// // Test it
// const merged = mergeAuthorsWithBooks(authors, books);
// console.log(JSON.stringify(merged, null, 2));


//second exercise to understand merge arrays in the modern way: 
const authors = [
  { name: 'J.K. Rowling', id: 1 },
  { name: 'George R.R. Martin', id: 2 },
  { name: 'Stephen King', id: 3 }
];
const books = [
  { title: 'Harry Potter', authorName: 'J.K. Rowling', pages: '309', price: '19.99' },
  { title: 'Fantastic Beasts', authorName: 'J.K. Rowling', pages: '256', price: '15.99' },
  { title: 'Game of Thrones', authorName: 'George R.R. Martin', pages: '694', price: '29.99' },
  { title: 'The Shining', authorName: 'Stephen King', pages: '447', price: '24.99' },
  { title: 'It', authorName: 'Stephen King', pages: '1138', price: '32.99' }
];

function mergeAuthorsWithBooks(authors, books) {
  const result = authors.map(author => {
    return {
      name: author.name,
      id: author.id,
      books: []

    };
});
//step 2 loop with forEach and find
books.forEach(book => {
  const matchingAuthor = result.find(author => {
    return author.name === book.authorName;
  });
if (matchingAuthor) {
  matchingAuthor.books.push({
    title: book.title,
    pages: Number(book.pages),
    price: Number(book.price)

  });
}
  

});
return result;  
}
// Testing authors/books:
const mergedAuthors = mergeAuthorsWithBooks(authors, books);
console.log('=== Authors with Books ===');
console.log(JSON.stringify(mergedAuthors, null, 2));

console.log('\n'); // Blank line for separation
//testing: 


// Game developers (parents)
const developers = [
  { name: 'Nintendo', id: 1 },
  { name: 'Sony', id: 2 },
  { name: 'Valve', id: 3 }
];

// Video games (children)
const games = [
  { title: 'Mario Kart', developerName: 'Nintendo', year: '2017', rating: '9.2' },
  { title: 'Zelda', developerName: 'Nintendo', year: '2017', rating: '9.7' },
  { title: 'Animal Crossing', developerName: 'Nintendo', year: '2020', rating: '9.0' },
  { title: 'God of War', developerName: 'Sony', year: '2018', rating: '9.5' },
  { title: 'The Last of Us', developerName: 'Sony', year: '2013', rating: '9.8' },
  { title: 'Half-Life', developerName: 'Valve', year: '1998', rating: '9.6' },
  { title: 'Portal', developerName: 'Valve', year: '2007', rating: '9.1' }
];

function mergeDevelopersWithGames(developers, games) {
  const result = developers.map(developer => {
    return {
      name:developer.name,
      id:developer.id,
      games: []
    };
});
//step 2 loop with forEach and find
games.forEach(game => {
  const matchingDeveloper = result.find(developer => {
    return developer.name === game.developerName; //here is when we match one field with another
  });
  if (matchingDeveloper) {
    matchingDeveloper.games.push({
      title: game.title,
      year: Number(game.year),
      rating: Number(game.rating)

    });
  }
});
//result outside the forEach
return result;
}

//testing 
const merged3 = mergeDevelopersWithGames(developers, games);
console.log(JSON.stringify(merged3, null, 2));

// Actors (parents)
const actors = [
  { name: 'Tom Hanks', id: 1 },
  { name: 'Morgan Freeman', id: 2 },
  { name: 'Scarlett Johansson', id: 3 }
];

// Movies (children)
const movies = [
  { title: 'Forrest Gump', actorName: 'Tom Hanks', year: '1994', boxOffice: '678.2' },
  { title: 'Cast Away', actorName: 'Tom Hanks', year: '2000', boxOffice: '429.6' },
  { title: 'Saving Private Ryan', actorName: 'Tom Hanks', year: '1998', boxOffice: '482.3' },
  { title: 'The Shawshank Redemption', actorName: 'Morgan Freeman', year: '1994', boxOffice: '58.3' },
  { title: 'Se7en', actorName: 'Morgan Freeman', year: '1995', boxOffice: '327.3' },
  { title: 'Lucy', actorName: 'Scarlett Johansson', year: '2014', boxOffice: '463.4' },
  { title: 'Avengers', actorName: 'Scarlett Johansson', year: '2012', boxOffice: '1518.8' }
];

function mergeActorsWithMovies(actors, movies) {

  const result = actors.map(actor => {
    return {
      name: actor.name,
      id: actor.id,
      movies: []
    };

  });
  movies.forEach(movie => {
    const matchingActors = result.find(actor => {
      return actor.name === movie.actorName;
  });

  if (matchingActors) {
    matchingActors.movies.push({
      title: movie.title,
      year: Number(movie.year),
      boxOffice: Number(movie.boxOffice)
    });
    }
  });
  // console.log('After Step 1:');
  // console.log(JSON.stringify(result, null, 2));

  return result;
}
const merged4 = mergeActorsWithMovies(actors, movies);
console.log(JSON.stringify(merged4,null, 1));

// final exercise to master THIS FUCKING FUNCTIONS 
// Restaurants (parents)
const restaurants = [
  { name: 'The Golden Spoon', id: 1 },
  { name: 'Pizza Paradise', id: 2 },
  { name: 'Sushi Station', id: 3 }
];

// Reviews (children)
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

function mergeRestaurantsWithReviews(restaurants, reviews) {
  const result = restaurants.map(restaurant => {
    return {
      name: restaurant.name,
      id: restaurant.id,
      reviews: []
    };
  });

  reviews.forEach(review => {
    const matchingRestaurant = result.find(restaurant => {
      return restaurant.name === review.restaurantName; //strickyly
    
  });

  if (matchingRestaurant) {
    matchingRestaurant.reviews.push({
      comment: review.comment,
      rating: Number(review.rating),
      date: new Date(review.date)
    });
  }
});
 return result;
 
}
const mergedRestaurants = mergeRestaurantsWithReviews(restaurants, reviews);
console.log('=== Restaurants with Reviews ===');
console.log(JSON.stringify(mergedRestaurants, null, 2));


// Teachers (parents)
const teachers = [
  { name: 'Ms. Johnson', id: 1, subject: 'Math' },
  { name: 'Mr. Smith', id: 2, subject: 'Science' },
  { name: 'Mrs. Davis', id: 3, subject: 'English' }
];

// Students (children)
const students = [
  { name: 'Alice Brown', teacherName: 'Ms. Johnson', grade: '95', attendance: '98', enrolled: '2023-09-01' },
  { name: 'Bob Wilson', teacherName: 'Ms. Johnson', grade: '88', attendance: '92', enrolled: '2023-09-01' },
  { name: 'Charlie Davis', teacherName: 'Ms. Johnson', grade: '92', attendance: '95', enrolled: '2023-09-01' },
  { name: 'Diana Martinez', teacherName: 'Mr. Smith', grade: '97', attendance: '100', enrolled: '2023-09-01' },
  { name: 'Ethan Taylor', teacherName: 'Mr. Smith', grade: '85', attendance: '88', enrolled: '2023-09-01' },
  { name: 'Fiona Garcia', teacherName: 'Mrs. Davis', grade: '93', attendance: '96', enrolled: '2023-09-01' },
  { name: 'George Lee', teacherName: 'Mrs. Davis', grade: '89', attendance: '94', enrolled: '2023-09-01' },
  { name: 'Hannah White', teacherName: 'Mrs. Davis', grade: '96', attendance: '99', enrolled: '2023-09-01' }
];

function mergeTeachersWithStudents(teachers, students) {
  const result = teachers.map(teacher => {
    return {
      name: teacher.name,
      id: teacher.id,
      students: []
    };
  });

  students.forEach(student => {
    const matchingTeacher = result.find(teacher => {
      return teacher.name === student.teacherName;
    });
    if (matchingTeacher) {
      matchingTeacher.students.push({
        name: student.name,
        grade: Number(student.grade),
        attendance: Number(student.attendance),
        enrolled: new Date(student.enrolled)

      });
    }
  });
  return result;
 
}

// Testing
const mergedTeachers = mergeTeachersWithStudents(teachers, students);
console.log('=== Teachers with Students ===');
// console.log(JSON.stringify(mergedTeachers, null, 2));
console.log(JSON.stringify(mergedTeachers,null, 2));

