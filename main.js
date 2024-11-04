(()=>{"use strict";var e=document.querySelector(".page"),t=e.querySelector(".places__list"),r=e.querySelector(".popup_type_image"),n=r.querySelector(".popup__image"),o=r.querySelector(".popup__caption"),a=e.querySelector(".popup_edit_profile-image"),c=e.querySelector(".profile__title"),i=e.querySelector(".profile__description"),s=e.querySelector(".profile__image"),u=document.forms["edit-profile"],l=u.name,d=u.description,p=document.forms["edit-image-profile"],f=p.link,_=document.forms["new-place"],m=_["place-name"],v=_.link,y=document.forms["delete-card"],h=e.querySelector(".popup_delete-card"),b=e.querySelector(".error__connect"),g=e.querySelector(".places"),S=e.querySelector(".profile__add-button"),L=e.querySelector(".profile__edit-button"),k=e.querySelector(".popup_type_new-card"),q=e.querySelector(".popup_type_edit"),E=e.querySelectorAll(".popup__close"),C=e.querySelector("#card-template").content,x={idPost:"",target:""},A={name:"",about:"",avatar:"",id:""};function J(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",w),e.addEventListener("click",P)}function T(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",w),e.removeEventListener("click",P)}function w(e){"Escape"===e.key&&T(document.querySelector(".popup_is-opened"))}function P(e){e.target.closest(".popup__content")||T(document.querySelector(".popup_is-opened"))}var U={baseUrl:"https://nomoreparties.co/v1/wff-cohort-25",headers:{authorization:"38a628a1-9dfc-4f10-bcd6-8a3b9999ace6","Content-Type":"application/json"},ressJson:function(e){return e.ok?e.json():Promise.reject(e.status)},err:function(e){b.setAttribute("style","display: block;"),setTimeout((function(){return b.setAttribute("style","display: none;")}),3e3)}};function j(e,t,r){var n;e.target.classList.value.includes("card__like-button_is-active")?(n=t._id,fetch("".concat(U.baseUrl,"/cards/likes/").concat(n),{method:"DELETE",headers:U.headers}).then(U.ressJson)).then((function(t){e.target.classList.remove("card__like-button_is-active"),r.textContent=t.likes.length})).catch(U.err):function(e){return fetch("".concat(U.baseUrl,"/cards/likes/").concat(e),{method:"PUT",headers:U.headers}).then(U.ressJson)}(t._id).then((function(t){e.target.classList.add("card__like-button_is-active"),r.textContent=t.likes.length})).catch(U.err)}function O(e,t,r,n,o){var a=C.querySelector(".card").cloneNode(!0),c=a.querySelector(".card__image"),i=a.querySelector(".card__delete-button"),s=a.querySelector(".card__like-button"),u=a.querySelector(".card__like-info");return a.querySelector(".card__title").textContent=e.name,c.src=e.link,c.alt=e.name,u.textContent=e.likes.length,e.owner._id!==t.id&&i.classList.add("card__delete-button_hidden"),e.likes.forEach((function(e){e._id===t.id&&s.classList.add("card__like-button_is-active")})),i.addEventListener("click",(function(t){r(h),x.idPost=e._id,x.target=t.target})),s.addEventListener("click",(function(t){return n(t,e,u)})),c.addEventListener("click",o),a}function D(e,t){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?t.classList.remove("popup__button_disabled"):t.classList.add("popup__button_disabled")}function M(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=Array(t);r<t;r++)n[r]=e[r];return n}function N(e){var t=Array.from(e.querySelectorAll(".popup__input")),r=e.querySelector(".popup__button");t.forEach((function(n){n.addEventListener("input",(function(){!function(e,t){t.validity.valid?function(e,t){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.remove("popup__input_type_error"),r.classList.remove("popup__error_visible"),r.textContent=""}(e,t):function(e,t,r){var n=e.querySelector(".".concat(t.id,"-error"));t.validity.patternMismatch?(n.textContent=t.dataset.errorMessage,n.classList.add("popup__error_visible"),t.classList.add("popup__input_type_error")):(t.classList.add("popup__input_type_error"),n.textContent=r,n.classList.add("popup__error_visible"))}(e,t,t.validationMessage)}(e,n),D(t,r)})),D(t,r)}))}function I(e,t){var r=e.target.querySelector(".button");t?(r.textContent="Сохранение...",r.classList.add("popup__button-seve")):(r.textContent="Сохранить",r.classList.remove("popup__button-seve"),e.target.reset(),N(e.target))}function H(e){J(r),n.src=e.currentTarget.src,n.alt=e.currentTarget.alt,o.textContent=e.currentTarget.alt}g.classList.add("load"),Promise.all([fetch("".concat(U.baseUrl,"/cards"),{headers:U.headers}).then(U.ressJson),fetch("".concat(U.baseUrl,"/users/me"),{headers:U.headers}).then(U.ressJson)]).then((function(e){var r,n,o=(n=2,function(e){if(Array.isArray(e))return e}(r=e)||function(e,t){var r=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=r){var n,o,a,c,i=[],s=!0,u=!1;try{if(a=(r=r.call(e)).next,0===t){if(Object(r)!==r)return;s=!1}else for(;!(s=(n=a.call(r)).done)&&(i.push(n.value),i.length!==t);s=!0);}catch(e){u=!0,o=e}finally{try{if(!s&&null!=r.return&&(c=r.return(),Object(c)!==c))return}finally{if(u)throw o}}return i}}(r,n)||function(e,t){if(e){if("string"==typeof e)return M(e,t);var r={}.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?M(e,t):void 0}}(r,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),a=o[0],u=o[1];A.name=u.name,A.about=u.about,A.avatar=u.avatar,A.id=u._id,function(e){s.setAttribute("style","background-image: url('".concat(e.avatar,"')")),c.textContent=e.name,i.textContent=e.about}(A);for(var l=0;l<a.length;l++)t.append(O(a[l],A,J,j,H))})).catch(U.err).finally((function(){return g.classList.remove("load")})),p.addEventListener("submit",(function(e){return function(e,t){I(e,!0),function(e){return fetch("https://nomoreparties.co/v1/wff-cohort-25/users/me/avatar",{method:"PATCH",headers:U.headers,body:JSON.stringify({avatar:e})}).then(U.ressJson)}(t).then((function(r){s.setAttribute("style","background-image: url('".concat(t,"')")),e.target.reset(),T(e.target.closest(".popup_is-opened"))})).catch(U.err).finally((function(){return I(e)}))}(e,f.value)})),y.addEventListener("submit",(function(e){e.preventDefault(),function(e){return fetch("".concat(U.baseUrl,"/cards/").concat(e.idPost),{method:"DELETE",headers:U.headers}).then(U.ressJson)}(x).then((function(){T(h),x.target.closest(".card").remove(),x.idPost="",x.target=""})).catch(U.err)})),s.addEventListener("click",(function(){return J(a)})),S.addEventListener("click",(function(){return J(k)})),L.addEventListener("click",(function(e){J(q),l.value=c.textContent,d.value=i.textContent})),u.addEventListener("submit",(function(e){return function(e,t,r){I(e,!0),function(e,t){return fetch("".concat(U.baseUrl,"/users/me"),{method:"PATCH",headers:U.headers,body:JSON.stringify({name:e,about:t})}).then(U.ressJson)}(t,r).then((function(e){c.textContent=e.name,i.textContent=e.about})).catch(U.err).finally((function(){I(e),T(e.target.closest(".popup_is-opened"))}))}(e,l.value,d.value)})),_.addEventListener("submit",(function(e){return function(e,r){I(e,!0);var n={};n.name=m.value,n.link=v.value,function(e){return fetch("".concat(U.baseUrl,"/cards"),{method:"POST",headers:U.headers,body:JSON.stringify({name:e.name,link:e.link})}).then(U.ressJson)}(n).then((function(e){t.prepend(O(e,r,J,j,H))})).catch(U.err).finally((function(){e.target.reset(),I(e),T(e.target.closest(".popup_is-opened"))}))}(e,A)})),E.forEach((function(e){e.addEventListener("click",(function(e){T(e.target.closest(".popup_is-opened"))}))})),Array.from(document.querySelectorAll(".popup__form")).forEach((function(e){N(e),e.addEventListener("submit",(function(e){e.preventDefault()}))}))})();