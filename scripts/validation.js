'use strict';

const validationSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactive',
  inputErrorClass: 'popup__input_invalid',
  errorClass: 'popup__error_visible',
  popupSelector: '.popup',
  openedPopupClass: 'popup_opened',
};

function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));

  formList.forEach(function (formElement) {
    setEventListeners(config, formElement);
  });
}

function setEventListeners(config, formElement) {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const submitButton = formElement.querySelector(config.submitButtonSelector);

  inputList.forEach(function (inputELement) {
    inputELement.addEventListener('input', function () {
      checkInputValidity(config, formElement, inputELement);
      toggleButtonState(config, inputList, submitButton);
    });
  });
}

function checkInputValidity(config, formElement, inputELement) {
  if (!inputELement.validity.valid) {
    showInputError(config, formElement, inputELement, inputELement.validationMessage);
  } else {
    hideInputError(config, formElement, inputELement);
  }
}

function showInputError(config, formElement, inputELement, validationMessage) {
  const errorElement = formElement.querySelector(`#${inputELement.id}-error`);

  errorElement.textContent = validationMessage;
  errorElement.classList.add(config.errorClass);

  inputELement.classList.add(config.inputErrorClass);
}

function hideInputError(config, formElement, inputELement) {
  const errorElement = formElement.querySelector(`#${inputELement.id}-error`);

  errorElement.textContent = '';
  errorElement.classList.remove(config.errorClass);

  inputELement.classList.remove(config.inputErrorClass);
}

function toggleButtonState(config, inputList, submitButton) {
  if (hasInvalidInput(inputList)) {
    submitButton.classList.add(config.inactiveButtonClass);
    submitButton.setAttribute('disabled', '');
  } else {
    submitButton.classList.remove(config.inactiveButtonClass);
    submitButton.removeAttribute('disabled');
  }
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

enableValidation(validationSettings);
