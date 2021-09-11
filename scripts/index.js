// ЗАГРУЗКА КАРТОЧЕК НА СТРАНИЦУ

const cardElements = document.querySelector('.elements');
const cardTemplate = document.querySelector('#card-template').content;

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

// ОБЪЯВЛЯЕМ ПЕРЕМЕННЫЕ ДЛЯ ПОПАПА РЕДАКТИРОВАНИЯ ФОРМЫ ПРОФИЛЯ

const popup = document.querySelector('.popup');
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const nameInput = popup.querySelector('.popup__text_type_name');
const jobInput = popup.querySelector('.popup__text_type_job');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const editProfileForm = document.querySelector('.popup__form_type_edit-profile');
const editPopupButton = document.querySelector('.profile__edit-button');
const closePopupButtons = document.querySelectorAll('.popup__close-button');

// ОБЪЯВЛЯЕМ ПЕРЕМЕННЫЕ ДЛЯ ПОПАПА ДОБАВЛЕНИЯ НОВОЙ КАРТОЧКИ

const popupAddCard = document.querySelector('.popup_type_add-card');
const addCardForm = document.querySelector('.popup__form_type_add-card');
const titleInput = document.querySelector('.popup__text_type_title');
const imageLinkInput = document.querySelector('.popup__text_type_image-link');
const addPopupButton = document.querySelector('.profile__add-button');

// ОБЪЯВЛЯЕМ ПЕРЕМЕННЫЕ ДЛЯ ПОПАПА ОТКРЫТИЯ ФОТОГРАФИИ КАРТОЧКИ

const popupOpenImage = document.querySelector('.popup_type_open-image');
const popupImage = popupOpenImage.querySelector('.popup__image');
const popupImageTitle = popupOpenImage.querySelector('.popup__image-title');

// ОБЪЯВЛЯЕМ ФУНКЦИИ

const openPopup = (popup) => {
  popup.classList.add('popup_opened');
}; // универсальная функция открытия попапа

const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
}; // универсальная функция закрытия попапа

const openEditProfilePopup = (popupEditProfile) => {
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

const likeButtonHandler = (event) => {
  event.target.classList.toggle('element__like-button_active');
}; // обработчик события для навешивания лайка

const removeCardHandler = (event) => {
  event.target.closest('.element').remove();
}; // обработчик события для удаления карточки

const popupOpenImageHandler = (event) => {
  popupImage.src = event.target.src;
  popupImageTitle.textContent = event.target.closest('.element').querySelector('.element__title').textContent;
  openPopup(popupOpenImage);
}; // обработчик события для открытия попапа с фотографией карточки

const addCard = (element) => {
  cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  cardElement.querySelector('.element__image').src = element.link;
  cardElement.querySelector('.element__image').alt = element.name;
  cardElement.querySelector('.element__title').textContent = element.name;
  cardElement.querySelector('.element__like-button').addEventListener('click', likeButtonHandler);
  cardElement.querySelector('.element__remove-button').addEventListener('click', removeCardHandler);
  cardElement.querySelector('.element__image').addEventListener('click', popupOpenImageHandler);

  return cardElement;
}; // добавление карточки

const addCardFormHandler = (event) => {
  event.preventDefault();

  const name = titleInput.value;
  const link = imageLinkInput.value;

  cardElements.prepend(addCard({name, link}));

  closePopup(popupAddCard);

  titleInput.value = '';
  imageLinkInput.value = '';
}; // обработчик события формы добавления новой карточки

initialCards.forEach ((element) => cardElements.prepend(addCard(element))); // добавление начальных карточек на страницу

closePopupButtons.forEach((item) => {
  item.addEventListener('click', (event) => {
    closePopup(event.target.closest('.popup'));
  });
}); // кнопки закрытия попапов

// СЛУШАТЕЛИ СОБЫТИЙ

editPopupButton.addEventListener('click', () => openEditProfilePopup(popupEditProfile));
editProfileForm.addEventListener('submit', editProfileFormHandler);
addPopupButton.addEventListener('click', () => openPopup(popupAddCard));
addCardForm.addEventListener('submit', addCardFormHandler);
