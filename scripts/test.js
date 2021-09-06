closePopupButton.forEach((item) => {
  item.addEventListener('click', (event) => {
    closePopup(event.target.closest('.popup'));
  });
});

const likeButtonHandler = (event) => {
  event.target.classList.toggle('.element__like-button_active')
};

const openPopupEditProfil = popup => {
  const nameInput = popup.querySelector('.popup__text_type_name');
  const jobInput = popup.querySelector('.popup__text_type_job');
  openPopup(popup);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
};

const openPopup = (popup) => {
  popup.classList.add('popup_opened');
};

const openPopupEditProfil = popup => {
  openPopup(popup);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
};

const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
};

function closePopup() {
  popup.classList.remove('popup_opened');
}

function editProfileFormHandler(event) {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupEditProfile);
}

editPopupButton.addEventListener('click', openPopup(popupEditProfile));
closePopupButton.addEventListener('click', closePopup);

editProfileForm.addEventListener('submit', editProfileFormHandler);

const openPopupAddCard = (() => {
  popupAddCard.classList.add('popup_opened');
});
