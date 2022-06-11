const configValid = {
    formSelector: '.popup__container',
    inputSelector: '.input',
    submitButtonSelector: '.button-submit',
    inactiveButtonClass: 'button_invalid',
    inputErrorClass: 'input_type_error',
    errorClass: 'input-error'
};

const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.input-error_${inputElement.id}`);
    inputElement.classList.add('input_type_error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('input-error_active');
};

const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.input-error_${inputElement.id}`);
    inputElement.classList.remove('input_type_error');
    errorElement.classList.remove('input-error_active');
    errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(formElement, inputElement);
    }
};

const setEventListeners = (formElement, obj) => {
    const inputList = Array.from(formElement.querySelectorAll(`${obj.inputSelector}`));
    const buttonList = Array.from(formElement.querySelectorAll(`${obj.submitButtonSelector}`));

    // чтобы проверить состояние кнопки в самом начале
    buttonList.forEach((buttonElement) => {
        toggleButtonState(inputList, buttonElement);
    });

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            checkInputValidity(formElement, inputElement);
            // чтобы проверять его при изменении любого из полей
            buttonList.forEach((buttonElement) => {
                toggleButtonState(inputList, buttonElement);
            });
        });
    });
};

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
};

const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add('button_invalid');
    } else {
        buttonElement.classList.remove('button_invalid');
    }
};

function enableValidation(obj) {
    const formList = Array.from(document.querySelectorAll(`${obj.formSelector}`));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });

        setEventListeners(formElement, obj);
    });
};

enableValidation(configValid); 
