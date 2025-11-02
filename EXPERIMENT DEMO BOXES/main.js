// JavaScript for Card Demo

// Add click handlers to character cards
document.addEventListener('DOMContentLoaded', function() {
    
    // Character Cards Interaction
    const characterCards = document.querySelectorAll('.character-card');
    
    characterCards.forEach(card => {
        card.addEventListener('click', function() {
            const cardTitle = this.querySelector('.card-title').textContent;
            console.log(`Character card clicked: ${cardTitle}`);
            
            // Add a subtle animation on click
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // You can add navigation or modal opening here
            // Example: window.location.href = `/character/${cardTitle}`;
        });
    });
    
    // Scene Boxes Interaction
    const sceneBoxes = document.querySelectorAll('.scene-box');
    
    sceneBoxes.forEach(scene => {
        scene.addEventListener('click', function(e) {
            // If clicking on the button specifically
            if (e.target.closest('.scene-button')) {
                const sceneTitle = this.querySelector('.scene-title').textContent;
                console.log(`Scene button clicked: ${sceneTitle}`);
                
                // Add visual feedback
                const button = this.querySelector('.scene-button');
                button.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    button.style.transform = '';
                }, 150);
                
                // You can add character selection modal here
                // Example: openCharacterSelectionModal(sceneTitle);
            }
        });
    });
    
    // Chat stats hover effect
    const cardStats = document.querySelectorAll('.card-stats');
    
    cardStats.forEach(stats => {
        stats.addEventListener('mouseenter', function() {
            this.style.color = '#a78bfa';
        });
        
        stats.addEventListener('mouseleave', function() {
            this.style.color = '#888888';
        });
    });
    
    // Add loading animation for images
    const images = document.querySelectorAll('.card-image img');
    
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '0';
            this.style.transition = 'opacity 0.5s ease';
            setTimeout(() => {
                this.style.opacity = '1';
            }, 10);
        });
    });
    
    // Scene boxes parallax effect (optional)
    sceneBoxes.forEach(scene => {
        scene.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const moveX = (x - centerX) / 20;
            const moveY = (y - centerY) / 20;
            
            this.style.backgroundPosition = `${50 + moveX}% ${50 + moveY}%`;
        });
        
        scene.addEventListener('mouseleave', function() {
            this.style.backgroundPosition = 'center';
        });
    });
    
    console.log('Card demo initialized successfully!');
});

// Optional: Function to dynamically add cards
function addCharacterCard(data) {
    const cardsGrid = document.querySelector('.cards-grid');
    
    const card = document.createElement('div');
    card.className = 'character-card';
    card.innerHTML = `
        <div class="card-image">
            <img src="${data.image}" alt="${data.name}">
        </div>
        <div class="card-content">
            <h3 class="card-title">${data.name}</h3>
            <p class="card-author">By ${data.author}</p>
            <p class="card-description">${data.description}</p>
            <div class="card-stats">
                <span class="chat-icon">💬</span>
                <span class="chat-count">${data.chatCount}</span>
            </div>
        </div>
    `;
    
    cardsGrid.appendChild(card);
}

// Optional: Function to dynamically add scene boxes
function addSceneBox(data) {
    const scenesGrid = document.querySelector('.scenes-grid');
    
    const scene = document.createElement('div');
    scene.className = 'scene-box';
    scene.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.5)), url('${data.image}')`;
    scene.innerHTML = `
        <div class="scene-overlay">
            <h3 class="scene-title">${data.title}</h3>
            <button class="scene-button">
                <span class="user-icon">👤</span>
                Select Character
            </button>
            <p class="scene-author">By ${data.author}</p>
        </div>
    `;
    
    scenesGrid.appendChild(scene);
}

// Example usage (uncomment to test):
/*
addCharacterCard({
    name: "New Character",
    author: "@creator",
    description: "A new character description",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop",
    chatCount: "5.2k"
});
*/
