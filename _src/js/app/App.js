import $ from 'properjs-hobo';
import avoidOrphan from './utils/avoid-orphan';
import loadImages from './utils/load-images';
import emitter from './utils/emitter';
import scroller from './utils/scroller';
import resizer from './utils/resizer';
import SearchButton from './components/SearchButton';
import LoadPosts from './components/LoadPosts';
import MobileNav from './components/MobileNav';
import Navigation from './components/Navigation';
import ScrollElems from './components/ScrollElems';
import Modal from './components/Modal';

export default class App {
  constructor() {
    this.$lazyImgs = $('.js-lazy-img');
    this.$loadMore = $('.js-load-posts');
    this.$scrolls = $('.js-scrolls');
    this.$modals = $('.js-modal-init');
    this.$loadPosts = $('.js-load-posts');
    this.$orphans = $('.js-avoid-orphan');
    this.orphanArray = [];
    this.initialize();
  }

  initialize() {
    this.searchButton = new SearchButton('.js-search-icon');
    this.mobileNav = new MobileNav('.js-nav-button');
    this.navigation = new Navigation('.js-navigation');
    loadImages(this.$lazyImgs);
    this._bindEvents();
    this._mapLoadPosts();
    this._mapModals();
    this._mapOrphans();
    this._mapScrolls();
    this._printRecipe();
  }

  _bindEvents() {
    scroller.on('scroll', () => {
      emitter.fire('app--scroll');
    });

    resizer.on('resize', () => {
      emitter.fire('app--resizer');
    });

    emitter.on('app--reload-posts', () => {
      this.$scrolls = $('.js-scrolls');
      this.$lazyImgs = $('.js-lazy-img');
      this._mapScrolls();
      loadImages(this.$lazyImgs);
    });
  }

  _mapLoadPosts() {
    this.$loadPosts.each((elem, i) => {
      const $elem = $(this.$loadPosts[i]);
      $elem.data('loadPosts', new LoadPosts($elem));
    });
  }

  _mapModals() {
    this.$modals.each((elem, i) => {
      const $elem = $(this.$modals[i]);
      $elem.data('modals', new Modal($elem));
    });
  }

  _mapScrolls() {
    this.$scrolls.each((elem, i) => {
      const $elem = $(this.$scrolls[i]);
      $elem.data('scrolls', new ScrollElems($elem));
    });
  }

  _mapOrphans() {
    this.$orphans.each((elem) => {
      this.orphanArray.push(elem);
    });
    this.orphanArray.map((orphan) => {
      avoidOrphan(orphan);
    });
  }

  _printRecipe() {
    $('.js-print-recipe').on('click', (e) => {
      e.preventDefault();
      window.print();
    });
  }
}
