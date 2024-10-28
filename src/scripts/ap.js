// Токен: 38a628a1-9dfc-4f10-bcd6-8a3b9999ace6
// Идентификатор группы: wff-cohort-25

import { errorConnect, } from './constant.js';

export const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-25',
    headers: {
      authorization: '38a628a1-9dfc-4f10-bcd6-8a3b9999ace6',
      'Content-Type': 'application/json'
    },
    ressJson: (ress) => { if (ress.ok) {
      return ress.json();
    } else {
      return Promise.reject(ress.status);
    } },
    err: (err) => {
      errorConnect.setAttribute('style', 'display: block;');
      setTimeout(() => (errorConnect.setAttribute('style', 'display: none;')), 3000);
    },  
  };
  
