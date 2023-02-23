const objectValidation = {
    formSelector: ".form",
    inputSelector: ".form__input",
    submitButtonSelector: ".form__button",
    inputErrorClass: "form__input_type_error",
    errorClass: "form__input-error_active",
};

const showInputError = (formElement, inputElement, errorMessage, setting) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(setting.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(setting.errorClass);
};

const hideInputError = (formElement, inputElement, setting) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(setting.inputErrorClass);
    errorElement.classList.remove(setting.errorClass);
    errorElement.textContent = "";
};

const checkInputValidity = (formElement, inputElement, setting) => {
    if (!inputElement.validity.valid) {
        showInputError(
            formElement,
            inputElement,
            inputElement.validationMessage,
            setting
        );
    } else {
        hideInputError(formElement, inputElement, setting);
    }
};

const setEventListeners = (formElement, setting) => {
    const inputList = Array.from(
        formElement.querySelectorAll(setting.inputSelector)
    );
    const buttonElement = formElement.querySelector(
        setting.submitButtonSelector
    );
    toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener("input", function () {
            checkInputValidity(formElement, inputElement, setting);
            toggleButtonState(inputList, buttonElement);
        });
    });
};

const enableValidation = (setting) => {
    const formList = Array.from(
        document.querySelectorAll(setting.formSelector)
    );

    formList.forEach((formElement) => {
        setEventListeners(formElement, setting);
        formElement.addEventListener("submit", function (evt) {
            evt.preventDefault();
            setEventListeners(formElement, setting);
        });
    });
};

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
};

const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.disabled = true;
    } else {
        buttonElement.disabled = false;
    }
};
enableValidation(objectValidation);
