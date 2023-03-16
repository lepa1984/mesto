const openPopupProfile = document.querySelector(".profile__button-edit");
const addCardButton = document.querySelector(".profile__button-add");
const cardsContainer = document.querySelector(".cards");
const popupAdd = document.querySelector(".popup-add");
const popupEdit = document.querySelector(".popup-edit");
const closeList = document.querySelectorAll(".popup__close");
const formEdit = document.querySelector("#form-edit");
const formButtonAdd = document.querySelector(".form__button-add");
const formButtonEdit = document.querySelector(".form__button-edit");
const formAdd = document.querySelector("#form-add");
const nameInput = formEdit.querySelector(".form__input_name_value");
const jobInput = formEdit.querySelector(".form__input_about_value");
const locationInput = formAdd.querySelector(".form__input_location_value");
const linkInput = formAdd.querySelector(".form__input_link_value");
const title = document.querySelector(".profile__title");
const subtitle = document.querySelector(".profile__subtitle");
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

const initialCards = [
    {
        name: "Колизей",
        link: "./images/colisey.jpg",
    },
    {
        name: "Пиза - падающая башня",
        link: "./images/pisa.jpg",
    },
    {
        name: "Архангельск",
        link: "./images/arhangelsk.jpg",
    },
    {
        name: "Астрахань",
        link: "./images/astrahan.jpg",
    },
    {
        name: "Витязево",
        link: "./images/vityazevo.jpg",
    },
    {
        name: "Гора Змейка",
        link: "./images/zmeyka.jpg",
    },
];
const objectValidation = {
    formSelector: ".form",
    inputSelector: ".form__input",
    submitButtonSelector: ".form__button",
    inputErrorClass: "form__input_type_error",
    errorClass: "form__input-error_active",
};

function closePopup(popup) {
    popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", closeByEscape);
    popup.removeEventListener("click", clickOverlay);
}

export function openPopup(popup) {
    popup.classList.add("popup_opened");
    popup.addEventListener("mousedown", clickOverlay);
    document.addEventListener("keydown", closeByEscape);
}
function closeByEscape(e) {
    if (e.key === "Escape") {
        const openedPopup = document.querySelector(".popup_opened");
        closePopup(openedPopup);
    }
}
function clickOverlay(e) {
    if (e.target.classList.contains("popup_opened")) {
        const openedPopup = document.querySelector(".popup_opened");
        closePopup(openedPopup);
    }
}

function handleFormSubmitEdit(e) {
    e.preventDefault();
    title.textContent = nameInput.value;
    subtitle.textContent = jobInput.value;
    closePopup(popupEdit);
    e.target.reset();
}
function openProfilePopup() {
    nameInput.value = title.textContent;
    jobInput.value = subtitle.textContent;

    if (nameInput.value && jobInput.value) {
        formButtonEdit.disabled = false;
    }
    openPopup(popupEdit);
}
function renderCard(link, name) {
    const cardData = {
        text: name,
        image: link,
    };
    const card = new Card(cardData, "#card");
    cardsContainer.append(card.generateCard());
}
function addCard(e) {
    e.preventDefault();
    renderCard(linkInput.value, locationInput.value);
    closePopup(popupAdd);
    e.target.reset();
    formButtonAdd.disabled = true;
}
const formValidatorEdit = new FormValidator(objectValidation, popupEdit);
formValidatorEdit.enableValidation();

const formValidatorAdd = new FormValidator(objectValidation, popupAdd);
formValidatorAdd.enableValidation();

initialCards.forEach((item) => {
    renderCard(item.link, item.name);
});

openPopupProfile.addEventListener("click", openProfilePopup);

addCardButton.addEventListener("click", () => openPopup(popupAdd));

closeList.forEach((close) => {
    close.addEventListener("click", () => closePopup(close.closest(".popup")));
});

formEdit.addEventListener("submit", handleFormSubmitEdit);

formAdd.addEventListener("submit", addCard);
