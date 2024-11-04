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
  massUserInfo,
  conteinerLoad,
  pageContainer,
} from "./constant.js";
import { openPopup, closePopup, } from "./modal.js";
import { createCard, deliteCard, likeCard, } from "./card.js";
import { config, apiCard, apiUserInfo, apiEditProfileImage, apiEditProfiInfo, apiNewPlace, } from './api.js';
import { showInputError, hideInputError, toggleButtonState} from './validation.js';

// @todo: Функции вывода информации пользователя на страницу 

function setInfoUserForPage(massUserInfo) {
  profileImage.setAttribute('style', `background-image: url('${massUserInfo.avatar}')`)
  profileName.textContent = massUserInfo.name;
  profileDescription.textContent = massUserInfo.about;   
}

// @todo: Вывести карточки на страницу

function showCards() {
  conteinerLoad.classList.add('load');
  Promise.all([apiCard(), apiUserInfo()])
  .then(([apiCard, apiUserInfo]) =>  {

      massUserInfo.name = apiUserInfo.name;
      massUserInfo.about = apiUserInfo.about;
      massUserInfo.avatar = apiUserInfo.avatar;
      massUserInfo.id = apiUserInfo['_id'];

      setInfoUserForPage(massUserInfo);

      for (let i = 0; i < apiCard.length; i++) {
        cardsContainer.append(
          createCard(apiCard[i], massUserInfo, openPopup, likeCard, setImgPopup),
        )}
    })
    .catch(config.err)
    .finally(() => conteinerLoad.classList.remove('load'));
}

showCards();

// @todo: Слушатели событий

formEditProfileImage.addEventListener("submit", (evt) => editProfileImage(evt, inputEditProfileImage.value));

formDeleteCards.addEventListener("submit", deliteCard);

profileImage.addEventListener("click", () => openPopup(popupNewProfileImage));

buttonNewCard.addEventListener("click", () => openPopup(popuppNewCard));

buttonOpenEditProfileFrom.addEventListener("click", (evt) => {
  openPopup(popupEditProfil);
  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;
});

formEditProfile.addEventListener("submit", (evt) =>
  editProfile(evt, inputName.value, inputDescription.value)
);

formNewPlace.addEventListener("submit", (evt) => submitAddCardForm(evt, massUserInfo));

buttonClosePoppap.forEach((btn) => {
  btn.addEventListener("click", (evt) => {
    closePopup(evt.target.closest('.popup_is-opened'));
  });
});

// @todo: Функция установки слушателя на инпуты формы

function setEventListeners (formSelector) {
  const inputList = Array.from(formSelector.querySelectorAll('.popup__input'));
  const submitButtonSelector = formSelector.querySelector('.popup__button');

  inputList.forEach((inputSelector) => {
      inputSelector.addEventListener('input', () => {
          checkInputValidity(formSelector, inputSelector);
          toggleButtonState(inputList, submitButtonSelector);
      });

      toggleButtonState(inputSelector, submitButtonSelector);
  });

  
};

// @todo: Функция отмена перезагрузки формы и вызова установки слушателя на инпуты формы

function enableValidation () {
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  console.log(formList);
  formList.forEach((formSelector) => {
      formSelector.addEventListener('submit', (evt) => {
          evt.preventDefault();
          setEventListeners(formSelector);
      });
  });
};

// @todo: Функция проверка правильности введенных данных

function checkInputValidity (formSelector, inputSelector) {
  if (!inputSelector.validity.valid) {
      showInputError(formSelector, inputSelector, inputSelector.validationMessage);
  } else {
      hideInputError(formSelector, inputSelector)
  }
};

// @todo: Функция редактирования профиля

function editProfile(evt, title, description) {
  evt.preventDefault();
  infoButtonSeve(evt, true);

  apiEditProfiInfo(title, description)
  .then((ress) => {
    profileName.textContent = ress.name;
    profileDescription.textContent = ress.about;
  })
  .catch(config.err)
  .finally(() => {
    infoButtonSeve(evt);

    closePopup(evt.target.closest('.popup_is-opened'))
  });
}

// @todo: Функции уведомления о сохранение 

function infoButtonSeve (evt, trueFalse) {
  const button = evt.target.querySelector('.button');
  if(trueFalse) {
    button.textContent = 'Сохранение...';
    button.classList.add('popup__button-seve');
  } else {
    button.textContent = 'Сохранить';
    button.classList.remove('popup__button-seve');
  }
}

// @todo: Функция изображения в попапе

function setImgPopup(images) {
  openPopup(popupImages);

  newImage.src = images.currentTarget.src;
  newImage.alt = images.currentTarget.alt;
  titleImage.textContent = images.currentTarget.alt;
}

// @todo: Функция добавления новой карточки

function submitAddCardForm(evt, massUserInfo) {
  evt.preventDefault();

  infoButtonSeve(evt, true);

  const newCard = {};

  newCard.name = newPlaceName.value;
  newCard.link = newLink.value;

  apiNewPlace(newCard)
  .then((ress) => {
    cardsContainer.prepend(
      createCard(ress, massUserInfo, openPopup, likeCard, setImgPopup),
    );
  })
  .catch(config.err)
  .finally(() => { 
    evt.target.reset();
    infoButtonSeve(evt);
    closePopup(evt.target.closest('.popup_is-opened'));
  })
}

// @todo: Функция редактирвания изображения профиля 

function editProfileImage(evt, image) {
  evt.preventDefault();
  infoButtonSeve(evt, true);

  apiEditProfileImage(image)
  .then(ress => {
    profileImage.setAttribute('style', `background-image: url('${image}')`);
    evt.target.reset();
    closePopup(evt.target.closest('.popup_is-opened'));
  })
  .catch(config.err)
  .finally(() => infoButtonSeve(evt));
}

enableValidation();