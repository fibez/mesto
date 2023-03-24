'use strict';

class Card {
  constructor(data, getCurrentUserId, deleteCard, templateSelector, handleCardClick, handleLikeClick) {
    this._templateSelector = templateSelector;
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._cardId = data._id;
    this._ownerId = data.owner._id;
    this._currentUserId = getCurrentUserId;
    this._handleCardClick = handleCardClick;
    this._handleDeleteCard = deleteCard;
    this._updateLike = handleLikeClick;

    this._cardSelector = '.elements__card';
    this._cardDeleteButtonSelector = '.elements__bucket';
    this._cardLikeButtonSelector = '.elements__like';
    this._cardActiveLikeButtonSelector = 'elements__like_active';
    this._cardImageSelector = '.elements__image';
    this._cardDescriptionSelector = '.elements__place-name';
    this._popupGaleryElementSelector = '.popup_type_galery';
    this._popupImageSelector = '.popup__image';
    this._popupImageDescriptionSelector = '.popup__image-desription';
    this._likeCounterSelector = '.elements__like-counter';

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

  _getImageData() {
    const imageData = {
      name: this._cardImageElement.getAttribute('alt'),
      link: this._cardImageElement.getAttribute('src'),
    };

    return imageData;
  }

  _handleEventListener() {
    this._element.querySelector(this._cardDeleteButtonSelector).addEventListener('click', () => {
      this._removeCard(event);
    });
    this._likeButton.addEventListener('click', () => {
      this._handleLikeClick(event);
    });
    this._element.querySelector(this._cardImageSelector).addEventListener('click', () => {
      this._handleCardClick(this._getImageData());
    });
  }

  _generateCard() {
    this._element = this._getTemplateElement();
    this._likeButton = this._element.querySelector(this._cardLikeButtonSelector);

    this._cardImageElement = this._element.querySelector(this._cardImageSelector);
    this._cardDescriptionElement = this._element.querySelector(this._cardDescriptionSelector);
    this._cardLikeCounterElement = this._element.querySelector(this._likeCounterSelector);

    this._cardDescriptionElement.textContent = this._name;
    this._cardImageElement.setAttribute('alt', this._name);
    this._cardImageElement.setAttribute('src', this._link);

    this._hasCurrentUserLike(this._likes);
    this._showDeleteButton(this._element);
    this.likeCounter(this._likes.length);
    this.setLikeState(this._likes);
    this._handleEventListener();

    return this._element;
  }

  _hasCurrentUserLike(likes) {
    return likes.some((element) => element._id === this._currentUserId);
  }

  setLikeState(likes) {
    if (this._hasCurrentUserLike(likes)) {
      this._likeButton.classList.add(this._cardActiveLikeButtonSelector);
    } else {
      this._likeButton.classList.remove(this._cardActiveLikeButtonSelector);
    }
  }

  _removeCard() {
    console.log(this._cardId);
    this._handleDeleteCard(this, this._cardId);
  }

  hideFromlayout() {
    this._element.remove();
    this._element = null;
  }

  likeCounter(num) {
    if (num) {
      this._cardLikeCounterElement.textContent = num;
    } else {
      this._cardLikeCounterElement.textContent = null;
    }
  }

  _handleLikeClick() {
    if (this._likeButton.classList.contains('elements__like_active')) {
      this._updateLike(this, this._cardId, 'DELETE');
    } else {
      this._updateLike(this, this._cardId, 'PUT');
    }
  }

  _showDeleteButton() {
    if (this._ownerId === this._currentUserId) {
      this._element.querySelector(this._cardDeleteButtonSelector).classList.remove('elements__bucket_type_hidden');
    }
  }
}

export { Card };
