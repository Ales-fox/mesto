const profile = document.querySelector('.profile');
const popupList = document.querySelectorAll('.popup');
const popupFormEdit = document.querySelector('.popup_form_edit');
const popupFormAdd = document.querySelector('.popup_form_add');
const popupPhoto = document.querySelector('.popup_photo');
const buttonEdit = profile.querySelector('.button-edit');
const buttonsClose = document.querySelectorAll('.button-close');
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
const inputNamePlace = popupFormAdd.querySelector('.input_name-of-place');
const inputURL = popupFormAdd.querySelector('.input_url');
const profileName = profile.querySelector('.profile__name');
const profileStatus = profile.querySelector('.profile__status');
const popupPhotoBig = popupPhoto.querySelector('.popup__bigPhoto');
const popupPhotoSubtitle = popupPhoto.querySelector(".popup__subtitle");
const formEditProfile = document.querySelector('.popup__container_edit');
const formAddCard = document.querySelector('.popup__container_add');
const profileValidation = new FormValidator(formSelectors, formEditProfile);
const newCardValidation = new FormValidator(formSelectors, formAddCard);


import { Card } from './Card.js'
import { FormValidator } from './FormValidator.js'

/*Открытие Popup*/
function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupEsc);
}

/* Увеличение фото*/
function openPhoto(name, link) {
    popupPhotoBig.src = link;
    popupPhotoBig.alt = name;
    popupPhotoSubtitle.textContent = name;
    openPopup(popupPhoto);
}

function hideClosestPopup(evt) {
    closePopup(evt.target.closest('.popup'));
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupEsc);
}

/*Закрытие popup нажатием на темный фон*/
function closePopupOverlay(evt) {
    if (evt.target === evt.currentTarget) {
        closePopup(evt.currentTarget);
    };
}

/*Закрытие popup клавишей Esc*/
function closePopupEsc(evt) {
    if (evt.key === 'Escape') {
        const popupActive = document.querySelector('.popup_opened');
        closePopup(popupActive);
    };
}

/*Сохранение и отсылка данных формы редактирования на сервер*/
function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = inputName.value;
    profileStatus.textContent = inputStatus.value;
    hideClosestPopup(evt);
}
/*Сохранение данных и последующее добавление новой карточки*/
function handleCardFormSubmit(evt) {
    evt.preventDefault();
    const name = inputNamePlace.value;
    const link = inputURL.value;
    cardsContainer.prepend(toCreateCard({ name, link }));
    evt.target.reset();/*Очистка формы*/
    newCardValidation.resetValidation();
    hideClosestPopup(evt);
}

function toCreateCard({ name, link }) {
    const cardClass = new Card({ name, link }, '.template__card', openPhoto);
    const cardElement = cardClass.createCard();
    return cardElement
}

/*Первичная валидация форм. Отдельная для каждой формы*/
profileValidation.enableValidation();
newCardValidation.enableValidation();

initialCards.forEach(({ name, link }) => {
    cardsContainer.append(toCreateCard({ name, link }));
});
buttonEdit.addEventListener('click', function (evt) {
    openPopup(popupFormEdit);
    inputName.value = profileName.textContent;
    inputStatus.value = profileStatus.textContent;
});
buttonAdd.addEventListener('click', function (evt) {
    openPopup(popupFormAdd);
});
buttonsClose.forEach((buttonClose) => buttonClose.addEventListener('click', hideClosestPopup));

formEditProfile.addEventListener('submit', handleProfileFormSubmit);
formAddCard.addEventListener('submit', handleCardFormSubmit);
popupList.forEach((popupElement) => popupElement.addEventListener('click', closePopupOverlay));

export { templateCard, initialCards };
