'use strict';

const validationSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactive',
  inputErrorClass: 'popup__input_invalid',
  errorClassVisible: 'popup__error_visible',
  popupSelector: '.popup',
  openedPopupClass: 'popup_opened',
  errorClass: '.popup__error',
};

// ** Функция запуска виладации
function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));

  formList.forEach(function (formElement) {
    setEventListeners(config, formElement);
  });
}

// ** Каждому инпуту устанавливаем слушатели
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

// ** Проверяем валидность инпута и вызываем функции отображения и скрытия ошибок
function checkInputValidity(config, formElement, inputELement) {
  if (!inputELement.validity.valid) {
    showInputError(config, formElement, inputELement, inputELement.validationMessage);
  } else {
    hideInputError(config, formElement, inputELement);
  }
}

// ** Показываем ошибку
function showInputError(config, formElement, inputELement, validationMessage) {
  const errorElement = formElement.querySelector(`#${inputELement.id}-error`);

  errorElement.textContent = validationMessage;
  errorElement.classList.add(config.errorClassVisible);

  inputELement.classList.add(config.inputErrorClass);
}

// ** Скрываем ошибку
function hideInputError(config, formElement, inputELement) {
  const errorElement = formElement.querySelector(`#${inputELement.id}-error`);

  errorElement.textContent = '';
  errorElement.classList.remove(config.errorClassVisible);

  inputELement.classList.remove(config.inputErrorClass);
}

// ** В зависимости от валидности инпута устанавливаем необходимое состояние для кнопки сбамита
function toggleButtonState(config, inputList, submitButton) {
  if (hasInvalidInput(inputList)) {
    submitButton.classList.add(config.inactiveButtonClass);
    submitButton.setAttribute('disabled', '');
  } else {
    submitButton.classList.remove(config.inactiveButtonClass);
    submitButton.removeAttribute('disabled');
  }
}

// ** Проверка на наличие невалидного инпута
function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

// ** Сброс валидации для попапа редактирования профиля при закрытии и повторном открытии
function resetValidation(config, target) {
  const buttonElement = target.querySelector(config.submitButtonSelector);
  const errorElementList = Array.from(target.querySelectorAll(config.errorClass));
  const inputElementList = Array.from(target.querySelectorAll(config.inputSelector));

  errorElementList.forEach(function (element) {
    if (element.classList.contains('popup__error_visible')) {
      element.classList.remove('popup__error_visible');
      element.textContent = '';
    }
  });

  inputElementList.forEach(function (element) {
    if (element.classList.contains('popup__input_invalid')) {
      element.classList.remove('popup__input_invalid');
    }
  });

  buttonElement.classList.remove('popup__save-button_inactive');
  buttonElement.removeAttribute('disabled');
}

// ** Запсукаем все это
enableValidation(validationSettings);

export { resetValidation, hasInvalidInput, validationSettings, toggleButtonState };
