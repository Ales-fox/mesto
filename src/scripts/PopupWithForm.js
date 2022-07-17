import Popup from "./Popup.js"

export default class PopupWithForm extends Popup {
    constructor(selectorPopup, handleFormSubmit) {
        super(selectorPopup);
        this.handleFormSubmit = handleFormSubmit;
        this._inputList = this._popup.querySelectorAll('.input')
        this.setEventListeners();
    }

    _getInputValues() {
        this._formValues = {};
        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;

            return this._formValues;
        }
        )
    }

    setEventListeners() {
        this._form = this._popup.querySelector('.popup__container');
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this.handleFormSubmit(this._getInputValues());
        });
        super.setEventListeners();
    }

    close() {
        this._form.reset();/*Очистка формы*/
        super.close();
    }
}