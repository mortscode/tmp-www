import $ from 'properjs-hobo';

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
      this._getXhr();
    });
  }

  _getXhr() {
    $.ajax({

      url: '/posts/ajax',
      dataType: 'html',
      method: 'GET'

    }).then((response) => {
      const $response = $(response);
      const cutScript = $response.length - 2;
      for(var i = 0; i < cutScript; i++) {
        console.log($response[i]);
        this._appendPosts($response[i]);
      }
    }).catch((error) => {
      console.log('error');
    });
  }

  _appendPosts(data) {
    this.$feed.appendChild(data);
  }
}
