import {
  openPopup,
  pageContainer,
  formEditProfile,
  cardsContainer,
  inputName,
  inputDescription,
  profileName,
  profileDescription,
  formNewPlace,
  closePopupThroughTheListener,
  newPlaceName,
  newLink,
  popupImages,
  newImage,
  titleImage,
} from "./modal.js";
import { createCard, deliteCard, likeCard } from "./card.js";
import { initialCards } from "./cards.js";

// @todo: Темплейт карточки

const buttonNewCard = pageContainer.querySelector(".profile__add-button");
const buttonOpenEditProfileFrom = pageContainer.querySelector(
  ".profile__edit-button",
);
const popuppNewCard = pageContainer.querySelector(".popup_type_new-card");
const popupEditProfil = pageContainer.querySelector(".popup_type_edit");
const buttonClosePoppap = pageContainer.querySelectorAll(".popup__close");

// @todo: Слушатели событий

buttonNewCard.addEventListener("click", () => openPopup(popuppNewCard));

buttonOpenEditProfileFrom.addEventListener("click", function () {
  openPopup(popupEditProfil);
  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;
});

formEditProfile.addEventListener("submit", (evt) =>
  editProfile(evt, inputName.value, inputDescription.value),
);

formNewPlace.addEventListener("submit", (evt) => submitAddCardForm(evt));

buttonClosePoppap.forEach((btn) => {
  btn.addEventListener("click", (evt) => {
    closePopupThroughTheListener(evt);
  });
});

// @todo: Функция редактирования профиля

function editProfile(evt, title, description) {
  evt.preventDefault();

  profileName.textContent = title;
  profileDescription.textContent = description;

  closePopupThroughTheListener(evt);
}

// @todo: Функция изображения в попапе

function setImgPopup(images) {
  openPopup(popupImages);

  newImage.src = images.currentTarget.src;
  newImage.alt = images.currentTarget.alt;
  titleImage.textContent = images.currentTarget.alt;
}

// @todo: Функция добавления новой карточки

function submitAddCardForm(evt) {
  evt.preventDefault();

  const newCard = {};

  newCard.name = newPlaceName.value;
  newCard.link = newLink.value;

  cardsContainer.prepend(
    createCard(newCard, deliteCard, likeCard, setImgPopup),
  );

  closePopupThroughTheListener(evt);

  evt.target.reset();
}

// @todo: Вывести карточки на страницу

function showCards() {
  for (let i = 0; i < initialCards.length; i++) {
    cardsContainer.prepend(
      createCard(initialCards[i], deliteCard, likeCard, setImgPopup),
    );
  }
}

// @todo: Вызов функции показать карточки

showCards();
