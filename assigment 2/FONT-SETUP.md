# Font Setup Guide

## KoHo Bold - Custom Embedded Font

### Step 1: Get the Font File
Download KoHo-Bold from your course's Brightspace resources.

### Step 2: Convert to Web Fonts
You need to convert the font to WOFF2 and WOFF formats for web use.

#### Using Transfonter (Recommended - Free Online Tool)
1. Go to https://transfonter.org/
2. Click "Add fonts" and upload your KoHo-Bold.ttf or .otf file
3. Select these options:
   - ✅ **WOFF2** (modern browsers)
   - ✅ **WOFF** (fallback for older browsers)
   - Family support: ☐ (unchecked)
   - Fix vertical metrics: ☐ (unchecked)
   - Autohint font: ☐ (unchecked)
   - Base64 encode: ☐ (unchecked)
4. Click "Convert"
5. Download the generated files

#### Using FontSquirrel (Alternative)
1. Go to https://www.fontsquirrel.com/tools/webfont-generator
2. Upload your KoHo-Bold font file
3. Select "Optimal" preset
4. Download the kit

### Step 3: Place Font Files
Put these files in the `fonts/` directory:
- `KoHo-Bold.woff2`
- `KoHo-Bold.woff`

Your directory should look like:
```
fonts/
├── KoHo-Bold.woff2
└── KoHo-Bold.woff
```

### Step 4: Verify CSS
The CSS already includes the correct @font-face declaration:

```css
@font-face {
    font-family: 'KoHo';
    src: url('../fonts/KoHo-Bold.woff2') format('woff2'),
         url('../fonts/KoHo-Bold.woff') format('woff');
    font-weight: 700;
    font-style: normal;
    font-display: swap;
}
```

## Catamaran - Adobe Typekit Font

### Step 1: Get Adobe Fonts Account
You need an Adobe account (free with student license or Creative Cloud).

### Step 2: Add Catamaran to Your Project
1. Go to https://fonts.adobe.com/
2. Sign in with your Adobe account
3. Search for "Catamaran"
4. Click on the Catamaran font
5. Click "Add to Web Project" or "Create New Web Project"
6. Name your project (e.g., "Travlers Website")
7. Copy the `<link>` code provided

### Step 3: Add to HTML
Replace the placeholder in `index.html` (line 11):

```html
<!-- REPLACE THIS: -->
<link rel="stylesheet" href="https://use.typekit.net/XXXXXXX.css">

<!-- WITH YOUR CODE (example): -->
<link rel="stylesheet" href="https://use.typekit.net/abc1234.css">
```

### Step 4: Select Font Weights
In Adobe Fonts, make sure you select these weights:
- ✅ Light (300)
- ✅ Regular (400)

## Times New Roman - System Font
No setup required! Times New Roman is a system font available on all computers.

## Testing Your Fonts

### Browser DevTools Test
1. Open `index.html` in your browser
2. Press F12 to open Developer Tools
3. Go to the "Network" tab
4. Refresh the page
5. Filter by "Font"
6. You should see:
   - `KoHo-Bold.woff2` (or .woff)
   - Adobe Typekit CSS file

### Visual Test
Look at the website:
- **Logo "travlers"** should be in KoHo (bold, distinct style)
- **Section headings** should be in Catamaran (clean, modern)
- **Body paragraphs** should be in Times New Roman (serif, traditional)

### Fallback Chain
If a custom font fails to load, the browser uses these fallbacks:

```css
/* KoHo with fallbacks */
font-family: 'KoHo', sans-serif;

/* Catamaran with fallbacks */
font-family: 'Catamaran', sans-serif;

/* Times New Roman with fallbacks */
font-family: 'Times New Roman', serif;
```

## Troubleshooting

### KoHo not loading?
- ✅ Check font files are in `/fonts/` directory
- ✅ Verify file names match exactly (case-sensitive)
- ✅ Check browser console for 404 errors
- ✅ Make sure paths in CSS are correct (`../fonts/`)
- ✅ Try clearing browser cache

### Catamaran not loading?
- ✅ Verify Adobe Typekit `<link>` is in HTML `<head>`
- ✅ Check that the project ID is correct
- ✅ Make sure you're logged into Adobe Fonts
- ✅ Check that Catamaran is activated in your Adobe project
- ✅ Try another browser

### Font looks wrong?
- ✅ Make sure you selected the right font weights in Adobe Fonts
- ✅ Check that CSS font-weight values match
- ✅ Inspect element in DevTools to see computed font-family

## Font Performance Tips

### Font Loading Strategy
The CSS uses `font-display: swap` which means:
1. Text is shown immediately in a fallback font
2. Custom font loads in the background
3. Text switches to custom font when loaded
4. This prevents "invisible text" while fonts load

### Optimization
- WOFF2 is ~30% smaller than WOFF
- Only load the font weights you actually use
- Adobe Typekit automatically optimizes delivery

## Assignment Requirements ✓

- ✅ Embedded custom font (KoHo via @font-face)
- ✅ External font (Catamaran via Adobe Typekit)
- ✅ System font (Times New Roman)
- ✅ Proper fallback chains
- ✅ font-display strategy for performance
- ✅ Multiple font formats for browser support
