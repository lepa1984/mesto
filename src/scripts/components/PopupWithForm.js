import Popup from "./Popup.js";
class PopupWithForm extends Popup {
    constructor(popupSelector, submitCallback) {
        super(popupSelector);
        this._submitCallback = submitCallback;
        this._form = this._popup.querySelector(".form");
        this.inputsForms = this._form.querySelectorAll(".form__input");
    }
    _getInputValues() {
        const values = {};

        this.inputsForms.forEach((input) => {
            values[input.name] = input.value;
        });
        return values;
    }
    setEventListeners() {
        super.setEventListeners();

        this._form.addEventListener("submit", (e) => {
            e.preventDefault();
            this._submitCallback(this._getInputValues());
            this.close();
        });
    }

    close() {
        super.close();
        this._form.reset();
    }
}
export default PopupWithForm;
