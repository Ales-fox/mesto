export default class Popup {
    constructor(selectorPopup) {
        this._popup = document.querySelector(selectorPopup);
        this._buttonClose = this._popup.querySelector('.button-close');
        this._handleEscClosebind = this._handleEscClose.bind(this);
    }

    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClosebind);
    }

    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClosebind);
    }
    /*Закрытие popup клавишей Esc*/
    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close();
        };
    }

    setEventListeners() {
        /*Установка слушателя на кнопку Close*/
        this._buttonClose.addEventListener('click', this.close.bind(this));
        /*Установка слушателя на Overlay*/
        this._popup.addEventListener('click', (evt) => {
            if (evt.target === evt.currentTarget) {
                this.close()
            };
        })
    }
}

