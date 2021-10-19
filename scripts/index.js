import {
  initialCards,
  config,
  editPopupButton,
  addPopupButton
} from "../src/utils/constants.js"
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import PopupWithForm from "../src/components/PopupWithForm.js";
import PopupWithImage from "../src/components/PopupWithImage.js";
import UserInfo from "../src/components/UserInfo.js";
import Section from "../src/components/Section.js"


// информация о пользователе
const userInfo = new UserInfo({
  userName: '.profile__name',
  userJob: '.profile__job'
});

// попап формы редактирования профиля
const popupWithEditProfileForm = new PopupWithForm('.popup_type_edit-profile', (data) => {
  userInfo.setUserInfo(data);
});

popupWithEditProfileForm.setEventListeners();

// передаем информацию о пользователе со страницы в форму
const editProfileFormSubmitHandler = () => {
  const data = userInfo.getUserInfo();
  for (let key in data) {
    popupWithEditProfileForm.popupFormElement.elements[key].value = data[key]
  }
  popupEditProfileValidate.resetValidation();
  popupWithEditProfileForm.open();
}

// настройка валидации формы редактирования профиля
const popupEditProfileValidate = new FormValidator(config, popupWithEditProfileForm.popupFormElement);
popupEditProfileValidate.enableValidation();

editPopupButton.addEventListener('click', editProfileFormSubmitHandler);

// попап с картинкой
const popupOpenImage = new PopupWithImage('.popup_type_open-image');
popupOpenImage.setEventListeners();

const cardPost = new Section({
  items: initialCards,
  renderer: renderCard
}, '.elements')

const createCard = (data) => {
  const handleCardClick = popupOpenImage.open.bind(popupOpenImage);
  return new Card({ data, handleCardClick }, '#card-template');
};

function renderCard (item) {
  const card = createCard(item);
  const cardElement = card.generateCard();
  cardPost.addItem(cardElement);
};

// добавление начальных карточек
cardPost.renderItems();

// попап добавления новой карточки
const popupAddCard = new PopupWithForm('.popup_type_add-card',({ title, image_link }) => {
  const data = {
    name: title,
    link: image_link
  };
  renderCard (data)
});

popupAddCard.setEventListeners();

// настройка валидации формы добавления карточки
const popupAddCardValidate = new FormValidator(config, popupAddCard.popupFormElement);
popupAddCardValidate.enableValidation();

addPopupButton.addEventListener('click', () => {
  popupAddCardValidate.resetValidation();
  popupAddCard.open();
})











