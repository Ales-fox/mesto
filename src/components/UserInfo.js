import { profileName, profileStatus } from '../pages/index.js'

export default class UserInfo {
    constructor(nameSelector, statusSelector) {
        this._nameSelector = nameSelector;
        this._statusSelector = statusSelector;
    }

    getUserInfo() {
        this._inputName = document.querySelector(this._nameSelector);
        this._inputStatus = document.querySelector(this._statusSelector);
    }
    setUserInfo() {
        profileName.textContent = this._inputName.value;
        profileStatus.textContent = this._inputStatus.value;
    }
}