const openPopupProfile = document.querySelector(".profile__button-edit");
const addCardButton = document.querySelector(".profile__button-add");
const cardsContainer = document.querySelector(".cards");
const popupAdd = document.querySelector(".popup-add");
const popupEdit = document.querySelector(".popup-edit");
const popupImg = document.querySelector(".popup-img");
const closeList = document.querySelectorAll(".popup__close");
const formEdit = document.querySelector("#form-edit");
const formAdd = document.querySelector("#form-add");
const imgThumb = popupImg.querySelector(".popup__image_thumb");
const titleThumb = popupImg.querySelector(".popup__title_thumb");
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
    popup.removeEventListener("click", closeByOverlayClick);
}

function openPopup(popup) {
    popup.classList.add("popup_opened");
    popup.addEventListener("mousedown", closeByOverlayClick);
    document.addEventListener("keydown", closeByEscape);
}
function closeByEscape(e) {
    if (e.key === "Escape") {
        const openedPopup = document.querySelector(".popup_opened");
        closePopup(openedPopup);
    }
}
function closeByOverlayClick(e) {
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
        const buttonDisabled = new FormValidator(objectValidation, formEdit);
        buttonDisabled.toggleButtonState();
    }
    openPopup(popupEdit);
}
function renderCard(link, name) {
    const cardData = {
        name: name,
        link: link,
    };
    const card = new Card(cardData, "#card", openPopupImage);
    cardsContainer.prepend(card.generateCard());
}
function addCard(e) {
    e.preventDefault();
    renderCard(linkInput.value, locationInput.value);
    closePopup(popupAdd);
    e.target.reset();
    const buttonDisabled = new FormValidator(objectValidation, formAdd);
    buttonDisabled.toggleButtonState();
}
function openPopupImage() {
    openPopup(popupImg);
    imgThumb.setAttribute("src", this._cardImage.getAttribute("src"));
    imgThumb.setAttribute("alt", this._cardImage.getAttribute("alt"));
    titleThumb.textContent = this._cardImage.getAttribute("alt");
}
const formValidatorEdit = new FormValidator(objectValidation, formEdit);
formValidatorEdit.enableValidation();

const formValidatorAdd = new FormValidator(objectValidation, formAdd);
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
