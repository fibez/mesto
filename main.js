/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/pages/index.css":
/*!*****************************!*\
  !*** ./src/pages/index.css ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://mesto/./src/pages/index.css?");

/***/ }),

/***/ "./src/components/Api.js":
/*!*******************************!*\
  !*** ./src/components/Api.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Api\": () => (/* binding */ Api)\n/* harmony export */ });\nclass Api {\r\n  constructor(path, token) {\r\n    this._basePath = path;\r\n    this._authToken = token;\r\n  }\r\n\r\n  _request(path, method, body) {\r\n    return fetch(`${this._basePath}/${path}`, {\r\n      method: method,\r\n      headers: {\r\n        authorization: this._authToken,\r\n        'Content-Type': 'application/json',\r\n      },\r\n      body: body,\r\n    }).then(this._checkStatus);\r\n  }\r\n\r\n  _checkStatus(res) {\r\n    if (res.ok) {\r\n      return res.json();\r\n    }\r\n\r\n    return Promise.reject(`Error: ${res.status}`);\r\n  }\r\n\r\n  getCards() {\r\n    return this._request('cards', 'GET');\r\n  }\r\n\r\n  getUserInfo() {\r\n    return this._request('users/me', 'GET');\r\n  }\r\n\r\n  getUserId() {\r\n    Promise(this.getUserInfo()).then((res) => {\r\n      return res._id;\r\n    });\r\n  }\r\n\r\n  updateUserInfo(data) {\r\n    return this._request(\r\n      'users/me',\r\n      'PATCH',\r\n      JSON.stringify({\r\n        name: data.name,\r\n        about: data.about,\r\n      })\r\n    );\r\n  }\r\n\r\n  addNewCard(formValues) {\r\n    return this._request(\r\n      '/cards',\r\n      'POST',\r\n      JSON.stringify({\r\n        name: formValues.name,\r\n        link: formValues.link,\r\n      })\r\n    );\r\n  }\r\n\r\n  updateAvatar(link) {\r\n    return this._request(\r\n      'users/me/avatar',\r\n      'PATCH',\r\n      JSON.stringify({\r\n        avatar: link,\r\n      })\r\n    );\r\n  }\r\n\r\n  deleteCard(cardId) {\r\n    return this._request(`cards/${cardId}`, 'DELETE');\r\n  }\r\n\r\n  updateLike(cardId, method) {\r\n    return this._request(`cards/${cardId}/likes`, method);\r\n  }\r\n}\r\n\r\n\r\n\n\n//# sourceURL=webpack://mesto/./src/components/Api.js?");

/***/ }),

