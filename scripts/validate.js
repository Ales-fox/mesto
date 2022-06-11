const configValid = {
    formSelector: '.popup__container',
    inputSelector: '.input',
    submitButtonSelector: '.button-submit',
    inactiveButtonClass: 'button_invalid',
    inputErrorClass: 'input_type_error',
    errorClass: 'input-error'
};

const showInputError = (formElement, inputElement, errorMessage, configValid) => {
    const errorElement = formElement.querySelector(`.${configValid.errorClass}_${inputElement.id}`);
    inputElement.classList.add(configValid.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(`${configValid.errorClass}_active`);
};

const hideInputError = (formElement, inputElement, configValid) => {
    const errorElement = formElement.querySelector(`.${configValid.errorClass}_${inputElement.id}`);
    inputElement.classList.remove(configValid.inputErrorClass);
    errorElement.classList.remove(`${configValid.errorClass}_active`);
    errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, configValid) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, configValid);
    } else {
        hideInputError(formElement, inputElement, configValid);
    }
};

const setEventListeners = (formElement, configValid) => {
    const inputList = Array.from(formElement.querySelectorAll(`${configValid.inputSelector}`));
    const buttonList = Array.from(formElement.querySelectorAll(`${configValid.submitButtonSelector}`));

    // чтобы проверить состояние кнопки в самом начале
    buttonList.forEach((buttonElement) => {
        toggleButtonState(inputList, buttonElement);
    });

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            checkInputValidity(formElement, inputElement, configValid);
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
        buttonElementdisabled = true;
    } else {
        buttonElement.classList.remove('button_invalid');
        buttonElement.disabled = false;
    }
};
/*Обнуление формы и дезактивация кнопки*/
const resetForm = (evt, inputList) => {
    evt.target.reset();
    toggleButtonState(inputList, evt.submitter);
};

function enableValidation(configValid) {
    const formList = Array.from(document.querySelectorAll(`${configValid.formSelector}`));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });

        setEventListeners(formElement, configValid);
    });
};

enableValidation(configValid); 
