import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

const initialCards = [
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  }
];

const cardsContainer = document.querySelector('.elements');
const popups = document.querySelectorAll('.popup');
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const nameInput = document.querySelector('.popup__text_type_name');
const jobInput = document.querySelector('.popup__text_type_job');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const editProfileForm = document.querySelector('.popup__form_type_edit-profile');
const editPopupButton = document.querySelector('.profile__edit-button');
const popupAddCard = document.querySelector('.popup_type_add-card');
const addCardForm = document.querySelector('.popup__form_type_add-card');
const popupAddCardSubmitButton = popupAddCard.querySelector('.popup__submit-button');
const titleInput = document.querySelector('.popup__text_type_title');
const imageLinkInput = document.querySelector('.popup__text_type_image-link');
const addPopupButton = document.querySelector('.profile__add-button');
const popupOpenImage = document.querySelector('.popup_type_open-image');
const popupImage = popupOpenImage.querySelector('.popup__image');
const popupImageTitle = popupOpenImage.querySelector('.popup__image-title');

const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByEsc);
};

const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByEsc);
}; // универсальная функция закрытия попапа

const closePopupByEsc = (event) => {
  if (event.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
};

const openEditProfilePopup = () => {
  openPopup(popupEditProfile);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}; // функция открытия попапа редактирования формы профиля

const editProfileFormHandler = (event) => {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupEditProfile);
}; // обработчик события формы редактирования профиля


function popupOpenImageHandler(name, link) {
  popupImage.src = link;
  popupImageTitle.textContent = name;
  popupImage.alt = name;

  openPopup(popupOpenImage);
}

const createCard = (data, cardSelector, popupOpenImageHandler) => {
  return new Card(data, cardSelector, popupOpenImageHandler);
}

const renderCard = (card) => {
  const cardElement = card.generateCard();
  cardsContainer.prepend(cardElement);
};

initialCards.forEach((item) => {
  const card = createCard(item, '#card-template', popupOpenImageHandler);
  renderCard(card);
});

const addCardFormHandler = (event) => {
  event.preventDefault();

  const data = {
    name: titleInput.value,
    link: imageLinkInput.value,
  };

  const card = createCard(data, '#card-template', popupOpenImageHandler);
  renderCard(card);

  closePopup(popupAddCard);

  addCardForm.reset();

  popupAddCardSubmitButton.classList.add('popup__submit-button_disabled');
  popupAddCardSubmitButton.setAttribute('disabled', true);
};

popups.forEach((popup) => {
  popup.addEventListener('click', (event) => {
    if (event.target.classList.contains('popup_opened')) {
      closePopup(popup)
    }
    if (event.target.classList.contains('popup__close-button')) {
      closePopup(popup)
    }
  });
});

editPopupButton.addEventListener('click', () => {
  editProfileValidate.resetValidation();
  openEditProfilePopup(popupEditProfile)
});
editProfileForm.addEventListener('submit', editProfileFormHandler);
addPopupButton.addEventListener('click', () => {
  addCardValidate.resetValidation();
  openPopup(popupAddCard)
});
addCardForm.addEventListener('submit', addCardFormHandler);

const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__text',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__text_type_error',
  errorClass: '.popup__error'
};

const editProfileValidate = new FormValidator(config, popupEditProfile);
editProfileValidate.enableValidation();
const addCardValidate = new FormValidator(config, popupAddCard);
addCardValidate.enableValidation();