/***/ "./src/components/Card.js":
/*!********************************!*\
  !*** ./src/components/Card.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Card\": () => (/* binding */ Card)\n/* harmony export */ });\n\r\n\r\nclass Card {\r\n  constructor(data, getCurrentUserId, deleteCard, templateSelector, handleCardClick, handleLikeClick) {\r\n    this._templateSelector = templateSelector;\r\n    this._name = data.name;\r\n    this._link = data.link;\r\n    this._likes = data.likes;\r\n    this._cardId = data._id;\r\n    this._ownerId = data.owner._id;\r\n    this._currentUserId = getCurrentUserId;\r\n    this._handleCardClick = handleCardClick;\r\n    this._handleDeleteCard = deleteCard;\r\n    this._updateLike = handleLikeClick;\r\n\r\n    this._cardSelector = '.elements__card';\r\n    this._cardDeleteButtonSelector = '.elements__bucket';\r\n    this._cardLikeButtonSelector = '.elements__like';\r\n    this._cardActiveLikeButtonSelector = 'elements__like_active';\r\n    this._cardImageSelector = '.elements__image';\r\n    this._cardDescriptionSelector = '.elements__place-name';\r\n    this._popupGaleryElementSelector = '.popup_type_galery';\r\n    this._popupImageSelector = '.popup__image';\r\n    this._popupImageDescriptionSelector = '.popup__image-desription';\r\n    this._likeCounterSelector = '.elements__like-counter';\r\n\r\n    this._popupGaleryElement = document.querySelector(this._popupGaleryElementSelector);\r\n    this._popupGaleryImageElement = this._popupGaleryElement.querySelector(this._popupImageSelector);\r\n    this._popupGaleryImageDescriptionElement = this._popupGaleryElement.querySelector(\r\n      this._popupImageDescriptionSelector\r\n    );\r\n  }\r\n\r\n  getNewCard() {\r\n    return this._generateCard();\r\n  }\r\n\r\n  _getTemplateElement() {\r\n    const cardElement = document\r\n      .querySelector(this._templateSelector)\r\n      .content.querySelector(this._cardSelector)\r\n      .cloneNode(true);\r\n\r\n    return cardElement;\r\n  }\r\n\r\n  _getImageData() {\r\n    const imageData = {\r\n      name: this._cardImageElement.getAttribute('alt'),\r\n      link: this._cardImageElement.getAttribute('src'),\r\n    };\r\n\r\n    return imageData;\r\n  }\r\n\r\n  _handleEventListener() {\r\n    this._element.querySelector(this._cardDeleteButtonSelector).addEventListener('click', () => {\r\n      this._removeCard(event);\r\n    });\r\n    this._likeButton.addEventListener('click', () => {\r\n      this._handleLikeClick(event);\r\n    });\r\n    this._element.querySelector(this._cardImageSelector).addEventListener('click', () => {\r\n      this._handleCardClick(this._getImageData());\r\n    });\r\n  }\r\n\r\n  _generateCard() {\r\n    this._element = this._getTemplateElement();\r\n    this._likeButton = this._element.querySelector(this._cardLikeButtonSelector);\r\n\r\n    this._cardImageElement = this._element.querySelector(this._cardImageSelector);\r\n    this._cardDescriptionElement = this._element.querySelector(this._cardDescriptionSelector);\r\n    this._cardLikeCounterElement = this._element.querySelector(this._likeCounterSelector);\r\n\r\n    this._cardDescriptionElement.textContent = this._name;\r\n    this._cardImageElement.setAttribute('alt', this._name);\r\n    this._cardImageElement.setAttribute('src', this._link);\r\n\r\n    this._hasCurrentUserLike(this._likes);\r\n    this._showDeleteButton(this._element);\r\n    this.likeCounter(this._likes.length);\r\n    this.setLikeState(this._likes);\r\n    this._handleEventListener();\r\n\r\n    return this._element;\r\n  }\r\n\r\n  _hasCurrentUserLike(likes) {\r\n    return likes.some((element) => element._id === this._currentUserId);\r\n  }\r\n\r\n  setLikeState(likes) {\r\n    if (this._hasCurrentUserLike(likes)) {\r\n      this._likeButton.classList.add(this._cardActiveLikeButtonSelector);\r\n    } else {\r\n      this._likeButton.classList.remove(this._cardActiveLikeButtonSelector);\r\n    }\r\n  }\r\n\r\n  _removeCard() {\r\n    this._handleDeleteCard(this, this._cardId);\r\n  }\r\n\r\n  hideFromlayout() {\r\n    this._element.remove();\r\n    this._element = null;\r\n  }\r\n\r\n  likeCounter(num) {\r\n    if (num) {\r\n      this._cardLikeCounterElement.textContent = num;\r\n    } else {\r\n      this._cardLikeCounterElement.textContent = null;\r\n    }\r\n  }\r\n\r\n  _handleLikeClick() {\r\n    if (this._likeButton.classList.contains('elements__like_active')) {\r\n      this._updateLike(this, this._cardId, 'DELETE');\r\n    } else {\r\n      this._updateLike(this, this._cardId, 'PUT');\r\n    }\r\n  }\r\n\r\n  _showDeleteButton() {\r\n    if (this._ownerId === this._currentUserId) {\r\n      this._element.querySelector(this._cardDeleteButtonSelector).classList.remove('elements__bucket_type_hidden');\r\n    }\r\n  }\r\n}\r\n\r\n\r\n\n\n//# sourceURL=webpack://mesto/./src/components/Card.js?");

/***/ }),

