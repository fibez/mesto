'use strict';

import { Popup } from './Popup.js';

class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmitForm, handleResetValidation) {
    super(popupSelector);
    this._handleSubmitForm = handleSubmitForm;
    this._popupInputList = this._popup.querySelectorAll('.popup__input');
    this._popupForm = this._popup.querySelector('.popup__form');
    this._handleResetValidation = handleResetValidation;
  }

  open() {
    super.open();
  }

  _getInputValues() {
    const inputValues = {};

    this._popupInputList.forEach((element) => {
      inputValues[element.name] = element.value;
    });

    return inputValues;
  }

  setEventListeners() {
    super.setEventListeners();

    this._popupForm.addEventListener('submit', () => {
      event.preventDefault();
      this._handleSubmitForm(this._getInputValues());
      this.close();
    });
  }

  close() {
    super.close();
    this._popupForm.reset();
    this._handleResetValidation(this._popupForm);
  }
}

export { PopupWithForm };
