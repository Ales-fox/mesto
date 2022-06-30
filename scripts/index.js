const profile = document.querySelector('.profile');
const popupList = document.querySelectorAll('.popup');
const popupFormEdit = document.querySelector('.popup_form_edit');
const popupFormAdd = document.querySelector('.popup_form_add');
const popupContainerEdit = document.querySelector('.popup__container_edit');
const popupContainerAdd = document.querySelector('.popup__container_add');
const popupPhoto = document.querySelector('.popup_photo');
const editButton = profile.querySelector('.button-edit');
const closeButtons = document.querySelectorAll('.button-close');
const addButton = profile.querySelector('.button-add');
const cards = document.querySelector('.cards');
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

const inputName = popupFormEdit.querySelector('.input_name');
const inputStatus = popupFormEdit.querySelector('.input_status');
const inputNamePlace = popupFormAdd.querySelector('.input_name-of-place');
const inputURL = popupFormAdd.querySelector('.input_url');
const profileName = profile.querySelector('.profile__name');
const profileStatus = profile.querySelector('.profile__status');
const popupPhotoBig = popupPhoto.querySelector('.popup__bigPhoto');
const popupPhotoSubtitle = popupPhoto.querySelector(".popup__subtitle");

import { Card } from './card.js'
import { FormValidator, configValid } from './validate.js'


/*Открытие Popup*/
export function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupEsc);
}

/* Увеличение фото*/
export function openPhoto(name, link) {
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
        hideClosestPopup(evt);
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
    const inputListCard = [inputNamePlace, inputURL];
    cards.prepend(toCreateCard({ name, link }));
    const validation = new FormValidator(configValid, configValid.formSelector);
    validation.resetForm(evt, inputListCard);
    hideClosestPopup(evt);
}

function toCreateCard({ name, link }) {
    const cardClass = new Card({ name, link }, '.template__card');
    const cardElement = cardClass.createCard();
    return cardElement
}

function firstValidation() {
    const validation = new FormValidator(configValid, configValid.formSelector);
    validation.enableValidation();
}
firstValidation();

/*initialCards.forEach(renderCard);*/
initialCards.forEach(({ name, link }) => {
    cards.append(toCreateCard({ name, link }));
});
editButton.addEventListener('click', function (evt) {
    openPopup(popupFormEdit);
    inputName.value = profileName.textContent;
    inputStatus.value = profileStatus.textContent;
});
addButton.addEventListener('click', function (evt) {
    openPopup(popupFormAdd);
});
closeButtons.forEach((closeButton) => closeButton.addEventListener('click', hideClosestPopup));
popupContainerEdit.addEventListener('submit', handleProfileFormSubmit);
popupContainerAdd.addEventListener('submit', handleCardFormSubmit);
popupList.forEach((popupElement) => popupElement.addEventListener('click', closePopupOverlay));

export { templateCard, popupPhoto, initialCards };
