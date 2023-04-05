import Popup from "./Popup.js";
class PopupWithForm extends Popup {
    constructor(popupSelector, handleSubmit) {
        super(popupSelector);
        this._handleSubmit = handleSubmit;
        this._form = this._popup.querySelector(".form");
    }
    _getInputValues() {
        const values = {};
        this.inputsForms = this._form.querySelectorAll(".form__input");
        this.inputsForms.forEach((input) => {
            values[input.name] = input.value;
        });
        return values;
    }
    setEventListeners() {
        super.setEventListeners();

        this._form.addEventListener("submit", (e) => {
            e.preventDefault();
            this._handleSubmit(this._getInputValues());
            this.close();
        });
    }

    close() {
        super.close();
        this._form.reset();
    }
}
export default PopupWithForm;