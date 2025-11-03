# Travlers Website - DMIT1530 Assignment 2

A responsive single-page website for a fictional travel company, built with HTML, CSS, and vanilla JavaScript.

## 📁 Project Structure

```
travlers-website/
├── index.html                 # Main HTML file
├── styles/
│   └── main.css              # All CSS styles
├── scripts/
│   └── main.js               # JavaScript for menu functionality
├── fonts/
│   ├── KoHo-Bold.woff2       # Custom embedded font (you need to add)
│   └── KoHo-Bold.woff        # Custom embedded font (you need to add)
├── images/
│   ├── banner-small.jpg      # Mobile banner
│   ├── banner-small.webp
│   ├── banner-medium.jpg     # Tablet banner
│   ├── banner-medium.webp
│   ├── banner-large.jpg      # Desktop banner
│   ├── banner-large.webp
│   ├── team/                 # Team member photos
│   │   ├── john-joshen-small.jpg
│   │   ├── john-joshen-small.webp
│   │   ├── john-joshen-medium.jpg
│   │   └── ... (other team members)
│   ├── destinations/         # Destination photos
│   │   ├── santorini-small.jpg
│   │   ├── santorini-small.webp
│   │   └── ... (other destinations)
│   └── icons/                # SVG icons
│       ├── logo.svg
│       ├── hamburger.svg
│       ├── clock.svg
│       ├── cube.svg
│       └── cloud.svg
├── IMAGE-PREPARATION.md      # Detailed image export guide
└── README.md                 # This file
```

## 🚀 Setup Instructions

### 1. Font Setup

