import $ from 'properjs-hobo';
import emitter from '../utils/emitter';

export default class LoadPosts {
  constructor(elem) {
    this.$elem = $(elem);
    this.$feed = $('.post-wrapper')[0];
    this.pageNum = 2;

    this.initialize();
  }

  initialize() {
    this._clickEvents();
  }

  _clickEvents() {
    this.$elem.on('click', (e) => {
      e.preventDefault();
      this._getXhr();
      this.pageNum++;
    });
  }

  _getXhr() {
    $.ajax({
      url: `/posts/ajax/p${this.pageNum}`,
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
