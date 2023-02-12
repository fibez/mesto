'use strict';

class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._popupCloseButton = this._popup.querySelector('.popup__close-button');
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  setEventListeners() {
    this._popup.addEventListener('mousedown', (event) => {
      if (event.target === event.currentTarget || event.target.classList.contains('popup__close-button')) {
        this.close();
      }
    });
  }

  _handleEscClose(event) {
    if (event.key === 'Escape') {
      this.close();
    }
  }
}

export { Popup };
