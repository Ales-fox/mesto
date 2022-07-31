const profile = document.querySelector('.profile');
const buttonEdit = profile.querySelector('.button-edit');
const buttonAdd = profile.querySelector('.button-add');
const avatar = profile.querySelector('.profile__avatar-hover');
const config = {
    form: '.popup__container',
    inputSelector: '.input',
    submitButtonSelector: '.button-submit',
    inactiveButtonClass: 'button_invalid',
    inputErrorClass: 'input_type_error',
    errorClass: 'input-error'
};
const apiData = {
    baseURL: 'https://nomoreparties.co/v1/cohort-46/',
    headers: {
        authorization: '13749ec2-245f-4fcd-8f22-451e84bec66b',
        'Content-Type': 'application/json'
    }
};
const formValidators = {};

export { buttonEdit, buttonAdd, config, formValidators, avatar, apiData };