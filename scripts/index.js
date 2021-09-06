const editPopupButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const closePopupButton = document.querySelectorAll('.popup__close-button');
const nameInput = popup.querySelector('.popup__text_type_name');
const jobInput = popup.querySelector('.popup__text_type_job');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const editProfileForm = document.querySelector('.popup__form_type_edit-profile');

const openPopup = (popup) => {
  popup.classList.add('popup_opened');
};

const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
};

const openEditProfilePopup = (popupEditProfile) => {
  openPopup(popupEditProfile);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
};

const editProfileFormHandler = (event) => {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupEditProfile);
};

editPopupButton.addEventListener('click', () => openEditProfilePopup(popupEditProfile));
editProfileForm.addEventListener('submit', editProfileFormHandler);

closePopupButton.forEach((item) => {
  item.addEventListener('click', (event) => {
    closePopup(event.target.closest('.popup'));
  });
});


// ЗАГРУЗКА КАРТОЧЕК НА СТРАНИЦУ

const cardElements = document.querySelector('.elements');
const cardTemplate = document.querySelector('#card-template').content;

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const likeButtonHandler = (event) => {
  event.target.classList.toggle('element__like-button_active');
}; // ОБРАБОТЧИК СОБЫТИЯ ДЛЯ НАВЕШИВАНИЯ ЛАЙКА

const removeCardHandler = (event) => {
  event.target.closest('.element').remove();
}; // ОБРАБОТЧИК СОБЫТИЯ ДЛЯ УДАЛЕНИЯ КАРТОЧКИ

const addCard = (element) => {
  cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  cardElement.querySelector('.element__image').src = element.link;
  cardElement.querySelector('.element__title').textContent = element.name;
  cardElement.querySelector('.element__like-button').addEventListener('click', likeButtonHandler);
  cardElement.querySelector('.element__remove-button').addEventListener('click', removeCardHandler);

  return cardElement;
};

initialCards.forEach ((element) => cardElements.prepend(addCard(element)));

// ДОБАВЛЕНИЕ НОВОЙ КАРТОЧКИ

const addPopupButton = document.querySelector('.profile__add-button');
const popupAddCard = document.querySelector('.popup_type_add-card');
const addCardForm = document.querySelector('.popup__form_type_add-card');
const titleInput = document.querySelector('.popup__text_type_title');
const imageLinkInput = document.querySelector('.popup__text_type_image-link');

const addCardFormHandler = (event) => {
  event.preventDefault();

  const name = titleInput.value;
  const link = imageLinkInput.value;

  cardElements.prepend(addCard({name, link}));

  closePopup(popupAddCard);

  titleInput.value = '';
  imageLinkInput.value = '';
};

addPopupButton.addEventListener('click', () => openPopup(popupAddCard));
addCardForm.addEventListener('submit', addCardFormHandler);



