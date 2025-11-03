# Validation & Submission Checklist

## Before Submitting

Use this checklist to ensure your assignment meets all requirements.

## ✅ HTML Validation

### W3C Markup Validation
1. Go to https://validator.w3.org/
2. Upload your `index.html` file OR paste the code
3. Fix any errors (warnings are okay)
4. Take a screenshot of the validation results

**Common issues to check:**
- [ ] All opening tags have closing tags
- [ ] Attributes have quotes around values
- [ ] IDs are unique (no duplicate IDs)
- [ ] Alt attributes on all images
- [ ] Proper nesting of elements
- [ ] No obsolete elements or attributes

## ✅ CSS Validation

### W3C CSS Validation
1. Go to https://jigsaw.w3.org/css-validator/
2. Upload your `styles/main.css` file OR paste the code
3. Fix any errors (warnings about vendor prefixes are okay)
4. Take a screenshot of the validation results

**Common issues to check:**
- [ ] No syntax errors
- [ ] Proper CSS property names
- [ ] Valid color values
- [ ] Correct units (rem, px, %, etc.)
- [ ] Matching opening/closing braces

## ✅ JavaScript

### Browser Console Check
1. Open your website in the browser
2. Press F12 to open Developer Tools
3. Go to the "Console" tab
4. Interact with the menu
5. Check for any errors (should be none)

**Test these functions:**
- [ ] Click hamburger icon (menu opens)
- [ ] Click hamburger again (menu closes)
- [ ] Click outside menu (menu closes)
- [ ] Press Escape key (menu closes)
- [ ] Click "Services" (submenu opens)
- [ ] Click "Services" again (submenu closes)
- [ ] Click navigation links (smooth scroll works)

## ✅ Image Requirements

### File Structure Check
```
images/
├── banner-small.jpg ✓
├── banner-small.webp ✓
├── banner-medium.jpg ✓
├── banner-medium.webp ✓
├── banner-large.jpg ✓
├── banner-large.webp ✓
├── team/
│   ├── john-joshen-small.jpg ✓
│   ├── john-joshen-small.webp ✓
│   ├── john-joshen-medium.jpg ✓
│   ├── john-joshen-medium.webp ✓
│   ├── jenny-taupe-small.jpg ✓
│   ├── jenny-taupe-small.webp ✓
│   ├── jenny-taupe-medium.jpg ✓
│   ├── jenny-taupe-medium.webp ✓
│   ├── raz-blobar-small.jpg ✓
│   ├── raz-blobar-small.webp ✓
│   ├── raz-blobar-medium.jpg ✓
│   ├── raz-blobar-medium.webp ✓
│   ├── karen-chad-small.jpg ✓
│   ├── karen-chad-small.webp ✓
│   ├── karen-chad-medium.jpg ✓
│   └── karen-chad-medium.webp ✓
├── destinations/
│   ├── santorini-small.jpg ✓
│   ├── santorini-small.webp ✓
│   ├── santorini-medium.jpg ✓
│   ├── santorini-medium.webp ✓
│   ├── maldives-small.jpg ✓
│   ├── maldives-small.webp ✓
│   ├── maldives-medium.jpg ✓
│   ├── maldives-medium.webp ✓
│   ├── valley-of-fire-small.jpg ✓
│   ├── valley-of-fire-small.webp ✓
│   ├── valley-of-fire-medium.jpg ✓
│   ├── valley-of-fire-medium.webp ✓
│   ├── tulum-small.jpg ✓
│   ├── tulum-small.webp ✓
│   ├── tulum-medium.jpg ✓
│   └── tulum-medium.webp ✓
└── icons/
    ├── logo.svg ✓
    ├── hamburger.svg ✓
    ├── clock.png ✓
    ├── cube.png ✓
    └── cloud.png ✓
```

### Image Optimization Check
- [ ] All JPG images compressed (80-85% quality)
- [ ] All images have WebP versions
- [ ] SVG icons are minified
- [ ] Banner images: 100-200KB each
- [ ] Team photos: 30-80KB each
- [ ] Destination photos: 40-100KB each
- [ ] SVG icons: Under 5KB each
- [ ] Total page weight: Under 2MB

## ✅ Font Requirements

### Font Files
- [ ] `fonts/KoHo-Bold.woff2` exists
- [ ] `fonts/KoHo-Bold.woff` exists
- [ ] Adobe Typekit link in HTML `<head>`
- [ ] Correct project ID in Typekit link

### Font Usage
- [ ] Logo uses KoHo
- [ ] Banner title uses KoHo
- [ ] Section headings use Catamaran
- [ ] Body paragraphs use Times New Roman
- [ ] UI text uses Catamaran

## ✅ Responsive Design

### Test at Different Sizes
Use browser DevTools (F12) → Toggle Device Toolbar

**Mobile (320px - 767px)**
- [ ] Layout is single column
- [ ] Text is readable
- [ ] Images fit viewport
- [ ] Menu is hamburger icon
- [ ] No horizontal scrolling

