import {
  formEditProfile,
  formEditProfileImage,
  formDeleteCards,
  formNewPlace,
  inputEditProfileImage,
  inputName,
  inputDescription,
  popuppNewCard,
  popupImages,
  popupEditProfil,
  popupNewProfileImage,
  popupDeleteCard,
  cardsContainer,
  profileName,
  profileDescription,
  newPlaceName,
  newLink,
  newImage,
  titleImage,
  buttonNewCard,
  buttonOpenEditProfileFrom,
  buttonClosePoppap,
  profileImage,
  massUserInfo,
  conteinerLoad,
  deletePost,
  popupAll,
  enableValidation,
} from './constant.js';
import { openPopup, closePopup, closePopupClick } from './modal.js';
import { createCard, likeCard, deleteCard } from './card.js';
import {
  config,
  apiCard,
  apiUserInfo,
  apiEditProfileImage,
  apiEditProfiInfo,
  apiNewPlace,
} from './api.js';
import { setEventListeners } from './validation.js';

// @todo: Функции вывода информации пользователя на страницу

function setInfoUserForPage(massUserInfo) {
  profileImage.setAttribute(
    'style',
    `background-image: url('${massUserInfo.avatar}')`
  );
  profileName.textContent = massUserInfo.name;
  profileDescription.textContent = massUserInfo.about;
}

// @todo: Вывести карточки на страницу

function showCards() {
  conteinerLoad.classList.add('load');
  Promise.all([apiCard(), apiUserInfo()])
    .then(([apiCard, apiUserInfo]) => {
      massUserInfo.name = apiUserInfo.name;
      massUserInfo.about = apiUserInfo.about;
      massUserInfo.avatar = apiUserInfo.avatar;
      massUserInfo.id = apiUserInfo['_id'];

      setInfoUserForPage(massUserInfo);

      apiCard.forEach((cards) => {
        cardsContainer.append(
          createCard(
            cards,
            massUserInfo.id,
            openPopupDeleteCard,
            likeCard,
            clickForImgCard
          )
        );
      });
    })
    .then(() => conteinerLoad.classList.remove('load'))
    .catch((err) => config.err(err));
}

showCards();

// todo: Функция отмена стандартного поведения формы и вызова функции валидации

function validation(enableValidation) {
  const formList = Array.from(
    document.querySelectorAll(`${enableValidation.formSelector}`)
  );

  formList.forEach((formSelector) => {
    setEventListeners(formSelector, enableValidation);
    formSelector.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
  });
}

validation(enableValidation);

// @todo: Слушатели событий

popupAll.forEach((popup) => {
  popup.addEventListener('click', closePopupClick);
});

formEditProfileImage.addEventListener('submit', (evt) =>
  editProfileImage(evt, inputEditProfileImage.value)
);

formDeleteCards.addEventListener('submit', (evt) =>
  deleteCard(evt, deletePost, closePopup, popupDeleteCard)
);

profileImage.addEventListener('click', () => openPopup(popupNewProfileImage));

buttonNewCard.addEventListener('click', () => openPopup(popuppNewCard));

buttonOpenEditProfileFrom.addEventListener('click', (evt) => {
  openPopup(popupEditProfil);
  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;
});

formEditProfile.addEventListener('submit', (evt) =>
  editProfile(evt, inputName.value, inputDescription.value)
);

formNewPlace.addEventListener('submit', (evt) =>
  submitAddCardForm(evt, massUserInfo.id)
);

buttonClosePoppap.forEach((btn) => {
  const popup = btn.closest('.popup');
  btn.addEventListener('click', (evt) => {
    closePopup(popup);
  });
});

// @todo: Функция редактирования профиля

function editProfile(evt, title, description) {
  infoButtonSeve(evt, true);

  apiEditProfiInfo(title, description)
    .then(config.ressJson)
    .then((ress) => {
      profileName.textContent = ress.name;
      profileDescription.textContent = ress.about;
    })
    .then(() => closePopup(popupEditProfil))
    .catch((err) => config.err(err))
    .finally(() => infoButtonSeve(evt));
}

// @todo: Функции уведомления о сохранение

function infoButtonSeve(evt, trueFalse) {
  const button = evt.target.querySelector('.button');
  if (trueFalse) {
    button.textContent = 'Сохранение...';
    button.classList.add('popup__button-seve');
  } else {
    button.textContent = 'Сохранить';
    button.classList.remove('popup__button-seve');
    validation(enableValidation);
  }
}

// @todo: Функция клика по изображению карточки

function clickForImgCard(images) {
  openPopup(popupImages);

  newImage.src = images.currentTarget.src;
  newImage.alt = images.currentTarget.alt;
  titleImage.textContent = images.currentTarget.alt;
}

// @todo: Функция добавления новой карточки

function submitAddCardForm(evt, userId) {
  infoButtonSeve(evt, true);

  const newCard = {};

  newCard.name = newPlaceName.value;
  newCard.link = newLink.value;

  apiNewPlace(newCard)
    .then(config.ressJson)
    .then((ress) => {
      cardsContainer.prepend(
        createCard(ress, userId, openPopupDeleteCard, likeCard, clickForImgCard)
      );
    })
    .then(() => {
      infoButtonSeve(evt);
      closePopup(popuppNewCard);
      evt.target.reset();
    })
    .catch((err) => {
      config.err(err);
    })
    .finally(() => {
      infoButtonSeve(evt);
    });
}

// @todo: Функция редактирвания изображения профиля

function editProfileImage(evt, image) {
  infoButtonSeve(evt, true);

  apiEditProfileImage(image)
    .then(() => {
      profileImage.setAttribute('style', `background-image: url('${image}')`);
    })
    .then(() => {
      closePopup(popupNewProfileImage);
      evt.target.reset();
    })
    .catch((err) => config.err(err))
    .finally(() => infoButtonSeve(evt));
}

// @todo: Функция открытия попапа удаления карточки

export function openPopupDeleteCard(card, cardsValues) {
  openPopup(popupDeleteCard);

  deletePost.idPost = cardsValues;
  deletePost.target = card.target;
}
