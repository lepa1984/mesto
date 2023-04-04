import Popup from "./Popup.js";
class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._image = this.popupSelector.querySelector(".popup__image_thumb");
        this._text = this.popupSelector.querySelector(".popup__title_thumb");
    }

    open(data) {
        this._image.src = data.link;
        this._image.alt = data.name;
        this._text.textContent = data.name;
        super.open();
    }
}
export default PopupWithImage;
