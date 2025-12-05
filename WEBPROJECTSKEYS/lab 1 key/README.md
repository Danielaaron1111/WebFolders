# DMIT1530 – Web Design Fundamentals II 

## Lab 01: Fluid Web Layout with Maximum-Width Containers

This In-Class Lab is worth 5% of your overall grade.

You must be present in class in order to receive credit. 

## Instructions

Your task is to create a fluid or flexible layout that does not overflow the viewport at smaller sizes (~360px). The content in this layout must also stop growing at a certain size - that is, the content must switch to a maximum-width centred layout. However, even when the content reaches its maximum width, certain things must still span the full width of the viewport, such as background colours and the banner image at the top of the body.

Start by studying the provided screenshots. One screenshot is taken with a narrow viewport and the other with a wide viewport. Although you will need to create a website that behaves in a similar way, do not worry about using the exact same measurements or recreating exactly where each line of text breaks. 

### HTML

Begin by writing and completing your HTML. Make sure to use semantic elements that best describe the content whenever possible. 

Validate your HTML using the W3C HTML Validation Tool. Your HTML must be valid in order to receive a grade for this lab. 

When you have finished your HTML, you may make a commit and begin your CSS.

### CSS: Colour Palette

The following colours are used in this layout:

```CSS
/*
    accent: #ecb731;
    light: #f5f5f5;
    dark: #182222;
*/
```

### CSS: Container

You will need to choose a measurement for when your content container stops growing. Although there is a range of 'correct' answers, as a general rule of thumb, designers like to keep lines of body copy (body text) between 45-80 characters in length for maximum readability. 

When your maximum-width container reaches its largest size, it must be centred within the viewport. 


### CSS: Spacing

All spacing (margins and padding) in this layout are done in increments of 16 pixels (or 1rem). Although your spacing does not have to be an exact match with the provided screenshots, try getting your layout to look as reasonably close to the example as possible. 


### CSS: Typographic Styles

Here are all of the typographic elements you will need and their font sizes (in pixel values):

First-level Heading ------ 40 pixels

Second-level Heading ----- 30 pixels

Third-level Heading ------ 20 pixels

Footer Heading ----------- 20 pixels

Anchor Tag (Faux Button) - 16 pixels

Body Text ---------------- 16 pixels

Warning Paragraph --------- 20 pixels

Your task is to take these absolute values and convert them into relative values. You must use these relative values when declaring your font sizes, not the provided pixel values. 

---

## Marking Guide

You will be awarded five (5) marks for a total of 5% of your overall grade. Your instructor will be checking to make sure that the following tasks are completed.

1. All font sizes are declared using relative units (ex. em or rem). Absolute units (ex. px) are not used.

2. Content is restrained within a centred maximum-width container. This maximum-width container stops growing once the viewport reaches a certain size.

3. Elements such as the banner element and background colours span the entire viewport.

4. All images are flexible. There is no container or viewport overflow.

In addition to these tasks, your solution must look as reasonably close to the provided screenshots as possible. Your solution must also follow all current best practices for the web. 

**Note**: Your HTML and CSS must be valid - that is, your code must pass W3C Validation - in order to receive credit for this Lab. 

For more information on how your Lab will be marked, please refer to the provided marking rubric on Moodle. 