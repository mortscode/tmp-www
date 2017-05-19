import emitter from '../utils/emitter';

export default class ScrollElems {

  constructor($elem) {
    this.$elem = $elem;
    this.topTrigger = $elem.data('offset');
    this.intTrigger = $elem.data('int-offset');
    this.triggerLocation = null;
    this.winHeight = window.innerHeight;
    this.enterWindow = this.winHeight - 50;
    this.topOffset = null;

    this.initialize();
  }

  initialize() {
    this._offset();
    this._activate();

    emitter.on('app--scroll', () => {
      this._activate();
    });

    emitter.on('app--resizer', () => {
      this._resizeEvents();
    });
  }

  _offset() {
    if (this.topTrigger) {
      this.triggerLocation = this.winHeight * this.topTrigger;
    } else if (this.intTrigger) {
      this.triggerLocation = this.intTrigger;
    } else {
      this.triggerLocation = this.enterWindow;
    }
  }

  _activate() {
    this.topOffset = this.$elem[0].getBoundingClientRect().top;

    if (this.topOffset <= this.triggerLocation) {
      this.$elem.addClass('active');
    }
    // } else {
    //   this.$elem.removeClass('active');
    // }
  }

  _resizeEvents() {
    this.winHeight = window.innerHeight;
    this._offset();
    this._activate();
  }
}
