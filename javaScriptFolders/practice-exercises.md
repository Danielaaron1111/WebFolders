# JavaScript Arrays, Objects, Classes & DOM - Practice Exercises

## Based on the Interactive Demo

These exercises will help you practice and extend the concepts demonstrated in the main demo file.

---

## 🎯 Exercise 1: Implement `.findIndex()` and `.includes()`

**Difficulty:** Beginner

**Goal:** Add a "Wishlist" feature to the Product Gallery

### Tasks:
1. Add a heart/bookmark button to each product card
2. Create a `wishlist` array to store product IDs
3. Use `.includes()` to check if a product is already in the wishlist
4. Use `.findIndex()` to locate and remove items from the wishlist
5. Add a "View Wishlist" button that filters products to show only wishlist items

### Starter Code:
```javascript
// Add to your existing code
let wishlist = [];

function toggleWishlist(productId) {
    // Use .includes() to check if product is in wishlist
    if (wishlist.includes(productId)) {
        // Use .findIndex() to locate the product
        const index = wishlist.findIndex(id => id === productId);
        // Use .splice() to remove it
        wishlist.splice(index, 1);
        console.log(`Product ${productId} removed from wishlist`);
    } else {
        // Add to wishlist
        wishlist.push(productId);
        console.log(`Product ${productId} added to wishlist`);
    }
    
    // Update UI to show wishlist status
    updateWishlistButtons();
}

function showWishlist() {
    // Filter products to show only those in wishlist
    // Use .filter() with .includes()
    const wishlistProducts = products.filter(product => 
        wishlist.includes(product.id)
    );
    renderProducts(wishlistProducts);
}
```

### Hints:
- Add a button to each product card in the `renderProducts()` function
- Use `classList.toggle()` to show active/inactive wishlist state
- Update the button icon (❤️ vs 🤍) based on wishlist status

---

## 🎯 Exercise 2: Create a Student Grade Manager Class

**Difficulty:** Intermediate

**Goal:** Build a new class that manages student records and updates two different DOM sections

### Tasks:
1. Create a `Student` class with properties: name, grades (array), course
2. Add methods to:
   - Calculate average grade
   - Determine pass/fail status
   - Add new grades
   - Render student card in the main list
   - Update a summary statistics panel
3. Create multiple student instances
4. Display students in a grid AND show class statistics in a separate panel

