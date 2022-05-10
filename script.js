let profile = document.querySelector('.profile');
let popup = document.querySelector('.popup');
let buttonEdit = profile.querySelector('.button__edit');
let buttonClose = popup.querySelector('.button__close');
let inputName = popup.querySelector('.input_name');
let inputStatus = popup.querySelector('.input_status');
let profileName = profile.querySelector('.profile__name');
let profileStatus = profile.querySelector('.profile__status');
let popupContainer = popup.querySelector('.popup__container');

function openEdit() {
    popup.classList.add('popup_opened');
}

function closeEdit() {
    popup.classList.remove('popup_opened');
}

function formSubmitHandler(evt) {
    evt.preventDefault();
    profileName.innerHTML = `
    <h3 class="profile__name">${inputName.value}<button class="button__edit button"></button>
        </h3>`;
    profileStatus.textContent = `${inputStatus.value}`;
    closeEdit();
}

buttonEdit.addEventListener('click', openEdit);
buttonClose.addEventListener('click', closeEdit);
popupContainer.addEventListener('submit', formSubmitHandler); 