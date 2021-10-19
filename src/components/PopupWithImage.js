import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  open({ name, link }) {
    this._popupElement.querySelector('.popup__image-title').textContent = name;
    const imageElement = this._popupElement.querySelector('.popup__image');
    imageElement.src = link;
    imageElement.alt = `Изображение ${name}`;

    super.open();
  }
}