### Complete Code Structure:
```javascript
class Student {
    static passingGrade = 60;
    static studentCount = 0;
    
    constructor(name, course, grades = []) {
        this.id = ++Student.studentCount;
        this.name = name;
        this.course = course;
        this.grades = grades;
        this.element = null;
    }
    
    // Calculate average using .reduce()
    calculateAverage() {
        if (this.grades.length === 0) return 0;
        const sum = this.grades.reduce((total, grade) => total + grade, 0);
        return (sum / this.grades.length).toFixed(1);
    }
    
    // Determine status using comparison
    isPassing() {
        return this.calculateAverage() >= Student.passingGrade;
    }
    
    // Add a new grade and update both DOM sections
    addGrade(grade) {
        if (grade >= 0 && grade <= 100) {
            this.grades.push(grade);
            this.updateDisplay();
            updateClassStatistics(); // Update the summary panel
        }
    }
    
    // Render this student's card
    render() {
        const card = document.createElement('div');
        card.className = 'bg-white p-4 rounded-lg shadow-md';
        
        const avg = this.calculateAverage();
        const status = this.isPassing() ? '✅ Passing' : '❌ Needs Improvement';
        const statusColor = this.isPassing() ? 'text-green-600' : 'text-red-600';
        
        card.innerHTML = `
            <h3 class="text-xl font-bold text-gray-800">${this.name}</h3>
            <p class="text-gray-600">${this.course}</p>
            <div class="mt-2">
                <span class="text-2xl font-bold text-purple-600">${avg}</span>
                <span class="text-sm text-gray-500"> / 100</span>
            </div>
            <p class="${statusColor} font-semibold mt-2">${status}</p>
            <div class="mt-3 text-sm text-gray-600">
                Grades: ${this.grades.join(', ') || 'No grades yet'}
            </div>
            <button onclick="addGradeToStudent(${this.id})" 
                    class="mt-3 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
                Add Grade
            </button>
        `;
        
        this.element = card;
        return card;
    }
    
    // Update existing card in DOM
    updateDisplay() {
        if (this.element && this.element.parentNode) {
            const newCard = this.render();
            this.element.parentNode.replaceChild(newCard, this.element);
        }
    }
    
    // Add to DOM
    addToDOM(containerId) {
        const container = document.getElementById(containerId);
        container.appendChild(this.render());
    }
}

// Array to store all students
const students = [];

// Function to update class statistics (second DOM section)
function updateClassStatistics() {
    const statsContainer = document.getElementById('class-stats');
    
    // Total students
    const total = students.length;
    
    // Average of all students using .map() and .reduce()
    const classAverage = students.length > 0
        ? (students.map(s => parseFloat(s.calculateAverage()))
                  .reduce((sum, avg) => sum + avg, 0) / students.length).toFixed(1)
        : 0;
    
    // Count passing students using .filter()
    const passing = students.filter(s => s.isPassing()).length;
    
    // Highest average using .reduce()
    const topStudent = students.reduce((top, student) => {
        return parseFloat(student.calculateAverage()) > parseFloat(top.calculateAverage()) 
            ? student : top;
    }, students[0]);
    
    statsContainer.innerHTML = `
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div class="bg-blue-100 p-4 rounded-lg text-center">
                <div class="text-3xl font-bold text-blue-600">${total}</div>
                <div class="text-sm text-gray-600">Total Students</div>
            </div>
            <div class="bg-purple-100 p-4 rounded-lg text-center">
                <div class="text-3xl font-bold text-purple-600">${classAverage}</div>
                <div class="text-sm text-gray-600">Class Average</div>
            </div>
            <div class="bg-green-100 p-4 rounded-lg text-center">
                <div class="text-3xl font-bold text-green-600">${passing}</div>
                <div class="text-sm text-gray-600">Passing Students</div>
            </div>
            <div class="bg-yellow-100 p-4 rounded-lg text-center">
                <div class="text-3xl font-bold text-yellow-600">
                    ${topStudent ? topStudent.calculateAverage() : 'N/A'}
                </div>
                <div class="text-sm text-gray-600">Highest Average</div>
            </div>
        </div>
    `;
}

// Helper function to add grade to specific student
function addGradeToStudent(studentId) {
    const grade = parseFloat(prompt('Enter grade (0-100):'));
    const student = students.find(s => s.id === studentId);
    if (student && !isNaN(grade)) {
        student.addGrade(grade);
    }
}

// Initialize with sample students
const alice = new Student('Alice Johnson', 'JavaScript Fundamentals', [85, 92, 88]);
const bob = new Student('Bob Smith', 'Web Development', [78, 82, 75]);
const charlie = new Student('Charlie Brown', 'JavaScript Fundamentals', [55, 60, 58]);

students.push(alice, bob, charlie);

alice.addToDOM('students-container');
bob.addToDOM('students-container');
charlie.addToDOM('students-container');

updateClassStatistics();
```

### HTML Structure Needed:
```html
<section class="bg-white rounded-lg shadow-lg p-6 mb-8">
    <h2 class="text-3xl font-bold text-gray-800 mb-6">Student Grade Manager</h2>
    
    <!-- Class Statistics Panel -->
    <div id="class-stats" class="mb-6">
        <!-- Statistics will be rendered here -->
    </div>
    
    <!-- Students Grid -->
    <div id="students-container" class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <!-- Student cards will be rendered here -->
    </div>
</section>
```

---

## 🎯 Exercise 3: Combined Filter and Map Pipeline

**Difficulty:** Intermediate to Advanced

**Goal:** Create an "Active Deals" feature that filters and transforms product data

### Tasks:
1. Add a `discount` property to each product (0-50)
2. Use `.filter()` to find products with discounts above 20%
3. Use `.map()` to transform filtered products into "deal cards" with:
   - Original price
   - Discounted price
   - Savings amount
   - Percentage saved
4. Use `.sort()` to show best deals first
5. Add a "Deal of the Day" badge to the top deal

