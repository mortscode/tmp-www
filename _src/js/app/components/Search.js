import $ from 'properjs-hobo';

export default class Search {
  constructor(elem) {
    this.$search = $(elem);
    this.$searchOpen = $('.js-search-open');
    this.$searchClose = $('.js-search-close');
    this.$searchInput = document.querySelector('.js-search-input');
    this.searchOpen = false;

    this.initialize();
  }

  initialize() {
    this._bindEvents();
  }

  _bindEvents() {
    this.$searchOpen.on('click', () => {
      this._openSearch();
    });

    this.$searchClose.on('click', () => {
      this._closeSearch();
    });

    window.addEventListener('keyup', this._inputHandler.bind(this));
  }

  _attachEvents() {
    window.addEventListener('keyup', this._escapeHandler.bind(this));
  }

  _detachEvents() {
    window.removeEventListener('keyup', this._escapeHandler.bind(this));
  }

  _inputHandler(event) {
    if (!this.searchOpen && event.keyCode >= 65 && event.keyCode <= 90) {
      this.$searchInput.value = event.key;
      this._openSearch();
    }
  }

  _escapeHandler(event) {
    if (this.searchOpen && event.keyCode === 27) {
      this._closeSearch();
    }
  }

  _openSearch() {
    this.$search.addClass('-active');
    this.$searchInput.focus();
    this._attachEvents();
    this.searchOpen = true;
  }

  _closeSearch() {
    this.$search.removeClass('-active');
    this._detachEvents();
    this.searchOpen = false;
  }
}
