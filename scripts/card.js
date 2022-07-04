class Card {
    constructor({ name, link }, cardSelector, openPhoto) {
        this._cardSelector = cardSelector;
        this._name = name;
        this._link = link;
        this._openPhoto = openPhoto;
    }
    /*Создание карточки*/
    createCard() {
        const newCard = document
            .querySelector(this._cardSelector)
            .content
            .querySelector('.card')
            .cloneNode(true);
        const titleCard = newCard.querySelector('.card__title');
        this.photoLinkCard = newCard.querySelector('.card__photo');

        this._setEventListeners(newCard);

        titleCard.textContent = this._name;
        this.photoLinkCard.src = this._link;
        this.photoLinkCard.alt = this._name;

        return newCard;
    }
    /*Установка слушателей*/
    _setEventListeners(newCard) {
        newCard.querySelector('.button-like').addEventListener('click', (evt) => { this._setEventLike(evt) });
        newCard.querySelector('.button-delete').addEventListener('click', () => { this._setEventRemoveCard() });
        this.photoLinkCard.addEventListener('click', () => {
            this._openPhoto(this._name, this._link); /*Стрелочная функция,чтобы принимала верный this. Так же можно использовать метод bind()*/
        });
    }

    _setEventLike(evt) {
        evt.target.classList.toggle('button-like_active');
    }
    _setEventRemoveCard() {
        this._newCard.remove();
        this._newCard = null;
    }
}

export { Card };