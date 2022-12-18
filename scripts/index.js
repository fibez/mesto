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

// ** Попапы **
const popupEditProfileElement = document.querySelector('.popup_type_profile-edit');
const popupAddCardsElement = document.querySelector('.popup_type_cards-add');
const popupGaleryElement = document.querySelector('.popup_type_galery');
// ** Элементы **
const profileElement = document.querySelector('.profile');
const profileNameElement = profileElement.querySelector('.profile__name');
const profileProfessionElement = profileElement.querySelector('.profile__description');
const cardsContainerElement = document.querySelector('.elements');
const popupGaleryImgElement = popupGaleryElement.querySelector('.popup__image');
const popupGaleryImgDescriptionElement = popupGaleryElement.querySelector('.popup__image-desription');
// ** Формы **
const popupFormEditProfileElement = popupEditProfileElement.querySelector('.popup__form_type_profile-edit');
const popupFormAddCardElement = popupAddCardsElement.querySelector('.popup__form_type_add-card');
// ** Инпуты **
const popupNameInputElement = popupEditProfileElement.querySelector('.popup__input_type_name');
const popupProfessionInputElement = popupEditProfileElement.querySelector('.popup__input_type_profession');
const popupPlaceNameInputElement = popupFormAddCardElement.querySelector('.popup__input_type_place-name');
const popupImgLinkInputElement = popupFormAddCardElement.querySelector('.popup__input_type_img-link');
// ** Кнопки **
const editButtonElement = profileElement.querySelector('.profile__edit-button');
const addButtonElement = profileElement.querySelector('.profile__add-button');
// ** Темплэйт **
const cardTemplate = document.querySelector('#cards-template').content;

// ** Создаем карточку из темплейта **
function createCard(title, src) {
  const cardElement = cardTemplate.querySelector('.elements__card').cloneNode(true);

  cardElement.querySelector('.elements__place-name').textContent = title;
  cardElement.querySelector('.elements__image').setAttribute('alt', title);
  cardElement.querySelector('.elements__image').setAttribute('src', src);

  const bucketButtonElement = cardElement.querySelector('.elements__bucket');
  bucketButtonElement.addEventListener('click', removeCard);

  const likeButtonElement = cardElement.querySelector('.elements__like');
  likeButtonElement.addEventListener('click', setLike);

  const cardImageElement = cardElement.querySelector('.elements__image');
  cardImageElement.addEventListener('click', openFullSizeImage);

  return cardElement;
}

// ** Все функции карточек **
function removeCard(e) {
  const closestParentCard = e.target.closest('.elements__card');
  closestParentCard.remove();
}

function setLike(e) {
  e.target.classList.toggle('elements__like_active');
}

function openFullSizeImage(e) {
  openPopup(popupGaleryElement);

  popupGaleryImgElement.setAttribute('src', e.target.getAttribute('src'));
  popupGaleryImgElement.setAttribute('alt', e.target.getAttribute('alt'));
  popupGaleryImgDescriptionElement.textContent = e.target.getAttribute('alt');
}

function renderNewCard(card) {
  card.forEach((element) => {
    cardsContainerElement.prepend(createCard(element.name, element.link));
  });
}

// ** Обработка сабмита формы для новой карточки **
function submitCardsAddition(e) {
  e.preventDefault();

  if (popupPlaceNameInputElement.value !== '' && popupImgLinkInputElement.value !== '') {
    const inputName = popupPlaceNameInputElement.value;
    const inputLink = popupImgLinkInputElement.value;

    const newCard = [
      {
        name: inputName,
        link: inputLink,
      },
    ];

    renderNewCard(newCard);

    closePopup(popupAddCardsElement);
    e.target.reset();
  }
}

// ** Откртие попапов
function openPopup(element) {
  element.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEsc);
}

// ** Закрываем кнопкой Escape
function closeByEsc(event) {
  if (event.key === 'Escape') {
    const popupList = Array.from(document.querySelectorAll('.popup'));
    const targetedPopup = popupList.find(function (element) {
      if (element.classList.contains('popup_opened')) {
        return element;
      }
    });

    closePopup(targetedPopup);
    document.removeEventListener('keydown', closeByEsc);
  }
}

// ** Решаем как закрыть попап **
function selectWayToClose(event) {
  if (event.target === event.currentTarget) {
    closePopup(event.target);
  } else if (event.target.classList.contains('popup__close-button')) {
    closePopup(event.currentTarget);
  }
}
// ** Закрываем попап **
function closePopup(target) {
  target.classList.remove('popup_opened');
  if (target.classList.contains('popup_type_profile-edit')) {
    resetValidation(target);
  }
}
// ** Сбрасываем валидацию, если в попапе для изменения данных профиля была ошибка валидации и попап был закрыт. Нужно для того чтобы при следующем открытии не было ситуации, когда фактически поля валидны, но отображается сообщение об ошибке и невалидный инпут
function resetValidation(target) {
  const formElement = target.querySelector('.popup__form');
  const errorElementList = Array.from(formElement.querySelectorAll('.popup__error'));
  const inputElementList = Array.from(formElement.querySelectorAll('.popup__input'));

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
}

function sendValuesFromProfile() {
  popupNameInputElement.value = profileNameElement.textContent;
  popupProfessionInputElement.value = profileProfessionElement.textContent;
}

// ** Закрываем и сохраняем изменения из формы профиля **
function submitProfileChanges(event) {
  event.preventDefault();

  if (popupNameInputElement.value !== '' && popupProfessionInputElement.value !== '') {
    profileNameElement.textContent = popupNameInputElement.value;
    profileProfessionElement.textContent = popupProfessionInputElement.value;

    closePopup(popupEditProfileElement);
  }
}

// ** Слушатели **
editButtonElement.addEventListener('click', function () {
  openPopup(popupEditProfileElement);
  sendValuesFromProfile();
});

addButtonElement.addEventListener('click', function () {
  openPopup(popupAddCardsElement);
});

popupFormEditProfileElement.addEventListener('submit', submitProfileChanges);
popupFormAddCardElement.addEventListener('submit', submitCardsAddition);
popupEditProfileElement.addEventListener('mousedown', selectWayToClose);
popupAddCardsElement.addEventListener('mousedown', selectWayToClose);
popupGaleryElement.addEventListener('mousedown', selectWayToClose);

// ** Рендер исходных карточек **
renderNewCard(initialCards);
