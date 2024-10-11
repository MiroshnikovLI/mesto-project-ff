// @todo: Темплейт карточки
  
  const pageContainer = document.querySelector('.page');
  const cardsContainer = pageContainer.querySelector('.places__list');
  const buttonNewCard = pageContainer.querySelector('.profile__add-button');
  const butonEditProfil = pageContainer.querySelector('.profile__edit-button');
  const popuppNewCard = pageContainer.querySelector('.popup_type_new-card');
  const popupEditProfil = pageContainer.querySelector('.popup_type_edit');
  const popupImages = pageContainer.querySelector('.popup_type_image');
  const popupContainerImage = pageContainer.querySelector('.popup__content_content_image');
  const profileName = pageContainer.querySelector('.profile__title');
  const profileDescription = pageContainer.querySelector('.profile__description');
  const formEditProfile = document.forms['edit-profile'];
  const inputName = formEditProfile.name;
  const inputDescription = formEditProfile.description;
  const formNewPlace = document.forms['new-place'];
  const newPlaceName = formNewPlace['place-name'];
  const newLink = formNewPlace.link;
  
  const popupAll = pageContainer.querySelectorAll('.popup')


// @todo: Функция открытия попап

  function oppenPopup(popup){
    popup.classList.add('popup_is-opened');
    popup.classList.add('popup_is-animated');
  
    const buttonClosePoppap = popup.querySelector('.popup__close');
    buttonClosePoppap.addEventListener('click', closePopup);

    document.addEventListener('keydown', closePopupEsc);
    popup.addEventListener('click', closePopupClick);
  }

// @todo: функция снятия слушателей 

function removesTheListener() {
  document.removeEventListener('keydown', closePopupEsc);
  document.removeEventListener('click', closePopupClick);
}

// @todo: Функция закрытия попап

  function closePopup() {
  //  Если убирать этот класс анимация пропадает
  //  document.querySelector('.popup_is-opened').classList.remove('popup_is-animated');
    document.querySelector('.popup_is-opened').classList.remove('popup_is-opened');
    removesTheListener();
}

  function closePopupEsc(evt) {
    if(evt.key === 'Escape') {
      closePopup();
    }
  }
  
  function closePopupClick(evt) {
    if(!evt.target) {
      closePopup();
    }
  }

// @todo: Функция редактирования профиля

function editProfile(evt, title, description) {
  evt.preventDefault();

  profileName.textContent = title;
  profileDescription.textContent = description;

  inputName.value = '';
  inputDescription.value = '';

  closePopup();
}

// @todo: Функция добавления новой карточки 

function adaNewCard(evt) {
  evt.preventDefault();

  const newCard = {};
  
  newCard.name = newPlaceName.value;
  newCard.link = newLink.value;
  
  cardsContainer.prepend(createCard(newCard, deliteCard, likeCard, setImgPopup));
  
  closePopup();

  newPlaceName.value = '';
  newLink.value = '';
}

// @todo: Слушатели событий

  buttonNewCard.addEventListener('click', () => oppenPopup(popuppNewCard));
  butonEditProfil.addEventListener('click', function () { 
    oppenPopup(popupEditProfil);
    inputName.value = profileName.textContent;
    inputDescription.value = profileDescription.textContent;
  });
  formEditProfile.addEventListener('submit', (evt) => editProfile(evt, inputName.value, inputDescription.value));
  formNewPlace.addEventListener('submit', (evt) => adaNewCard(evt));

// @todo: Функция изображения в попапе

  function setImgPopup(images) {
    images.target.addEventListener('click', () => oppenPopup(popupImages));
    
    const newImage = popupContainerImage.querySelector('.popup__image');
    const titleImage = popupContainerImage.querySelector('.popup__caption');
    
    newImage.src = images.currentTarget.src;
    newImage.alt = images.currentTarget.alt;
    titleImage.textContent = images.currentTarget.alt;
  }

// @todo: DOM узлы

const cardTemplate = pageContainer.querySelector('#card-template').content;

// @todo: Функция создания карточки


function createCard(cardsValues, deliteCard, likeCard, setImgPopup) {

  const cardsElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardsElement.querySelector('.card__image');
  const deleteButtonCard = cardsElement.querySelector('.card__delete-button');
  const likeButtonCard = cardsElement.querySelector('.card__like-button');
  
  cardsElement.querySelector('.card__title').textContent = cardsValues.name;
  cardsElement.querySelector('.card__image').src = cardsValues.link;
  cardsElement.querySelector('.card__image').alt = cardsValues.name;
  
  deleteButtonCard.addEventListener('click', deliteCard);
  
  likeButtonCard.addEventListener('click', likeCard);    
  
  cardImage.addEventListener('click', setImgPopup);
  
  return cardsElement;
}

// @todo: Функция лайка карточки

function likeCard(like) {
  like.target.classList.toggle('card__like-button_is-active');
}

// @todo: Функция удаления карточки

function deliteCard(evt) {
  evt.target.closest('.card').remove();
}

// @todo: Вывести карточки на страницу

function showCards() {
  for (let i = 0; i < initialCards.length; i++) {
      cardsContainer.prepend(createCard(initialCards[i], deliteCard, likeCard, setImgPopup));
    }
}

showCards();

document.addEventListener('click', (evt) => console.log(evt.target))