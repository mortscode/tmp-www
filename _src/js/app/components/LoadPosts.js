import $ from 'properjs-hobo';
import emitter from '../utils/emitter';

export default class LoadPosts {
  constructor(elem) {
    this.$elem = $(elem);
    this.$feed = $('.post-wrapper')[0];
    this.nextPageUrl = this.$elem.data('next-page');

    this.initialize();
  }

  initialize() {
    this._clickEvents();
  }

  _clickEvents() {
    this.$elem.on('click', (e) => {
      e.preventDefault();
      this._getXhr();
    });
  }

  _getXhr() {
    $.ajax({
      url: `/posts/ajax/${this.nextPageUrl}`,
      dataType: 'html',
      method: 'POST'
    }).then((response) => {
      const frag = document.createDocumentFragment();
      $(response).forEach((el) => {
        if (el.tagName === 'ARTICLE' || el.tagName === 'DIV') {
          frag.appendChild(el);
        }
      });
      this.$feed.appendChild(frag);
      emitter.fire('app--reload-posts');
    }).catch((error) => {
      console.log(`error: ${error}`);
    });
  }
}
