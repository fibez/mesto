'use strict';

import { Popup } from './Popup.js';

class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmitForm, handleResetValidation) {
    super(popupSelector);
    this._handleSubmitForm = handleSubmitForm;
    this._popupInputList = this._popup.querySelectorAll('.popup__input');
    this._popupForm = this._popup.querySelector('.popup__form');
    this._handleResetValidation = handleResetValidation;
    this._saveButtonElement = this._popup.querySelector('.popup__save-button');
    this._defaultButtonText = this._saveButtonElement.textContent;
  }

  _getInputValues() {
    const inputValues = {};

    this._popupInputList.forEach((element) => {
      inputValues[element.id] = element.value;
    });

    return inputValues;
  }

  setInputValues(data) {
    this._popupInputList.forEach((input) => {
      input.value = data[input.id];
    });
  }

  setEventListeners() {
    super.setEventListeners();

    this._popupForm.addEventListener('submit', () => {
      event.preventDefault();
      this._handleSubmitForm(this._getInputValues());
    });
  }

  close() {
    super.close();

    this._popupForm.reset();
    this._handleResetValidation(this._popupForm);
  }

  showDefaultButtonText() {
    this.showButtonText(this._defaultButtonText);
  }

  showButtonText(msg) {
    this._saveButtonElement.textContent = msg;
  }
}

export { PopupWithForm };
