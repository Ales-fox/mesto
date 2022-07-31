export default class Card {
    constructor(obj, cardSelector, urlForApi, handleCardClick, deleteMethodCard, deleteLikes, putLikes, popupDelete, fullPackInfoObj) {
        this._name = obj.name;
        this._link = obj.link;
        this._id = obj._id;
        this._likes = obj.likes;
        this._ownerId = obj.owner._id;
        this._cardSelector = cardSelector;
        this._url = urlForApi;
        this._handleCardClick = handleCardClick;
        this._deleteMethodCard = deleteMethodCard;
        this._deleteLikes = deleteLikes;
        this._putLikes = putLikes;
        this._popupDelete = popupDelete;
        this._myId = fullPackInfoObj()._id;
        this._myName = fullPackInfoObj().name;
    }
    /*Создание карточки*/
    createCard() {
        this._newCard = document
            .querySelector(this._cardSelector)
            .content
            .querySelector('.card')
            .cloneNode(true);


        this._buttonDelete = this._newCard.querySelector('.button-delete');

        //Если Id владельца карточки не совпадает с моим Id, то кнопке delete добавляю класс "невидимости"
        if (this._ownerId !== this._myId) {
            this._buttonDelete.classList.add('button-delete_inactive');
        }

        this.titleCard = this._newCard.querySelector('.card__title');
        this.buttonLike = this._newCard.querySelector('.button-like');
        this.photoLinkCard = this._newCard.querySelector('.card__photo');
        this.cardCountLike = this._newCard.querySelector('.card__count-like');

        for (let i = 0; i < this._likes.length; i++) {
            if (this._likes[i].name === this._myName) {
                this.buttonLike.classList.add('button-like_active');
                break
            }
        }

        this._setEventListeners();

        this.titleCard.textContent = this._name;
        this.photoLinkCard.src = this._link;
        this.photoLinkCard.alt = this._name;
        this.cardCountLike.textContent = this._likes.length;

        return this._newCard;
    }

    /*Установка слушателей*/
    _setEventListeners() {
        this._newCard.querySelector('.button-like').addEventListener('click', () => {
            if (!this.buttonLike.classList.contains('button-like_active')) {
                this._addLike();
            } else {
                this._removeLike();
            }
        });

        if (!this._buttonDelete.classList.contains('button-delete_inactive')) {
            this._buttonDelete.addEventListener('click', () => { this._popupDelete(this._deleteCard.bind(this)) });
        }

        this.photoLinkCard.addEventListener('click', () => {
            this._handleCardClick(this._name, this._link); /*Стрелочная функция,чтобы принимала верный this. Так же можно использовать метод bind()*/
        });
    }

    _addLike() {
        this._putLikes(this._url, this._id).then((r) => {
            this.buttonLike.classList.add('button-like_active');
            this.cardCountLike.textContent = r.likes.length;
        }).catch(e => console.error(e));
    }

    _removeLike() {
        this._deleteLikes(this._url, this._id).then((r) => {
            this.buttonLike.classList.remove('button-like_active');
            this.cardCountLike.textContent = r.likes.length;
        }).catch(e => console.error(e));

    }

    _deleteCard() {
        this._deleteMethodCard(this._url, this._id).then((r) => {
            this._newCard.remove();
            this._newCard = null;
        }).catch(e => console.error(e));
    }
}