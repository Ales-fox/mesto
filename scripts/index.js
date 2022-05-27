const profile = document.querySelector('.profile');
const popupFormEdit = document.querySelector('.popup_form_edit');
const popupFormAdd = document.querySelector('.popup_form_add');
const popupContainerEdit = document.querySelector('.popup__container_edit');
const popupContainerAdd = document.querySelector('.popup__container_add');
const popupPhoto = document.querySelector('.popup_photo');
const buttonEdit = profile.querySelector('.button-edit');
const buttonsClose = document.querySelectorAll('.button-close');
const buttonAdd = profile.querySelector('.button-add');
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
    newCard.querySelector('.card__photo').addEventListener('click', function (evt) {
        openPopup(popupPhoto);
        openPhoto(evt);
    });
    titleCard.textContent = name;
    photoLinkCard.src = link;
    photoLinkCard.alt = name;
    return newCard;
}
/*Открытие Popup*/
function openPopup(popup) {
    popup.classList.add('popup_opened');
}

/* Увеличение фото*/
function openPhoto(evt) {
    evt.preventDefault();
    const evtTarget = evt.target;
    const bigPhoto = popupPhoto.querySelector('.popup__bigPhoto');
    bigPhoto.src = evtTarget.src;
    bigPhoto.alt = evtTarget.alt;
    const subtitle = popupPhoto.querySelector(".popup__subtitle");
    subtitle.textContent = evtTarget.alt;
    popupPhoto.classList.add('popup_opened');
}
/*Закрытие Popup*/
function closePopup(evt) {
    evt.target.closest('.popup').classList.remove('popup_opened');
}
/*Сохранение и отсылка данных формы редактирования на сервер*/
function formSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = inputName.value;
    profileStatus.textContent = inputStatus.value;
    closePopup(evt);
}
/*Сохранение данных и последующее добавление новой карточки*/
function formAddsubmit(evt) {
    evt.preventDefault();
    const name = inputNamePlace.value;
    const link = inputURL.value;
    cards.prepend(createCard({ name, link }));
    inputNamePlace.value = ''; /* Очищение инпутов для послед. доб. карточек*/
    inputURL.value = '';
    closePopup(evt);
}

initialCards.forEach(renderCard);
buttonEdit.addEventListener('click', function () {
    openPopup(popupFormEdit);
    inputName.value = profileName.textContent;
    inputStatus.value = profileStatus.textContent;
});
buttonAdd.addEventListener('click', function () {
    openPopup(popupFormAdd);
});
buttonsClose.forEach((buttonClose) => buttonClose.addEventListener('click', closePopup));
popupContainerEdit.addEventListener('submit', formSubmitHandler);
popupContainerAdd.addEventListener('submit', formAddsubmit);