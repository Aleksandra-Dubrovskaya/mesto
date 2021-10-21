export const editPopupButton = document.querySelector('.profile__edit-button');
export const addPopupButton = document.querySelector('.profile__add-button');

import baikalImage from '../images/cards/baikal.jpeg';
import kholmogorskyRayonImage from '../images/cards/kholmogorsky-rayon.jpeg';
import kamchatkaImage from '../images/cards/kamchatka.jpeg';
import ivanovoImage from '../images/cards/ivanovo.jpeg';
import chelyabinskOblastImage from '../images/cards/chelyabinsk-oblast.jpeg';
import arkhyzImage from '../images/cards/arkhyz.jpeg';

export const initialCards = [
  {
    name: 'Байкал',
    link: baikalImage
  },
  {
    name: 'Холмогорский район',
    link: kholmogorskyRayonImage
  },
  {
    name: 'Камчатка',
    link: kamchatkaImage
  },
  {
    name: 'Иваново',
    link: ivanovoImage
  },
  {
    name: 'Челябинская область',
    link: chelyabinskOblastImage
  },
  {
    name: 'Архыз',
    link: arkhyzImage
  }
];

export const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__text',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__text_type_error',
  errorClass: '.popup__error'
};
