class UserInfo {
    constructor({ nameSelector, aboutSelector, avatar }) {
        this._nameElement = document.querySelector(nameSelector);
        this._aboutElement = document.querySelector(aboutSelector);
        this._avatar = document.querySelector(avatar);
    }

    getUserInfo() {
        return {
            userName: this._nameElement.textContent,
            userAbout: this._aboutElement.textContent,
            userAvatar: this._avatar.src,
        };
    }

    setUserInfo({ name, about }) {
        this._nameElement.textContent = name;
        this._aboutElement.textContent = about;
    }
    setAvatarInfo({ avatar }) {
        console.log(avatar);
        this._avatar.src = avatar;
    }
}
export default UserInfo;
