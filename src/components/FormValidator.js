export default class FormValidator {
    constructor(config, form) {
        this._config = config;
        this._form = form;
        this._inputList = Array.from(this._form.querySelectorAll(`${this._config.inputSelector}`));
        this._buttonElement = this._form.querySelector(`${this._config.submitButtonSelector}`);
    }

    /*Включение валидации формы*/
    enableValidation() {
        this._setEventListeners();
    }

    _setEventListeners() {
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
            this._buttonElement.classList.add(this._config.inactiveButtonClass);
            this._buttonElement.disabled = true;
        } else {
            this._buttonElement.classList.remove(this._config.inactiveButtonClass);
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
        const errorElement = this._form.querySelector(`.${this._config.errorClass}_${inputElement.id}`);
        inputElement.classList.add(this._config.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(`${this._config.errorClass}_active`);
    };

    _hideInputError(inputElement) {
        const errorElement = this._form.querySelector(`.${this._config.errorClass}_${inputElement.id}`);
        inputElement.classList.remove(this._config.inputErrorClass);
        errorElement.classList.remove(`${this._config.errorClass}_active`);
        errorElement.textContent = '';
    };

    resetValidation() {
        this._toggleButtonState();
        this._inputList.forEach((inputElement) => {
            this._hideInputError(inputElement)
        });
    }
}