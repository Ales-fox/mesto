import './index.css'

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

//Первоначальная загрузка информации о пользователе с сервера
api.getData(apiData.urlDataProfile).then(items => {
    userData.saveServerInformation(items);
    userData.setUserInfo(items.name, items.about);
    userData.setUserAvatar(items.avatar);
}).catch((error) => console.log(error));

//Получение данных для первых карточек c сервера
function createCardOnServer() {
    api.getData(apiData.urlCard).then(items => {
        const cardList = new Section({
            items: items, /*Передаю массив объектов, полученный с сервера*/
            renderer: (item) => {
                const cardElement = createCard(item);
                cardList.addItem(cardElement);
            }
        }, '.cards');
        cardList.renderItems(); /*вызов рендера начальных карточек*/
    }).catch((error) => console.log(error));
}

/*Создание новых карточек*/
function createCard(obj) {
    //Чтобы при передаче метода не терялся контекст this методы записаны как стрелочные функции
    const cardNew = new Card(obj, '.template__card', apiData.urlCard, handleCardClick, api.deleteCard, api.deleteLikes, api.putLikes, popupDelete.open.bind(popupDelete), userData.getFullPackInfoObj);
    const cardElement = cardNew.createCard();
    return cardElement
}

createCardOnServer();

function handleCardClick(name, url) {
    popupImage.open(name, url);
}

/*Сохранение и отсылка данных формы редактирования на сервер*/
function handleProfileFormSubmit(obj, buttonSubmit) {
    renderLoading(true, buttonSubmit);
    api.sendData(apiData.urlDataProfile, obj).then(obj => {
        userData.setUserInfo(obj.name, obj.about);
        popupEdit.close();
    }).catch(e => console.error(e));
    renderLoading(false, buttonSubmit);
}

/*Сохранение и отсылка данных на сервер, а так же последующее добавление новой карточки*/
function handleCardFormSubmit(obj, buttonSubmit) {
    renderLoading(true, buttonSubmit);
    api.postCard(apiData.urlCard, obj).then(obj => {
        createCardOnServer();
        popupAdd.close();
    }).catch(e => console.error(e));
    renderLoading(false, buttonSubmit);
}
/*Удаление карточки только после подтверждения*/
function handleDeleteCardSubmit(deleteCard) {
    deleteCard();
}

/*Сохранение данных и последующая замена аватара*/
function handleAvatarFormSubmit(obj, buttonSubmit) {
    renderLoading(true, buttonSubmit);
    api.sendData(apiData.urlAvatar, obj).then(obj => {
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