// Открытие попапа

const openPopupButton = document.querySelector(".profile__button-edit");

const popup = document.querySelector(".popup");
const popupClose = document.querySelector(".popup__close");
const page = document.querySelector(".page");
function closePopup() {
    popup.classList.remove("popup_opened");
    page.classList.remove("page_active");
}
openPopupButton.addEventListener("click", () => {
    popup.classList.add("popup_opened");
    page.classList.add("page_active");
});

popupClose.addEventListener("click", closePopup);

popup.addEventListener("click", (e) => {
    if (e.target == popup) {
        closePopup();
    }
});

// валидация формы

const formElement = document.querySelector(".form");
let nameInput = formElement.querySelector(".form__input[name='name']");
let jobInput = formElement.querySelector(".form__input[name='about']");

if (formElement) {
    formElement.addEventListener("submit", handleFormSubmit);
}

function valid() {
    if (nameInput.value.length > 2 && jobInput.value.length > 5) {
        return true;
    }
}

function handleFormSubmit(e) {
    e.preventDefault();
    if (valid()) {
        let valueName = nameInput.value;
        let valueJob = jobInput.value;
        let title = document.querySelector(".profile__title");
        let subtitle = document.querySelector(".profile__subtitle");
        title.textContent = valueName;
        subtitle.textContent = valueJob;
        closePopup();
        formElement.reset();
    }
}

// активная иконка сердечко

const icons = document.querySelectorAll(".card__heart");
icons.forEach((icon) => {
    icon.addEventListener("click", () =>
        icon.classList.toggle("card__heart_active")
    );
});
