//import './index.css'

import { buttonEdit, buttonAdd, config, formValidators, avatar, apiData } from '../utils/constants.js';
import Card from '../components/Card.js'
import FormValidator from '../components/FormValidator.js'
import Section from '../components/Section.js'
import PopupWithImage from '../components/PopupWithImage.js'
import PopupWithForm from '../components/PopupWithForm.js'
import UserInfo from '../components/UserInfo.js'
import Api from '../components/Api.js'
import PopupWithConfirmation from '../components/PopupWithConfirmation.js'

const api = new Api(apiData);
const cardList = new Section({
    renderer: (item) => {
        const cardElement = createCard(item);
        cardList.addItem(cardElement);
    }
}, '.cards');
const popupEdit = new PopupWithForm('.popup_form_edit', handleProfileFormSubmit);
const popupAdd = new PopupWithForm('.popup_form_add', handleCardFormSubmit);
const popupImage = new PopupWithImage('.popup_photo');
const popupDelete = new PopupWithConfirmation('.popup_form_delete', handleDeleteCardSubmit);
const popupUpdateAvatar = new PopupWithForm('.popup_form_updateAvatar', handleAvatarFormSubmit);
const userData = new UserInfo('.profile__name', '.profile__status', '.profile__avatar');

popupImage.setEventListeners();

// Включение валидации
const enableValidation = (config) => {
    const formList = Array.from(document.querySelectorAll(config.form))
    formList.forEach((formElement) => {
        const validator = new FormValidator(config, formElement)
        // получаем данные из атрибута `name` у формы
        const formName = formElement.getAttribute('name')

        // вот тут в объект записываем под именем формы
        formValidators[formName] = validator;
        validator.enableValidation();
    });
};

enableValidation(config);

//Первоначальная загрузка информации о пользователе и с сервера и получение начальных карточек
Promise.all([api.getDataProfile(), api.getDataCard()])
    .then(([itemsUserData, itemsCard]) => {
        userData.saveServerInformation(itemsUserData);
        userData.setUserInfo(itemsUserData.name, itemsUserData.about);
        userData.setUserAvatar(itemsUserData.avatar);
        //вызов рендера начальных карточек
        cardList.renderItems(itemsCard);
    });

/*Создание новых карточек*/
function createCard(obj) {
    //Чтобы при передаче метода не терялся контекст this методы записаны как стрелочные функции
    const cardNew = new Card(obj, '.template__card', handleCardClick, api.deleteLikes, api.putLikes,
        popupDelete.open.bind(popupDelete), userData.getFullPackInfoObj);
    const cardElement = cardNew.createCard();
    return cardElement
}

function handleCardClick(name, url) {
    popupImage.open(name, url);
}

/*Сохранение и отсылка данных формы редактирования на сервер*/
function handleProfileFormSubmit(obj, buttonSubmit) {
    renderLoading(true, buttonSubmit);
    api.sendDataProfile(obj).then(obj => {
        userData.setUserInfo(obj.name, obj.about);
        popupEdit.close();
    }).catch(e => console.error(e));
    renderLoading(false, buttonSubmit);
}

/*Сохранение и отсылка данных на сервер, а так же последующее добавление новой карточки*/
function handleCardFormSubmit(obj, buttonSubmit) {
    renderLoading(true, buttonSubmit);
    api.postCard(obj).then(obj => {
        const cardElement = createCard(obj);
        cardList.prependItem(cardElement);
        popupAdd.close();
    }).catch(e => console.error(e));
    renderLoading(false, buttonSubmit);
}
/*Удаление карточки только после подтверждения*/
function handleDeleteCardSubmit(deleteCard, id) {
    api.deleteCard(id).then(() => {
        deleteCard();
        popupDelete.close();
    }).catch(e => console.error(e));
}

/*Сохранение данных и последующая замена аватара*/
function handleAvatarFormSubmit(obj, buttonSubmit) {
    renderLoading(true, buttonSubmit);
    api.sendDataAvatar(obj).then(obj => {
        userData.setUserAvatar(obj.avatar);
        popupUpdateAvatar.close();
    }).catch(e => console.error(e));
    renderLoading(false, buttonSubmit);
}

function renderLoading(isLoading, buttonSubmit) {
    if (isLoading) {
        buttonSubmit.textContent = 'Cохранение...';
    } else {
        buttonSubmit.textContent = 'Cохранить';
    }
}

/*Навешивание обработчиков событий на кнопки edit, add и аватар*/
buttonEdit.addEventListener('click', function () {
    popupEdit.open();
    popupEdit.setInputValues(userData.getUserInfo());
});
buttonAdd.addEventListener('click', function () {
    formValidators['formCard'].resetValidation(); /*Выбираю нужную мне форму для valid*/
    popupAdd.open();
});
avatar.addEventListener('click', function () {
    popupUpdateAvatar.open();
})