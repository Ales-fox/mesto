export default class UserInfo {
    constructor(nameSelector, statusSelector) {
        this._profileName = document.querySelector(nameSelector);
        this._profileStatus = document.querySelector(statusSelector);
    }

    getUserInfo() {
        this._name = this._profileName.textContent;
        this._status = this._profileStatus.textContent;
        this.info = {
            name: this._name,
            status: this._status
        };

        return this.info
    }

    setUserInfo(inputName, inputStatus) {
        this._profileName.textContent = inputName;
        this._profileStatus.textContent = inputStatus;
    }
}