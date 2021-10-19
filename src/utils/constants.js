export const cardsContainer = document.querySelector('.elements');
export const popups = document.querySelectorAll('.popup');
export const popupEditProfile = document.querySelector('.popup_type_edit-profile');
export const nameInput = document.querySelector('.popup__text_type_name');
export const jobInput = document.querySelector('.popup__text_type_job');
export const profileName = document.querySelector('.profile__name');
export const profileJob = document.querySelector('.profile__job');
export const editProfileForm = document.querySelector('.popup__form_type_edit-profile');
export const editPopupButton = document.querySelector('.profile__edit-button');
export const popupAddCard = document.querySelector('.popup_type_add-card');
export const addCardForm = document.querySelector('.popup__form_type_add-card');
export const titleInput = document.querySelector('.popup__text_type_title');
export const imageLinkInput = document.querySelector('.popup__text_type_image-link');
export const addPopupButton = document.querySelector('.profile__add-button');
export const popupOpenImage = document.querySelector('.popup_type_open-image');
export const popupImage = popupOpenImage.querySelector('.popup__image');
export const popupImageTitle = popupOpenImage.querySelector('.popup__image-title');

export const initialCards = [
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
