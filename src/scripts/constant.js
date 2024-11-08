// @todo: Основной контейнер

export const pageContainer = document.querySelector('.page');

// @todo: Карточка

export const cardsContainer = pageContainer.querySelector('.places__list');

// @todo: Попапы

export const popupImages = pageContainer.querySelector('.popup_type_image');
export const newImage = popupImages.querySelector('.popup__image');
export const titleImage = popupImages.querySelector('.popup__caption');
export const popupNewProfileImage = pageContainer.querySelector(
  '.popup_edit_profile-image'
);
export const popupAll = pageContainer.querySelectorAll('.popup');

// @todo: Профиль

export const profileName = pageContainer.querySelector('.profile__title');
export const profileDescription = pageContainer.querySelector(
  '.profile__description'
);
export const profileImage = pageContainer.querySelector('.profile__image');

// @todo: Форма редактирование профиля

export const formEditProfile = document.forms['edit-profile'];
export const inputName = formEditProfile.name;
export const inputDescription = formEditProfile.description;

// @todo: Форма редактирование изброжения профиля

export const formEditProfileImage = document.forms['edit-image-profile'];
export const inputEditProfileImage = formEditProfileImage.link;

// @todo: Форма новое место

export const formNewPlace = document.forms['new-place'];
export const newPlaceName = formNewPlace['place-name'];
export const newLink = formNewPlace.link;

// @todo: Форма удаления карточки

export const formDeleteCards = document.forms['delete-card'];
export const popupDeleteCard =
  pageContainer.querySelector('.popup_delete-card');

// @todo: Ошибка соеденения с сервером

export const errorConnect = pageContainer.querySelector('.error__connect');
export const errorTitle = errorConnect.querySelector('.error__title');
export const errorText = errorConnect.querySelector('.error__text');

// @todo: Контейнер загрузки страницы

export const conteinerLoad = pageContainer.querySelector('.places');

// @todo: Темплейт карточки

export const buttonNewCard = pageContainer.querySelector(
  '.profile__add-button'
);
export const buttonOpenEditProfileFrom = pageContainer.querySelector(
  '.profile__edit-button'
);
export const popuppNewCard = pageContainer.querySelector(
  '.popup_type_new-card'
);
export const popupEditProfil = pageContainer.querySelector('.popup_type_edit');
export const buttonClosePoppap =
  pageContainer.querySelectorAll('.popup__close');

// @todo: DOM узлы

export const cardTemplate =
  pageContainer.querySelector('#card-template').content;

// @todo: Массив для удаления поста на странице и на сервере

export const deletePost = {
  idPost: '',
  target: '',
};

// @todo: Массив информации о пользователе

export const massUserInfo = {
  name: '',
  about: '',
  avatar: '',
  id: '',
};

// @todo: Массив валидации

export const cardElement = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};

//
