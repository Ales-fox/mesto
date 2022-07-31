export default class UserInfo {
    constructor(nameSelector, statusSelector, avatarSelector) {
        this._profileName = document.querySelector(nameSelector);
        this._profileStatus = document.querySelector(statusSelector);
        this._profileAvatar = document.querySelector(avatarSelector);
    }

    getUserInfo() {
        this._name = this._profileName.textContent;
        this._about = this._profileStatus.textContent;

        this.info = {
            name: this._name,
            about: this._about
        };

        return this.info
    }

    getFullPackInfoObj = () => {
        return this._userInformation;
    }

    saveServerInformation(userInformation) {
        this._userInformation = userInformation;
    }

    setUserInfo(inputName, inputStatus) {
        this._profileName.textContent = inputName;
        this._profileStatus.textContent = inputStatus;
    }

    setUserAvatar(avatarLink) {
        this._profileAvatar.src = avatarLink;
    }
}