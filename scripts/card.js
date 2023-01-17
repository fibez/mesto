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
  }

  renderNewCard() {
    document.querySelector(this._cardsContainerSelector).prepend(this._generateCard());
  }

  _getTemplateElement() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(this._cardSelector)
      .cloneNode(true);

    return cardElement;
  }

  _handleEventListener(cardElement) {
    cardElement.querySelector(this._cardDeleteButtonSelector).addEventListener('click', () => {
      this._removeCard(event);
    });
    cardElement.querySelector(this._cardLikeButtonSelector).addEventListener('click', () => {
      this._handleLikeClick(event);
    });
    cardElement.querySelector(this._cardImageSelector).addEventListener('click', () => {
      this._openFullSizeImage(event, this._element);
    });
  }

  _generateCard() {
    this._element = this._getTemplateElement();

    this._element.querySelector(this._cardDescriptionSelector).textContent = this._name;
    this._element.querySelector(this._cardImageSelector).setAttribute('alt', this._name);
    this._element.querySelector(this._cardImageSelector).setAttribute('src', this._link);

    this._handleEventListener(this._element);

    return this._element;
  }

  _removeCard(event) {
    event.target.closest(this._cardSelector).remove();
  }

  _handleLikeClick(event) {
    event.target.classList.toggle(this._cardActiveLikeButtonSelector);
  }

  _openFullSizeImage(event) {
    const popupGaleryElement = document.querySelector(this._popupGaleryElementSelector);
    this._openPopupFunction(popupGaleryElement);

    popupGaleryElement.querySelector(this._popupImageSelector).setAttribute('src', event.target.getAttribute('src'));
    popupGaleryElement.querySelector(this._popupImageSelector).setAttribute('alt', event.target.getAttribute('alt'));
    popupGaleryElement.querySelector(this._popupImageDescriptionSelector).textContent =
      event.target.getAttribute('alt');
  }
}

export { Card };
