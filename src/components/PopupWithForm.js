import Popup from "./Popup.js"

export default class PopupWithForm extends Popup {
    constructor(selectorPopup, handleFormSubmit) {
        super(selectorPopup);
        this.handleFormSubmit = handleFormSubmit;
        this._buttonSubmit = this._popup.querySelector('.button-submit');
        this._inputList = this._popup.querySelectorAll('.input')
        this.setEventListeners();
    }

    _getInputValues() {
        this.formValues = {};
        this._inputList.forEach(input => {
            this.formValues[input.name] = input.value;
        });
        return this.formValues
    }

    setEventListeners() {
        this._form = this._popup.querySelector('.popup__container');
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();

            this.handleFormSubmit(this._getInputValues(), this._buttonSubmit);
        });
        super.setEventListeners();
    }

    setInputValues(data) {
        this._inputList.forEach((input) => {
            // вставляем в `value` инпута данные из объекта по атрибуту `name` этого инпута
            input.value = data[input.name];
        });
    }

    close() {
        this._form.reset();/*Очистка формы*/
        super.close();
    }
}