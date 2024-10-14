import { pageContainer } from "./modal.js";

// @todo: DOM узлы

const cardTemplate = pageContainer.querySelector("#card-template").content;

// @todo: Функция лайка карточки

export function likeCard(like) {
  like.target.classList.toggle("card__like-button_is-active");
}

// @todo: Функция удаления карточки

export function deliteCard(evt) {
  evt.target.closest(".card").remove();
}

// @todo: Функция клонирования темплент елемента

function getCardTemplate() {
  const cardsElement = cardTemplate.querySelector(".card").cloneNode(true);
  return cardsElement;
}

// @todo: Функция создания карточки

export function createCard(cardsValues, deliteCard, likeCard, setImgPopup) {
  const cardsElement = getCardTemplate();

  const cardImage = cardsElement.querySelector(".card__image");
  const deleteButtonCard = cardsElement.querySelector(".card__delete-button");
  const likeButtonCard = cardsElement.querySelector(".card__like-button");

  cardsElement.querySelector(".card__title").textContent = cardsValues.name;
  cardImage.src = cardsValues.link;
  cardImage.alt = cardsValues.name;

  deleteButtonCard.addEventListener("click", deliteCard);

  likeButtonCard.addEventListener("click", likeCard);

  cardImage.addEventListener("click", setImgPopup);

  return cardsElement;
}
