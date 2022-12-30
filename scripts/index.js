// Открытие попапа

const openPopupButton = document.querySelector(".profile__button-edit");
const popup = document.querySelector(".popup");
const popupClose = popup.querySelector(".popup__close");
const formElement = document.querySelector(".form");
const nameInput = formElement.querySelector(".form__input_name_value");
const jobInput = formElement.querySelector(".form__input_about_value");
const title = document.querySelector(".profile__title");
const subtitle = document.querySelector(".profile__subtitle");
console.log(nameInput);
function closePopup() {
    popup.classList.remove("popup_opened");
}

function openPopup() {
    popup.classList.add("popup_opened");
    nameInput.value = title.textContent;
    jobInput.value = subtitle.textContent;
}

function handleFormSubmit(e) {
    e.preventDefault();
    title.textContent = nameInput.value;
    subtitle.textContent = jobInput.value;
    closePopup();
}

openPopupButton.addEventListener("click", openPopup);

popupClose.addEventListener("click", closePopup);

formElement.addEventListener("submit", handleFormSubmit);

// активная иконка сердечко

// const icons = document.querySelectorAll(".card__heart");
// icons.forEach((icon) => {
//     icon.addEventListener("click", () =>
//         icon.classList.toggle("card__heart_active")
//     );
// });
