import { cardTemplate, popupDeleteCard, deletePost } from './constant.js';
import {
  apiDeleteCard,
  config,
  apiLikePost,
  apiDeleteLikePost,
} from './api.js';
import { closePopup } from './modal.js';

// @todo: Функция лайка карточки

export function likeCard(like, cardsValues, likeInfo) {
  if (like.target.classList.value.includes('card__like-button_is-active')) {
    apiDeleteLikePost(cardsValues['_id'])
      .then((ress) => {
        like.target.classList.remove('card__like-button_is-active');
        likeInfo.textContent = ress.likes.length;
      })
      .catch(config.err);
  } else {
    apiLikePost(cardsValues['_id'])
      .then((ress) => {
        like.target.classList.add('card__like-button_is-active');
        likeInfo.textContent = ress.likes.length;
      })
      .catch(config.err);
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
  massUserInfo,
  openPopup,
  likeCard,
  setImgPopup
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

  if (!(cardsValues.owner['_id'] === massUserInfo.id)) {
    deleteButtonCard.classList.add('card__delete-button_hidden');
  }
  cardsValues.likes.forEach((element) => {
    if (element['_id'] === massUserInfo.id) {
      likeButtonCard.classList.add('card__like-button_is-active');
    }
  });

  deleteButtonCard.addEventListener('click', (card) => {
    openPopup(popupDeleteCard);
    (deletePost.idPost = cardsValues['_id']), (deletePost.target = card.target);
  });

  likeButtonCard.addEventListener('click', (evt) =>
    likeCard(evt, cardsValues, likeInfo)
  );

  cardImage.addEventListener('click', setImgPopup);

  return cardsElement;
}

// @todo: Функция удаления карточки

export function deliteCard(evt) {
  evt.preventDefault();

  apiDeleteCard(deletePost)
    .then(() => {
      closePopup(popupDeleteCard);
      deletePost.target.closest('.card').remove();
      deletePost.idPost = '';
      deletePost.target = '';
    })
    .catch(config.err);
}
