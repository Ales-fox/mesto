import './index.css'

import Card from '../components/Card.js'
import FormValidator from '../components/FormValidator.js'
import Section from '../components/Section.js'
import PopupWithImage from '../components/PopupWithImage.js'
import PopupWithForm from '../components/PopupWithForm.js'
import UserInfo from '../components/UserInfo.js'

const profile = document.querySelector('.profile');
const popupFormEdit = document.querySelector('.popup_form_edit');
const popupFormAdd = document.querySelector('.popup_form_add');
const popupPhoto = document.querySelector('.popup_photo');
const buttonEdit = profile.querySelector('.button-edit');
const buttonAdd = profile.querySelector('.button-add');
const cardsContainer = document.querySelector('.cards');
const templateCard = document.querySelector('.template__card').content;
const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];
const formSelectors = {
    form: '.popup__container',
    inputSelector: '.input',
    submitButtonSelector: '.button-submit',
    inactiveButtonClass: 'button_invalid',
    inputErrorClass: 'input_type_error',
    errorClass: 'input-error'
};
const inputName = popupFormEdit.querySelector('.input_name');
const inputStatus = popupFormEdit.querySelector('.input_status');
const profileName = profile.querySelector('.profile__name');
const profileStatus = profile.querySelector('.profile__status');
const formEditProfile = document.querySelector('.popup__container_edit');
const formAddCard = document.querySelector('.popup__container_add');
const profileValidation = new FormValidator(formSelectors, formEditProfile);
const newCardValidation = new FormValidator(formSelectors, formAddCard);
const popupEdit = new PopupWithForm('.popup_form_edit', handleProfileFormSubmit);
const popupAdd = new PopupWithForm('.popup_form_add', handleCardFormSubmit);
const userData = new UserInfo('.input_name', '.input_status')

/*Создание начальных карточек*/
const defaultCardList = new Section({
    items: initialCards,
    renderer: (item) => {
        const initialCard = new Card(item, '.template__card', handleCardClick);
        const cardElement = initialCard.createCard();
        defaultCardList.addItem(cardElement);
    }
}, '.cards');
defaultCardList.renderItems();/*вызов рендера начальных карточек*/

function handleCardClick(name, link) {
    const popupImage = new PopupWithImage('.popup_photo');
    popupImage.setEventListeners();
    popupImage.open(name, link);
}

/*Сохранение и отсылка данных формы редактирования на сервер*/
function handleProfileFormSubmit() {
    userData.getUserInfo();
    userData.setUserInfo();
    popupEdit.close();
}
/*Сохранение данных и последующее добавление новой карточки*/
function handleCardFormSubmit() {
    popupAdd._getInputValues();
    const name = popupAdd._formValues.nameofplace;
    const link = popupAdd._formValues.url;
    cardsContainer.prepend(toCreateCard({ name, link }));
    newCardValidation.resetValidation();
    popupAdd.close();
}


function toCreateCard({ name, link }) {
    const cardNew = new Card({ name, link }, '.template__card', handleCardClick);
    const cardElement = cardNew.createCard();
    return cardElement
}


/*Первичная валидация форм. Отдельная для каждой формы*/
profileValidation.enableValidation();
newCardValidation.enableValidation();

buttonEdit.addEventListener('click', function () {
    popupEdit.open();
    inputName.value = profileName.textContent;
    inputStatus.value = profileStatus.textContent;
});
buttonAdd.addEventListener('click', function () {
    popupAdd.open();
});

export { profileName, profileStatus };
