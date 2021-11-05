import "./index.css";
import {
  config,
  editPopupButton,
  addPopupButton,
  updateAvatarImageButton,
} from "../utils/constants.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js"
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import Api from "../components/Api.js";

let userId = null;

const cardPost = new Section('.elements', renderCard);

const api = new Api ({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-29",
  headers: {
    "authorization": "68b487ea-9941-4a24-8c2a-4ecc7bd99a0c",
    "content-type": "application/json"
  }
});

// информация о пользователе
const userInfo = new UserInfo({
  userName: '.profile__name',
  userJob: '.profile__job',
  userAvatar: '.profile__avatar'
});

Promise.all([api.getUserData(), api.getInitialCards()])
  .then(([userData, cardsData]) => {
    const { name, about, avatar, _id} = userData;
    userInfo.setUserInfo({ username: name, userjob: about });
    userInfo.setUserAvatar({ useravatar: avatar });
    userId = _id;

    cardPost.renderItems(cardsData);
  })
  .catch((err) => {
    console.log(`Ошибка при получении данных: ${err}`)
  })

// попап формы редактирования профиля
const popupWithEditProfileForm = new PopupWithForm('.popup_type_edit-profile',
(data) => {
  popupWithEditProfileForm.renderLoading(true)
  api.setUserData({
    name: data.username,
    about: data.userjob
  })
  .then((info) => {
    userInfo.setUserInfo({
      username: info.name,
      userjob: info.about
    })
    popupWithEditProfileForm.close();
  })
  .catch((err) => {
    console.log(`Ошибка при обновлении информации о пользователе: ${err}`)
  })
  .finally(() => {
    popupWithEditProfileForm.renderLoading(false)
  })
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

// попап формы редактирования аватара

const popupUpdateAvatarForm = new PopupWithForm('.popup_type_update-avatar',
(data) => {
  popupUpdateAvatarForm.renderLoading(true)
  api.setUserAvatar({
    avatar: data.avatar_link
  })
  .then((info) => {
    userInfo.setUserAvatar({ useravatar: info.avatar });
    popupUpdateAvatarForm.close();
  })
  .catch((err) => {
    console.log(`Ошибка при изменении аватара пользователя: ${err}`)
  })
  .finally(() => {
    popupUpdateAvatarForm.renderLoading(false)
  })
});

popupUpdateAvatarForm.setEventListeners();

const popupUpdateAvatarValidate = new FormValidator(config, popupUpdateAvatarForm.popupFormElement);
popupUpdateAvatarValidate.enableValidation();

updateAvatarImageButton.addEventListener('click', () => {
  popupUpdateAvatarValidate.resetValidation();
  popupUpdateAvatarForm.open();
})

// попап с картинкой
const popupOpenImage = new PopupWithImage('.popup_type_open-image');
popupOpenImage.setEventListeners();

// попап удаления карточки

const popupApproveDeleteCard = new PopupWithConfirmation('.popup_type_approve-delete-card');
popupApproveDeleteCard.setEventListeners();

// создание карточки

function createCard(data) {
  const handleCardClick = popupOpenImage.open.bind(popupOpenImage);

  const card = new Card({
    data,
    handleCardClick,
    handleLikes: (card) => {
      if (card.isLiked()) {
        api.deleteLike(card.getCardId())
        .then((data) => {
          card.setLikes(data.likes)
        })
        .catch((err) => {
          console.log(`Ошибка при постановке лайка: ${err}`)
        })
      } else {
        api.setLike(card.getCardId())
        .then((data) => {
          card.setLikes(data.likes)
        })
        .catch((err) => {
          console.log(`Ошибка при постановке лайка: ${err}`)
        })
      }
    },
    handleRemove: (card) => {
      popupApproveDeleteCard.open()
      popupApproveDeleteCard.setSubmitHandler(() => {
        api.deleteCard(card.getCardId())
        .then(() => {
          card.removeCard()
          popupApproveDeleteCard.close()
        })
        .catch((err) => {
          console.log(`Ошибка при удалении карточки: ${err}`)
        })
      })
    }
  },
  '#card-template', userId);

  return card.generateCard()
};

function renderCard(data) {
  const cardElement = createCard(data);
  return cardElement
}

// попап добавления новой карточки

const popupAddCard = new PopupWithForm('.popup_type_add-card',
(data) => {
  popupAddCard.renderLoading(true)
  api.addNewCard({
    name: data.title,
    link: data.image_link
  })
  .then((data) => {
    cardPost.addItem(data)
    popupAddCard.close();
  })
  .catch((err) => {
    console.log(`Ошибка при добавлении новой карточки: ${err}`)
  })
  .finally(() => {
    popupAddCard.renderLoading(false)
  })
});

popupAddCard.setEventListeners();

// настройка валидации формы добавления карточки

const popupAddCardValidate = new FormValidator(config, popupAddCard.popupFormElement);
popupAddCardValidate.enableValidation();

addPopupButton.addEventListener('click', () => {
  popupAddCardValidate.resetValidation();
  popupAddCard.open();
})











