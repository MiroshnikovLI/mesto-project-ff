// @todo: Темплейт карточки
  
  const pageContainer = document.querySelector('.page');
  const cardsContainer = pageContainer.querySelector('.places__list');
  const buttonNewCard = pageContainer.querySelector('.profile__add-button');
  const butonEditProfil = pageContainer.querySelector('.profile__edit-button');
  const popuppNewCard = pageContainer.querySelector('.popup_type_new-card');
  const popupEditProfil = pageContainer.querySelector('.popup_type_edit');
  const popupImages = pageContainer.querySelector('.popup_type_image');
  const popupContainerImage = pageContainer.querySelector('.popup__content_content_image');

// @todo: Функция открытия попап

  function oppenPopup(popup){
    popup.classList.add('popup_is-opened');
  
    const buttonClosePoppap = popup.querySelector('.popup__close');
    buttonClosePoppap.addEventListener('click', (evt) => closePopup(evt));
  }

// @todo: Функция закрытия попап

  function closePopup(close) {
    close.target.parentElement.parentElement.classList.remove('popup_is-opened');
  }

// @todo: Слушатели событий

  buttonNewCard.addEventListener('click', function(){ oppenPopup(popuppNewCard)});
  butonEditProfil.addEventListener('click', function(){ oppenPopup(popupEditProfil)});

// @todo: Функция изображения в попапе

  function popupImg(images) {
    newImage = popupContainerImage.querySelector('.popup__image');
    newImage.src = images.currentTarget.src;
    newImage.alt = images.currentTarget.alt;
  }

// @todo: DOM узлы

const cardTemplate = pageContainer.querySelector('#card-template').content;

// @todo: Функция создания карточки


function createCard(name, link, deliteCard, likeCard, popupImg) {

  const cardsElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardsElement.querySelector('.card__image');
  const deleteButtonCard = cardsElement.querySelector('.card__delete-button');
  const likeButtonCard = cardsElement.querySelector('.card__like-button');
  
  cardsElement.querySelector('.card__title').textContent = name;
  cardsElement.querySelector('.card__image').src = link;
  cardsElement.querySelector('.card__image').alt = name;
  
  deleteButtonCard.addEventListener('click', (evt) => deliteCard(evt));
  
  likeButtonCard.addEventListener('click', (evt) => likeCard(evt));    
  
  cardImage.addEventListener('click', (evt) => popupImg(evt));
  cardImage.addEventListener('click', () => oppenPopup(popupImages));
  
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
    cardsContainer.prepend(createCard(initialCards[i].name, initialCards[i].link, deliteCard, likeCard, popupImg));
    }
}

showCards();

