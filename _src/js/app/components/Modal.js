import $ from 'properjs-hobo';

export default class Modal {
  constructor(elem) {
    this.$elem = $(elem);
    this.$modal = $('.js-modal');
    this.$modalContent = $('.js-modal-content');
    this.dataModal = this.$elem.data('modal');

    this.initialize();
  }

  initialize() {
    this._clickEvents();
  }

  _clickEvents() {
    this.$elem.on('click', (e) => {
      e.preventDefault();
      this._emptyContainer();
      this._callXhr();
      this.$modal.addClass('-active');
    });

    this.$modal.on('click', (e) => {
      e.preventDefault();
      this.$modal.removeClass('-active');
    });
  }

  _callXhr() {
    $.ajax({

      url: `/modal-content/${this.dataModal}`,
      dataType: 'html',
      method: 'GET'

    }).then((response) => {
      this._fillContainer(response);
    }).catch((error) => {
      console.log(error);
    });
  }

  _fillContainer(data) {
    const $data = $(data);
    this.$modalContent[0].appendChild($data[0]);
  }

  _emptyContainer() {
    this.$modalContent[0].innerHTML = '';
  }
}
