export default class Card {
    constructor({ nameofplace, url }, cardSelector, handleCardClick) {
        this._cardSelector = cardSelector;
        this._name = nameofplace;
        this._url = url;
        this._handleCardClick = handleCardClick;
    }
    /*Создание карточки*/
    createCard() {
        this._newCard = document
            .querySelector(this._cardSelector)
            .content
            .querySelector('.card')
            .cloneNode(true);
        const titleCard = this._newCard.querySelector('.card__title');
        this.photoLinkCard = this._newCard.querySelector('.card__photo');

        this._setEventListeners();

        titleCard.textContent = this._name;
        this.photoLinkCard.src = this._url;
        this.photoLinkCard.alt = this._name;

        return this._newCard;
    }
    /*Установка слушателей*/
    _setEventListeners() {
        this._newCard.querySelector('.button-like').addEventListener('click', (evt) => { this._toggleLike(evt) });
        this._newCard.querySelector('.button-delete').addEventListener('click', () => { this._deleteCard() });
        this.photoLinkCard.addEventListener('click', () => {
            this._handleCardClick(this._name, this._url); /*Стрелочная функция,чтобы принимала верный this. Так же можно использовать метод bind()*/
        });
    }

    _toggleLike(evt) {
        evt.target.classList.toggle('button-like_active');
    }
    _deleteCard() {
        this._newCard.remove();
        this._newCard = null;
    }
}