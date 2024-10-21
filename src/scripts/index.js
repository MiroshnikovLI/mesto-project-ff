import {
  formEditProfile,
  cardsContainer,
  inputName,
  inputDescription,
  profileName,
  profileDescription,
  formNewPlace,
  newPlaceName,
  newLink,
  popupImages,
  newImage,
  titleImage,
  buttonNewCard,
  buttonOpenEditProfileFrom,
  popuppNewCard,
  popupEditProfil,
  buttonClosePoppap,
} from "./constant.js";
import { openPopup, closePopup } from "./modal.js";
import { createCard, deliteCard, likeCard } from "./card.js";
import { initialCards } from "./cards.js";

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
    closePopup(evt.target.closest('.popup_is-opened'));
  });
});

// @todo: Функция редактирования профиля

function editProfile(evt, title, description) {
  evt.preventDefault();

  profileName.textContent = title;
  profileDescription.textContent = description;

  closePopup(evt.target.closest('.popup_is-opened'));
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

  closePopup(evt.target.closest('.popup_is-opened'));

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
