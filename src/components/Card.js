export default class Card {
  constructor({ data, handleCardClick }, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
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
    this._setEventListeners();

    this._element.querySelector('.element__title').textContent = this._name;
    this._img.src = this._link;
    this._img.alt = this._name;

    return this._element;
  }

  _likeButtonHandler(event) {
    event.target.classList.toggle('element__like-button_active');
  }

  _removeCardHandler() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._element
      .querySelector('.element__like-button')
      .addEventListener('click', (event) => {
        this._likeButtonHandler(event);
      });
    this._element
      .querySelector('.element__remove-button')
      .addEventListener('click', () => {
        this._removeCardHandler();
      });
    this._img
      .addEventListener('click', () => {
        this._handleCardClick({ name: this._name, link: this._link });
      });
  }
}


