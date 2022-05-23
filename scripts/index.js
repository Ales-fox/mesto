const profile = document.querySelector('.profile');
const popupFormEdit = document.querySelector('.popup_form_edit');
const popupFormAdd = document.querySelector('.popup_form_add');
const buttonEdit = profile.querySelector('.button-edit');
const buttonsClose = document.querySelectorAll('.button-close');
const buttonAdd = profile.querySelector('.button-add');
let inputName = popupFormEdit.querySelector('.input_name');
let inputStatus = popupFormEdit.querySelector('.input_status');
let profileName = profile.querySelector('.profile__name');
let profileStatus = profile.querySelector('.profile__status');
let inputNamePlace = popupFormAdd.querySelector('.input_name-of-place');
let inputURL = popupFormAdd.querySelector('.input_url');
const popupContainerEdit = document.querySelector('.popup__container_edit');
const popupContainerAdd = document.querySelector('.popup__container_add');
const cards = document.querySelector('.cards');
const popupPhoto = document.querySelector('.popup__photo');
const initialCards = [
    {
        name: 'Абхазия',
        link: '../images/card__abchazia.jpg'
    },
    {
        name: 'Алтай',
        link: '../images/card__altay.jpg'
    },
    {
        name: 'Домбай',
        link: '../images/card__dombay.jpg'
    },
    {
        name: 'Камчатка',
        link: '../images/card__kamchatka.jpg'
    },
    {
        name: 'Карачаево-Черкессия',
        link: '../images/card__karachaevo-cherkessia.jpg'
    },
    {
        name: 'Эльбрус',
        link: '../images/card__mountain-elbrus.jpg'
    },
];

initialCards.reverse().forEach(renderCard); /*Отображение 6 начальных карточек на странице*/
const buttonDelete = document.querySelectorAll('.button-delete');
const cardPhoto = document.querySelectorAll('.card__photo');

/*Открытие формы редактирования*/
function openEdit() {
    popupFormEdit.classList.add('popup_opened');
    inputName.value = profileName.textContent;
    inputStatus.value = profileStatus.textContent;
}
/*Открытие формы добавления карточки*/
function openAdd() {
    popupFormAdd.classList.add('popup_opened');
}
/*Закрытие формы редактирования/добавления*/
function close() {
    popupFormAdd.classList.remove('popup_opened');
    popupFormEdit.classList.remove('popup_opened');
    popupPhoto.classList.remove('popup_opened');

}
/*Сохранение и отсылка данных формы редактирования на сервер*/
function formSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = inputName.value;
    profileStatus.textContent = inputStatus.value;
    closeEdit();
}
/*Сохранение данных и последующее добавление новой карточки*/
function formAddsubmit(evt) {
    evt.preventDefault();
    const name = inputNamePlace.value;
    const link = inputURL.value;
    renderCard({ name, link });
    close();
}

/*Добавление новой карточки*/
function renderCard({ name, link }) {
    const templateCard = document.querySelector('.template__card').content;
    const newCard = templateCard.cloneNode(true);
    const titleCard = newCard.querySelector('.card__title');
    const photoLinkCard = newCard.querySelector('.card__photo');
    titleCard.textContent = name;
    photoLinkCard.src = link;
    photoLinkCard.alt = name;
    cards.prepend(newCard);
}

/* Увеличение фото*/
function openPhoto(evt) {
    const evtTarget = evt.target;
    const bigPhoto = popupPhoto.querySelector('.popup__bigPhoto');
    bigPhoto.src = evtTarget.src;
    bigPhoto.alt = evtTarget.alt;
    let subtitle = popupPhoto.querySelector('.popup__subtitle');
    subtitle.textContent = evtTarget.alt;
    console.log(subtitle.textContent);
    popupPhoto.classList.add('popup_opened');
}

const buttonLike = document.querySelectorAll('.button-like').forEach((onelike) => onelike.addEventListener('click', function (evt) {
    evt.target.classList.toggle('button-like_active');/*вкл/выкл лайка*/
}));
buttonEdit.addEventListener('click', openEdit);
buttonAdd.addEventListener('click', openAdd);
buttonsClose.forEach((buttonClose) => buttonClose.addEventListener('click', close));
popupContainerEdit.addEventListener('submit', formSubmitHandler);
popupContainerAdd.addEventListener('submit', formAddsubmit);
buttonDelete.forEach((item) => item.addEventListener('click', function (item) {
    const evt = item.target.closest('.card')
    evt.remove();
}));
cardPhoto.forEach((photo) => photo.addEventListener('click', openPhoto));
