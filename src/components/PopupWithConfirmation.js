import Popup from "./Popup.js";

class PopupWithConfirmation extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._yesButton = this._popup.querySelector(".form");
        this._button = this._popup.querySelector(".form__button");
    }

    setSubmitHandler(handler) {
        this._handleSubmit = handler;
    }

    setEventListeners() {
        super.setEventListeners();

        this._yesButton.addEventListener("submit", (evt) => {
            evt.preventDefault();
            this._handleSubmit({ id: this._id, cards: this._cards });
        });
    }

    open(id, cards) {
        super.open();
        this._id = id;
        this._cards = cards;
    }

    renderLoading(isLoading) {
        if (isLoading) {
            this._button.textContent = "Да";
        } else {
            this._button.textContent = "Удаление...";
        }
    }
}
export default PopupWithConfirmation;
