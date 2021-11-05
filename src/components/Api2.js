export default class Api {
  constructor({ address, groupId, token }) {
    this._address = address;
    this._groupId = groupId;
    this._token = token
  }

  _url(query) {
    return `${this._address}/${this._groupId}/${query}`
  }

  _get(query) {
    const options = {
      headers: {
        authorization: this._token
      }
    }

    return fetch(this._url(query), options)
      .then((res) => {
        if(res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

  _set(query, method, body) {
    const options = {
      method,
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }

    return fetch(this._url(query), options)
      // .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
      .then((res) => {
        if(res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

}

const popupApproveDeleteCard = new PopupWithConfirmation('.popup_type_approve-delete-card', setSubmitHandler);
popupApproveDeleteCard.setEventListeners();

function setSubmitHandler(event, card) {
  api.deleteCard(card.getCardId())
  .then(() => {
    card.removeCard();
    popupApproveDeleteCard.close();
  })
  .catch((err) => {
    console.log(`Ошибка при удалении карточки: ${err}`)
  })
}

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleSubmit) {
    super(popupSelector)

    this._handleSubmit = handleSubmit;
    this._submitButton = this._popupElement.querySelector('.popup__submit-button')
  }

  setEventListeners() {
    super.setEventListeners();

    this._submitButton.addEventListener('submit', (event) => {
      event.preventDefault()

      this._handleSubmit(this._card)
    })
  }
}


export default class Section {
  constructor(containerSelector, renderer) {
    this._container = document.querySelector(containerSelector);
    this._renderer = renderer;
  }

  // метод отвечает за отрисовку всех элементов
  renderItems(items) {
    items.forEach(item => {
      this.addItem(item);
    })
  }

  // метод добавляет карточку в контейнер
  addItem(data) {
    const item = this._renderer(data);
    this._container.prepend(item);
  }
}
