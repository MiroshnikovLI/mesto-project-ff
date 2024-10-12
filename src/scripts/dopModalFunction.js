import {pageContainer, profileName} from './index.js';
import {setImgPopup} from './modal.js';

// @todo: Дополнительные функции сайта

const profileImage = pageContainer.querySelector('.profile__image');

const srcProfileImage = profileImage.attributes.style.nodeValue;
const cursor = "cursor: pointer";

profileImage.style.cssText = `${srcProfileImage} ${cursor}`;

function imgProfileForPopup(profileImage) {
  const cardImage = {currentTarget: {}};
 
  cardImage.currentTarget.src = srcProfileImage.slice(0, -3).substring(23);
  cardImage.currentTarget.alt = profileName.textContent;

  return cardImage;
} 

profileImage.addEventListener('click', () => setImgPopup(imgProfileForPopup()));