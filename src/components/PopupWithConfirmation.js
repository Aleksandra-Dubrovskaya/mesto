import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector)

    this._submitButton = this._popupElement.querySelector('.popup__submit-button')
  }

  setSubmitHandler(handleSubmit) {
    this._handleSubmit = handleSubmit
  }

  setEventListeners() {
    super.setEventListeners();

    this._submitButton.addEventListener('click', (event) => {
      event.preventDefault()

      this._handleSubmit()
    })
  }
}
