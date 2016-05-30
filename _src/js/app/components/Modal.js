import $ from 'properjs-hobo';

export default class Modal {
  constructor(elem) {
    this.$elem = $(elem);
    this.$modal = $('.js-modal');
    this.$close = $('.js-modal-close');
    this.$modalContent = $('.js-modal-content');
    this.dataModal = this.$elem.data('modal');

    this.initialize();
  }

  initialize() {
    this._clickEvents();

    // setTimeout(() => {
    //   this._callXhr('newsletter');
    // }, 1000);
  }

  _clickEvents() {
    this.$elem.on('click', (e) => {
      e.preventDefault();
      this._emptyContainer();
      this._callXhr(this.dataModal);
    });

    this.$close.on('click', (e) => {
      e.preventDefault();
      this.$modal.removeClass('-active');
    });
  }

  _callXhr(modal) {
    $.ajax({

      url: `/modal-content/${modal}`,
      dataType: 'html',
      method: 'GET'

    }).then((response) => {
      this._fillContainer(response);
      // >>>>> how do I handle this?
      setTimeout(() => {
        this._showModal();
      }, 250);
    }).catch((error) => {
      this._fillContainer(error);
    });
  }

  _fillContainer(data) {
    const $data = $(data);
    this.$modalContent[0].appendChild($data[0]);
  }

  _emptyContainer() {
    this.$modalContent[0].innerHTML = '';
  }

  _showModal() {
    this.$modal.addClass('-active');
  }
}
