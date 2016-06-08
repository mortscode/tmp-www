import $ from 'properjs-hobo';
import emitter from '../utils/emitter';

export default class LoadPosts {
  constructor(elem) {
    this.$elem = $(elem);
    this.$feed = document.getElementById('home-posts');

    this.initialize();
  }

  initialize() {
    this._clickEvents();
  }

  _clickEvents() {
    this.$elem.on('click', (e) => {
      e.preventDefault();
      this._getXhr(this._reloadPosts.bind(this));
    });
  }

  _getXhr(callback) {
    $.ajax({

      url: '/posts/ajax',
      dataType: 'html',
      method: 'GET'

    }).then((response) => {
      const $response = $(response);
      const cutScript = $response.length - 2;
      for (let i = 0; i < cutScript; i++) {
        this._appendPosts($response[i]);
      }
      callback();
    }).catch((error) => {
      console.log(`error: ${error}`);
    });
  }

  _appendPosts(data) {
    this.$feed.appendChild(data);
  }

  _reloadPosts() {
    emitter.fire('app--reload-posts');
  }
}
