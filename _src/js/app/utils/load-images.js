import $ from 'properjs-hobo';
import ImageLoader from 'properjs-imageloader';

const isElementLoadable = (el) => {
  if (el) {
    const bounds = el.getBoundingClientRect();
    const initialLoad = $(el).data('init-load') ? true : false;
    return (bounds.top < (window.innerHeight + 100) || initialLoad);
  }
};

/* eslint-disable no-param-reassign */
const loadImages = (images, handler) => {
  // Normalize the handler
  handler = (handler || isElementLoadable);

  // Normalize the images
  images = (images);

  return new ImageLoader({
    elements: images,
    property: 'data-img-src',
    executor: handler,
  });
};
/* eslint-enable no-param-reassign */

export default loadImages;
