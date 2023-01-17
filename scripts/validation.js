'use strict';

class FormValidator {
  constructor(settings, formElement) {
    this._formElement = formElement;
    this._formSelector = settings.formSelector;
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClassVisible = settings.errorClassVisible;
    this._popupSelector = settings.popupSelector;
    this._openedPopupClass = settings.openedPopupClass;
    this._errorClass = settings.errorClass;
  }
  // Включение валидации
  enableValidation() {
    this._setEventListeners();
  }
  // Сброс валидации для попапа изменения профиля
  resetValidation() {
    if (this._hasInvalidInput) {
      const buttonElement = this._formElement.querySelector(this._submitButtonSelector);
      const errorElementList = Array.from(this._formElement.querySelectorAll(this._errorClass));
      const inputElementList = Array.from(this._formElement.querySelectorAll(this._inputSelector));

      errorElementList.forEach((element) => {
        if (element.classList.contains(this._errorClassVisible)) {
          element.classList.remove(this._errorClassVisible);
          element.textContent = '';
        }
      });

      inputElementList.forEach((element) => {
        if (element.classList.contains(this._inputErrorClass)) {
          element.classList.remove(this._inputErrorClass);
        }
      });

      buttonElement.classList.remove(this._inactiveButtonClass);
      buttonElement.removeAttribute('disabled');
    }
  }
  // Проставляем слушатели на инпуты формы
  _setEventListeners() {
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._submitButton = this._formElement.querySelector(this._submitButtonSelector);

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(this._inputList, this._submitButton);
      });
    });
  }
  // Проверка валидности инпутов
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }
  // Отображение сообщений об ошибках
  _showInputError(inputElement, validationMessage) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);

    errorElement.textContent = validationMessage;
    errorElement.classList.add(this._errorClassVisible);

    inputElement.classList.add(this._inputErrorClass);
  }
  // Скрытие ошибок
  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);

    errorElement.textContent = '';
    errorElement.classList.remove(this._errorClassVisible);

    inputElement.classList.remove(this._inputErrorClass);
  }
  // Выставление состояния кнопок
  _toggleButtonState(inputList, submitButton) {
    if (this._hasInvalidInput(inputList)) {
      submitButton.classList.add(this._inactiveButtonClass);
      submitButton.setAttribute('disabled', '');
    } else {
      submitButton.classList.remove(this._inactiveButtonClass);
      submitButton.removeAttribute('disabled');
    }
  }
  // Проверка на наличие невалидных инпутов
  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }
}

export { FormValidator };
