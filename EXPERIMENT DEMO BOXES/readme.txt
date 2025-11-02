# Character Cards & Scene Boxes Demo

A professional demonstration of two different card layout styles inspired by character.ai interface.

## 📁 Project Structure

```
card-demo/
├── index.html          # Main HTML file
├── css/
│   └── styles.css      # All styling
├── js/
│   └── script.js       # Interactive functionality
└── README.md           # This file
```

## 🎨 Features

### 1. Character Cards
- **Image at top**: Profile picture/avatar
- **Title**: Character name
- **Subtitle**: Author/creator name
- **Description**: Character description or tagline
- **Stats icon**: Chat count with icon
- **Hover effects**: Smooth animations on hover
- **Responsive**: Adapts to different screen sizes

### 2. Scene Boxes
- **Background image**: Full-size image covering entire box
- **Overlay**: Dark gradient for text readability
- **Title**: Scene title overlaid on image
- **Button**: "Select Character" button with glassmorphism effect
- **Author info**: Creator attribution
- **Hover effects**: Parallax and lift animations
- **Responsive**: Stacks on mobile devices

## 🚀 How to Use

### Opening in VS Code:
1. Open Visual Studio Code
2. Go to File → Open Folder
3. Select the `card-demo` folder
4. Right-click on `index.html` and select "Open with Live Server" (if you have the extension)
   OR simply open `index.html` in your browser

### Using Live Server Extension (Recommended):
1. Install "Live Server" extension in VS Code
2. Right-click `index.html`
3. Click "Open with Live Server"
4. Your browser will open automatically with hot-reload enabled

## 🎯 Key CSS Techniques Used

### Character Cards:
```css
/* Grid layout for responsive cards */
display: grid;
grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));

/* Hover effect */
transform: translateY(-5px);
box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
```

### Scene Boxes:
```css
/* Background image covering entire box */
background-size: cover;
background-position: center;

/* Gradient overlay for text */
background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 100%);

/* Glassmorphism button */
backdrop-filter: blur(10px);
background-color: rgba(255, 255, 255, 0.2);
```

## 📱 Responsive Breakpoints

- **Desktop**: 1024px and above - Multi-column grid
- **Tablet**: 768px - 1024px - Adjusted columns
- **Mobile**: Below 768px - Single or dual column layout

## 🛠️ Customization

### Adding Your Own Cards:

**Character Card:**
```javascript
addCharacterCard({
    name: "Character Name",
    author: "@username",
    description: "Description here",
    image: "image-url.jpg",
    chatCount: "10.5k"
});
```

**Scene Box:**
```javascript
addSceneBox({
    title: "Scene Title",
    author: "@username",
    image: "background-image-url.jpg"
});
```

### Changing Colors:
Edit `css/styles.css`:
- Background: `#1a1a1a`
- Card background: `#2a2a2a`
- Accent color: `#a78bfa`
- Text: `#ffffff`

## 💡 Tips

1. **Images**: Use high-quality images (at least 800x600px for scenes)
2. **Image Services**: Unsplash, Pexels, or your own images
3. **Optimization**: Compress images for faster loading
4. **Accessibility**: Add proper alt text to images
5. **Grid**: Adjust `minmax()` values to change card sizes

## 🎓 Learning Points

### HTML Structure:
- Semantic HTML elements
- Proper use of divs and sections
- Image optimization with object-fit

### CSS Techniques:
- CSS Grid for responsive layouts
- Flexbox for card content
- CSS transitions and transforms
- Background image techniques
- Glassmorphism effects
- Linear gradients for overlays

### JavaScript Features:
- Event listeners
- DOM manipulation
- Dynamic content creation
- Hover effects and animations

## 🔧 Browser Support

- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- IE11: ❌ Not supported (uses modern CSS Grid)

## 📝 Notes

- Images are loaded from Unsplash for demo purposes
- Replace with your own images in production
- JavaScript includes optional parallax effect on scene boxes
- All animations are GPU-accelerated for smooth performance

## 🚀 Next Steps

1. Replace placeholder images with your own
2. Customize colors to match your brand
3. Add click handlers to navigate to different pages
4. Implement a modal for character selection
5. Add loading states for images
6. Integrate with a backend API

---

**Happy Coding! 🎉**

For questions or issues, check the code comments or experiment with the CSS values!
