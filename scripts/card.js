'use strict';

class Card {
  constructor(data, templateSelector, openPopupFunction) {
    this._templateSelector = templateSelector;
    this._name = data.name;
    this._link = data.link;
    this._openPopupFunction = openPopupFunction;

    this._cardsContainerSelector = '.elements';
    this._cardSelector = '.elements__card';
    this._cardDeleteButtonSelector = '.elements__bucket';
    this._cardLikeButtonSelector = '.elements__like';
    this._cardActiveLikeButtonSelector = 'elements__like_active';
    this._cardImageSelector = '.elements__image';
    this._cardDescriptionSelector = '.elements__place-name';
    this._popupGaleryElementSelector = '.popup_type_galery';
    this._popupImageSelector = '.popup__image';
    this._popupImageDescriptionSelector = '.popup__image-desription';

    this._popupGaleryElement = document.querySelector(this._popupGaleryElementSelector);
    this._popupGaleryImageElement = this._popupGaleryElement.querySelector(this._popupImageSelector);
    this._popupGaleryImageDescriptionElement = this._popupGaleryElement.querySelector(
      this._popupImageDescriptionSelector
    );
  }

  getNewCard() {
    return this._generateCard();
  }

  _getTemplateElement() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(this._cardSelector)
      .cloneNode(true);

    return cardElement;
  }

  _handleEventListener() {
    this._element.querySelector(this._cardDeleteButtonSelector).addEventListener('click', () => {
      this._removeCard(event);
    });
    this._likeButton.addEventListener('click', () => {
      this._handleLikeClick(event);
    });
    this._element.querySelector(this._cardImageSelector).addEventListener('click', () => {
      this._openFullSizeImage(event, this._element);
    });
  }

  _generateCard() {
    this._element = this._getTemplateElement();
    this._likeButton = this._element.querySelector(this._cardLikeButtonSelector);

    this._cardImageElement = this._element.querySelector(this._cardImageSelector);
    this._cardDescriptionElement = this._element.querySelector(this._cardDescriptionSelector);

    this._cardDescriptionElement.textContent = this._name;
    this._cardImageElement.setAttribute('alt', this._name);
    this._cardImageElement.setAttribute('src', this._link);

    this._handleEventListener();

    return this._element;
  }

  _removeCard() {
    this._element.remove();
    this._element = null;
  }

  _handleLikeClick() {
    this._likeButton.classList.toggle(this._cardActiveLikeButtonSelector);
  }

  _openFullSizeImage(event) {
    this._openPopupFunction(this._popupGaleryElement);

    this._popupGaleryImageElement.setAttribute('src', event.target.getAttribute('src'));
    this._popupGaleryImageElement.setAttribute('alt', event.target.getAttribute('alt'));
    this._popupGaleryImageDescriptionElement.textContent = event.target.getAttribute('alt');
  }
}

export { Card };
