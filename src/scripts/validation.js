// @todo: Функция показать ошибку валидации

export function showInputError(formSelector, inputSelector, errorMessage) {
  const errorElement = formSelector.querySelector(`.${inputSelector.id}-error`);

  if (inputSelector.validity.patternMismatch) {
    errorElement.textContent = inputSelector.dataset.errorMessage;
    errorElement.classList.add('popup__error_visible');
    inputSelector.classList.add('popup__input_type_error');
  } else {
    inputSelector.classList.add('popup__input_type_error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('popup__error_visible');
  }
}

// @todo: Функция скрыть ошибку валидации

export function hideInputError(formSelector, inputSelector) {
  const errorElement = formSelector.querySelector(`.${inputSelector.id}-error`);
  inputSelector.classList.remove('popup__input_type_error');
  errorElement.classList.remove('popup__error_visible');
  errorElement.textContent = '';
}

// @todo: Функция проверка валидности формы

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

// @todo: Функция состояние кнопки формы

export function toggleButtonState(inputList, submitButtonSelector) {
  if (hasInvalidInput(inputList)) {
    submitButtonSelector.classList.add('popup__button_disabled');
  } else {
    submitButtonSelector.classList.remove('popup__button_disabled');
  }
}
