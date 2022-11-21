'use strict';
//
//
//
const editButtonElement = document.querySelector('.profile__edit-button');
const popupElement = document.querySelector('.popup');
const popupCloseButtonElement = popupElement.querySelector('.popup__close-button');
const popupNameInputElement = popupElement.querySelector('.popup__input_type_name');
const popupProfessionInputElement = popupElement.querySelector('.popup__input_type_profession');
const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__description');
const popupFormElement = popupElement.querySelector('.popup__form');
//
//
//
//
const openPopup = function () {
  popupElement.classList.add('popup_opened');
  popupNameInputElement.value = profileName.textContent;
  popupProfessionInputElement.value = profileProfession.textContent;
};

const closePopup = function (event) {
  if (event.target === popupCloseButtonElement || event.target === event.currentTarget) {
    popupElement.classList.remove('popup_opened');
  }
};

const submitProfileChanges = function (event) {
  if (popupNameInputElement.value !== '' && popupProfessionInputElement.value !== '') {
    profileName.textContent = popupNameInputElement.value;
    profileProfession.textContent = popupProfessionInputElement.value;
    closePopup(event);
  }
  event.preventDefault();
};
//
//
//
editButtonElement.addEventListener('click', openPopup);
popupCloseButtonElement.addEventListener('click', closePopup);
popupElement.addEventListener('click', closePopup);
popupFormElement.addEventListener('submit', submitProfileChanges);
