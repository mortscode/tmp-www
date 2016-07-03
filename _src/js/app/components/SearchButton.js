import $ from 'properjs-hobo';

export default class SearchButton {
  constructor(elem) {
    this.$elem = $(elem);
    this.$searchForm = $('.js-search-form');
    this.$searchField = $('.js-search');
    this.search = document.getElementById('js-search');
    this.$headerlogo = $('.js-header-logo');
    this.isOpen = false;

    this.initialize();
  }

  initialize() {
    this.setState();
  }

  setState() {
    this.$elem.on('click', () => {
      if (this.isOpen) {
        this.hideSearch();
      } else {
        this.showSearch();
      }
    });
  }

  showSearch() {
    this.$searchForm.addClass('is-open');
    this.search.focus();
    this.$headerlogo.addClass('hide');
    this.$elem.addClass('close');
    this.isOpen = true;
  }

  hideSearch() {
    this.$searchForm.removeClass('is-open');
    this.$headerlogo.removeClass('hide');
    this.$elem.removeClass('close');
    this.isOpen = false;
  }
}
