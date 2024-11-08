import './pages/index.css';

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
    cardElement,
  } from './scripts/constant.js';
  import { openPopup, closePopup, closePopupClick } from './scripts/modal.js';
  import { createCard, likeCard, deleteCard } from './scripts/card.js';
  import {
    apiCard,
    apiUserInfo,
    apiEditProfileImage,
    apiEditProfiInfo,
    apiNewPlace,
    configSetings,
  } from './scripts/api.js';
  import { enableValidation, clearValidation, } from './scripts/validation.js';
  
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
  
  enableValidation(cardElement);
  
  // @todo: Слушатели событий
  
    // Слушатели на кнопки сайта
    
    profileImage.addEventListener('click', () => {
      clearValidation(popupNewProfileImage);
      openPopup(popupNewProfileImage);
    });

    buttonNewCard.addEventListener('click', () => {
      clearValidation(popuppNewCard);
      openPopup(popuppNewCard)
    });

    buttonOpenEditProfileFrom.addEventListener('click', (evt) => {
      enableValidation(popupEditProfil);
      openPopup(popupEditProfil);
      inputName.value = profileName.textContent;
      inputDescription.value = profileDescription.textContent;
    });

    // Слушатели на попапы сайта
    
    popupAll.forEach((popup) => {
      popup.addEventListener('click', closePopupClick);
    });
  
    buttonClosePoppap.forEach((btn) => {
      const popup = btn.closest('.popup');
      btn.addEventListener('click', (evt) => {
        closePopup(popup);
      });
    });

    // Слушатели на отправку формы сайта

    formEditProfileImage.addEventListener('submit', (evt) => 
      editProfileImage(evt, inputEditProfileImage.value)
    );
  
    formDeleteCards.addEventListener('submit', (evt) =>
      deleteCard(evt, deletePost, closePopup, popupDeleteCard)
    );

    formEditProfile.addEventListener('submit', (evt) => 
      editProfile(evt, inputName.value, inputDescription.value)
    );
    
    formNewPlace.addEventListener('submit', (evt) => 
      submitAddCardForm(evt, massUserInfo.id)
    );
  
  // @todo: Функция редактирования профиля
  
  function editProfile(evt, title, description) {
    evt.preventDefault();
    infoButtonSeve(evt, true);
  
    apiEditProfiInfo(title, description)
      .then((ress) => {
        profileName.textContent = ress.name;
        profileDescription.textContent = ress.about;
      })
      .then(() => closePopup(popupEditProfil))
      .catch((err) => configSetings.err(err))
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
      enableValidation(cardElement);
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
    evt.preventDefault();
    infoButtonSeve(evt, true);
  
    const newCard = {};
  
    newCard.name = newPlaceName.value;
    newCard.link = newLink.value;
  
    apiNewPlace(newCard)
      .then((ress) => {
        cardsContainer.prepend(
          createCard(ress, userId, openPopupDeleteCard, likeCard, clickForImgCard)
        );
      })
      .then(() => {
        closePopup(popuppNewCard);
        evt.target.reset();
      })
      .catch((err) => {
        configSetings.err(err);
      })
      .finally(() => {
        infoButtonSeve(evt);
      });
  }
  
  // @todo: Функция редактирвания изображения профиля
  
  function editProfileImage(evt, image) {
    evt.preventDefault();
    infoButtonSeve(evt, true);
  
    apiEditProfileImage(image)
      .then(() => {
        profileImage.setAttribute('style', `background-image: url('${image}')`);
      })
      .then(() => {
        closePopup(popupNewProfileImage);
        evt.target.reset();
      })
      .catch((err) => configSetings.err(err))
      .finally(() => infoButtonSeve(evt));
  }
  
  // @todo: Функция открытия попапа удаления карточки
  
  export function openPopupDeleteCard(evt, cardsValues) {
    openPopup(popupDeleteCard);
  
    deletePost.idPost = cardsValues;
    deletePost.target = evt.target;
  }
  
