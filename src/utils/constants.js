const profile = document.querySelector('.profile');
const buttonEdit = profile.querySelector('.button-edit');
const buttonAdd = profile.querySelector('.button-add');
const initialCards = [
    {
        nameofplace: 'Архыз',
        url: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        nameofplace: 'Челябинская область',
        url: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        nameofplace: 'Иваново',
        url: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        nameofplace: 'Камчатка',
        url: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        nameofplace: 'Холмогорский район',
        url: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        nameofplace: 'Байкал',
        url: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];
const config = {
    form: '.popup__container',
    inputSelector: '.input',
    submitButtonSelector: '.button-submit',
    inactiveButtonClass: 'button_invalid',
    inputErrorClass: 'input_type_error',
    errorClass: 'input-error'
};
const formValidators = {};

export { buttonEdit, buttonAdd, initialCards, config, formValidators };