export default class FormValidator {
    constructor(formSelectors, form) {
        this._formSelectors = formSelectors;
        this._form = form;
    }

    /*Включение валидации формы*/
    enableValidation() {
        this._setEventListeners();
    }

    _setEventListeners() {
        this._inputList = Array.from(this._form.querySelectorAll(`${this._formSelectors.inputSelector}`));
        this._buttonElement = this._form.querySelector(`${this._formSelectors.submitButtonSelector}`);
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
            this._buttonElement.classList.add(this._formSelectors.inactiveButtonClass);
            this._buttonElement.disabled = true;
        } else {
            this._buttonElement.classList.remove(this._formSelectors.inactiveButtonClass);
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
        const errorElement = this._form.querySelector(`.${this._formSelectors.errorClass}_${inputElement.id}`);
        inputElement.classList.add(this._formSelectors.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(`${this._formSelectors.errorClass}_active`);
    };

    _hideInputError(inputElement) {
        const errorElement = this._form.querySelector(`.${this._formSelectors.errorClass}_${inputElement.id}`);
        inputElement.classList.remove(this._formSelectors.inputErrorClass);
        errorElement.classList.remove(`${this._formSelectors.errorClass}_active`);
        errorElement.textContent = '';
    };

    resetValidation() {
        this._toggleButtonState();
        this._inputList.forEach((inputElement) => {
            this._hideInputError(inputElement)
        });
    }
}




