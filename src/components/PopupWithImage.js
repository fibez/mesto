'use strict';

import { Popup } from './Popup.js';

class PopupWithImage extends Popup {
  open(data) {
    super.open();
    this._popup.querySelector('.popup__image').setAttribute('src', data.link);
    this._popup.querySelector('.popup__image').setAttribute('alt', data.name);
    this._popup.querySelector('.popup__image-desription').textContent = data.name;
  }
}

export { PopupWithImage };