#### KoHo Bold (Embedded Font)
1. Download KoHo Bold from Brightspace
2. Convert to web fonts:
   - Use [Transfonter](https://transfonter.org/) or similar
   - Generate WOFF2 and WOFF formats
3. Place files in the `fonts/` directory
4. The CSS already includes the @font-face declaration

#### Catamaran (Adobe Typekit)
1. Go to [Adobe Fonts](https://fonts.adobe.com/)
2. Search for "Catamaran"
3. Add to your project and get the `<link>` code
4. Replace `XXXXXXX` in `index.html` line 11 with your project ID:
   ```html
   <link rel="stylesheet" href="https://use.typekit.net/YOUR-ID.css">
   ```

### 2. Image Preparation

See **IMAGE-PREPARATION.md** for detailed instructions on:
- Exporting images from Figma at correct sizes
- Optimizing JPG/PNG files
- Creating WebP versions
- Minifying SVG icons

**Quick checklist:**
- [ ] Export banner at 3 sizes (small/medium/large)
- [ ] Export 4 team photos at 2 sizes each
- [ ] Export 4 destination photos at 2 sizes each
- [ ] Export 5 SVG icons (logo, hamburger, clock, cube, cloud)
- [ ] Optimize all images for web
- [ ] Create WebP versions of all JPGs

### 3. Running the Website

Simply open `index.html` in a web browser. No build process required!

For development, you can use a local server:
```bash
# Python 3
python -m http.server 8000

# PHP
php -S localhost:8000

# Node.js (with http-server)
npx http-server
```

Then visit: `http://localhost:8000`

## ✨ Features Implemented

### HTML
- ✅ Semantic HTML5 elements (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`)
- ✅ Proper heading hierarchy (h1 → h2 → h3)
- ✅ `<picture>` element for art direction
- ✅ Responsive images with multiple sources
- ✅ WebP format with JPG fallbacks
- ✅ Accessible navigation with ARIA attributes
- ✅ Alt text on all images

### CSS
- ✅ Custom embedded font (@font-face)
- ✅ External font (Adobe Typekit)
- ✅ CSS custom properties (variables)
- ✅ Mobile-first responsive design
- ✅ Flexbox and CSS Grid layouts
- ✅ Position absolute for overlays
- ✅ Z-index for stacking order
- ✅ Smooth transitions
- ✅ Hover/focus states
- ✅ Media queries (768px, 1200px)

### JavaScript
- ✅ Mobile hamburger menu toggle
- ✅ Submenu expand/collapse
- ✅ Click outside to close
- ✅ Escape key to close
- ✅ Keyboard navigation (Tab, Enter, Escape)
- ✅ Focus management for accessibility
- ✅ Smooth scrolling
- ✅ Responsive behavior on resize

## 📱 Responsive Breakpoints

- **Mobile**: 393px (default, up to 767px)
- **Tablet**: 768px - 1199px
- **Desktop**: 1200px and up

### Layout Changes by Breakpoint

| Feature | Mobile | Tablet | Desktop |
|---------|--------|--------|---------|
| Navigation | Hamburger menu | Hamburger menu | Horizontal nav |
| Features | Single column | 2 columns (3rd spans) | 3 columns |
| Team | Single column | 2 columns | 4 columns |
| Destinations | Single column | 2 columns | 4 columns |

## 🎨 Design Tokens

```css
/* Colors */
--main: #246729        (Green accent)
--dark: #2d2d2d        (Dark grey/black)
--grey: #f5f5f5        (Light grey background)
--medium-grey: #d9d9d9 (Medium grey)
--white: #ffffff       (White)

/* Typography */
--font-heading: 'KoHo'              (Logo, banner title)
--font-body: 'Catamaran'            (Headings, UI text)
--font-text: 'Times New Roman'      (Body paragraphs)

/* Spacing (16px base) */
--spacing-xs: 0.5rem   (8px)
--spacing-sm: 1rem     (16px)
--spacing-md: 1.5rem   (24px)
--spacing-lg: 2rem     (32px)
--spacing-xl: 2.25rem  (36px)
```

## ♿ Accessibility Features

- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- Focus visible states
- Skip to content (can be added)
- Color contrast meets WCAG AA standards
- Reduced motion support
- Screen reader friendly

## 🐛 Troubleshooting

### Menu not working
- Check that `scripts/main.js` is loaded
- Open browser console for errors
- Verify ID attributes match (`menuToggle`, `navMenu`)

### Fonts not loading
- Verify font files are in `fonts/` directory
- Check file paths in CSS
- Ensure Adobe Typekit link is correct
- Check browser console for 404 errors

### Images not showing
- Verify all images are exported and placed correctly
- Check file names match exactly (case-sensitive)
- Ensure image paths in HTML are correct
- Check browser console for 404 errors

### Layout issues
- Clear browser cache
- Check CSS file is loading
- Verify media queries are not conflicting
- Use browser dev tools to inspect elements

## 📝 Assignment Requirements Checklist

- [ ] Embedded custom font (KoHo)
- [ ] External font (Catamaran via Typekit)
- [ ] System font (Times New Roman)
- [ ] Responsive background images
- [ ] Image optimization (reduced file sizes)
- [ ] SVG icons with minification
- [ ] Art direction via `<picture>` element
- [ ] Position property with offsets
- [ ] Z-index and stacking order
- [ ] Multi-level navigation
- [ ] Dropdown submenu
- [ ] Mobile hamburger menu
- [ ] Hover/active/focus states
- [ ] Responsive design (3 breakpoints)
- [ ] HTML validation passes
- [ ] CSS validation passes
- [ ] Accessibility best practices

## 📊 Performance Tips

Target page weight: **Under 2MB**

- Compress images to 80-85% quality
- Use WebP format (30% smaller than JPG)
- Minify SVG icons
- Use system fonts where possible
- Lazy load images below the fold (optional enhancement)

## 🔍 Testing

Test on multiple devices and browsers:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

Test at different viewport sizes:
- [ ] 320px (small mobile)
- [ ] 393px (iPhone 14 Pro)
- [ ] 768px (iPad)
- [ ] 1024px (iPad Pro)
- [ ] 1200px (Desktop)
- [ ] 1920px (Large desktop)

## 📚 Resources

- [MDN Web Docs](https://developer.mozilla.org/)
- [Can I Use](https://caniuse.com/)
- [Squoosh](https://squoosh.app/) - Image optimization
- [SVGOMG](https://jakearchibald.github.io/svgomg/) - SVG optimization
- [Adobe Fonts](https://fonts.adobe.com/)
- [WebAIM](https://webaim.org/) - Accessibility

## 📄 License

This is a student project for DMIT1530 - 2025.
Content created with CoPilot. Images sourced from Unsplash.

---

**Note**: Make sure to complete all image preparation steps before final submission!
