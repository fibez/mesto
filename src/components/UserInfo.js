'use strict';

class UserInfo {
  constructor({ name, description }) {
    this._profileNameElement = document.querySelector(name);
    this._profileDescriptionElement = document.querySelector(description);
  }

  getUserInfo() {
    const userInfo = {
      'profile-name': this._profileNameElement.textContent,
      'profile-profession': this._profileDescriptionElement.textContent,
    };

    return userInfo;
  }

  setUserInfo(inputValues) {
    this._profileNameElement.textContent = inputValues['profile-name'];
    this._profileDescriptionElement.textContent = inputValues['profile-profession'];
  }
}

export { UserInfo };
