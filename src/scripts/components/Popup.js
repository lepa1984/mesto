class Popup {
    constructor(popupSelector) {
        this._popup = popupSelector;
        this._handleEscClose = this._handleEscClose.bind(this);
    }

    open() {
        this._popup.classList.add("popup_opened");
        document.addEventListener("keydown", this._handleEscClose);
    }

    close() {
        this._popup.classList.remove("popup_opened");
        document.removeEventListener("keydown", this._handleEscClose);
    }

    _handleEscClose(event) {
        if (event.key === "Escape") {
            this.close();
        }
    }

    setEventListeners() {
        this._popup.addEventListener("click", (e) => {
            if (e.target.classList.contains("popup_opened")) {
                this.close();
            } else if (e.target.classList.contains("popup__close")) {
                this.close();
            }
        });
    }
}
export default Popup;
