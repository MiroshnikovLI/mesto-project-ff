import {adaNewCard, showCards} from './cards.js';
import {oppenPopup, editProfile} from './modal.js';


// @todo: Темплейт карточки
  
  export const pageContainer = document.querySelector('.page');
  export const cardsContainer = pageContainer.querySelector('.places__list');
  const buttonNewCard = pageContainer.querySelector('.profile__add-button');
  const butonEditProfil = pageContainer.querySelector('.profile__edit-button');
  const popuppNewCard = pageContainer.querySelector('.popup_type_new-card');
  const popupEditProfil = pageContainer.querySelector('.popup_type_edit');
  export const popupImages = pageContainer.querySelector('.popup_type_image');
  export const popupContainerImage = pageContainer.querySelector('.popup__content_content_image');
  export const profileName = pageContainer.querySelector('.profile__title');
  export const profileDescription = pageContainer.querySelector('.profile__description');
  const formEditProfile = document.forms['edit-profile'];
  export const inputName = formEditProfile.name;
  export const inputDescription = formEditProfile.description;
  const formNewPlace = document.forms['new-place'];
  export const newPlaceName = formNewPlace['place-name'];
  export const newLink = formNewPlace.link;
  
// @todo: Слушатели событий

  buttonNewCard.addEventListener('click', () => oppenPopup(popuppNewCard));
  
  butonEditProfil.addEventListener('click', function () { 
    oppenPopup(popupEditProfil);
    inputName.value = profileName.textContent;
    inputDescription.value = profileDescription.textContent;
  });
  
  formEditProfile.addEventListener('submit', (evt) => editProfile(evt, inputName.value, inputDescription.value));
  
  formNewPlace.addEventListener('submit', (evt) => adaNewCard(evt));

// @todo: DOM узлы

export const cardTemplate = pageContainer.querySelector('#card-template').content;

// @todo: Вызов функции показать карточки

showCards();
