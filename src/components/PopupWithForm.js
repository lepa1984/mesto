import Popup from "./Popup.js";
class PopupWithForm extends Popup {
    constructor(popupSelector, handleSubmit) {
        super(popupSelector);
        this._handleSubmit = handleSubmit;
        this._form = this._popup.querySelector(".form");
        this._btn = this._popup.querySelector(".form__button");
        this.inputsForms = this._form.querySelectorAll(".form__input");
        this._btnText = this._btn.textContent;
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
            this._handleSubmit(this._getInputValues());
        });
    }
    renderLoading(isLoading, loadingText) {
        if (isLoading) {
            this._btn.textContent = loadingText;
        } else {
            this._btn.textContent = this._btnText;
        }
    }
    setInputValues(data) {
        this.inputsForms.forEach((input) => {
            input.value = data[input.name];
        });
    }
    close() {
        super.close();
        this._form.reset();
    }
}
export default PopupWithForm;
