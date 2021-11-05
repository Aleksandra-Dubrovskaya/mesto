export default class Card {
  constructor({ data, handleCardClick, handleLikes, handleRemove }, cardSelector, userId) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._cardId = data._id;
    this._ownerId = data.owner._id;
    this._userId = userId;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleLikes = handleLikes;
    this._handleRemove = handleRemove;
  }

  _getCardTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getCardTemplate();
    this._img = this._element.querySelector('.element__image');
    this._likeButton = this._element.querySelector('.element__like-button');
    this._removeButton = this._element.querySelector('.element__remove-button');

    this._hideOwnerRemoveButton();
    this._updateLikesCounter();
    this._setEventListeners();

    this._element.querySelector('.element__title').textContent = this._name;
    this._img.src = this._link;
    this._img.alt = this._name;

    return this._element;
  }

  isLiked() {
    return Boolean(this._likes.find((user) => {
      return user._id === this._userId
    }))
  }

  _updateLikesCounter() {
    this._element.querySelector('.element__likes-counter').textContent = this._likes.length;

    if (this.isLiked()) {
      this._likeButton.classList.add('element__like-button_active');
    } else {
      this._likeButton.classList.remove('element__like-button_active')
    }
  }

  getCardId() {
    return this._cardId
  }

  setLikes(likes) {
    this._likes = likes;
    this._updateLikesCounter()
  }

  removeCard() {
    this._element.remove();
    this._element = null;
  }

  _hideOwnerRemoveButton() {
    if (this._ownerId !== this._userId) {
      this._removeButton.style.display = 'none'
    }
  }

  _setEventListeners() {
    this._likeButton
      .addEventListener('click', () => {
        this._handleLikes(this);
      });
    this._removeButton
      .addEventListener('click', () => {
        this._handleRemove(this);
      });
    this._img
      .addEventListener('click', () => {
        this._handleCardClick({ name: this._name, link: this._link });
      });
  }
}


