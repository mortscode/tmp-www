import $ from 'properjs-hobo';

export default class MobileNav {
  constructor(elem) {
    this.$elem = $(elem);
    this.$lines = $('.js-lines');
    this.$mobileMenu = $('.js-mobile-menu');
    this.$htmlBody = $('html body');
    this.isOpen = false;

    this.initialize();
  }

  initialize() {
    this.setState();
  }

  setState() {
    this.$elem.on('click', () => {
      if (this.isOpen) {
        this.closeNav();
      } else {
        this.openNav();
      }
    });
  }

  openNav() {
    this.$lines.addClass('close');
    this.$mobileMenu.addClass('is-open');
    this.$htmlBody.addClass('no-scroll');
    this.isOpen = true;
  }

  closeNav() {
    this.$lines.removeClass('close');
    this.$mobileMenu.removeClass('is-open');
    this.$htmlBody.removeClass('no-scroll');
    this.isOpen = false;
  }
}
