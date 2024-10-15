// @todo: Функция открытия попап

export function openPopup(popup) {
  popup.classList.add("popup_is-opened");

  document.addEventListener("keydown", closePopupEsc);
  popup.addEventListener("click", closePopupClick);
}

// @todo: Функция закрытия попап

export function closePopup(evt) {
  evt.target.closest(".popup_is-opened").classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closePopupEsc);
  evt.target.removeEventListener("click", closePopupClick);
}

export function closePopupEsc(evt) {
  if (evt.key === "Escape") {
    document
      .querySelector(".popup_is-opened")
      .removeEventListener("click", closePopupClick);
    document.removeEventListener("keydown", closePopupEsc);
    document
      .querySelector(".popup_is-opened")
      .classList.remove("popup_is-opened");
  }
}

export function closePopupClick(evt) {
  if (!evt.target.closest(".popup__content")) {
    document
      .querySelector(".popup_is-opened")
      .removeEventListener("click", closePopupClick);
    document.removeEventListener("keydown", closePopupEsc);
    evt.target.closest(".popup_is-opened").classList.remove("popup_is-opened");
  }
}
