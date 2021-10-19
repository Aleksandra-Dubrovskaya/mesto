import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);

    this.popupFormElement = this._popupElement.querySelector('.popup__form');
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    const formValues = {};
    const inputList = Array.from(this.popupFormElement.querySelectorAll('.popup__text'));

    inputList.forEach((inputElement) => {
      formValues[inputElement.name] = inputElement.value;
    });

    return formValues;
  }

  setEventListeners() {
    super.setEventListeners();

    this.popupFormElement.addEventListener('submit', (event) => {
      event.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.close();
    });
  }

  close() {
    this.popupFormElement.reset();

    super.close();
  }
}
