// @todo: Темплейт карточки
  
  const pageContainer = document.querySelector('.page');
  const cardTemplate = pageContainer.querySelector('#card-template').content;
  const cardsContainer = pageContainer.querySelector('.places__list');
  const buttonNewCard = pageContainer.querySelector('.profile__add-button');
  const ButonEditProfil = pageContainer.querySelector('.profile__edit-button');
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
  ButonEditProfil.addEventListener('click', function(){ oppenPopup(popupEditProfil)});

// @todo: Функция изображения в попапе

  function popupImg(images) {
    newImage = popupContainerImage.querySelector('.popup__image');
    newImage.src = images.currentTarget.src;
    newImage.alt = images.currentTarget.alt;
  }

// @todo: DOM узлы

// @todo: Функция создания карточки

function addCards(name, link) {
  const addCard = cardTemplate.querySelector('.card').cloneNode(true);

  addCard.querySelector('.card__title').textContent = name;
  addCard.querySelector('.card__image').src = link;
  addCard.querySelector('.card__image').alt = name;

  const LikeButtonCard = addCard.querySelector('.card__like-button');
  LikeButtonCard.addEventListener('click', (evt) => likeCard(evt));    
    
  const DeleteButtonCard = addCard.querySelector('.card__delete-button');
  DeleteButtonCard.addEventListener('click', (evt) => deliteCard(evt));
    
  const cardImage = addCard.querySelector('.card__image');
  cardImage.addEventListener('click', (evt) => popupImg(evt));
  cardImage.addEventListener('click', () => oppenPopup(popupImages));

  cardsContainer.append(addCard);
}

// @todo: Функция лайка карточки

function likeCard(like) {
  like.target.classList.toggle('card__like-button_is-active');
}


// @todo: Функция удаления карточки

function deliteCard(card) {
  card.target.parentElement.remove();
}

// @todo: Вывести карточки на страницу

function showCards() {
  for (let i = 0; i < initialCards.length; i++) {
      addCards(initialCards[i].name, initialCards[i].link);
    }
}

showCards();

