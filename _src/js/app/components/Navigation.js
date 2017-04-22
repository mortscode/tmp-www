import $ from 'properjs-hobo';

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

    document.addEventListener('keydown', (e) => {
      if (e.keyCode === 27) {
        this._closeNav();
      }
    });
  }

  _openNav() {
    this.$navigation.addClass('-active');
  }

  _closeNav() {
    this.$navigation.removeClass('-active');
  }
}
