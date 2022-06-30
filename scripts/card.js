import { popupPhoto, openPopup, openPhoto } from "./index.js";

class Card {
    constructor({ name, link }, cardSelector) {
        this._cardSelector = cardSelector;
        this._name = name;
        this._link = link;
    }
    /*Создание карточки*/
    createCard() {
        const newCard = document
            .querySelector(this._cardSelector)
            .content
            .querySelector('.card')
            .cloneNode(true);
        const titleCard = newCard.querySelector('.card__title');
        const photoLinkCard = newCard.querySelector('.card__photo');

        this._setEventListeners(newCard);

        titleCard.textContent = this._name;
        photoLinkCard.src = this._link;
        photoLinkCard.alt = this._name;

        return newCard;
    }
    /*Установка слушателей*/
    _setEventListeners(newCard) {
        this._setEventLike(newCard);
        this._setEventRemoveCard(newCard);
        this._setEvenOpenPopupPhoto(newCard);
    }

    _setEventLike(newCard) {
        newCard.querySelector('.button-like').addEventListener('click', function (evt) {
            evt.target.classList.toggle('button-like_active');
        });
    }
    _setEventRemoveCard(newCard) {
        newCard.querySelector('.button-delete').addEventListener('click', function (evt) {
            const evtTarget = evt.target.closest('.card');
            evtTarget.remove();
        });
    }

    _setEvenOpenPopupPhoto(newCard) {
        newCard.querySelector('.card__photo').addEventListener('click', () => {
            openPhoto(this._name, this._link); /*Стрелочная функция,чтобы принимала верный this. Так же можно использовать метод bind()*/
        });
    }

}

export { Card }