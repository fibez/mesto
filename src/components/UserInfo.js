'use strict';

class UserInfo {
  constructor({ name, description }) {
    this._profileNameElement = document.querySelector(name);
    this._profileDescriptionElement = document.querySelector(description);
  }

  getUserInfo() {
    const userInfo = {
      name: this._profileNameElement.textContent,
      description: this._profileDescriptionElement.textContent,
    };

    return userInfo;
  }

  setUserInfo(inputValues) {
    this._profileNameElement.textContent = inputValues['profile-input-name'];
    this._profileDescriptionElement.textContent = inputValues['profile-input-profession'];
  }
}

export { UserInfo };
