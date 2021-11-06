import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);

    this._imageTitle = this._popupElement.querySelector('.popup__image-title');
    this._imageElement = this._popupElement.querySelector('.popup__image');
  }

  open({ name, link }) {
    this._imageTitle.textContent = name;
    this._imageElement.src = link;
    this._imageElement.alt = `Изображение ${name}`;

    super.open();
  }
}
