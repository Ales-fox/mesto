class FormValidator {
    constructor(configValid, formSelector) {
        this._configValid = configValid;
        this._formSelector = formSelector;
    }

    /*Включение валидации формы*/
    enableValidation() {
        const formList = Array.from(document.querySelectorAll(`${this._formSelector}`));
        formList.forEach((formElement) => {
            formElement.addEventListener('submit', function (evt) {
                evt.preventDefault();
            });

            this._setEventListeners(formElement);
        });
    }

    _setEventListeners(formElement) {
        const inputList = Array.from(formElement.querySelectorAll(`${this._configValid.inputSelector}`));
        const buttonList = Array.from(formElement.querySelectorAll(`${this._configValid.submitButtonSelector}`));

        // чтобы проверить состояние кнопки в самом начале
        buttonList.forEach((buttonElement) => {
            this._toggleButtonState(inputList, buttonElement, this._configValid.inactiveButtonClass);
        });

        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(formElement, inputElement);
                // чтобы проверять его при изменении любого из полей
                buttonList.forEach((buttonElement) => {
                    this._toggleButtonState(inputList, buttonElement, this._configValid.inactiveButtonClass);
                });
            });
        });
    }

    _toggleButtonState(inputList, buttonElement) {
        if (this._hasInvalidInput(inputList)) {
            buttonElement.classList.add(this._configValid.inactiveButtonClass);
            /* buttonElement.disabled = true;*/
        } else {
            buttonElement.classList.remove(this._configValid.inactiveButtonClass);
            /* buttonElement.disabled = false;*/
        }
    };

    _hasInvalidInput(inputList) {
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    };

    _checkInputValidity(formElement, inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(formElement, inputElement, inputElement.validationMessage, configValid);
        } else {
            this._hideInputError(formElement, inputElement);
        }
    };

    _showInputError(formElement, inputElement, errorMessage) {
        const errorElement = formElement.querySelector(`.${this._configValid.errorClass}_${inputElement.id}`);
        inputElement.classList.add(this._configValid.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(`${this._configValid.errorClass}_active`);
    };

    _hideInputError(formElement, inputElement) {
        const errorElement = formElement.querySelector(`.${this._configValid.errorClass}_${inputElement.id}`);
        inputElement.classList.remove(this._configValid.inputErrorClass);
        errorElement.classList.remove(`${this._configValid.errorClass}_active`);
        errorElement.textContent = '';
    };

    resetForm(evt, inputList) {
        evt.target.reset();
        this._toggleButtonState(inputList, evt.submitter);
    };
}

const configValid = {
    formSelector: '.popup__container',
    inputSelector: '.input',
    submitButtonSelector: '.button-submit',
    inactiveButtonClass: 'button_invalid',
    inputErrorClass: 'input_type_error',
    errorClass: 'input-error'
};

export { FormValidator, configValid }



