class FormValidator {
    constructor(selectorsForm, formSelector) {
        this._selectorsForm = selectorsForm;
        this._formSelector = formSelector;
    }

    /*Включение валидации формы*/
    enableValidation() {
        this._setEventListeners();
    }

    _setEventListeners() {
        this._inputList = Array.from(this._formSelector.querySelectorAll(`${this._selectorsForm.inputSelector}`));
        this._buttonElement = this._formSelector.querySelector(`${this._selectorsForm.submitButtonSelector}`);
        // чтобы проверить состояние кнопки в самом начале
        this._toggleButtonState();

        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                // чтобы проверять его при изменении любого из полей
                this._toggleButtonState();
            });
        });

    }

    _toggleButtonState() {
        if (this._hasInvalidInput()) {
            this._buttonElement.classList.add(this._selectorsForm.inactiveButtonClass);
            this._buttonElement.disabled = true;
        } else {
            this._buttonElement.classList.remove(this._selectorsForm.inactiveButtonClass);
            this._buttonElement.disabled = false;
        }
    };

    _hasInvalidInput() {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    };

    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    };

    _showInputError(inputElement, errorMessage) {
        const errorElement = this._formSelector.querySelector(`.${this._selectorsForm.errorClass}_${inputElement.id}`);
        inputElement.classList.add(this._selectorsForm.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(`${this._selectorsForm.errorClass}_active`);
    };

    _hideInputError(inputElement) {
        const errorElement = this._formSelector.querySelector(`.${this._selectorsForm.errorClass}_${inputElement.id}`);
        inputElement.classList.remove(this._selectorsForm.inputErrorClass);
        errorElement.classList.remove(`${this._selectorsForm.errorClass}_active`);
        errorElement.textContent = '';
    };

    resetValidation() {
        this._toggleButtonState();
        this._inputList.forEach((inputElement) => {
            this._hideInputError(inputElement)
        });
    }
}

const selectorsForm = {
    formSelector: '.popup__container',
    inputSelector: '.input',
    submitButtonSelector: '.button-submit',
    inactiveButtonClass: 'button_invalid',
    inputErrorClass: 'input_type_error',
    errorClass: 'input-error'
};

export { FormValidator, selectorsForm }



