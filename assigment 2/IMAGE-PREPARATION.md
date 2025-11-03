# Image Preparation Guide

## Step 1: Export Images from Figma

### Banner Image
1. In Figma, select the banner image (node-id: 48:241)
2. Export as JPG at these sizes:
   - **Small (mobile)**: 393px width → `banner-small.jpg`
   - **Medium (tablet)**: 768px width → `banner-medium.jpg`
   - **Large (desktop)**: 1200px width → `banner-large.jpg`
3. Quality: 80-85%

### Team Photos
Export each team member photo at:
- **Small**: 328px width → `team/[name]-small.jpg`
- **Medium**: 400px width → `team/[name]-medium.jpg`

Files needed:
- `team/john-joshen-small.jpg` & `team/john-joshen-medium.jpg`
- `team/jenny-taupe-small.jpg` & `team/jenny-taupe-medium.jpg`
- `team/raz-blobar-small.jpg` & `team/raz-blobar-medium.jpg`
- `team/karen-chad-small.jpg` & `team/karen-chad-medium.jpg`

### Destination Images
Export each destination at:
- **Small**: 321px width → `destinations/[name]-small.jpg`
- **Medium**: 400px width → `destinations/[name]-medium.jpg`

Files needed:
- `destinations/santorini-small.jpg` & `destinations/santorini-medium.jpg`
- `destinations/maldives-small.jpg` & `destinations/maldives-medium.jpg`
- `destinations/valley-of-fire-small.jpg` & `destinations/valley-of-fire-medium.jpg`
- `destinations/tulum-small.jpg` & `destinations/tulum-medium.jpg`

### Icons (SVG)
Export as SVG and minify:
- `icons/logo.svg` (node-id: 48:235)
- `icons/hamburger.svg` (node-id: 48:237)
- `icons/clock.svg` (node-id: 48:249)
- `icons/cube.svg` (node-id: 48:254)
- `icons/cloud.svg` (node-id: 48:259)

### Social Media Icons (SVG)
Export from the team cards:
- `icons/facebook.svg`
- `icons/twitter.svg`
- `icons/linkedin.svg`
- `icons/instagram.svg`

## Step 2: Optimize Images

### For JPG files:
Use an image optimizer like:
- **ImageOptim** (Mac)
- **Squoosh** (web-based): https://squoosh.app/
- **TinyJPG**: https://tinyjpg.com/

Target: Reduce file size by 30-50% without visible quality loss

### For SVG files:
Use **SVGOMG**: https://jakearchibald.github.io/svgomg/
- Remove unnecessary metadata
- Minify paths
- Remove comments

## Step 3: Create WebP versions

Convert all JPG files to WebP format:
- Use **Squoosh**: https://squoosh.app/
- Or command line: `cwebp -q 80 input.jpg -o output.webp`

## Final Directory Structure

```
images/
├── banner-small.jpg
├── banner-small.webp
├── banner-medium.jpg
├── banner-medium.webp
├── banner-large.jpg
├── banner-large.webp
├── team/
│   ├── john-joshen-small.jpg
│   ├── john-joshen-small.webp
│   ├── john-joshen-medium.jpg
│   ├── john-joshen-medium.webp
│   ├── jenny-taupe-small.jpg
│   ├── jenny-taupe-small.webp
│   ├── jenny-taupe-medium.jpg
│   ├── jenny-taupe-medium.webp
│   ├── raz-blobar-small.jpg
│   ├── raz-blobar-small.webp
│   ├── raz-blobar-medium.jpg
│   ├── raz-blobar-medium.webp
│   ├── karen-chad-small.jpg
│   ├── karen-chad-small.webp
│   ├── karen-chad-medium.jpg
│   └── karen-chad-medium.webp
├── destinations/
│   ├── santorini-small.jpg
│   ├── santorini-small.webp
│   ├── santorini-medium.jpg
│   ├── santorini-medium.webp
│   ├── maldives-small.jpg
│   ├── maldives-small.webp
│   ├── maldives-medium.jpg
│   ├── maldives-medium.webp
│   ├── valley-of-fire-small.jpg
│   ├── valley-of-fire-small.webp
│   ├── valley-of-fire-medium.jpg
│   ├── valley-of-fire-medium.webp
│   ├── tulum-small.jpg
│   ├── tulum-small.webp
│   ├── tulum-medium.jpg
│   └── tulum-medium.webp
└── icons/
    ├── logo.svg
    ├── hamburger.svg
    ├── clock.svg
    ├── cube.svg
    ├── cloud.svg
    ├── facebook.svg
    ├── twitter.svg
    ├── linkedin.svg
    └── instagram.svg
```

## Image Optimization Targets

- **Banner images**: 100-200KB per file
- **Team photos**: 30-80KB per file
- **Destination photos**: 40-100KB per file
- **SVG icons**: Under 5KB each (minified)

Total page weight target: Under 2MB
