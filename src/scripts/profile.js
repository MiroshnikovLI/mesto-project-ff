import { config, } from './ap.js';

const profileImage = document.querySelector('.profile__image');
const pofileName = document.querySelector('.profile__title');
const profileWWorck = document.querySelector('.profile__description');

fetch(`${config.baseUrl}/users/me`, { headers: config.headers })
  .then(config.ressJson)
  .then((result) =>  {   
    profileImage.setAttribute('style', `background-image: url('${result.avatar}')`)
    pofileName.textContent = result.name;
    profileWWorck.textContent = result.about;   
  })
 .catch(config.err);  

  // Добавление карточки
  /* fetch('https://nomoreparties.co/v1/wff-cohort-25/cards', { 
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
        "name": "отдых",
        "link": "https://sun9-34.userapi.com/impf/c637829/v637829579/44d04/s2s4UjB0yFg.jpg?size=1080x810&quality=96&sign=d63e8b5768a524773b2d1f956a8b1877&type=album",
    })
  }); 
  */