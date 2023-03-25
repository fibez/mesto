'use strict';

import css from '../pages/index.css';

import { validationSettings } from '../utils/constants.js';
import { Card } from '../components/Card.js';
import { Section } from '../components/Section.js';
import { UserInfo } from '../components/UserInfo.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { FormValidator } from '../components/FormValidator.js';
import { Api } from '../components/Api';
import { PopupWithSubmit } from '../components/PopupWithSubmit';

const popupEditProfileElement = document.querySelector('.popup_type_profile-edit');
const popupAddCardElement = document.querySelector('.popup_type_cards-add');
const popupEditAvatarElement = document.querySelector('.popup_type_edit-avatar');
const formEditProfile = popupEditProfileElement.querySelector('.popup__form_type_profile-edit');
const formAddCard = popupAddCardElement.querySelector('.popup__form_type_add-card');
const formEditAvatar = popupEditAvatarElement.querySelector('.popup__form_type_edit-avatar');
const profileElement = document.querySelector('.profile');
const buttonEditElement = profileElement.querySelector('.profile__edit-button');
const buttonAddElement = profileElement.querySelector('.profile__add-button');
const buttonEditAvatar = profileElement.querySelector('.profile__avatar-button');

const validationEditProfile = new FormValidator(validationSettings, formEditProfile);
const validationAddCard = new FormValidator(validationSettings, formAddCard);
const validationEditAvatar = new FormValidator(validationSettings, formEditAvatar);

validationEditProfile.enableValidation();
validationAddCard.enableValidation();
validationEditAvatar.enableValidation();

const popupAddCard = new PopupWithForm('.popup_type_cards-add', submitCardAddition, handleResetAddCardValidation);
const popupEditAvatar = new PopupWithForm('.popup_type_edit-avatar', submitEditAvatar, handleResetEditAvatarValidation);
const popupRemoveCard = new PopupWithSubmit('.popup_type_remove-card', submitRemoveCard);
const popupGalery = new PopupWithImage('.popup_type_galery');
const popupEditProfile = new PopupWithForm(
  '.popup_type_profile-edit',
  submitProfileChanges,
  handleResetEditProfileValidation
);
const userInfo = new UserInfo({
  name: '.profile__name',
  description: '.profile__description',
  avatar: '.profile__avatar',
});

popupEditProfile.setEventListeners();
popupEditAvatar.setEventListeners();
popupGalery.setEventListeners();
popupRemoveCard.setEventListeners();
popupAddCard.setEventListeners();

const api = new Api('https://mesto.nomoreparties.co/v1/cohort-59', '3a99dc75-7908-4d48-95a2-7baec3f5e64d');

Promise.all([api.getCards(), api.getUserInfo()])
  .then(([usersCards, userData]) => {
    userInfo.setUserInfo(userData);
    cardElement.renderElement(usersCards.reverse());
  })
  .catch((error) => {
    console.log(error);
  });

function submitCardAddition(inputValues) {
  const userCard = {
    name: inputValues['place-name'],
    link: inputValues['img-link'],
  };

  popupAddCard.showButtonText('Сохранение...');
  Promise.resolve(api.addNewCard(userCard))
    .then((res) => {
      popupAddCard.showButtonText('Сохранено!');
      cardElement.addItem(createCard(res));
      popupAddCard.close();
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      popupAddCard.showDefaultButtonText();
    });
}

function submitProfileChanges(inputValues) {
  const userData = {
    name: inputValues['profile-name'],
    about: inputValues['profile-profession'],
  };
  popupEditProfile.showButtonText('Сохранение...');
  Promise.resolve(api.updateUserInfo(userData))
    .then((res) => {
      userInfo.setUserDescription(res);
      popupEditProfile.showButtonText('Сохранено!');
      popupEditProfile.close();
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      popupEditProfile.showDefaultButtonText();
    });
}

function submitEditAvatar(inputValues) {
  const userData = {
    avatar: inputValues['avatar-link'],
  };
  popupEditAvatar.showButtonText('Сохранение...');
  Promise.resolve(api.updateAvatar(userData.avatar))
    .then((res) => {
      userInfo.setUserAvatar(res);
      popupEditAvatar.showButtonText('Сохранено!');
      api.getUserInfo();
      popupEditAvatar.close();
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      popupEditAvatar.showDefaultButtonText();
    });
}

function submitRemoveCard(card, id) {
  popupRemoveCard.showButtonText('Удаление...');
  Promise.resolve(api.deleteCard(id))
    .then(() => {
      popupRemoveCard.showButtonText('Удалено!');
      card.hideFromlayout();
      popupRemoveCard.close();
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      popupRemoveCard.showDefaultButtonText();
    });
}

function updateLike(thisCard, cardId, method) {
  api
    .updateLike(cardId, method)
    .then((res) => {
      thisCard.likeCounter(res.likes.length);
      thisCard.setLikeState(res.likes);
    })
    .catch((error) => {
      console.log(`Ошибка: "${error}"`);
    });
}

function handleResetEditProfileValidation() {
  validationEditProfile.resetValidation();
}

function handleResetAddCardValidation() {
  validationAddCard.resetValidation();
}

function handleResetEditAvatarValidation() {
  validationEditAvatar.resetValidation();
}

function handleCardClick(data) {
  popupGalery.open(data);
}

function handleDeleteCard(card, id) {
  popupRemoveCard.open(card, id);
}

buttonAddElement.addEventListener('click', function () {
  popupAddCard.open();
});

buttonEditAvatar.addEventListener('click', function () {
  popupEditAvatar.open();
});

buttonEditElement.addEventListener('click', () => {
  popupEditProfile.setInputValues(userInfo.getUserInfo());
  popupEditProfile.open();
});

function createCard(initialCardsData) {
  const card = new Card(
    initialCardsData,
    userInfo.getUserId(),
    handleDeleteCard,
    '#cards-template',
    handleCardClick,
    updateLike
  );

  return card.getNewCard();
}

const cardElement = new Section(
  {
    renderer: (item) => {
      const rendererCardElement = createCard(item);
      cardElement.addItem(rendererCardElement);
    },
  },
  '.elements'
);
