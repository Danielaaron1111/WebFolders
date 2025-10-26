[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/x3WNNLYl)
# DMIT1530: Assignment 1

This lab is an idividual exercise worth 20% of your overall mark. 

For the complete rubric and Figma wireframe, please refer to your course section's Brightspace instance. 

The following instructions will help you work through the HTML and CSS required to create this website.

## Introduction

For this lab, you will build a three-page website with a responsive layout. The topic is a fictitious architectural firm. It will will assess the following concepts:

1. How to structure markup for flexbox layouts. 

2. CSS properties for the flex container (the parent element).

3. CSS properties for flex items (the direct child elemnts).

4. Relative Units

5. Advanced CSS Selectors

6. Fluid Web Design and Maximum-Width Containers

7. Media Queries and Responsive Web Design

---

## HTML

Before adding any styles, you must mark-up all of your content. Begin by filling in the meta information in the &lt;head&gt; of each HTML document; remember to give a unique &lt;title&gt; and description for each page. Then, start building your &lt;body&gt; by pasting all of the content from the **website-content markdown file** into your HTML files, semantically marking them up, and adding appropriate sectioning elements.


### Navigation & Footer

The top-level navigation and footer will be identical on every page of your website. 

All of the links referencing other pages on the website should be fully functional; however, links to external resources (mail clients, maps, telephone numbers, etc.) may use placeholder characters (#).


### Validation

Your HTML must **validate without any errors**; however, a warning that your website uses filler text rather than English is acceptable.


### Media Queries

As you work through the media queries for each page, be mindful of the specificity and scope of your selectors.

You should have a minimum of two media queries, for a total of three 'views' or layouts. You will *need to choose* which breakpoints (i.e. which minimum widths) achieve the look, feel, and functionality of the website in your provided screenshots. 

When defining padding and margins, do not fixate on a pixel-perfect measurement. Instead, focus on making sure that the layout is fluid and looks good at any viewport width. Do this by utilising relative units and flexbox properties such as ``justify-content`` and ``align-items``.


#### A Note on Your Maximum-Width Layouts

At your largest breakpoint or view, your layout should switch to a maximum-width centred layout.

Even when you switch to a maximum-width layout, your background colours and background images should span the entire width of the viewport. 


#### A Hint About Differentiating Page Layouts

If you find that you are having difficulty differentiating between each page with a single stylesheet, try adding a unique class to a high-level element and using this class in your selector statements. 


typography {
header {
klinika = roboto bold 50 is an anchor tag inside an h1 

nav> ul>li>a>href>home, about contact and our doctors > typhography open sans, regular 20, auto 

h2 > good health is the root of all happiness roboto black 64 ayti 

}
