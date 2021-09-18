const closePopupByPress = (event) => {
  if (event.key === 'Escape' || event.target.classList.contains('popup_opened')) {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
};

const popupSubmitButton = document.querySelectorAll('.popup__submit-button');
  popupSubmitButton.forEach((item) => {
    item.classList.add('.popup__submit-button_disabled');
  });

  submitPopupButtons.classList.add('.popup__submit-button_disabled');
  submitPopupButtons.setAttribute('disabled', true);
