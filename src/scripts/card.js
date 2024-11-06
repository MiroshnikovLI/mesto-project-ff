import { cardTemplate } from './constant.js';
import {
  config,
  apiLikePost,
  apiDeleteLikePost,
  apiDeleteCard,
} from './api.js';

// @todo: Функция лайка карточки

export function likeCard(like, cardsValues, likeInfo) {
  if (like.target.classList.value.includes('card__like-button_is-active')) {
    apiDeleteLikePost(cardsValues['_id'])
      .then(config.ressJson)
      .then((ress) => {
        like.target.classList.remove('card__like-button_is-active');
        likeInfo.textContent = ress.likes.length;
      })
      .catch((err) => config.err(err));
  } else {
    apiLikePost(cardsValues['_id'])
      .then(config.ressJson)
      .then((ress) => {
        like.target.classList.add('card__like-button_is-active');
        likeInfo.textContent = ress.likes.length;
      })
      .catch((err) => config.err(err));
  }
}

// @todo: Функция клонирования темплент елемента

function getCardTemplate() {
  const cardsElement = cardTemplate.querySelector('.card').cloneNode(true);
  return cardsElement;
}

// @todo: Функция создания карточки

export function createCard(
  cardsValues,
  userId,
  openPopupDeleteCard,
  likeCard,
  clickForImgCard
) {
  const cardsElement = getCardTemplate();

  const cardImage = cardsElement.querySelector('.card__image');
  const deleteButtonCard = cardsElement.querySelector('.card__delete-button');
  const likeButtonCard = cardsElement.querySelector('.card__like-button');
  const likeInfo = cardsElement.querySelector('.card__like-info');

  cardsElement.querySelector('.card__title').textContent = cardsValues.name;
  cardImage.src = cardsValues.link;
  cardImage.alt = cardsValues.name;

  likeInfo.textContent = cardsValues.likes.length;

  if (!(cardsValues.owner['_id'] === userId)) {
    deleteButtonCard.classList.add('card__delete-button_hidden');
  }
  cardsValues.likes.forEach((element) => {
    if (element['_id'] === userId) {
      likeButtonCard.classList.add('card__like-button_is-active');
    }
  });

  deleteButtonCard.addEventListener('click', (card) =>
    openPopupDeleteCard(card, cardsValues['_id'])
  );

  likeButtonCard.addEventListener('click', (evt) =>
    likeCard(evt, cardsValues, likeInfo)
  );

  cardImage.addEventListener('click', clickForImgCard);

  return cardsElement;
}

// @todo: Функция удаления карточки

export function deleteCard(evt, deletePost, closePopup, popupDeleteCard) {
  evt.preventDefault();
  apiDeleteCard(deletePost)
    .then(config.ressJson)
    .then(() => deletePost.target.closest('.card').remove())
    .then(() => {
      deletePost.idPost = '';
      deletePost.target = '';
      closePopup(popupDeleteCard);
    })
    .catch((err) => config.err(err));
}
