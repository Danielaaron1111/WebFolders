// =============================
// Anime Character Fetch Demo
// =============================
//
// This file teaches you how to:
// 1. Fetch JSON from an API using async/await
// 2. Inspect the response with console.log / JSON.stringify
// 3. Validate user input and HTTP status codes
// 4. Safely update the DOM and generate HTML
//
// IMPORTANT IDEA: Always inspect the data FIRST before coding the rendering.
// Use console.log(data) and the browser Network tab to understand the structure.

// ---- DOM ELEMENT REFERENCES ----
// Grabbing references ONCE at the top is good practice.

const randomBtn = document.getElementById("randomBtn");
const searchBtn = document.getElementById("searchBtn");
const nameInput = document.getElementById("nameInput");
const errorMessage = document.getElementById("errorMessage");

// Random card elements
const randomImage = document.getElementById("randomImage");
const randomName = document.getElementById("randomName");
const randomDescription = document.getElementById("randomDescription");

// Search card elements
const searchImage = document.getElementById("searchImage");
const searchName = document.getElementById("searchName");
const searchDescription = document.getElementById("searchDescription");

// ---- BASE API URL ----
// This is an example; you can change to another anime character API.
const BASE_API_URL = "https://api.jikan.moe/v4"; // Example public anime/character API base

// =============================
// Utility: log JSON in a readable way
// =============================
const prettyLog = (label, value) => {
  // JSON.stringify with space=2 makes nested objects easier to read
  console.log(`--- ${label} ---`);
  console.log(JSON.stringify(value, null, 2));
};

// =============================
// Fetch: Random Character
// =============================
const fetchRandomCharacter = async () => {
  // Clear previous error message
  errorMessage.textContent = "";

  try {
    // STEP 1: Call the API
    // This is just an example endpoint pattern for a random character.
    // You would adjust according to the real API docs.
    const randomId = Math.floor(Math.random() * 5000) + 1; // pretend range of character IDs
    const url = `${BASE_API_URL}/characters/${randomId}/full`;

    console.log("Requesting random character from:", url);

    const response = await fetch(url);

    // STEP 2: Validate HTTP status
    console.log("Random character response status:", response.status);

    if (!response.ok) {
      // If status is not 2xx, throw an error.
      // Students: This is where you use status codes like 404, 500, etc.
      throw new Error(
        `Random character request failed with status ${response.status}`
      );
    }

    // STEP 3: Parse JSON body
    const data = await response.json();

    // Inspect data structure in console:
    prettyLog("Random character raw JSON", data);

    // STEP 4: Extract the fields we care about
    // Here we assume the API returns something like:
    // {  { name: "...", images: { jpg: { image_url: "..." } }, about: "..." } }
    const character = data.data;

    if (!character) {
      throw new Error("Random character JSON did not have 'data' field");
    }

    const characterName = character.name ?? "Unknown name";
    const characterImage =
      character.images?.jpg?.image_url ||
      character.images?.webp?.image_url ||
      "";
    const characterAbout =
      character.about ||
      "No biography available for this character. (API did not provide 'about' text.)";

    // Another log: show only the extracted parts
    prettyLog("Random character (extracted fields)", {
      name: characterName,
      image: characterImage,
      about: characterAbout,
    });

    // STEP 5 (Option A - conventional direct innerHTML):
    // This is the faster-to-write but more fragile way:
    // randomName.textContent = characterName;
    // randomDescription.textContent = characterAbout;
    // randomImage.src = characterImage;
    // randomImage.alt = `Image of ${characterName}`;

    // STEP 5 (Option B - *safer* DOM-manipulation way):
    // Here we only assign to textContent/src, not inject large HTML strings.
    updateRandomCard(characterName, characterAbout, characterImage);
  } catch (error) {
    console.error("Error in fetchRandomCharacter:", error);
    errorMessage.textContent = error.message;
    updateRandomCard(
      "Random Character",
      "Could not load a random character. Please try again.",
      ""
    );
  }
};

