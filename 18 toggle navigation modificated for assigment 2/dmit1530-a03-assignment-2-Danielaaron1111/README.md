[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/BFfn3CdS)
## DMIT1530: Assignment 2

This lab is an individual exercise worth 15% of your overall mark. 

For the complete rubric and Figma wireframe, please refer to your course section's Brightspace instance. 

The following instructions will help you work through the image preparation, HTML, and CSS required to create this website.

## Introduction

This Assignment is a single-page responsive website about a ficticious tartan mill in Glasgow, UK. 

The following techniques and concepts will be covered: 

- embedded (or custom), external, and system fonts

- responsive background images

- image optimisation for the web

- scalable vector graphics & minification

- art direction via the `<picture>` element

- the position property and offset properties (top, left, bottom, right)

- z-index and stacking order

- multi-level navigation with dropdown menus

- mobile toggle or hamburger menus

- concepts previously covered in this course, including current best practices for the web


## Fonts

### Koho Bold

KoHo Bold is a custom font (which will become an embedded font in your website’s styles subdirectory). The original file is available on Brightspace.

In order to use it in Figma, make sure to install the font file on your system. Next, follow the steps in this article: https://help.figma.com/hc/en-us/articles/360039956894-Add-a-font-to-Figma-design

Note: if you are using Figma in a browser, you will need to download the Figma Font Installer. This is covered in the article above.


### Catamaran

Catamaran is an Adobe Typekit Font, which can be added to your website via generated `<link>` elements in the `<head>` of your HTML.

To ensure that everything renders properly, you should install this font.


## Hover, Active, & Focus States

Upon hover: 

- All menu links will change to the green accent colour, including the svg

- All social icons change to the green accent background colour


## Miscellaneous Notes

Layout spacing and distances are measured in half or whole root ephemeral units, following a 16px base system.

Although you may use the size of each frame to determine the minimum widths for your media queries, it is ultimately a judgement call (i.e. you may use different widths if you feel they better serve the provided content).


### Typography

Heading sizes will change in specific breakpoints or media queries. 

Pay close attention to the line heights of various text blocks, as they differ between elements (i.e. not every typographic element uses a line-height of 1.5).


## 