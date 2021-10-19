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
  userName: '.profile__name',
  userJob: '.profile__job'
});

// попап формы редактирования профиля
const popupWithEditProfileForm = new PopupWithForm('.profile__edit-button', (data) => {
  userInfo.setUserInfo(data);
});

popupWithEditProfileForm.setEventListeners();

const editProfileFormSubmit = () => {
  const data = userInfo.getUserInfo();
  for (let key in data) {
    popupWithEditProfileForm.form.elements[key].value = data[key]
  }
  // editProfileValidate.resetValidation();
  popupWithEditProfileForm.open();
}

editPopupButton.addEventListener('click', editProfileFormSubmit);

