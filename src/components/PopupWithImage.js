import Popup from "./Popup.js";
class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._image = this._popup.querySelector(".popup__image_thumb");
        this._text = this._popup.querySelector(".popup__title_thumb");
    }

    open(link, name) {
        this._image.src = link;
        this._image.alt = name;
        this._text.textContent = name;
        super.open();
    }
}
export default PopupWithImage;
