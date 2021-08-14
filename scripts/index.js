let editPopupButton = document.querySelector('.edit-button');
let popup = document.querySelector('.popup');
let closePopupButton = document.querySelector('.close-button');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');
let nameInput = document.querySelector('.popup__name');
let jobInput = document.querySelector('.popup__job');
let formElement = document.querySelector('.popup__form');
let submitButton = document.querySelector('.submit-button');

function togglePopup() {
  if (!popup.classList.contains('popup_opened')) {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
  } else {
    nameInput.value != profileName.textContent;
    jobInput.value != profileJob.textContent;
  }
  popup.classList.toggle('popup_opened');
}

editPopupButton.addEventListener('click', togglePopup);
closePopupButton.addEventListener('click', togglePopup);

function formSubmitHandler(event) {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  togglePopup();
}

formElement.addEventListener('submit', formSubmitHandler);
