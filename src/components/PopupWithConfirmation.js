import Popup from "./Popup.js"

export default class PopupWithConfirmation extends Popup {
    constructor(selectorPopup, handleFormSubmit) {
        super(selectorPopup);
        this.handleFormSubmit = handleFormSubmit;
        this._setEventListeners();
    }

    _setEventListeners() {
        this._form = this._popup.querySelector('.popup__container');
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();

            this.handleFormSubmit(this.deleteCard, this.id);
            /*super.close();*/
        });
        super.setEventListeners();
    }

    open(deleteCard, id) {
        super.open()
        this.deleteCard = deleteCard;
        this.id = id
    }
}