let editPopupButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let closePopupButton = document.querySelector('.popup__close-button');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');
let nameInput = document.querySelector('.popup__text_type_name');
let jobInput = document.querySelector('.popup__text_type_job');
let formElement = document.querySelector('.popup__form');

function openPopup() {
  popup.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

function formSubmitHandler(event) {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup();
}

editPopupButton.addEventListener('click', openPopup);
closePopupButton.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler);
