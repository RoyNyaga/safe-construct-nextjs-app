/**
 * Compresses an image file client-side using a canvas.
 * Resizes the image to fit within maxWidth and maxHeight (maintaining aspect ratio),
 * and compresses it using JPEG format at the specified quality.
 *
 * @param file The original image file
 * @param options Compression options
 * @returns A promise that resolves to the compressed File, or the original File if compression fails or yields a larger file.
 */
export function compressImage(
  file: File,
  options = { maxWidth: 1920, maxHeight: 1920, quality: 0.85 }
): Promise<File> {
  return new Promise((resolve) => {
    // Only compress image files that are standard web images (excluding gifs to preserve animation)
    if (!file.type.startsWith('image/') || file.type === 'image/gif') {
      return resolve(file);
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        // Scale down if either dimension exceeds the maximum allowed
        if (width > options.maxWidth || height > options.maxHeight) {
          const widthRatio = options.maxWidth / width;
          const heightRatio = options.maxHeight / height;
          const bestRatio = Math.min(widthRatio, heightRatio);

          width = Math.round(width * bestRatio);
          height = Math.round(height * bestRatio);
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          return resolve(file);
        }

        // Draw a white background first to handle transparency in PNGs gracefully
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, width, height);

        // Draw the image scaled to the canvas size
        ctx.drawImage(img, 0, 0, width, height);

        // Compress as image/jpeg
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              return resolve(file);
            }

            // Only use the compressed version if it actually reduces the file size
            if (blob.size < file.size) {
              // Create a new File from the blob with the original name
              // (keeping original name, but we can append/change extension to .jpg or keep it)
              const compressedFile = new File([blob], file.name, {
                type: 'image/jpeg',
                lastModified: Date.now(),
              });
              resolve(compressedFile);
            } else {
              resolve(file);
            }
          },
          'image/jpeg',
          options.quality
        );
      };
      img.onerror = () => {
        // Fallback to original file on load error
        resolve(file);
      };
      img.src = event.target?.result as string;
    };
    reader.onerror = () => {
      // Fallback to original file on read error
      resolve(file);
    };
    reader.readAsDataURL(file);
  });
}
