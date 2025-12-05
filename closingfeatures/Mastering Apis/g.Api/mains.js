/**
 * MASTER CLASS: ANIME FETCHING APPLICATION
 * API Used: Jikan v4 (Unofficial MyAnimeList API)
 * Docs: https://jikan.moe/
 */

// 1. SELECT DOM ELEMENTS
// We cache these at the top so we don't query the DOM repeatedly (Performance).
const btnRandom = document.getElementById('btn-random');
const btnSearch = document.getElementById('btn-search');
const searchInput = document.getElementById('search-input');
const resultContainer = document.getElementById('result-container');

const API_BASE = 'https://api.jikan.moe/v4';

// ---------------------------------------------------------
// 2. HELPER FUNCTIONS (The "Engine Room")
// ---------------------------------------------------------

/**
 * SAFE DOM CREATION (The "Child Stuff")
 * Instead of using innerHTML (which is risky for XSS attacks),
 * we create elements programmatically. This is how React/Vue work under the hood.
 * * @param {string} tag - The HTML tag (e.g., 'div', 'h2')
 * @param {string} className - CSS class to apply
 * @param {string} text - Text content (optional)
 * @returns {HTMLElement} The created DOM node
 */
function createEl(tag, className, text = '') {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (text) el.textContent = text; // textContent is secure; it doesn't parse HTML tags.
    return el;
}

/**
 * LOADING STATE MANAGER
 * Gives immediate feedback to the user.
 */
function showLoading() {
    resultContainer.innerHTML = ''; // Clear previous results
    const loader = createEl('div', 'loading', 'Contacting Server...');
    resultContainer.appendChild(loader);
}

/**
 * ERROR HANDLER
 * Displays a nice error box if the API fails.
 */
function showError(message, code) {
    resultContainer.innerHTML = ''; 
    const errorBox = createEl('div', 'error-message');
    errorBox.innerHTML = `<strong>Error ${code || '!'}:</strong> ${message}`;
    resultContainer.appendChild(errorBox);
    
    console.error(`❌ App Error: ${message}`);
}

// ---------------------------------------------------------
// 3. CORE LOGIC (Fetching & Rendering)
// ---------------------------------------------------------

/**
 * Renders the character data into the DOM.
 * @param {Object} character - The character object from Jikan API
 */
function displayCharacter(character) {
    console.group("🎨 Rendering UI"); // Groups logs nicely in console
    console.log("Raw Data passed to render:", character);

    // 1. Clear container
    resultContainer.innerHTML = '';

    // 2. Extract Data (Safely handling missing data with '||')
    const name = character.name || 'Unknown Name';
    const about = character.about || 'No description available.';
    // Jikan puts images inside images.jpg.image_url
    const imgUrl = character.images?.jpg?.image_url || 'https://placehold.co/200x300?text=No+Image';
    const url = character.url;

    // 3. Build the structure using our Safe Helper
    const card = createEl('article', 'character-card');

    // Left Side: Image
    const imgContainer = createEl('div', 'card-image');
    const img = createEl('img'); // img tags need src, so we handle it manually
    img.src = imgUrl;
    img.alt = name;
    imgContainer.appendChild(img);

    // Right Side: Body
    const body = createEl('div', 'card-body');
    const title = createEl('h2', '', name);
    const link = createEl('a', 'card-tags', 'View on MyAnimeList');
    link.href = url;
    link.target = "_blank"; // Open in new tab

    // Truncate description if it's too long (over 200 chars)
    const shortAbout = about.length > 300 ? about.substring(0, 300) + '...' : about;
    const desc = createEl('p', '', shortAbout);

    // 4. Assemble the parts (Parent -> append Child)
    body.appendChild(title);
    body.appendChild(link);
    body.appendChild(createEl('hr', '')); // visual separator
    body.appendChild(createEl('br', '')); 
    body.appendChild(desc);

    card.appendChild(imgContainer);
    card.appendChild(body);

    // 5. Inject into the page
    resultContainer.appendChild(card);
    console.log("✅ DOM Updated successfully");
    console.groupEnd();
}

/**
 * Generic Fetcher
 * This function handles the network request, validation, and JSON parsing.
 */
async function fetchFromJikan(endpoint) {
    showLoading();
    
    const fullUrl = `${API_BASE}${endpoint}`;
    console.log(`📡 Requesting: ${fullUrl}`);

    try {
        const response = await fetch(fullUrl);

        console.log(`Addressee responded with status: ${response.status}`);

        if (!response.ok) {
            // If status is not 200-299, throw an error to be caught below
            throw new Error(`API returned status ${response.status}`);
        }

        const data = await response.json();
        console.log("📦 Payload received:", data);

        // Jikan V4 returns data inside a 'data' property. 
        // Sometimes it's an array (search), sometimes an object (random).
        return data.data;

    } catch (error) {
        showError(error.message, "Network/API");
        return null; // Return null so the caller knows it failed
    }
}

// ---------------------------------------------------------
// 4. EVENT LISTENERS (The "Controllers")
// ---------------------------------------------------------

// Handler: Random Character
btnRandom.addEventListener('click', async () => {
    // Endpoint: /random/characters
    const data = await fetchFromJikan('/random/characters');
    
    if (data) {
        // Random endpoint returns a single object in 'data'
        displayCharacter(data);
    }
});

// Handler: Search Character
btnSearch.addEventListener('click', async () => {
    const query = searchInput.value.trim();
    
    if (!query) {
        alert("Please enter a name first!");
        return;
    }

    // Endpoint: /characters?q=name
    // We expect an array of results. We will take the first one.
    const resultList = await fetchFromJikan(`/characters?q=${query}&limit=1`);

    if (resultList && resultList.length > 0) {
        // Search returns an ARRAY, so we take the first item [0]
        console.log(`Found ${resultList.length} matches. Showing the top one.`);
        displayCharacter(resultList[0]);
    } else if (resultList && resultList.length === 0) {
        showError(`No character found named "${query}"`, 404);
    }
});
