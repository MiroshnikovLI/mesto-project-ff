import {cardTemplate, cardsContainer, newPlaceName, newLink} from './index.js';
import {closePopup, setImgPopup} from './modal.js';

const initialCards = [
    {
      name: "Москва, Парк Горького",
      link: 'https://sun9-34.userapi.com/impf/c637829/v637829579/44d04/s2s4UjB0yFg.jpg?size=1080x810&quality=96&sign=d63e8b5768a524773b2d1f956a8b1877&type=album',
      // name: "Архыз",
      // link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Москва, Жулебино",
      link: 'https://sun9-20.userapi.com/impf/c837624/v837624656/5a0de/HN5cFmm8pzQ.jpg?size=1080x1011&quality=96&sign=94cfca530c0921aec51b461fd08d21d4&type=album',
      // name: "Челябинская область",
      // link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Москва, ВДНХ",
      link: 'https://sun9-49.userapi.com/impf/c841324/v841324360/1d032/MZoeJGH31vI.jpg?size=1080x1080&quality=96&sign=f7ea0abb611b12078d577b7493bc48c8&type=album',
      // name: "Иваново",
      // link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Москва, Парк Музеон",
      link: 'https://sun9-69.userapi.com/impf/c840624/v840624291/7ff74/jvYcKH5Psdc.jpg?size=1080x810&quality=96&sign=3fe5945e922f391514679445886954fe&type=album',
      // name: "Камчатка",
      // link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Москва, Белое озеро",
      link: 'https://sun9-35.userapi.com/impf/c849328/v849328409/18445/AsIA8iowiuQ.jpg?size=1080x1350&quality=96&sign=7c04bd602ba38851737fe086f3efce62&type=album',
      // name: "Холмогорский район",
      // link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      // name: "Байкал",
      name: "Люберцы, Пушкинский парк",
      link: 'https://sun9-21.userapi.com/impf/c850036/v850036859/2b2cd/EUsO2NOCuX4.jpg?size=1080x810&quality=96&sign=dbac2ac589d2276f1d9b46496eab5b40&type=album',
      // link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    }
];

// @todo: Функция добавления новой карточки 

export function adaNewCard(evt) {
  evt.preventDefault();

  const newCard = {};
  
  newCard.name = newPlaceName.value;
  newCard.link = newLink.value;
  
  cardsContainer.prepend(createCard(newCard, deliteCard, likeCard, setImgPopup));
  
  closePopup();

  newPlaceName.value = '';
  newLink.value = '';
}

// @todo: Функция лайка карточки

function likeCard(like) {
  like.target.classList.toggle('card__like-button_is-active');
}

// @todo: Функция удаления карточки

function deliteCard(evt) {
  evt.target.closest('.card').remove();
}

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

// @todo: Вывести карточки на страницу

export function showCards() {
  for (let i = 0; i < initialCards.length; i++) {
      cardsContainer.prepend(createCard(initialCards[i], deliteCard, likeCard, setImgPopup));
    }
}