/***/ "./src/components/FormValidator.js":
/*!*****************************************!*\
  !*** ./src/components/FormValidator.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"FormValidator\": () => (/* binding */ FormValidator)\n/* harmony export */ });\n\r\n\r\nclass FormValidator {\r\n  constructor(settings, formElement) {\r\n    this._inputSelector = settings.inputSelector;\r\n    this._submitButtonSelector = settings.submitButtonSelector;\r\n    this._inactiveButtonClass = settings.inactiveButtonClass;\r\n    this._inputErrorClass = settings.inputErrorClass;\r\n    this._errorClassVisible = settings.errorClassVisible;\r\n\r\n    this._formElement = formElement;\r\n    this._submitButton = this._formElement.querySelector(this._submitButtonSelector);\r\n    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));\r\n  }\r\n  // Включение валидации\r\n  enableValidation() {\r\n    this._setEventListeners();\r\n  }\r\n\r\n  // Сброс валидации\r\n  resetValidation() {\r\n    this._inputList.forEach((element) => {\r\n      this._hideInputError(element);\r\n    });\r\n    this._toggleButtonState();\r\n  }\r\n\r\n  // Проставляем слушатели на инпуты формы\r\n  _setEventListeners() {\r\n    this._inputList.forEach((inputElement) => {\r\n      inputElement.addEventListener('input', () => {\r\n        this._checkInputValidity(inputElement);\r\n        this._toggleButtonState();\r\n      });\r\n    });\r\n  }\r\n\r\n  // Проверка валидности инпутов\r\n  _checkInputValidity(inputElement) {\r\n    if (!inputElement.validity.valid) {\r\n      this._showInputError(inputElement, inputElement.validationMessage);\r\n    } else {\r\n      this._hideInputError(inputElement);\r\n    }\r\n  }\r\n\r\n  // Отображение сообщений об ошибках\r\n  _showInputError(inputElement, validationMessage) {\r\n    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);\r\n\r\n    errorElement.textContent = validationMessage;\r\n    errorElement.classList.add(this._errorClassVisible);\r\n\r\n    inputElement.classList.add(this._inputErrorClass);\r\n  }\r\n\r\n  // Скрытие ошибок\r\n  _hideInputError(inputElement) {\r\n    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);\r\n\r\n    errorElement.textContent = '';\r\n    errorElement.classList.remove(this._errorClassVisible);\r\n\r\n    inputElement.classList.remove(this._inputErrorClass);\r\n  }\r\n\r\n  // Выставление состояния кнопок\r\n  _toggleButtonState() {\r\n    if (this._hasInvalidInput()) {\r\n      this._submitButton.classList.add(this._inactiveButtonClass);\r\n      this._submitButton.setAttribute('disabled', '');\r\n    } else {\r\n      this._submitButton.classList.remove(this._inactiveButtonClass);\r\n      this._submitButton.removeAttribute('disabled');\r\n    }\r\n  }\r\n\r\n  // Проверка на наличие невалидных инпутов\r\n  _hasInvalidInput() {\r\n    return this._inputList.some((inputElement) => {\r\n      return !inputElement.validity.valid;\r\n    });\r\n  }\r\n}\r\n\r\n\r\n\n\n//# sourceURL=webpack://mesto/./src/components/FormValidator.js?");

/***/ }),

/***/ "./src/components/Popup.js":
/*!*********************************!*\
  !*** ./src/components/Popup.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Popup\": () => (/* binding */ Popup)\n/* harmony export */ });\n\r\n\r\nclass Popup {\r\n  constructor(popupSelector) {\r\n    this._popup = document.querySelector(popupSelector);\r\n    this._popupCloseButton = this._popup.querySelector('.popup__close-button');\r\n    this._handleEscClose = this._handleEscClose.bind(this);\r\n  }\r\n\r\n  open() {\r\n    this._popup.classList.add('popup_opened');\r\n    document.addEventListener('keydown', this._handleEscClose);\r\n  }\r\n\r\n  close() {\r\n    this._popup.classList.remove('popup_opened');\r\n    document.removeEventListener('keydown', this._handleEscClose);\r\n  }\r\n\r\n  setEventListeners() {\r\n    this._popup.addEventListener('mousedown', (event) => {\r\n      if (event.target === event.currentTarget || event.target.classList.contains('popup__close-button')) {\r\n        this.close();\r\n      }\r\n    });\r\n  }\r\n\r\n  _handleEscClose(event) {\r\n    if (event.key === 'Escape') {\r\n      this.close();\r\n    }\r\n  }\r\n}\r\n\r\n\r\n\n\n//# sourceURL=webpack://mesto/./src/components/Popup.js?");

/***/ }),

