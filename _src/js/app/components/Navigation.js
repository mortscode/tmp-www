import $ from 'properjs-hobo';
import emitter from '../utils/emitter';

export default class Navigation {
  constructor(elem) {
    this.$navigation = $(elem);
    this.$navOpen = $('.js-nav-open');
    this.$navClose = $('.js-nav-close');

    this.initialize();
  }

  initialize() {
    this._bindEvents();
  }

  _bindEvents() {
    this.$navOpen.on('click', () => {
      this._openNav();
    });

    this.$navClose.on('click', () => {
      this._closeNav();
    });
  }

  _attachEvents() {
    window.addEventListener('keyup', this._keyUpHandler.bind(this));
  }

  _detachEvents() {
    window.removeEventListener('keyup', this._keyUpHandler);
  }

  _keyUpHandler(event) {
    if (event.keyCode === 27) {
      this._closeNav();
    }
  }

  _openNav() {
    this.$navigation.addClass('-active');
    this._attachEvents();
    emitter.fire('app--nav-open');
  }

  _closeNav() {
    this.$navigation.removeClass('-active');
    this._detachEvents();
    emitter.fire('app--nav-closed');
  }
}
