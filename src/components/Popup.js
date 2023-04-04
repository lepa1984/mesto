class Popup {
    constructor(popupSelector) {
        this.popupSelector = document.querySelector(popupSelector);
        this._handleEscClose = this._handleEscClose.bind(this);
    }

    open() {
        this.popupSelector.classList.add("popup_opened");
        document.addEventListener("keydown", this._handleEscClose);
    }

    close() {
        this.popupSelector.classList.remove("popup_opened");
        document.removeEventListener("keydown", this._handleEscClose);
    }

    _handleEscClose(event) {
        if (event.key === "Escape") {
            this.close();
        }
    }

    setEventListeners() {
        this.popupSelector.addEventListener("click", (e) => {
            if (e.target.classList.contains("popup_opened")) {
                this.close();
            } else if (e.target.classList.contains("popup__close")) {
                this.close();
            }
        });
    }
}
export default Popup;
