import Popup from "./Popup.js"

export default class PopupWithImage extends Popup {
    constructor(selectorPopup) {
        super(selectorPopup);
        this._popupBigPhoto = this._popup.querySelector('.popup__bigPhoto');
        this._popupPhotoSubtitle = this._popup.querySelector('.popup__subtitle');
    }
    /*Увеличение фото*/
    open(name, link) {
        this._popupBigPhoto.alt = name;
        this._popupBigPhoto.src = link;
        this._popupPhotoSubtitle.textContent = name;
        super.open();
    }
}