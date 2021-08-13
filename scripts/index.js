let editPopupButton = document.querySelector('.edit-button');
let popup = document.querySelector('.popup');
let closePopupButton = document.querySelector('.close-button');
let nameInput = document.querySelector('.popup__name');
let jobInput = document.querySelector('.popup__job');
let formElement = document.querySelector('.popup__form');
let submitButton = document.querySelector('.submit-button');

function openPopup() {
  if (!popup.classList.contains('popup_opened')) {
    nameInput.value = document.querySelector('.profile__name').textContent;
    jobInput.value = document.querySelector('.profile__job').textContent;
  }
  popup.classList.add('popup_opened');
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

editPopupButton.addEventListener('click', openPopup);
closePopupButton.addEventListener('click', closePopup);

function formSubmitHandler(event) {
  event.preventDefault();
  document.querySelector('.profile__name').textContent = nameInput.value;
  document.querySelector('.profile__job').textContent = jobInput.value;
  closePopup();
}

formElement.addEventListener('submit', formSubmitHandler);