/***/ "./src/components/PopupWithForm.js":
/*!*****************************************!*\
  !*** ./src/components/PopupWithForm.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"PopupWithForm\": () => (/* binding */ PopupWithForm)\n/* harmony export */ });\n/* harmony import */ var _Popup_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Popup.js */ \"./src/components/Popup.js\");\n\r\n\r\n\r\n\r\nclass PopupWithForm extends _Popup_js__WEBPACK_IMPORTED_MODULE_0__.Popup {\r\n  constructor(popupSelector, handleSubmitForm, handleResetValidation) {\r\n    super(popupSelector);\r\n    this._handleSubmitForm = handleSubmitForm;\r\n    this._popupInputList = this._popup.querySelectorAll('.popup__input');\r\n    this._popupForm = this._popup.querySelector('.popup__form');\r\n    this._handleResetValidation = handleResetValidation;\r\n    this._saveButtonElement = this._popup.querySelector('.popup__save-button');\r\n    this._defaultButtonText = this._saveButtonElement.textContent;\r\n  }\r\n\r\n  _getInputValues() {\r\n    const inputValues = {};\r\n\r\n    this._popupInputList.forEach((element) => {\r\n      inputValues[element.id] = element.value;\r\n    });\r\n\r\n    return inputValues;\r\n  }\r\n\r\n  setInputValues(data) {\r\n    this._popupInputList.forEach((input) => {\r\n      input.value = data[input.id];\r\n    });\r\n  }\r\n\r\n  setEventListeners() {\r\n    super.setEventListeners();\r\n\r\n    this._popupForm.addEventListener('submit', () => {\r\n      event.preventDefault();\r\n      this._handleSubmitForm(this._getInputValues());\r\n    });\r\n  }\r\n\r\n  close() {\r\n    super.close();\r\n\r\n    this._popupForm.reset();\r\n    this._handleResetValidation(this._popupForm);\r\n  }\r\n\r\n  showDefaultButtonText() {\r\n    this.showButtonText(this._defaultButtonText);\r\n  }\r\n\r\n  showButtonText(msg) {\r\n    this._saveButtonElement.textContent = msg;\r\n  }\r\n}\r\n\r\n\r\n\n\n//# sourceURL=webpack://mesto/./src/components/PopupWithForm.js?");

/***/ }),

/***/ "./src/components/PopupWithImage.js":
/*!******************************************!*\
  !*** ./src/components/PopupWithImage.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"PopupWithImage\": () => (/* binding */ PopupWithImage)\n/* harmony export */ });\n/* harmony import */ var _Popup_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Popup.js */ \"./src/components/Popup.js\");\n\r\n\r\n\r\n\r\nclass PopupWithImage extends _Popup_js__WEBPACK_IMPORTED_MODULE_0__.Popup {\r\n  constructor(popupSelector) {\r\n    super(popupSelector);\r\n    this._popupImage = this._popup.querySelector('.popup__image');\r\n    this._popupImageDescription = this._popup.querySelector('.popup__image-desription');\r\n  }\r\n  open(data) {\r\n    super.open();\r\n\r\n    this._popupImage.setAttribute('src', data.link);\r\n    this._popupImage.setAttribute('alt', data.name);\r\n    this._popupImageDescription.textContent = data.name;\r\n  }\r\n}\r\n\r\n\r\n\n\n//# sourceURL=webpack://mesto/./src/components/PopupWithImage.js?");

/***/ }),

/***/ "./src/components/PopupWithSubmit.js":
/*!*******************************************!*\
  !*** ./src/components/PopupWithSubmit.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"PopupWithSubmit\": () => (/* binding */ PopupWithSubmit)\n/* harmony export */ });\n/* harmony import */ var _Popup__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Popup */ \"./src/components/Popup.js\");\n\r\n\r\nclass PopupWithSubmit extends _Popup__WEBPACK_IMPORTED_MODULE_0__.Popup {\r\n  constructor(popupSelector, handleRemoveCard) {\r\n    super(popupSelector);\r\n\r\n    this._popupFormElement = this._popup.querySelector('.popup__form');\r\n    this._saveButtonElement = this._popup.querySelector('.popup__save-button');\r\n    this._handleRemoveCard = handleRemoveCard;\r\n  }\r\n\r\n  setEventListeners() {\r\n    super.setEventListeners();\r\n\r\n    this._popupFormElement.addEventListener('submit', (event) => {\r\n      event.preventDefault();\r\n      this._handleRemoveCard(this._card, this._id);\r\n    });\r\n  }\r\n\r\n  open(card, id) {\r\n    super.open();\r\n\r\n    this._card = card;\r\n    this._id = id;\r\n  }\r\n}\r\n\r\n\r\n\n\n//# sourceURL=webpack://mesto/./src/components/PopupWithSubmit.js?");

