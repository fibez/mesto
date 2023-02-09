'use strict';

import { initialCards } from './components/initialCards.js';
import { Card } from './components/Card.js';
import { Section } from './components/Section.js';
import { UserInfo } from './components/UserInfo.js';
import { PopupWithForm } from './components/PopupWithForm.js';
import { PopupWithImage } from './components/PopupWithImage.js';
//
//
//
const popupEditProfileElement = document.querySelector('.popup_type_profile-edit');
const profileElement = document.querySelector('.profile');
const popupNameInputElement = popupEditProfileElement.querySelector('.popup__input_type_name');
const popupProfessionInputElement = popupEditProfileElement.querySelector('.popup__input_type_profession');
const buttonEditElement = profileElement.querySelector('.profile__edit-button');
const buttonAddElement = profileElement.querySelector('.profile__add-button');
//
//
//
function submitCardAddition(inputValues) {
  const userData = {
    name: inputValues['cards-input-place-name'],
    link: inputValues['cards-input-img-link'],
  };

  cardElement.addItem(createCard(userData));
  cardAddFormValidation.resetValidation();
}

function createCard({ name, link }) {
  const userData = {
    name: name,
    link: link,
  };

  const userCard = new Card(userData, '#cards-template', handleCardClick).getNewCard();

  return userCard;
}

function sendValuesFromProfile({ name, description }) {
  popupNameInputElement.value = name;
  popupProfessionInputElement.value = description;
}

function submitProfileChanges(inputValues) {
  userInfo.setUserInfo(inputValues);
}

function handleResetValidation() {
  cardAddFormValidation.resetValidation();
}

function handleCardClick(data) {
  popupGalery.open(data);
}
//
//
//
// Карточка
const cardElement = new Section(
  {
    data: initialCards,
    renderer: (item) => {
      const seoulCardElement = createCard(item);
      cardElement.addItem(seoulCardElement);
    },
  },
  '.elements'
);

cardElement.renderElement(initialCards);

// Попапы с формой
const popupAddCard = new PopupWithForm('.popup_type_cards-add', submitCardAddition);
popupAddCard.setEventListeners();

const popupEditProfile = new PopupWithForm('.popup_type_profile-edit', submitProfileChanges, handleResetValidation);
popupEditProfile.setEventListeners();
// Попап без формы, но с красивой кратинкой
const popupGalery = new PopupWithImage('.popup_type_galery');
popupGalery.setEventListeners();
// Отображение информации о пользователе
const userInfo = new UserInfo({ name: '.profile__name', description: '.profile__description' });
//
//
// Слушатели на две кнопки в хэдере
buttonAddElement.addEventListener('click', function () {
  popupAddCard.open();
});

buttonEditElement.addEventListener('click', () => {
  sendValuesFromProfile(userInfo.getUserInfo());
  popupEditProfile.open();
});
