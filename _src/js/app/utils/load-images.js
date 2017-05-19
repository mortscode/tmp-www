import $ from 'properjs-hobo';
import ImageLoader from 'properjs-imageloader';

/**
 *
 * @description Module onImageLoadHander method, handles event
 * @method isElementLoadable
 * @param {object} el The DOMElement to check the offset of
 * @memberof util
 * @return {boolean}
 *
 */
const isElementLoadable = (el) => {
  if (el) {
    const bounds = el.getBoundingClientRect();
    return (bounds.top < (window.innerHeight + 50));
  }
};

/**
 *
 * @description Fresh query to lazyload images on page
 * @method loadImages
 * @param {object} images Optional collection of images to load
 * @param {function} handler Optional handler for load conditions
 * @memberof util
 * @return {instance}
 *
 */

/* eslint-disable no-param-reassign */
const loadImages = (images, handler) => {
  // Normalize the handler
  handler = (handler || isElementLoadable);

  // Normalize the images
  images = (images || $('.js-lazy-image'));

  return new ImageLoader({
    elements: images,
    property: 'data-img-src',
    executor: handler
  });
};
/* eslint-enable no-param-reassign */

export default loadImages;
