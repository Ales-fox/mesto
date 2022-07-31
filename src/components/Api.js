export default class Api {
    constructor({ headers }) {
        this._headers = headers;
    }

    getData(url) {
        return fetch(url, {
            headers: this._headers
        }).then((r) => {
            if (r.ok) {
                return r.json();
            } else {
                Promise.reject(`Ошибка загрузки данных ${r.status}`);
            }
        })
    }

    sendData(url, obj) {
        return fetch(url, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify(obj),
        }).then(r => r.ok ? r.json() : Promise.reject(`Ошибка отправки данных ${r.status} ${r.statusText}`));
    }

    postCard = (url, obj) => {
        return fetch(url, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify(obj),
        }).then(r => r.ok ? r.json() : Promise.reject(`Невозможно добавить карточку ${r.status} ${r.statusText}`));
    }
    //Вывод функции через стрелочную чтобы при передаче данного метода в другой класс не терялся контекст this
    //Так же возможен вариант когда при передаче метода одного класса в другой класс
    //Закреплять this методом bind()
    deleteCard = (url, id) => {
        return fetch(`${url}${id}`, {
            method: "DELETE",
            headers: this._headers,
        }).then(r => r.ok ? r.json() : Promise.reject(`Невозможно удалить карточку' ${r.status} ${r.statusText}`));

    }

    deleteLikes = (url, id) => {
        return fetch(`${url}${id}/likes`, {
            method: "DELETE",
            headers: this._headers,
        }).then(r => r.ok ? r.json() : Promise.reject(`Ошибка удаления лайка' ${r.status} ${r.statusText}`));
    }

    putLikes = (url, id) => {
        return fetch(`${url}${id}/likes`, {
            method: "PUT",
            headers: this._headers
        }).then(r => r.ok ? r.json() : Promise.reject(`Ошибка установки лайка ${r.status} ${r.statusText}`));
    }
}