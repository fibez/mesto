import { Popup } from './Popup';

class PopupWithSubmit extends Popup {
  constructor(popupSelector, handleRemoveCard) {
    super(popupSelector);

    this._popupFormElement = this._popup.querySelector('.popup__form');
    this._saveButtonElement = this._popup.querySelector('.popup__save-button');
    this._handleRemoveCard = handleRemoveCard;
  }

  setEventListeners() {
    super.setEventListeners();

    this._popupFormElement.addEventListener('submit', (event) => {
      event.preventDefault();
      this._handleRemoveCard(this._card, this._id);
    });
  }

  open(card, id) {
    super.open();

    this._card = card;
    this._id = id;
  }
}

export { PopupWithSubmit };
