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

// jokerge
// https://cdn.7tv.app/emote/6306876cbe8c19d70f9d6b22/4x.webp
// 5head
// https://cdn.betterttv.net/emote/5d6096974932b21d9c332904/3x.webp