// =============================
// Fetch: Character by Name
// =============================
const fetchCharacterByName = async (name) => {
  // Clear previous error message
  errorMessage.textContent = "";

  // STEP 0: Simple validation of user input BEFORE calling the API
  if (!name || name.trim().length < 2) {
    errorMessage.textContent =
      "Please type at least 2 characters for the character name.";
    return;
  }

  const trimmedName = name.trim();
  console.log(`Searching for character by name: "${trimmedName}"`);

  try {
    // STEP 1: Build the search URL
    // Example Jikan search endpoint. Many APIs use query parameters like ?q=NAME.
    const url = `${BASE_API_URL}/characters?q=${encodeURIComponent(
      trimmedName
    )}&limit=1`;

    console.log("Search URL:", url);

    const response = await fetch(url);

    // STEP 2: Check HTTP status
    console.log("Search response status:", response.status);

    if (!response.ok) {
      // 400/404, etc. -> API indicates an error.
      throw new Error(
        `Search request failed with status ${response.status}. Check the name and try again.`
      );
    }

    // STEP 3: Parse JSON
    const data = await response.json();
    prettyLog("Search raw JSON", data);

    // STEP 4: Validate content-level result
    // Even if status is 200, the API might return an empty list.
    if (!data.data || data.data.length === 0) {
      throw new Error(
        `No characters found for the name "${trimmedName}". Please check the spelling.`
      );
    }

    // Take the first result
    const character = data.data[0];

    const characterName = character.name ?? "Unknown name";
    const characterImage =
      character.images?.jpg?.image_url ||
      character.images?.webp?.image_url ||
      "";
    const characterAbout =
      character.about ||
      "No description available for this character. (API did not provide 'about' text.)";

    prettyLog("Search result (first character, extracted fields)", {
      name: characterName,
      image: characterImage,
      about: characterAbout,
    });

    // Update the search card
    updateSearchCard(characterName, characterAbout, characterImage);
  } catch (error) {
    console.error("Error in fetchCharacterByName:", error);
    errorMessage.textContent = error.message;
    updateSearchCard(
      "Search Result",
      "Could not find a character with that name. Please check the input and try again.",
      ""
    );
  }
};

// =============================
// DOM Update Functions (safe, reusable)
// =============================
//
// Instead of writing innerHTML strings everywhere, we centralize DOM updates.
// This makes the code easier to test, update, and reason about.

// Update the random character card
const updateRandomCard = (name, description, imageUrl) => {
  randomName.textContent = name;
  randomDescription.textContent = description;

  if (imageUrl) {
    randomImage.src = imageUrl;
    randomImage.alt = `Image of ${name}`;
  } else {
    // If no image URL, show a placeholder behavior
    randomImage.src = "";
    randomImage.alt = "No image available";
  }
};

// Update the search character card
const updateSearchCard = (name, description, imageUrl) => {
  searchName.textContent = name;
  searchDescription.textContent = description;

  if (imageUrl) {
    searchImage.src = imageUrl;
    searchImage.alt = `Image of ${name}`;
  } else {
    searchImage.src = "";
    searchImage.alt = "No image available";
  }
};

// =============================
// Optional: Demonstrate createElement/appendChild approach
// =============================
//
// This is a *safer* and more flexible way to generate complex HTML, because
// you are not injecting raw HTML strings. You create real DOM nodes instead.
// Below is just an illustrative function; you can log and call it for teaching.

/**
 * Example of building a small block with createElement instead of innerHTML.
 * Not used in the main cards above, but used to teach the concept.
 */
const buildSafeParagraph = (text) => {
  const p = document.createElement("p");
  p.textContent = text; // textContent avoids HTML injection.
  return p;
};

// =============================
// Event Listeners
// =============================
//
// Hooking up buttons to our async functions. We always wrap
// event handlers in arrow functions so we can pass arguments cleanly.

randomBtn.addEventListener("click", () => {
  console.log("Random button clicked");
  fetchRandomCharacter();
});

searchBtn.addEventListener("click", () => {
  console.log("Search button clicked");
  const name = nameInput.value;
  fetchCharacterByName(name);
});

// =============================
// Initial console message
// =============================
console.log(
  "App loaded. Open DevTools (F12), go to Console and Network tabs, and interact with the buttons to see the data flow."
);
