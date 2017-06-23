import $ from 'properjs-hobo';
import avoidOrphan from './utils/avoid-orphan';
import loadImages from './utils/load-images';
import emitter from './utils/emitter';
import scroller from './utils/scroller';
import ScrollTo from './utils/scroll-to';
import resizer from './utils/resizer';
import SearchButton from './components/SearchButton';
import MobileNav from './components/MobileNav';
import Navigation from './components/Navigation';
import Search from './components/Search';
import ScrollElems from './components/ScrollElems';

export default class App {
  constructor() {
    this.$lazyImgs = $('.js-lazy-img');
    this.$scrolls = $('.js-scrolls');
    this.$scrollTos = $('.js-scroll-to');
    this.$orphans = $('.js-avoid-orphan');
    this.orphanArray = [];
    this.initialize();
  }

  initialize() {
    this.searchButton = new SearchButton('.js-search-icon');
    this.mobileNav = new MobileNav('.js-nav-button');
    this.navigation = new Navigation('.js-navigation');
    this.search = new Search('.js-search');
    loadImages(this.$lazyImgs);
    this._bindEvents();
    this._mapOrphans();
    this._mapScrolls();
    this._mapScrollTos();
    this._printRecipe();
  }

  _bindEvents() {
    scroller.on('scroll', () => {
      emitter.fire('app--scroll');
    });

    resizer.on('resize', () => {
      emitter.fire('app--resizer');
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

  _mapScrollTos() {
    this.$scrollTos.each((elem, i) => {
      const $elem = $(this.$scrollTos[i]);
      $elem.data('scrollTo', new ScrollTo($elem));
    });
  }

  _printRecipe() {
    $('.js-print-recipe').on('click', (e) => {
      e.preventDefault();
      window.print();
    });
  }
}
