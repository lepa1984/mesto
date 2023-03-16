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
        console.log(this._form);
        input.classList.add(this._settings.inputErrorClass);
        error.textContent = input.validationMessage;
        error.classList.add(this._settings.errorClass);
    }

    _hideError(input) {
        const error = this._form.querySelector(`.${input.id}-error`);
        console.log(this._form);
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

    _toggleButtonState() {
        if (this._form.querySelector(`form`).checkValidity()) {
            this._button.disabled = false;
        } else {
            this._button.disabled = true;
        }
    }

    _setEventListeners() {
        this._inputs.forEach((input) => {
            input.addEventListener("input", () => {
                this._checkInputValidity(input);
                this._toggleButtonState();
            });
        });
        this._toggleButtonState();
    }

    enableValidation() {
        this._form.addEventListener("submit", (e) => {
            e.preventDefault();
        });
        this._setEventListeners();
    }
}
export default FormValidator;
