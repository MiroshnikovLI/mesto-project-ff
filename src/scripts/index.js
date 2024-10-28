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
  popupNewProfileImage,
  profileImage,
  formEditProfileImage,
  inputEditProfileImage,
  formDeleteCards,
} from "./constant.js";
import { openPopup, closePopup, } from "./modal.js";
import { createCard, deliteCard, likeCard, } from "./card.js";
import { config, } from './ap.js';

// @todo: Слушатели событий

formDeleteCards.addEventListener("submit", deliteCard);

profileImage.addEventListener("click", () => openPopup(popupNewProfileImage));

buttonNewCard.addEventListener("click", () => openPopup(popuppNewCard));

buttonOpenEditProfileFrom.addEventListener("click", () => {
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

  fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: title,
      about: description,
    })
  })
  .then(config.ressJson)
  .then((ress) => {
    profileName.textContent = ress.name;
    profileDescription.textContent = ress.about;
  })
  .catch(config.err);
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

  fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
    "name": newCard.name,
    "link": newCard.link,
  })})
  .then(config.ressJson)
  .then((ress) => {
    cardsContainer.prepend(
      createCard(ress, openPopup, likeCard, setImgPopup),
    );
  })
  .catch(config.err)
  
  evt.target.reset();

  closePopup(evt.target.closest('.popup_is-opened'));
}

// @todo: Функция редактирвания изображения профиля 

formEditProfileImage.addEventListener("submit", (evt) => { evt.preventDefault(); editProfileImage(evt, inputEditProfileImage.value) });

function editProfileImage(evt, image) {
  console.log(evt);
  fetch('https://nomoreparties.co/v1/wff-cohort-25/users/me/avatar', { 
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: image,
    })
  })
  .then(config.ressJson)
  .then(ress => {
    profileImage.setAttribute('style', `background-image: url('${image}')`);
    evt.target.reset();
    closePopup(evt.target.closest('.popup_is-opened'));
  })
  .catch(config.err);
}

// @todo: Вывести карточки на страницу

function showCards() {
  fetch(`${config.baseUrl}/cards`, { headers: config.headers })
     .then(config.ressJson)
    .then((result) =>  {
      for (let i = 0; i < result.length; i++) {
        cardsContainer.append(
          createCard(result[i], openPopup, likeCard, setImgPopup),
        )}
      console.log(result)
      })
    .catch(config.err); 
}

showCards();