// @todo: Функция открытия попап

export function openPopup(popup) {
  popup.classList.add('popup_is-opened');

  document.addEventListener('keydown', closePopupEsc);
}

// @todo: Функция закрытия попап

export function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closePopupEsc);
}

export function closePopupEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    closePopup(openedPopup);
  }
}

export function closePopupClick(evt) {
  if (!evt.target.closest('.popup__content')) {
    closePopup(evt.target);
  }
}
