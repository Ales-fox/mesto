export default class Popup {
    constructor(selectorPopup) {
        this._selectorPopup = selectorPopup;
        this._popup = document.querySelector(selectorPopup);
    }

    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose.bind(this)());
    }

    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose.bind(this)());
    }

    _handleEscClose() {
        if (this.key === 'Escape') {
            /*const popupActive = document.querySelector('.popup_opened');*/
            this.close();
        };
    }

    setEventListeners() { }
}