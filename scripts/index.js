const profile = document.querySelector('.profile');
const popup = document.querySelectorAll('.popup');
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

/*Отображение 6 начальных карточек на странице*/
function renderCard({ name, link }) {
    cards.append(createCard({ name, link }));
}

/*Добавление новой карточки*/
function createCard({ name, link }) {
    const newCard = templateCard.cloneNode(true);
    const titleCard = newCard.querySelector('.card__title');
    const photoLinkCard = newCard.querySelector('.card__photo');
    newCard.querySelector('.button-like').addEventListener('click', function (evt) {
        evt.target.classList.toggle('button-like_active');
    });
    newCard.querySelector('.button-delete').addEventListener('click', function (evt) {
        const evtTarget = evt.target.closest('.card');
        evtTarget.remove();
    });
    newCard.querySelector('.card__photo').addEventListener('click', function () {
        openPopup(popupPhoto);
        openPhoto(name, link);
    });
    titleCard.textContent = name;
    photoLinkCard.src = link;
    photoLinkCard.alt = name;
    return newCard;
}

/*Открытие Popup*/
function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', evt => closePopupEsc(evt, popup));
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
    document.removeEventListener('keydown', evt => closePopupEsc(evt, popup));
}

function closePopupOverlay(evt) {
    if (evt.target === evt.currentTarget) {
        hideClosestPopup(evt);
    };
}

function closePopupEsc(evt, popup) {
    console.log(evt.key);
    if (evt.key === 'Escape') {
        closePopup(popup);
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
    cards.prepend(createCard({ name, link }));
    evt.target.reset();
    hideClosestPopup(evt);
}

initialCards.forEach(renderCard);
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
popup.forEach((popupElement) => popupElement.addEventListener('click', closePopupOverlay));