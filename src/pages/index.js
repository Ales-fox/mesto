import './index.css'

import { buttonEdit, buttonAdd, initialCards, config, formValidators } from '../utils/constants.js';
import Card from '../components/Card.js'
import FormValidator from '../components/FormValidator.js'
import Section from '../components/Section.js'
import PopupWithImage from '../components/PopupWithImage.js'
import PopupWithForm from '../components/PopupWithForm.js'
import UserInfo from '../components/UserInfo.js'

const popupEdit = new PopupWithForm('.popup_form_edit', handleProfileFormSubmit);
const popupAdd = new PopupWithForm('.popup_form_add', handleCardFormSubmit);
const popupImage = new PopupWithImage('.popup_photo');
const userData = new UserInfo('.profile__name', '.profile__status');

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

/*Создание начального набора карточек*/
const cardList = new Section({
    items: initialCards,
    renderer: (item) => {
        const cardElement = createCard(item);
        cardList.addItem(cardElement);
    }
}, '.cards');
cardList.renderItems();/*вызов рендера начальных карточек*/

/*Создание новых карточек*/
function createCard(obj) {
    const cardNew = new Card(obj, '.template__card', handleCardClick);
    const cardElement = cardNew.createCard();
    return cardElement
}

function handleCardClick(name, url) {
    popupImage.open(name, url);
}

/*Сохранение и отсылка данных формы редактирования на сервер*/
function handleProfileFormSubmit(obj) {
    userData.setUserInfo(obj.name, obj.status);
    popupEdit.close();
}

/*Сохранение данных и последующее добавление новой карточки*/
function handleCardFormSubmit(obj) {
    cardList.prependItem(createCard(obj));
    popupAdd.close();
}

/*Навешиваниеобработчиков событий на кнопки edit и add*/
buttonEdit.addEventListener('click', function () {
    popupEdit.open();
    userData.getUserInfo();
    popupEdit.setInputValues(userData.info);
});
buttonAdd.addEventListener('click', function () {
    formValidators['formCard'].resetValidation(); /*Выбираю нужную мне форму для valid*/
    popupAdd.open();
});