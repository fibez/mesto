'use strict';

import { Popup } from './Popup.js';

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popup.querySelector('.popup__image');
    this._popupImageDescription = this._popup.querySelector('.popup__image-desription');
  }
  open(data) {
    super.open();

    this._popupImage.setAttribute('src', data.link);
    this._popupImage.setAttribute('alt', data.name);
    this._popupImageDescription.textContent = data.name;
  }
}

export { PopupWithImage };
