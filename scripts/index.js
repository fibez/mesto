'use strict';

import { initialCards } from './defaultcards.js';
import { validationSettings } from './validationsettings.js';
import { Card } from './components/Card.js';
import { Section } from './components/Section.js';
import { FormValidator } from './components/FormValidator.js';

// ** Попапы **
const popupEditProfileElement = document.querySelector('.popup_type_profile-edit');
const popupAddCardsElement = document.querySelector('.popup_type_cards-add');
const popupGaleryElement = document.querySelector('.popup_type_galery');
// ** Элементы **
const profileElement = document.querySelector('.profile');
const profileNameElement = profileElement.querySelector('.profile__name');
const profileProfessionElement = profileElement.querySelector('.profile__description');
const cardsContainerELement = document.querySelector('.elements');
// ** Формы **
const popupFormEditProfileElement = popupEditProfileElement.querySelector('.popup__form_type_profile-edit');
const popupFormAddCardElement = popupAddCardsElement.querySelector('.popup__form_type_add-card');
// ** Инпуты **
const popupNameInputElement = popupEditProfileElement.querySelector('.popup__input_type_name');
const popupProfessionInputElement = popupEditProfileElement.querySelector('.popup__input_type_profession');
const popupPlaceNameInputElement = popupFormAddCardElement.querySelector('.popup__input_type_place-name');
const popupImgLinkInputElement = popupFormAddCardElement.querySelector('.popup__input_type_img-link');
// ** Кнопки **
const buttonEditElement = profileElement.querySelector('.profile__edit-button');
const buttonAddElement = profileElement.querySelector('.profile__add-button');

const profileEditFormValidation = new FormValidator(validationSettings, popupFormEditProfileElement);
const cardAddFormValidation = new FormValidator(validationSettings, popupFormAddCardElement);

// ** Обработка сабмита формы для новой карточки
function submitCardsAddition(e) {
  e.preventDefault();

  const userData = {
    name: popupPlaceNameInputElement.value,
    link: popupImgLinkInputElement.value,
  };

  newSeoulCards.addItem(createCard(userData));

  closePopup(popupAddCardsElement);
  e.target.reset();
}
// ** Создаем и возвращаем новую карточку
function createCard(data) {
  const userCard = new Card(
    {
      name: data.name,
      link: data.link,
    },
    '#cards-template',
    openPopup
  ).getNewCard();

  return userCard;
}

// ** Открытие попапов
function openPopup(element) {
  element.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEsc);
}

// ** Закрытие через Escape
function closeByEsc(event) {
  if (event.key === 'Escape') {
    const targetedPopup = document.querySelector('.popup_opened');
    closePopup(targetedPopup);
  }
}

// ** Решаем как закрыть попап **
function selectWayToClose(event) {
  if (event.target === event.currentTarget || event.target.classList.contains('popup__close-button')) {
    closePopup(event.currentTarget);
  }
}

// ** Закрываем попап **
function closePopup(target) {
  target.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEsc);
}

// ** Подтягиваем данные из профиля в инпуты
function sendValuesFromProfile() {
  popupNameInputElement.value = profileNameElement.textContent;
  popupProfessionInputElement.value = profileProfessionElement.textContent;
}

// ** Закрываем и сохраняем изменения из формы профиля **
function submitProfileChanges(event) {
  event.preventDefault();

  profileNameElement.textContent = popupNameInputElement.value;
  profileProfessionElement.textContent = popupProfessionInputElement.value;
  closePopup(popupEditProfileElement);
}

// ** Слушатели **
buttonEditElement.addEventListener('click', function () {
  openPopup(popupEditProfileElement);
  sendValuesFromProfile();
  profileEditFormValidation.resetValidation();
});

buttonAddElement.addEventListener('click', function () {
  openPopup(popupAddCardsElement);
});

popupFormEditProfileElement.addEventListener('submit', submitProfileChanges);
popupFormAddCardElement.addEventListener('submit', () => {
  submitCardsAddition(event);
  cardAddFormValidation.resetValidation();
});

popupEditProfileElement.addEventListener('mousedown', selectWayToClose);
popupAddCardsElement.addEventListener('mousedown', selectWayToClose);
popupGaleryElement.addEventListener('mousedown', selectWayToClose);

// ** Запуск валидации
profileEditFormValidation.enableValidation();
cardAddFormValidation.enableValidation();

//
//
//
//    ███╗   ██╗███████╗██╗    ██╗         ██████╗ ██████╗ ██████╗ ███████╗
//    ████╗  ██║██╔════╝██║    ██║        ██╔════╝██╔═══██╗██╔══██╗██╔════╝
//    ██╔██╗ ██║█████╗  ██║ █╗ ██║        ██║     ██║   ██║██║  ██║█████╗
//    ██║╚██╗██║██╔══╝  ██║███╗██║        ██║     ██║   ██║██║  ██║██╔══╝
//    ██║ ╚████║███████╗╚███╔███╔╝        ╚██████╗╚██████╔╝██████╔╝███████╗
//    ╚═╝  ╚═══╝╚══════╝ ╚══╝╚══╝          ╚═════╝ ╚═════╝ ╚═════╝ ╚══════╝
//
//
const newSeoulCards = new Section(
  {
    data: initialCards,
    renderer: (item) => {
      const seoulCardElement = createCard(item);
      newSeoulCards.addItem(seoulCardElement);
    },
  },
  '.elements'
);

newSeoulCards.renderElement(initialCards);