/***/ }),

/***/ "./src/components/Section.js":
/*!***********************************!*\
  !*** ./src/components/Section.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Section\": () => (/* binding */ Section)\n/* harmony export */ });\nclass Section {\r\n  constructor({ renderer }, selector) {\r\n    this._renderer = renderer;\r\n    this._container = document.querySelector(selector);\r\n  }\r\n\r\n  addItem(element) {\r\n    this._container.prepend(element);\r\n  }\r\n\r\n  renderElement(data) {\r\n    data.forEach((item) => {\r\n      this._renderer(item);\r\n    });\r\n  }\r\n}\r\n\r\n\r\n\n\n//# sourceURL=webpack://mesto/./src/components/Section.js?");

/***/ }),

/***/ "./src/components/UserInfo.js":
/*!************************************!*\
  !*** ./src/components/UserInfo.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"UserInfo\": () => (/* binding */ UserInfo)\n/* harmony export */ });\n\r\n\r\nclass UserInfo {\r\n  constructor({ name, description, avatar }) {\r\n    this._profileNameElement = document.querySelector(name);\r\n    this._profileDescriptionElement = document.querySelector(description);\r\n    this._profileAvatarElement = document.querySelector(avatar);\r\n  }\r\n\r\n  getUserInfo() {\r\n    const userInfo = {\r\n      'profile-name': this._profileNameElement.textContent,\r\n      'profile-profession': this._profileDescriptionElement.textContent,\r\n    };\r\n\r\n    return userInfo;\r\n  }\r\n\r\n  setUserInfo(userData) {\r\n    this.setUserAvatar(userData);\r\n    this.setUserDescription(userData);\r\n  }\r\n\r\n  setUserAvatar(userData) {\r\n    this._profileAvatarElement.setAttribute('src', userData.avatar);\r\n  }\r\n\r\n  setUserDescription(userData) {\r\n    this._profileNameElement.textContent = userData.name;\r\n    this._profileDescriptionElement.textContent = userData.about;\r\n    this._id = userData._id;\r\n  }\r\n\r\n  getUserId() {\r\n    return this._id;\r\n  }\r\n}\r\n\r\n\r\n\n\n//# sourceURL=webpack://mesto/./src/components/UserInfo.js?");

/***/ }),

