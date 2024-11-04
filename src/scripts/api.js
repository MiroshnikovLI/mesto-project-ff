// Токен: 38a628a1-9dfc-4f10-bcd6-8a3b9999ace6
// Идентификатор группы: wff-cohort-25

import { errorConnect } from './constant.js';

export const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-25',
  headers: {
    authorization: '38a628a1-9dfc-4f10-bcd6-8a3b9999ace6',
    'Content-Type': 'application/json',
  },
  ressJson: (ress) => {
    if (ress.ok) {
      return ress.json();
    } else {
      return Promise.reject(ress.status);
    }
  },
  err: (err) => {
    errorConnect.setAttribute('style', 'display: block;');
    setTimeout(
      () => errorConnect.setAttribute('style', 'display: none;'),
      3000
    );
  },
};

export const apiDeleteCard = (deletePost) => {
  return fetch(`${config.baseUrl}/cards/${deletePost.idPost}`, {
    method: 'DELETE',
    headers: config.headers,
  }).then(config.ressJson);
};

export const apiUserInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, { headers: config.headers }).then(
    config.ressJson
  );
};

export const apiLikePost = (post) => {
  return fetch(`${config.baseUrl}/cards/likes/${post}`, {
    method: 'PUT',
    headers: config.headers,
  }).then(config.ressJson);
};

export const apiDeleteLikePost = (post) => {
  return fetch(`${config.baseUrl}/cards/likes/${post}`, {
    method: 'DELETE',
    headers: config.headers,
  }).then(config.ressJson);
};

export const apiCard = () => {
  return fetch(`${config.baseUrl}/cards`, { headers: config.headers }).then(
    config.ressJson
  );
};

export const apiEditProfileImage = (image) => {
  return fetch('https://nomoreparties.co/v1/wff-cohort-25/users/me/avatar', {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: image,
    }),
  }).then(config.ressJson);
};

export const apiEditProfiInfo = (title, description) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: title,
      about: description,
    }),
  }).then(config.ressJson);
};

export const apiNewPlace = (newCard) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: newCard.name,
      link: newCard.link,
    }),
  }).then(config.ressJson);
};
