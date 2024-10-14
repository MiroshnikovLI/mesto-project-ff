export const pageContainer = document.querySelector(".page");
export const cardsContainer = pageContainer.querySelector(".places__list");
export const popupImages = pageContainer.querySelector(".popup_type_image");
export const newImage = popupImages.querySelector(".popup__image");
export const titleImage = popupImages.querySelector(".popup__caption");
export const profileName = pageContainer.querySelector(".profile__title");
export const profileDescription = pageContainer.querySelector(
  ".profile__description",
);
export const formEditProfile = document.forms["edit-profile"];
export const formNewPlace = document.forms["new-place"];
export const inputName = formEditProfile.name;
export const inputDescription = formEditProfile.description;
export const newPlaceName = formNewPlace["place-name"];
export const newLink = formNewPlace.link;

// @todo: Функция открытия попап

export function openPopup(popup) {
  popup.classList.add("popup_is-opened");

  document.addEventListener("keydown", closePopupEsc);
  popup.addEventListener("click", closePopupClick);
}

// @todo: Функция закрытия попап

export function closePopupThroughTheListener(evt) {
  removesTheListener();
  evt.target.closest(".popup_is-opened").classList.remove("popup_is-opened");
}

function closePopup() {
  removesTheListener();
  document
    .querySelector(".popup_is-opened")
    .classList.remove("popup_is-opened");
}

export function closePopupEsc(evt) {
  if (evt.key === "Escape") {
    closePopup();
  }
}

export function closePopupClick(evt) {
  if (!evt.target.closest(".popup__content")) {
    closePopup();
  }
}

// @todo: функция снятия слушателей

function removesTheListener() {
  const removeClickInNotPopup = document.querySelector(".popup_is-opened");
  document.removeEventListener("keydown", closePopupEsc);
  removeClickInNotPopup.removeEventListener("click", closePopupClick);
}
