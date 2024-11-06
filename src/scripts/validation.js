// @todo: Функция показать ошибку валидации

export function showInputError(
  formSelector,
  inputSelector,
  errorMessage,
  enableValidation
) {
  const errorElement = formSelector.querySelector(`.${inputSelector.id}-error`);

  if (inputSelector.validity.patternMismatch) {
    errorElement.textContent = inputSelector.dataset.errorMessage;
    errorElement.classList.add(`${enableValidation.errorClass}`);
    inputSelector.classList.add(`${enableValidation.inputErrorClass}`);
  } else {
    inputSelector.classList.add(`${enableValidation.inputErrorClass}`);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(`${enableValidation.errorClass}`);
  }
}

// @todo: Функция скрыть ошибку валидации

export function hideInputError(formSelector, inputSelector, enableValidation) {
  const errorElement = formSelector.querySelector(`.${inputSelector.id}-error`);

  errorElement.classList.remove(`${enableValidation.errorClass}`);
  errorElement.textContent = '';
  inputSelector.classList.remove(`${enableValidation.inputErrorClass}`);
}

// @todo: Функция проверка валидности формы

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

// @todo: Функция состояние кнопки формы

export function toggleButtonState(
  inputList,
  submitButtonSelector,
  enableValidation
) {
  if (hasInvalidInput(inputList)) {
    submitButtonSelector.disabled = true;
    submitButtonSelector.classList.add(
      `${enableValidation.inactiveButtonClass}`
    );
  } else {
    submitButtonSelector.disabled = false;
    submitButtonSelector.classList.remove(
      `${enableValidation.inactiveButtonClass}`
    );
  }
}

// @todo: Функция установки слушателя на формы

export function setEventListeners(formSelector, enableValidation) {
  const inputList = Array.from(
    formSelector.querySelectorAll(`${enableValidation.inputSelector}`)
  );

  const submitButtonSelector = formSelector.querySelector(
    `${enableValidation.submitButtonSelector}`
  );

  inputList.forEach((inputSelector) => {
    inputSelector.addEventListener('input', () => {
      checkInputValidity(formSelector, inputSelector, enableValidation);
      toggleButtonState(inputList, submitButtonSelector, enableValidation);
    });

    toggleButtonState(inputList, submitButtonSelector, enableValidation);
  });
}

// @todo: Функция проверка правильности введенных данных

function checkInputValidity(formSelector, inputSelector, enableValidation) {
  if (!inputSelector.validity.valid) {
    showInputError(
      formSelector,
      inputSelector,
      inputSelector.validationMessage,
      enableValidation
    );
  } else {
    hideInputError(formSelector, inputSelector, enableValidation);
  }
}
