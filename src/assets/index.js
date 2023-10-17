const previewImage = document.querySelector('[preview-image]');
const signInput = document.querySelector('[sign-input]');
const downloadButton = document.querySelector('[download-button]');

const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
const originalImage = new Image();

/**
 * The settings object for the application.
 *
 * @property {Object} text - The settings for text.
 * @property {string} text.font - The font to use for text.
 * @property {string} text.color - The color to use for text.
 *
 * @property {Object} image - The settings for images.
 * @property {number} image.width - The width for images.
 * @property {number} image.height - The height for images.
 * @property {string} image.format - The format for images.
 * @property {number} image.padding - The padding for images.
 */
const settings = {
  text: {
    font: '32px Arial',
    color: 'white',
  },
  image: {
    width: previewImage.naturalWidth,
    height: previewImage.naturalHeight,
    format: 'image/jpeg',
    padding: 30,
  },
};

/**
 * Truncates the given text to fit within the given maximum width.
 *
 * @param {string} text - The text to truncate.
 * @param {number} [maxWidth=settings.image.maxWidth] - The maximum width to fit the text within.
 * @param {number} [padding=settings.image.padding] - The padding to apply to the text.
 *
 * @returns {string} The truncated text.
 */
const truncateText = (
  text,
  maxWidth = settings.image.width,
  padding = settings.image.padding
) => {
  let truncatedText = text;
  let textWidth = ctx.measureText(truncatedText).width;

  while (textWidth > maxWidth - padding * 2) {
    truncatedText = truncatedText.slice(0, -1);
    textWidth = ctx.measureText(truncatedText).width;
  }

  return truncatedText;
};

/**
 * Creates a new image data URL by drawing an image and text on a canvas.
 *
 * @param {HTMLImageElement} image - The image to draw on the canvas.
 * @param {string} [text=""] - The text to draw on the canvas.
 *
 * @returns {string} The new image data URL.
 */
const createImageData = (image, text = '') => {
  const width = canvas.width;
  const height = canvas.height;

  // Clear canvas
  ctx.clearRect(0, 0, width, height);

  // Draw image
  ctx.drawImage(image, 0, 0, width, height);

  // Draw text
  const textWidth = ctx.measureText(text).width;
  const textPositions = [
    width - textWidth - settings.image.padding,
    height - settings.image.padding,
  ];
  ctx.fillText(text, textPositions[0], textPositions[1]);

  return canvas.toDataURL(settings.image.format);
};

/**
 * Creates a preview image by Canvas.
 *
 * @param {HTMLImageElement} image - The image to draw on the canvas.
 * @param {string} [text=""] - The text to draw on the canvas.
 */
const createPreviewImage = (image, text = '') => {
  if (!text) return downloadButton.removeAttribute('href');

  const imageData = createImageData(image, text);

  previewImage.src = imageData;
  downloadButton.href = imageData;
};

/**
 * Handles the sign input event.
 */
const handleSignInput = () => {
  const isImageLoaded = previewImage.complete;
  const textContent = truncateText(signInput.value);

  if (!isImageLoaded) return;

  createPreviewImage(originalImage, textContent);
};

canvas.width = settings.image.width;
canvas.height = settings.image.height;

ctx.font = settings.text.font;
ctx.fillStyle = settings.text.color;

originalImage.src = previewImage.src;

signInput.addEventListener('input', handleSignInput);
handleSignInput();
