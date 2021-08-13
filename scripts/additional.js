let editPopupButton = document.querySelector('.edit-button');
let popup = document.querySelector('.popup');
let closePopupButton = document.querySelector('.close-button');
let nameInput = document.querySelector('.popup__name');
let jobInput = document.querySelector('.popup__job');
let formElement = document.querySelector('.popup__form');
let submitButton = document.querySelector('.submit-button');

function togglePopup() {
  if (!popup.classList.contains('popup_opened')) {
    nameInput.value = document.querySelector('.profile__name').textContent;
    jobInput.value = document.querySelector('.profile__job').textContent;
  } else {
    nameInput.value != document.querySelector('.profile__name').textContent;
    jobInput.value != document.querySelector('.profile__job').textContent;
  }
  popup.classList.toggle('popup_opened');
}

editPopupButton.addEventListener('click', togglePopup);
closePopupButton.addEventListener('click', togglePopup);

function formSubmitHandler(event) {
  event.preventDefault();
  document.querySelector('.profile__name').textContent = nameInput.value;
  document.querySelector('.profile__job').textContent = jobInput.value;
  togglePopup();
}

formElement.addEventListener('submit', formSubmitHandler);
