import {
  initialCards,
  profileName,
  profileJob,
  popupEditProfile,
  editPopupButton
} from "../src/utils/constants.js"
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import PopupWithForm from "../src/components/PopupWithForm.js";
import PopupWithImage from "../src/components/PopupWithImage.js";
import UserInfo from "../src/components/UserInfo.js"


// информация пользователя
const userInfo = new UserInfo({
  userName: profileName,
  userJob: profileJob
});

// попап формы редактирования профиля
const popupWithEditProfileForm = new PopupWithForm(popupEditProfile, (data) => {
  userInfo.setUserInfo(data);
});

popupWithEditProfileForm.setEventListeners();

const editProfileFormSubmit = () => {
  const data = userInfo.getUserInfo();
  for (let key in data) {
    popupWithEditProfileForm.form.elements[key].value = data[key]
  }
  editProfileValidate.resetValidation();
  popupWithEditProfileForm.open();
}

editPopupButton.addEventListener('click', editProfileFormSubmit);




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
  addCardValidate.disableSubmitButton();
};

popups.forEach((popup) => {
  popup.addEventListener('click', (event) => {
    if (event.target.classList.contains('popup_opened') || event.target.classList.contains('popup__close-button')) {
      closePopup(popup)
    };
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
