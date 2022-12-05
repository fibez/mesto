'use strict';

// ** Коллекционируем тонну переменных **
const initialCards = [
  {
    name: 'Приехала из Архангельска',
    link: './images/tosya-despite.jpg',
  },
  {
    name: 'За работой',
    link: './images/tosya-work.jpg',
  },
  {
    name: 'Еду в Челябинск',
    link: './images/tosya-train.jpg',
  },
  {
    name: 'В Челябинске смотрю на интересных людей',
    link: './images/tosya-chelyabinsk.jpg',
  },
  {
    name: 'Отдыхаю дома',
    link: './images/tosya-chill.jpg',
  },
  {
    name: 'Снова дома',
    link: './images/tosya-home.jpg',
  },
];

const profileElement = document.querySelector('.profile');
const editButtonElement = profileElement.querySelector('.profile__edit-button');
const popupEditProfileElement = document.querySelector('.popup_type_profile-edit');
const popupNameInputElement = popupEditProfileElement.querySelector('.popup__input_type_name');
const popupProfessionInputElement = popupEditProfileElement.querySelector('.popup__input_type_profession');
const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__description');
const popupFormEditProfileElement = popupEditProfileElement.querySelector('.popup__form_type_profile-edit');
const addButtonElement = profileElement.querySelector('.profile__add-button');
const popupAddCardsElement = document.querySelector('.popup_type_cards-add');
const cardsContainer = document.querySelector('.elements');
const popupFormAddCardsElement = popupAddCardsElement.querySelector('.popup__form_type_add-card');
const popupPlaceNameInputElement = popupFormAddCardsElement.querySelector('.popup__input_type_place-name');
const popupImgLinkInputElement = popupFormAddCardsElement.querySelector('.popup__input_type_img-link');
const cardTemplate = document.querySelector('#cards-template').content;
const popupGaleryElement = document.querySelector('.popup_type_galery');
const popupGaleryImgElement = popupGaleryElement.querySelector('.popup__image');
const popupGaleryImgDescriptionElement = popupGaleryElement.querySelector('.popup__image-desription');

// ** Рендер based карточек **
function addStockCards(item) {
  for (let i = 0; i <= initialCards.length - 1; i++) {
    const cardElement = cardTemplate.querySelector('.elements__card').cloneNode(true);

    cardElement.querySelector('.elements__place-name').textContent = item[i].name;
    cardElement.querySelector('.elements__image').setAttribute('alt', item[i].name);
    cardElement.querySelector('.elements__image').setAttribute('src', item[i].link);

    cardsContainer.prepend(cardElement);
  }
}

// ** Все возможные действия с карточками: открыть, удалить, лайкнуть **
const cardsAction = function (e) {
  if (e.target.classList.contains('elements__image')) {
    popupGaleryElement.classList.add('popup_opened');

    popupGaleryImgElement.setAttribute('src', e.target.getAttribute('src'));
    popupGaleryImgDescriptionElement.textContent = e.target.getAttribute('alt');
  } else if (e.target.classList.contains('elements__bucket')) {
    let closestParentCard = e.target.closest('.elements__card');
    closestParentCard.remove();
  } else if (e.target.classList.contains('elements__like')) {
    e.target.classList.toggle('elements__like_active');
  }
};

// ** Открываем попапы **
const openPopup = function (event) {
  if (event.target.classList.value === 'profile__edit-button') {
    popupEditProfileElement.classList.add('popup_opened');

    popupNameInputElement.value = profileName.textContent;
    popupProfessionInputElement.value = profileProfession.textContent;
  } else if (event.target.classList.value === 'profile__add-button') {
    popupAddCardsElement.classList.add('popup_opened');
  }
};

// ** Закрываем попапы **
const closePopup = function (event) {
  if (event.target === event.currentTarget) {
    event.target.classList.remove('popup_opened');
  } else if (event.target.classList.contains('popup__close-button')) {
    event.currentTarget.classList.remove('popup_opened');
  }
};

// ** Закрываем и сихраняем изменения из форм попапов **
const submitProfileChanges = function (event) {
  event.preventDefault();

  if (popupNameInputElement.value !== '' && popupProfessionInputElement.value !== '') {
    profileName.textContent = popupNameInputElement.value;
    profileProfession.textContent = popupProfessionInputElement.value;

    popupEditProfileElement.classList.remove('popup_opened');
  }
};

const submitCardsAddition = function (event) {
  event.preventDefault();

  const cardElement = cardTemplate.querySelector('.elements__card').cloneNode(true);

  cardElement.querySelector('.elements__place-name').textContent = popupPlaceNameInputElement.value;
  cardElement.querySelector('.elements__image').setAttribute('alt', popupPlaceNameInputElement.value);
  cardElement.querySelector('.elements__image').setAttribute('src', popupImgLinkInputElement.value);

  if (popupPlaceNameInputElement.value !== '' && popupImgLinkInputElement.value !== '') {
    cardsContainer.prepend(cardElement);

    popupPlaceNameInputElement.value = '';
    popupImgLinkInputElement.value = '';

    popupAddCardsElement.classList.remove('popup_opened');
  }
};

// ** Слушатели **
editButtonElement.addEventListener('click', openPopup);
addButtonElement.addEventListener('click', openPopup);
popupFormEditProfileElement.addEventListener('submit', submitProfileChanges);
popupEditProfileElement.addEventListener('click', closePopup);
popupAddCardsElement.addEventListener('click', closePopup);
popupFormAddCardsElement.addEventListener('submit', submitCardsAddition);
cardsContainer.addEventListener('click', cardsAction);
popupGaleryElement.addEventListener('click', closePopup);

// ** Рисуем карточки сразу после загрузки **
addStockCards(initialCards);
