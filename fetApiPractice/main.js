// ============================================
// POKEMON FETCHER - Learning Async/Await
// ============================================

console.log('🚀 JavaScript file loaded successfully!');

/**
 * Fetches a Pokémon from the PokéAPI
 * @param {string} name - The name of the Pokémon to fetch
 * @returns {Promise<Object>} - The Pokémon data
 */
async function getPokemon(name) {
  console.log(`\n🔍 Starting fetch for: ${name}`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  
  try {
    // STEP 1: Make the fetch request
    console.log('📡 Step 1: Making fetch request...');
    const url = `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`;
    console.log(`   URL: ${url}`);
    
    const response = await fetch(url);
    console.log('✅ Step 1 Complete: Response received!');
    console.log('   Response object:', response);
    
    // STEP 2: Check if successful (status 200-299)
    console.log('\n🔍 Step 2: Checking response status...');
    console.log(`   Status: ${response.status}`);
    console.log(`   Status Text: ${response.statusText}`);
    console.log(`   OK: ${response.ok}`);
    
    if (!response.ok) {
      throw new Error(`Pokemon not found! Status: ${response.status}`);
    }
    console.log('✅ Step 2 Complete: Status is OK!');
    
    // STEP 3: Check content type
    console.log('\n🔍 Step 3: Checking content type...');
    const contentType = response.headers.get('content-type');
    console.log(`   Content-Type: ${contentType}`);
    
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error('Expected JSON response');
    }
    console.log('✅ Step 3 Complete: Content-Type is JSON!');
    
    // STEP 4: Parse JSON
    console.log('\n🔍 Step 4: Parsing JSON...');
    const pokemon = await response.json();
    console.log('✅ Step 4 Complete: JSON parsed successfully!');
    console.log('   Pokemon data:', pokemon);
    
    // STEP 5: Log some details
    console.log('\n📊 Pokemon Details:');
    console.log(`   Name: ${pokemon.name}`);
    console.log(`   Height: ${pokemon.height}`);
    console.log(`   Weight: ${pokemon.weight}`);
    console.log(`   Types: ${pokemon.types.map(t => t.type.name).join(', ')}`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    
    return pokemon;
    
  } catch (error) {
    console.error('❌ ERROR OCCURRED:');
    console.error('   Message:', error.message);
    console.error('   Full error:', error);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    throw error; // Re-throw so the UI can handle it
  }
}

/**
 * Updates the UI with Pokémon data
 * @param {Object} pokemon - The Pokémon data object
 */
function displayPokemon(pokemon) {
  const display = document.getElementById('pokemon-display');
  
  display.innerHTML = `
    <img 
      src="${pokemon.sprites.front_default}" 
      alt="${pokemon.name}"
    >
    <div class="pokemon-name">${pokemon.name}</div>
    
    <div class="pokemon-stats">
      <div class="stat-box">
        <div class="stat-label">Height</div>
        <div class="stat-value">${pokemon.height}</div>
      </div>
      <div class="stat-box">
        <div class="stat-label">Weight</div>
        <div class="stat-value">${pokemon.weight}</div>
      </div>
      <div class="stat-box">
        <div class="stat-label">Base Experience</div>
        <div class="stat-value">${pokemon.base_experience}</div>
      </div>
      <div class="stat-box">
        <div class="stat-label">Types</div>
        <div class="stat-value">${pokemon.types.map(t => t.type.name).join(', ')}</div>
      </div>
    </div>
  `;
}

/**
 * Shows a loading message
 */
function showLoading() {
  const display = document.getElementById('pokemon-display');
  display.innerHTML = '<p class="loading">⏳ Loading Pokémon data...</p>';
}

/**
 * Shows an error message
 * @param {string} message - The error message
 */
function showError(message) {
  const display = document.getElementById('pokemon-display');
  display.innerHTML = `<p class="error">❌ ${message}</p>`;
}

/**
 * Handles the fetch button click
 */
async function handleFetchClick() {
  const input = document.getElementById('pokemon-input');
  const pokemonName = input.value.trim();
  
  if (!pokemonName) {
    showError('Please enter a Pokémon name!');
    return;
  }
  
  showLoading();
  
  try {
    const pokemon = await getPokemon(pokemonName);
    displayPokemon(pokemon);
  } catch (error) {
    showError(error.message);
  }
}

// ============================================
// EVENT LISTENERS
// ============================================

// Wait for the DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
  console.log('✅ DOM loaded, attaching event listeners...');
  
  const fetchButton = document.getElementById('fetch-button');
  const input = document.getElementById('pokemon-input');
  
  // Click button to fetch
  fetchButton.addEventListener('click', handleFetchClick);
  
  // Press Enter in input to fetch
  input.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      handleFetchClick();
    }
  });
  
  console.log('✅ Event listeners attached!');
  console.log('💡 Try typing a Pokémon name and pressing Enter or clicking the button');
});
