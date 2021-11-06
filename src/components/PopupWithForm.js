import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);

    this.popupFormElement = this._popupElement.querySelector('.popup__form');
    this._popupButton = this._popupElement.querySelector('.popup__submit-button');
    this._inputList = Array.from(this.popupFormElement.querySelectorAll('.popup__text'));
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    const formValues = {};

    this._inputList.forEach((inputElement) => {
      formValues[inputElement.name] = inputElement.value;
    });

    return formValues;
  }

  setEventListeners() {
    super.setEventListeners();

    this.popupFormElement.addEventListener('submit', (event) => {
      event.preventDefault();
      this._handleFormSubmit(this._getInputValues())
    });
  }

  close() {
    this.popupFormElement.reset();

    super.close();
  }

  renderLoading(isLoading, title = 'Сохранить', loadingTitle = 'Сохранение...') {
    if (isLoading) {
      this._popupButton.textContent = loadingTitle
    } else {
      this._popupButton.textContent = title
    }
  }
}