**Tablet (768px - 1199px)**
- [ ] Features in 2 columns (3rd spans both)
- [ ] Team in 2 columns
- [ ] Destinations in 2 columns
- [ ] Text is readable
- [ ] Menu is still hamburger

**Desktop (1200px+)**
- [ ] Navigation is horizontal
- [ ] Features in 3 columns
- [ ] Team in 4 columns
- [ ] Destinations in 4 columns
- [ ] Layout uses full width appropriately

## ✅ Accessibility

### ARIA Attributes
- [ ] `aria-label` on hamburger button
- [ ] `aria-expanded` on menu toggle
- [ ] `aria-expanded` on submenu toggle

### Keyboard Navigation
- [ ] Tab through all interactive elements
- [ ] Enter activates buttons/links
- [ ] Escape closes menu
- [ ] Focus is visible (outline)

### Alt Text
- [ ] All images have alt attributes
- [ ] Decorative images have empty alt (`alt=""`)
- [ ] Meaningful images have descriptive alt text

### Color Contrast
- [ ] Text on backgrounds meets WCAG AA (4.5:1 for normal text)
- [ ] White text on green background (var(--main))
- [ ] White text on dark background (var(--dark))
- [ ] Dark text on light backgrounds

## ✅ Code Quality

### HTML
- [ ] Semantic elements used (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`)
- [ ] Proper heading hierarchy (h1 → h2 → h3)
- [ ] Consistent indentation (2 or 4 spaces)
- [ ] Comments for major sections
- [ ] No inline styles

### CSS
- [ ] Organized into logical sections
- [ ] Comments for major sections
- [ ] Consistent naming (kebab-case)
- [ ] CSS custom properties used
- [ ] Mobile-first approach
- [ ] No !important (unless absolutely necessary)

### JavaScript
- [ ] Code is in external file (`scripts/main.js`)
- [ ] Functions are well-organized
- [ ] Comments explain complex logic
- [ ] No console.log() statements (except for debugging)
- [ ] Strict mode enabled (`'use strict'`)

## ✅ Assignment-Specific Requirements

### Techniques Demonstrated
- [ ] Embedded custom font (@font-face)
- [ ] External font (Adobe Typekit)
- [ ] System font (Times New Roman)
- [ ] Responsive background images
- [ ] Image optimization
- [ ] SVG usage and minification
- [ ] Art direction via `<picture>` element
- [ ] Position property (absolute for menu, social icons)
- [ ] Z-index (menu overlay, social icons)
- [ ] Multi-level navigation (Services submenu)
- [ ] Mobile hamburger menu
- [ ] Hover states (all links, icons)
- [ ] Active states
- [ ] Focus states

### Design Matching Figma
- [ ] Colors match design tokens
- [ ] Typography matches (fonts, sizes, weights)
- [ ] Spacing matches (using rem units)
- [ ] Layout matches at all breakpoints
- [ ] Images are positioned correctly
- [ ] Icons are correct

## ✅ Browser Testing

Test in these browsers:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

**Check for:**
- Layout renders correctly
- Menu functions properly
- Images load and display
- Fonts load properly
- No console errors
- Smooth scrolling works

## ✅ Performance

### Page Load
- [ ] Page loads in under 3 seconds
- [ ] Images load progressively
- [ ] No flash of unstyled content (FOUC)
- [ ] No layout shift as fonts load

### Network Tab Check
1. Open DevTools (F12)
2. Go to Network tab
3. Refresh page
4. Check total size: **Should be under 2MB**

## ✅ Final Submission

### Files to Submit
```
travlers-website/
├── index.html
├── styles/
│   └── main.css
├── scripts/
│   └── main.js
├── fonts/
│   ├── KoHo-Bold.woff2
│   └── KoHo-Bold.woff
└── images/
    └── [all image files]
```

### Before Zipping
- [ ] Remove any test/backup files
- [ ] Remove any `.DS_Store` (Mac) or `Thumbs.db` (Windows) files
- [ ] Ensure all file paths are relative (not absolute)
- [ ] Test that the website works from a fresh unzip
- [ ] Include a README if required by your instructor

### Submission Checklist
- [ ] All files included
- [ ] Compressed as .zip file
- [ ] Named according to course requirements
- [ ] HTML validates with no errors
- [ ] CSS validates with no errors
- [ ] JavaScript has no console errors
- [ ] Works in multiple browsers
- [ ] Responsive at all breakpoints
- [ ] All images optimized
- [ ] Fonts load correctly

## 🎉 You're Ready to Submit!

If you've checked off everything above, your assignment should be ready for submission. Good luck!

---

## Grading Rubric Quick Reference

| Category | Points | Requirements |
|----------|--------|-------------|
| HTML Structure | 20% | Semantic elements, validation, proper nesting |
| CSS Styling | 30% | Responsive design, fonts, colors, layout |
| Images | 20% | Optimization, art direction, formats |
| JavaScript | 15% | Menu functionality, accessibility |
| Code Quality | 10% | Organization, comments, best practices |
| Design Match | 5% | Matches Figma design |

**Total: 100 points** (15% of course grade)