### Complete Solution:
```javascript
// First, update products array to include discounts
const productsWithDiscounts = products.map(product => ({
    ...product,  // Spread operator copies all existing properties
    discount: Math.floor(Math.random() * 51)  // Random discount 0-50%
}));

/**
 * Filter and transform products to show active deals
 * Demonstrates chaining array methods: .filter() → .map() → .sort()
 */
function showActiveDeals() {
    const dealsContainer = document.getElementById('deals-container');
    
    // Step 1: Filter products with discount > 20%
    const activeDeals = productsWithDiscounts.filter(product => 
        product.discount > 20
    );
    
    // Step 2: Transform each deal into enhanced data with calculations
    const enrichedDeals = activeDeals.map(product => {
        const originalPrice = product.price;
        const discountAmount = originalPrice * (product.discount / 100);
        const discountedPrice = originalPrice - discountAmount;
        
        return {
            ...product,  // Keep all original properties
            originalPrice,
            discountedPrice,
            discountAmount,
            savingsPercent: product.discount
        };
    });
    
    // Step 3: Sort by discount percentage (best deals first)
    const sortedDeals = enrichedDeals.sort((a, b) => 
        b.savingsPercent - a.savingsPercent
    );
    
    // Clear container
    dealsContainer.innerHTML = '';
    
    // Step 4: Render deal cards with .map() and .forEach()
    const dealCards = sortedDeals.map((deal, index) => {
        const card = document.createElement('article');
        card.className = 'bg-white rounded-lg shadow-lg p-5 relative overflow-hidden fade-in';
        
        // Add "Deal of the Day" badge to first item
        if (index === 0) {
            const badge = document.createElement('div');
            badge.className = 'absolute top-0 right-0 bg-gradient-to-br from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-bl-lg font-bold text-sm';
            badge.textContent = '🔥 DEAL OF THE DAY';
            card.appendChild(badge);
        }
        
        // Discount badge
        const discountBadge = document.createElement('div');
        discountBadge.className = 'inline-block bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold mb-3';
        discountBadge.textContent = `-${deal.savingsPercent}%`;
        
        // Product name
        const title = document.createElement('h3');
        title.className = 'text-xl font-bold text-gray-800 mb-2';
        title.textContent = deal.name;
        
        // Category
        const category = document.createElement('p');
        category.className = 'text-sm text-gray-600 mb-3';
        category.textContent = deal.category.toUpperCase();
        
        // Price display
        const priceContainer = document.createElement('div');
        priceContainer.className = 'mb-3';
        
        const originalPriceEl = document.createElement('span');
        originalPriceEl.className = 'text-gray-500 line-through mr-2';
        originalPriceEl.textContent = `$${deal.originalPrice.toFixed(2)}`;
        
        const discountedPriceEl = document.createElement('span');
        discountedPriceEl.className = 'text-2xl font-bold text-green-600';
        discountedPriceEl.textContent = `$${deal.discountedPrice.toFixed(2)}`;
        
        priceContainer.appendChild(originalPriceEl);
        priceContainer.appendChild(discountedPriceEl);
        
        // Savings info
        const savings = document.createElement('div');
        savings.className = 'bg-green-50 text-green-700 px-3 py-2 rounded-lg text-sm font-semibold';
        savings.textContent = `You save: $${deal.discountAmount.toFixed(2)}`;
        
        // Add to cart button
        const button = document.createElement('button');
        button.className = 'w-full mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition';
        button.textContent = 'Add to Cart';
        button.onclick = () => alert(`Added ${deal.name} to cart!`);
        
        // Assemble card
        card.appendChild(discountBadge);
        card.appendChild(title);
        card.appendChild(category);
        card.appendChild(priceContainer);
        card.appendChild(savings);
        card.appendChild(button);
        
        return card;
    });
    
    // Add all cards to DOM
    dealCards.forEach(card => dealsContainer.appendChild(card));
    
    // Show statistics
    updateDealStats(sortedDeals);
}

/**
 * Calculate and display deal statistics using .reduce()
 */
function updateDealStats(deals) {
    const statsContainer = document.getElementById('deal-stats');
    
    // Total potential savings using .reduce()
    const totalSavings = deals.reduce((sum, deal) => 
        sum + deal.discountAmount, 0
    );
    
    // Average discount percentage
    const avgDiscount = deals.length > 0
        ? (deals.reduce((sum, deal) => sum + deal.savingsPercent, 0) / deals.length).toFixed(1)
        : 0;
    
    statsContainer.innerHTML = `
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="bg-purple-100 p-4 rounded-lg text-center">
                <div class="text-3xl font-bold text-purple-600">${deals.length}</div>
                <div class="text-sm text-gray-600">Active Deals</div>
            </div>
            <div class="bg-green-100 p-4 rounded-lg text-center">
                <div class="text-3xl font-bold text-green-600">$${totalSavings.toFixed(2)}</div>
                <div class="text-sm text-gray-600">Total Savings</div>
            </div>
            <div class="bg-blue-100 p-4 rounded-lg text-center">
                <div class="text-3xl font-bold text-blue-600">${avgDiscount}%</div>
                <div class="text-sm text-gray-600">Average Discount</div>
            </div>
        </div>
    `;
}

// Call the function to display deals
showActiveDeals();
```

