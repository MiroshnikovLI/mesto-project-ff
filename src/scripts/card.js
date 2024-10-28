import { cardTemplate, popupDeleteCard, formDeleteCards, } from "./constant.js";
import { config, } from "./ap.js";
import { closePopup, } from "./modal.js";

// @todo: Функция лайка карточки

export function likeCard(like, cardsValues, likeInfo) {
  if (!(like.target.classList.value.includes('card__like-button_is-active'))) {
    fetch(`${config.baseUrl}/cards/likes/${cardsValues['_id']}`, {
      method: 'PUT',
      headers: config.headers,
    })
    .then(config.ressJson)
    .then((ress) => {
      like.target.classList.add("card__like-button_is-active");
      likeInfo.textContent = ress.likes.length;
    })
    .catch(config.err)
  } else {
    fetch(`${config.baseUrl}/cards/likes/${cardsValues['_id']}`, {
      method: 'DELETE',
      headers: config.headers,
    })
    .then(config.ressJson)
    .then((ress) => {
      like.target.classList.remove("card__like-button_is-active");
      likeInfo.textContent = ress.likes.length;
    })
    .catch(config.err)
  }
}
  
// @todo: Функция клонирования темплент елемента

function getCardTemplate() {
  const cardsElement = cardTemplate.querySelector(".card").cloneNode(true);
  return cardsElement;
}

// @todo: Функция создания карточки

export function createCard(cardsValues, openPopup, likeCard, setImgPopup) {

  const cardsElement = getCardTemplate();

  const cardImage = cardsElement.querySelector(".card__image");
  const deleteButtonCard = cardsElement.querySelector(".card__delete-button");
  const likeButtonCard = cardsElement.querySelector(".card__like-button");
  const likeInfo = cardsElement.querySelector(".card__like-info");

  cardsElement.querySelector(".card__title").textContent = cardsValues.name;
  cardImage.src = cardsValues.link;
  cardImage.alt = cardsValues.name;

  likeInfo.textContent = cardsValues.likes.length;

  fetch(`${config.baseUrl}/users/me`, { headers: config.headers })
  .then(config.ressJson)
  .then(result =>  { 
    if (!(cardsValues.owner['_id'] === result['_id'])) {
      deleteButtonCard.classList.add('card__delete-button_hidden')
    }  
    cardsValues.likes.forEach(element => {
      if (element['_id'] === result['_id']) {
        likeButtonCard.classList.add('card__like-button_is-active')
      }
    })
  })
  .catch(config.err);
 
  deleteButtonCard.addEventListener("click", (card) => { openPopup(popupDeleteCard); deletePost.idPost = cardsValues['_id'], deletePost.target = card.target});


  likeButtonCard.addEventListener("click", (evt) => likeCard(evt, cardsValues, likeInfo));

  cardImage.addEventListener("click", setImgPopup);

  return cardsElement;
}

// @todo: Функция удаления карточки

const deletePost = {
  idPost: '',
  target: '',
};

export function deliteCard(evt) {
  evt.preventDefault();
  console.log(deletePost);
       fetch(`${config.baseUrl}/cards/${deletePost.idPost}`, {
      method: 'DELETE',
      headers: config.headers,
    })
    .then(config.ressJson)
    .then(ress => { 
      closePopup(popupDeleteCard);
      deletePost.target.closest(".card").remove();
      deletePost.idPost = '';
      deletePost.target = '';
    })
    .catch(config.err);
}

