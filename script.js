const profile = document.querySelector('.profile');
const popup = document.querySelector('.popup');
const buttonEdit = profile.querySelector('.button-edit');
const buttonClose = popup.querySelector('.button-close');
let inputName = popup.querySelector('.input_name');
let inputStatus = popup.querySelector('.input_status');
let profileName = profile.querySelector('.profile__name');
let profileStatus = profile.querySelector('.profile__status');
const popupContainer = popup.querySelector('.popup__container');

function openEdit() {
    popup.classList.add('popup_opened');
    inputName.value = profileName.textContent;
    inputStatus.value = profileStatus.textContent;
}

function closeEdit() {
    popup.classList.remove('popup_opened');
}

function formSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = inputName.value;
    profileStatus.textContent = inputStatus.value;
    over()
    closeEdit();
}
function over() {
    if (profileName.textContent.length > 15) {
        profileName.classList.add('over');
    }
    if (profileStatus.textContent.length > 30) {
        profileStatus.classList.add('over');
    }
}

buttonEdit.addEventListener('click', openEdit);
buttonClose.addEventListener('click', closeEdit);
popupContainer.addEventListener('submit', formSubmitHandler); 