### HTML Structure Needed:
```html
<section class="bg-white rounded-lg shadow-lg p-6 mb-8">
    <h2 class="text-3xl font-bold text-gray-800 mb-4">🔥 Active Deals</h2>
    <p class="text-gray-600 mb-6">
        Products with 20%+ discount • Sorted by best savings
    </p>
    
    <!-- Deal Statistics -->
    <div id="deal-stats" class="mb-6">
        <!-- Stats will be rendered here -->
    </div>
    
    <!-- Deals Grid -->
    <div id="deals-container" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Deal cards will be rendered here -->
    </div>
</section>
```

---

## 🚀 Bonus Challenges

### Challenge 1: Local Storage Integration
Save and load data from `localStorage`:
```javascript
// Save tasks to localStorage
function saveTasks() {
    const tasksData = tasks.map(task => ({
        description: task.description,
        priority: task.priority,
        completed: task.completed
    }));
    localStorage.setItem('tasks', JSON.stringify(tasksData));
}

// Load tasks from localStorage
function loadTasks() {
    const saved = localStorage.getItem('tasks');
    if (saved) {
        const tasksData = JSON.parse(saved);
        tasksData.forEach(data => {
            const task = new Task(data.description, data.priority);
            task.completed = data.completed;
            tasks.push(task);
            task.addToDOM();
        });
    }
}
```

### Challenge 2: Advanced Filtering with Multiple Criteria
```javascript
function advancedFilter(minPrice, maxPrice, categories, minRating) {
    return products.filter(product => {
        return product.price >= minPrice &&
               product.price <= maxPrice &&
               categories.includes(product.category) &&
               product.rating >= minRating;
    });
}
```

### Challenge 3: Pagination
```javascript
function paginateArray(array, pageSize, pageNumber) {
    const start = (pageNumber - 1) * pageSize;
    const end = start + pageSize;
    return array.slice(start, end);
}
```

---

## 📚 Key Concepts Review

### Array Methods Covered:
- `.map()` - Transform each element → new array
- `.filter()` - Keep elements that pass test → new array
- `.reduce()` - Accumulate into single value
- `.forEach()` - Execute function for each element (no return)
- `.find()` - Return first match (or undefined)
- `.findIndex()` - Return index of first match (or -1)
- `.some()` - True if ANY element passes test
- `.every()` - True if ALL elements pass test
- `.sort()` - Sort array in place (mutates original)
- `.slice()` - Extract section → new array (doesn't mutate)
- `.splice()` - Add/remove elements (mutates original)
- `.includes()` - True if array contains value

### DOM Manipulation Techniques:
- `createElement()` - Create new elements
- `appendChild()` - Add child to parent
- `removeChild()` - Remove element
- `replaceChild()` - Replace existing element
- `textContent` - Set text (safe from XSS)
- `innerHTML` - Set HTML (use with caution)
- `classList.add/remove/toggle()` - Manage CSS classes
- `setAttribute()` - Set attributes
- `addEventListener()` - Attach event handlers

### Best Practices:
✅ Use `textContent` for user input (security)
✅ Use `const` for values that don't change
✅ Use arrow functions for callbacks
✅ Use template literals for strings
✅ Use destructuring to extract object properties
✅ Chain array methods for data pipelines
✅ Prefer `createElement()` over `innerHTML` for dynamic content

---

Happy coding! 🎉
