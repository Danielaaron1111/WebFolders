# 10 – Responsive Backgrounds & Image Optimization 

Google provides several recommendations for optimizing images for the web to ensure fast loading times, better performance, and an improved user experience.


## Image File Types

1. **WebP**:
   - **Recommended by Google** as it provides superior compression and quality characteristics compared to older formats like JPEG and PNG.
   - Supports both lossless and lossy compression.
   - Offers transparency (alpha channel) and animation.

2. **JPEG**:
   - Ideal for photographs and images with complex color gradients.
   - Supports lossy compression, which can significantly reduce file size.
   - Recommended to use progressive JPEGs for a better loading experience.

3. **PNG**:
   - Best for images that require transparency or have text, logos, or simple graphics.
   - Supports lossless compression, maintaining high image quality.
   - Can be larger in size compared to JPEG and WebP.

4. **SVG**:
   - Ideal for vector graphics, icons, logos, and illustrations.
   - Scalable without loss of quality.
   - Lightweight and can be manipulated with CSS and JavaScript.

5. **GIF**:
   - Suitable for simple animations.
   - Limited to 256 colors, making it less suitable for photographs.


## Image Sizes

1. **Compression**:
   - Always compress images to reduce file size. Tools like Squoosh or Photoshop can be used.
   - Balance between compression and quality to avoid visibly degraded images.

2. **Dimensions**:
   - Scale images to fit the largest size they will be displayed at. Avoid using excessively large dimensions.
   - If possible, use the exact dimensions needed for specific areas on your website.

3. **Lazy Loading**:
   - Implement lazy loading to defer loading images until they are needed (i.e., when they enter the viewport). This reduces initial page load time.
   - Use the `loading="lazy"` attribute in the `<img>` tag.


### General Guidelines for File Sizes

1. **Hero Images (Large Banners or Backgrounds)**:
   - **Target File Size**: Under 250 KB, ideally between 100-150 KB.
   - **Dimensions**: ~1200-2000 pixels wide, depending on the design and screen resolution.

2. **Standard Images (Content Images)**:
   - **Target File Size**: ~50-80 KB.
   - **Dimensions**: 800-1200 pixels wide, depending on usage.

3. **Thumbnails**:
   - **Target File Size**: 10-20 KB.
   - **Dimensions**: 150-300 pixels wide.

4. **Icons and Small Graphics**:
   - **Target File Size**: Under 10 KB.
   - **Dimensions**: Usually 50-100 pixels wide.

---

## References

Grigorik, I., & Wagner, J. (2018a, August 30). Choose the correct level of compression. web.dev. https://web.dev/articles/compress-images 

Grigorik, I., & Wagner, J. (2018b, August 30). Choose the right image format. web.dev. https://web.dev/articles/choose-the-right-image-format 

Hempenius, K. (2018, November 5). Use webp images. web.dev. https://web.dev/articles/serve-images-webp 