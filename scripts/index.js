"use strict";
//
//
//
const editButtonElement = document.querySelector(".profile__edit-button");
const popupElement = document.querySelector(".popup");
const popupCloseButtonElement = popupElement.querySelector(".popup__close-button");
const popupNameInputElement = popupElement.querySelector(".popup__input_type_name");
const popupProfessionInputElement = popupElement.querySelector(".popup__input_type_profession");
const popupSubmitButton = popupElement.querySelector(".popup__save-button");
const profileName = document.querySelector(".profile__name");
const profileProfession = document.querySelector(".profile__description");
//
//
//
const openPopup = function () {
  popupElement.style.visibility = "visible";
  popupNameInputElement.value = profileName.textContent;
  popupProfessionInputElement.value = profileProfession.textContent;
};

const closePopup = function (event) {
  if (event.target === popupCloseButtonElement || event.target === event.currentTarget) {
    popupElement.style.visibility = "hidden";
  }
};

const submitProfileChanges = function (event) {
  profileName.textContent = popupNameInputElement.value;
  profileProfession.textContent = popupProfessionInputElement.value;
  event.preventDefault();
  closePopup(event);
};
//
//
//
editButtonElement.addEventListener("click", openPopup);
popupCloseButtonElement.addEventListener("click", closePopup);
popupElement.addEventListener("click", closePopup);
popupSubmitButton.addEventListener("click", submitProfileChanges);
