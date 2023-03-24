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
    this.showButtonText('Да');
    this._card = card;
    this._id = id;
    // console.log(card);
  }

  showButtonText(msg) {
    this._saveButtonElement.textContent = msg;
  }
}

// https://images.unsplash.com/photo-1679282561664-259aadb1fc97?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80

export { PopupWithSubmit };
