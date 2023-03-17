class FormValidator {
    constructor(settings, form) {
        this._form = form;
        this._settings = settings;
        this._inputs = this._form.querySelectorAll(
            this._settings.inputSelector
        );
        this._button = this._form.querySelector(
            this._settings.submitButtonSelector
        );
    }

    _showError(input) {
        const error = this._form.querySelector(`.${input.id}-error`);
        input.classList.add(this._settings.inputErrorClass);
        error.textContent = input.validationMessage;
        error.classList.add(this._settings.errorClass);
    }

    _hideError(input) {
        const error = this._form.querySelector(`.${input.id}-error`);
        input.classList.remove(this._settings.inputErrorClass);
        error.textContent = "";
        error.classList.remove(this._settings.errorClass);
    }

    _checkInputValidity(input) {
        if (input.validity.valid) {
            this._hideError(input);
        } else {
            this._showError(input);
        }
    }

    toggleButtonState() {
        if (this._form.checkValidity()) {
            this._button.disabled = !this._form.checkValidity();
        } else {
            this._button.disabled = true;
        }
    }

    _setEventListeners() {
        this._inputs.forEach((input) => {
            input.addEventListener("input", () => {
                this._checkInputValidity(input);
                this.toggleButtonState();
            });
        });
        this._form.addEventListener("submit", (e) => {
            e.preventDefault();
        });
        this.toggleButtonState();
    }

    enableValidation() {
        this._setEventListeners();
    }
}
export default FormValidator;