/***/ "./src/scripts/index.js":
/*!******************************!*\
  !*** ./src/scripts/index.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _pages_index_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../pages/index.css */ \"./src/pages/index.css\");\n/* harmony import */ var _utils_constants_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/constants.js */ \"./src/utils/constants.js\");\n/* harmony import */ var _components_Card_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/Card.js */ \"./src/components/Card.js\");\n/* harmony import */ var _components_Section_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/Section.js */ \"./src/components/Section.js\");\n/* harmony import */ var _components_UserInfo_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/UserInfo.js */ \"./src/components/UserInfo.js\");\n/* harmony import */ var _components_PopupWithForm_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/PopupWithForm.js */ \"./src/components/PopupWithForm.js\");\n/* harmony import */ var _components_PopupWithImage_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/PopupWithImage.js */ \"./src/components/PopupWithImage.js\");\n/* harmony import */ var _components_FormValidator_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../components/FormValidator.js */ \"./src/components/FormValidator.js\");\n/* harmony import */ var _components_Api__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../components/Api */ \"./src/components/Api.js\");\n/* harmony import */ var _components_PopupWithSubmit__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../components/PopupWithSubmit */ \"./src/components/PopupWithSubmit.js\");\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\nconst popupEditProfileElement = document.querySelector('.popup_type_profile-edit');\r\nconst popupAddCardElement = document.querySelector('.popup_type_cards-add');\r\nconst popupEditAvatarElement = document.querySelector('.popup_type_edit-avatar');\r\nconst formEditProfile = popupEditProfileElement.querySelector('.popup__form_type_profile-edit');\r\nconst formAddCard = popupAddCardElement.querySelector('.popup__form_type_add-card');\r\nconst formEditAvatar = popupEditAvatarElement.querySelector('.popup__form_type_edit-avatar');\r\nconst profileElement = document.querySelector('.profile');\r\nconst buttonEditElement = profileElement.querySelector('.profile__edit-button');\r\nconst buttonAddElement = profileElement.querySelector('.profile__add-button');\r\nconst buttonEditAvatar = profileElement.querySelector('.profile__avatar-button');\r\n\r\nconst validationEditProfile = new _components_FormValidator_js__WEBPACK_IMPORTED_MODULE_7__.FormValidator(_utils_constants_js__WEBPACK_IMPORTED_MODULE_1__.validationSettings, formEditProfile);\r\nconst validationAddCard = new _components_FormValidator_js__WEBPACK_IMPORTED_MODULE_7__.FormValidator(_utils_constants_js__WEBPACK_IMPORTED_MODULE_1__.validationSettings, formAddCard);\r\nconst validationEditAvatar = new _components_FormValidator_js__WEBPACK_IMPORTED_MODULE_7__.FormValidator(_utils_constants_js__WEBPACK_IMPORTED_MODULE_1__.validationSettings, formEditAvatar);\r\n\r\nvalidationEditProfile.enableValidation();\r\nvalidationAddCard.enableValidation();\r\nvalidationEditAvatar.enableValidation();\r\n\r\nconst popupAddCard = new _components_PopupWithForm_js__WEBPACK_IMPORTED_MODULE_5__.PopupWithForm('.popup_type_cards-add', submitCardAddition, handleResetAddCardValidation);\r\nconst popupEditAvatar = new _components_PopupWithForm_js__WEBPACK_IMPORTED_MODULE_5__.PopupWithForm('.popup_type_edit-avatar', submitEditAvatar, handleResetEditAvatarValidation);\r\nconst popupRemoveCard = new _components_PopupWithSubmit__WEBPACK_IMPORTED_MODULE_9__.PopupWithSubmit('.popup_type_remove-card', submitRemoveCard);\r\nconst popupGalery = new _components_PopupWithImage_js__WEBPACK_IMPORTED_MODULE_6__.PopupWithImage('.popup_type_galery');\r\nconst popupEditProfile = new _components_PopupWithForm_js__WEBPACK_IMPORTED_MODULE_5__.PopupWithForm(\r\n  '.popup_type_profile-edit',\r\n  submitProfileChanges,\r\n  handleResetEditProfileValidation\r\n);\r\nconst userInfo = new _components_UserInfo_js__WEBPACK_IMPORTED_MODULE_4__.UserInfo({\r\n  name: '.profile__name',\r\n  description: '.profile__description',\r\n  avatar: '.profile__avatar',\r\n});\r\n\r\npopupEditProfile.setEventListeners();\r\npopupEditAvatar.setEventListeners();\r\npopupGalery.setEventListeners();\r\npopupRemoveCard.setEventListeners();\r\npopupAddCard.setEventListeners();\r\n\r\nconst api = new _components_Api__WEBPACK_IMPORTED_MODULE_8__.Api('https://mesto.nomoreparties.co/v1/cohort-59', '3a99dc75-7908-4d48-95a2-7baec3f5e64d');\r\n\r\nPromise.all([api.getCards(), api.getUserInfo()])\r\n  .then(([usersCards, userData]) => {\r\n    userInfo.setUserInfo(userData);\r\n    cardElement.renderElement(usersCards.reverse());\r\n  })\r\n  .catch((error) => {\r\n    console.log(error);\r\n  });\r\n\r\nfunction submitCardAddition(inputValues) {\r\n  const userCard = {\r\n    name: inputValues['place-name'],\r\n    link: inputValues['img-link'],\r\n  };\r\n\r\n  popupAddCard.showButtonText('Сохранение...');\r\n  Promise.resolve(api.addNewCard(userCard))\r\n    .then((res) => {\r\n      cardElement.addItem(createCard(res));\r\n      popupAddCard.close();\r\n    })\r\n    .catch((error) => {\r\n      console.log(error);\r\n    })\r\n    .finally(() => {\r\n      popupAddCard.showDefaultButtonText();\r\n    });\r\n}\r\n\r\nfunction submitProfileChanges(inputValues) {\r\n  const userData = {\r\n    name: inputValues['profile-name'],\r\n    about: inputValues['profile-profession'],\r\n  };\r\n  popupEditProfile.showButtonText('Сохранение...');\r\n  Promise.resolve(api.updateUserInfo(userData))\r\n    .then((res) => {\r\n      userInfo.setUserDescription(res);\r\n      popupEditProfile.close();\r\n    })\r\n    .catch((error) => {\r\n      console.log(error);\r\n    })\r\n    .finally(() => {\r\n      popupEditProfile.showDefaultButtonText();\r\n    });\r\n}\r\n\r\nfunction submitEditAvatar(inputValues) {\r\n  const userData = {\r\n    avatar: inputValues['avatar-link'],\r\n  };\r\n  popupEditAvatar.showButtonText('Сохранение...');\r\n  Promise.resolve(api.updateAvatar(userData.avatar))\r\n    .then((res) => {\r\n      userInfo.setUserAvatar(res);\r\n      api.getUserInfo();\r\n      popupEditAvatar.close();\r\n    })\r\n    .catch((error) => {\r\n      console.log(error);\r\n    })\r\n    .finally(() => {\r\n      popupEditAvatar.showDefaultButtonText();\r\n    });\r\n}\r\n\r\nfunction submitRemoveCard(card, id) {\r\n  Promise.resolve(api.deleteCard(id))\r\n    .then(() => {\r\n      card.hideFromlayout();\r\n      popupRemoveCard.close();\r\n    })\r\n    .catch((error) => {\r\n      console.log(error);\r\n    });\r\n}\r\n\r\nfunction updateLike(thisCard, cardId, method) {\r\n  api\r\n    .updateLike(cardId, method)\r\n    .then((res) => {\r\n      thisCard.likeCounter(res.likes.length);\r\n      thisCard.setLikeState(res.likes);\r\n    })\r\n    .catch((error) => {\r\n      console.log(`Ошибка: \"${error}\"`);\r\n    });\r\n}\r\n\r\nfunction handleResetEditProfileValidation() {\r\n  validationEditProfile.resetValidation();\r\n}\r\n\r\nfunction handleResetAddCardValidation() {\r\n  validationAddCard.resetValidation();\r\n}\r\n\r\nfunction handleResetEditAvatarValidation() {\r\n  validationEditAvatar.resetValidation();\r\n}\r\n\r\nfunction handleCardClick(data) {\r\n  popupGalery.open(data);\r\n}\r\n\r\nfunction handleDeleteCard(card, id) {\r\n  popupRemoveCard.open(card, id);\r\n}\r\n\r\nbuttonAddElement.addEventListener('click', function () {\r\n  popupAddCard.open();\r\n});\r\n\r\nbuttonEditAvatar.addEventListener('click', function () {\r\n  popupEditAvatar.open();\r\n});\r\n\r\nbuttonEditElement.addEventListener('click', () => {\r\n  popupEditProfile.setInputValues(userInfo.getUserInfo());\r\n  popupEditProfile.open();\r\n});\r\n\r\nfunction createCard(initialCardsData) {\r\n  const card = new _components_Card_js__WEBPACK_IMPORTED_MODULE_2__.Card(\r\n    initialCardsData,\r\n    userInfo.getUserId(),\r\n    handleDeleteCard,\r\n    '#cards-template',\r\n    handleCardClick,\r\n    updateLike\r\n  );\r\n\r\n  return card.getNewCard();\r\n}\r\n\r\nconst cardElement = new _components_Section_js__WEBPACK_IMPORTED_MODULE_3__.Section(\r\n  {\r\n    renderer: (item) => {\r\n      const rendererCardElement = createCard(item);\r\n      cardElement.addItem(rendererCardElement);\r\n    },\r\n  },\r\n  '.elements'\r\n);\r\n\n\n//# sourceURL=webpack://mesto/./src/scripts/index.js?");

/***/ }),

/***/ "./src/utils/constants.js":
/*!********************************!*\
  !*** ./src/utils/constants.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"validationSettings\": () => (/* binding */ validationSettings)\n/* harmony export */ });\nconst validationSettings = {\r\n  formSelector: '.popup__form',\r\n  inputSelector: '.popup__input',\r\n  submitButtonSelector: '.popup__save-button',\r\n  inactiveButtonClass: 'popup__save-button_inactive',\r\n  inputErrorClass: 'popup__input_invalid',\r\n  errorClassVisible: 'popup__error_visible',\r\n};\r\n\r\n\r\n\n\n//# sourceURL=webpack://mesto/./src/utils/constants.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/scripts/index.js");
/******/ 	
/******/ })()
;