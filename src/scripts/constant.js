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

// @todo: Темплейт карточки

export const buttonNewCard = pageContainer.querySelector(
  ".profile__add-button",
);
export const buttonOpenEditProfileFrom = pageContainer.querySelector(
  ".profile__edit-button",
);
export const popuppNewCard = pageContainer.querySelector(
  ".popup_type_new-card",
);
export const popupEditProfil = pageContainer.querySelector(".popup_type_edit");
export const buttonClosePoppap =
  pageContainer.querySelectorAll(".popup__close");

// @todo: DOM узлы

export const cardTemplate =
  pageContainer.querySelector("#card-template").content;
