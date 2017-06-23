import $ from 'properjs-hobo';
import { TweenLite, Power2 } from 'gsap';
import scrollTo from 'gsap/ScrollToPlugin';

export default class ScrollTo {
  constructor(element) {
    this.$elem = $(element);
    this.targetName = $(element).data('scroll-target');
    this.targets = document.getElementsByClassName(`js-scroll-target-${this.targetName}`);
    this.$target = this.targets[0];
    this.speed = $(element).data('scroll-speed') | 1;
    this.bindEvents();

    console.log(this.$target, this.targets);
  }

  bindEvents() {
    this.$elem.on('click', () => {
      this.scrollToElem();
    });
  }

  scrollToElem() {
    TweenLite.to(window, this.speed, { scrollTo: this.$target, ease: Power2.easeOut });
  }
}
