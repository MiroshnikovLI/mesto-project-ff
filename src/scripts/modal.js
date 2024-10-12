import {popupImages, popupContainerImage, profileName, profileDescription, inputName, inputDescription} from './index.js';


// @todo: Функция открытия попап

export function oppenPopup(popup){
    popup.classList.add('popup_is-opened');
    
    const buttonClosePoppap = popup.querySelector('.popup__close');
    buttonClosePoppap.addEventListener('click', closePopup);
  
    document.addEventListener('keydown', closePopupEsc);
    popup.addEventListener('click', closePopupClick);
  }
  
// @todo: Функция закрытия попап

export function closePopup() {
  removesTheListener();
  document.querySelector('.popup_is-opened').classList.remove('popup_is-opened');
}
  
export function closePopupEsc(evt) {
  if(evt.key === 'Escape') {
    closePopup();
  }
}
    
export function closePopupClick(evt) {
  if(!evt.target.closest('.popup__content')) {
    closePopup(evt);
  }
}
  
// @todo: функция снятия слушателей 
  
function removesTheListener() {
  const removeClickInNotPopup = document.querySelector('.popup_is-opened')
  document.removeEventListener('keydown', closePopupEsc);
  removeClickInNotPopup.removeEventListener('click', closePopupClick);
}

// @todo: Функция редактирования профиля

export function editProfile(evt, title, description) {
   evt.preventDefault();
 
   profileName.textContent = title;
   profileDescription.textContent = description;
    
   inputName.value = '';
   inputDescription.value = '';
 
   closePopup();
}

// @todo: Функция изображения в попапе

export function setImgPopup(images) {
    oppenPopup(popupImages);
  
    const newImage = popupContainerImage.querySelector('.popup__image');
    const titleImage = popupContainerImage.querySelector('.popup__caption');
  
    newImage.src = images.currentTarget.src;
    newImage.alt = images.currentTarget.alt;
    titleImage.textContent = images.currentTarget.alt;
  }