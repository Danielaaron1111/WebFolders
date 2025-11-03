# 🚀 Quick Start Guide

Get your Travlers website up and running in 5 steps!

## Step 1: Download & Extract ✅
You already have the complete project structure with:
- ✅ HTML file (semantic, accessible markup)
- ✅ CSS file (responsive, mobile-first design)
- ✅ JavaScript file (menu functionality)
- ✅ Proper folder structure

## Step 2: Add Fonts (15 minutes)

### KoHo Bold
1. Download `KoHo-Bold` from Brightspace
2. Go to https://transfonter.org/
3. Upload the font file
4. Select WOFF2 and WOFF formats
5. Download and extract
6. Place `KoHo-Bold.woff2` and `KoHo-Bold.woff` in the `fonts/` folder

### Catamaran (Adobe Typekit)
1. Go to https://fonts.adobe.com/
2. Search for "Catamaran"
3. Add to Web Project (sign in if needed)
4. Copy the `<link>` code
5. Replace line 11 in `index.html` with your link

📖 **Detailed instructions**: See `fonts/FONT-SETUP.md`

## Step 3: Prepare Images (30-45 minutes)

### From Figma (node-id: 48:230)

**Export these images:**
1. **Banner** (3 sizes: small 393px, medium 768px, large 1200px)
2. **Team photos** (4 people × 2 sizes each = 8 files)
3. **Destinations** (4 places × 2 sizes each = 8 files)
4. **Icons** (5 SVG files: logo, hamburger, clock, cube, cloud)

**Optimize:**
- Use https://squoosh.app/ for JPGs → WebP conversion
- Use https://jakearchibald.github.io/svgomg/ for SVG minification
- Target: 80-85% quality for photos

**Place in folders:**
```
images/
├── banner-small.jpg, banner-small.webp (and medium, large)
├── team/[person-name]-small.jpg and -medium.jpg (plus .webp)
├── destinations/[place-name]-small.jpg and -medium.jpg (plus .webp)
└── icons/[icon-name].svg
```

📖 **Detailed instructions**: See `IMAGE-PREPARATION.md`

## Step 4: Test Everything (10 minutes)

### Open in Browser
Just double-click `index.html` or:
```bash
# Optional: Use a local server
python -m http.server 8000
# Then visit: http://localhost:8000
```

### Test Checklist:
- [ ] Fonts are displaying correctly (KoHo logo, Catamaran headings, Times New Roman body)
- [ ] All images are showing
- [ ] Click hamburger menu (opens/closes)
- [ ] Click "Services" (submenu expands)
- [ ] Resize browser window (responsive design works)
- [ ] Test on mobile (if possible)

### Browser Console (F12):
- Should have **zero errors** in the Console tab
- Fonts should load in Network tab
- Images should load progressively

## Step 5: Validate & Submit (10 minutes)

### HTML Validation
1. Go to https://validator.w3.org/
2. Upload `index.html`
3. Fix any errors (if any)

### CSS Validation
1. Go to https://jigsaw.w3.org/css-validator/
2. Upload `styles/main.css`
3. Fix any errors (if any)

### Final Check
- [ ] All requirements from `VALIDATION-CHECKLIST.md`
- [ ] Page weight under 2MB
- [ ] Works in Chrome, Firefox, Safari

### Submit
Zip the entire `travlers-website/` folder and submit to Brightspace!

---

## ⚡ Troubleshooting

**Menu not working?**
→ Check browser console for errors
→ Verify `scripts/main.js` is linked correctly

**Fonts not loading?**
→ Check font files are in `/fonts/` folder
→ Verify Adobe Typekit link is correct
→ Clear browser cache

**Images not showing?**
→ Check file paths are correct (case-sensitive!)
→ Verify files exist in the right folders
→ Check browser console for 404 errors

**Layout looks weird?**
→ Make sure all CSS is loading
→ Clear browser cache
→ Check viewport meta tag is in HTML

---

## 📚 Documentation Included

- `README.md` - Complete project documentation
- `IMAGE-PREPARATION.md` - Step-by-step image export guide
- `VALIDATION-CHECKLIST.md` - Complete submission checklist
- `fonts/FONT-SETUP.md` - Font installation guide

---

## 🎯 Assignment Requirements

✅ All implemented! This project includes:
- Embedded custom font (@font-face)
- External font (Adobe Typekit)
- System font (Times New Roman)
- Responsive images with `<picture>` element
- Image optimization (WebP + JPG)
- SVG icons
- Position absolute/relative
- Z-index layering
- Multi-level navigation
- Mobile hamburger menu
- Hover/focus/active states
- Three responsive breakpoints (mobile, tablet, desktop)
- Accessibility features (ARIA, keyboard nav)
- Semantic HTML5
- Mobile-first CSS

---

## 💡 Pro Tips

1. **Start with fonts** - They're quick to set up and make everything look right
2. **Batch export images** - Export all small sizes, then all medium sizes
3. **Test early, test often** - Don't wait until the end to test
4. **Use browser DevTools** - F12 is your friend for debugging
5. **Keep originals** - Don't overwrite your source images when optimizing

---

## ⏱️ Time Estimate

- **Fonts**: 15 minutes
- **Images**: 45 minutes (export, optimize, convert)
- **Testing**: 15 minutes
- **Validation**: 10 minutes
- **Total**: ~90 minutes

(Assuming HTML/CSS/JS are already complete ✅)

---

## 🆘 Need Help?

Check these resources in order:
1. `VALIDATION-CHECKLIST.md` - Comprehensive checklist
2. `IMAGE-PREPARATION.md` - Image export guide
3. `fonts/FONT-SETUP.md` - Font setup guide
4. `README.md` - Full documentation
5. Browser DevTools Console - Error messages
6. W3C Validators - HTML/CSS errors

---

## 🎓 Learning Outcomes

By completing this project, you've learned:
- ✅ Responsive web design (mobile-first)
- ✅ CSS Grid and Flexbox layouts
- ✅ Custom font embedding
- ✅ Image optimization for web
- ✅ Art direction with `<picture>` element
- ✅ JavaScript DOM manipulation
- ✅ Accessibility best practices
- ✅ Semantic HTML5
- ✅ CSS custom properties (variables)
- ✅ Mobile menu patterns

Great work! 🎉
