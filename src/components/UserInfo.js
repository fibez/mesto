'use strict';

class UserInfo {
  constructor({ name, description, avatar }) {
    this._profileNameElement = document.querySelector(name);
    this._profileDescriptionElement = document.querySelector(description);
    this._profileAvatarElement = document.querySelector(avatar);
  }

  getUserInfo() {
    const userInfo = {
      'profile-name': this._profileNameElement.textContent,
      'profile-profession': this._profileDescriptionElement.textContent,
    };

    return userInfo;
  }

  setUserInfo(userData) {
    this.setUserAvatar(userData);
    this.setUserDescription(userData);
  }

  setUserAvatar(userData) {
    this._profileAvatarElement.setAttribute('src', userData.avatar);
  }

  setUserDescription(userData) {
    this._profileNameElement.textContent = userData.name;
    this._profileDescriptionElement.textContent = userData.about;
    this._id = userData._id;
  }

  getUserId() {
    return this._id;
  }
}

export { UserInfo };
