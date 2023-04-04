import "../pages/index.css";
import image01 from "../images/colisey.jpg";
import image02 from "../images/pisa.jpg";
import image03 from "../images/arhangelsk.jpg";
import image04 from "../images/astrahan.jpg";
import image05 from "../images/vityazevo.jpg";
import image06 from "../images/zmeyka.jpg";
const openPopupProfile = document.querySelector(".profile__button-edit");
const addCardButton = document.querySelector(".profile__button-add");
const cardsContainer = document.querySelector(".cards");
const popupAdd = document.querySelector(".popup-add");
const popupEdit = document.querySelector(".popup-edit");
const popupImg = document.querySelector(".popup-img");
const formEdit = document.querySelector("#form-edit");
const formAdd = document.querySelector("#form-add");
const nameInput = formEdit.querySelector(".form__input_name_value");
const jobInput = formEdit.querySelector(".form__input_about_value");
const locationInput = formAdd.querySelector(".form__input_location_value");
const linkInput = formAdd.querySelector(".form__input_link_value");

import Card from "./components/Card.js";
import Section from "./components/Section.js";
import FormValidator from "./components/FormValidator.js";
import Popup from "./components/Popup.js";
import PopupWithForm from "./components/PopupWithForm.js";
import PopupWithImage from "./components/PopupWithImage.js";
import UserInfo from "./components/UserInfo.js";
const initialCards = [
    {
        name: "Колизей",
        link: image01,
    },
    {
        name: "Пиза - падающая башня",
        link: image02,
    },
    {
        name: "Архангельск",
        link: image03,
    },
    {
        name: "Астрахань",
        link: image04,
    },
    {
        name: "Витязево",
        link: image05,
    },
    {
        name: "Гора Змейка",
        link: image06,
    },
];
// const initialCards = [
//     {
//         name: "Колизей",
//         link: "./images/colisey.jpg",
//     },
//     {
//         name: "Пиза - падающая башня",
//         link: "./images/pisa.jpg",
//     },
//     {
//         name: "Архангельск",
//         link: "./images/arhangelsk.jpg",
//     },
//     {
//         name: "Астрахань",
//         link: "./images/astrahan.jpg",
//     },
//     {
//         name: "Витязево",
//         link: "./images/vityazevo.jpg",
//     },
//     {
//         name: "Гора Змейка",
//         link: "./images/zmeyka.jpg",
//     },
// ];
const objectValidation = {
    formSelector: ".form",
    inputSelector: ".form__input",
    submitButtonSelector: ".form__button",
    inputErrorClass: "form__input_type_error",
    errorClass: "form__input-error_active",
};
const userInfoSelectors = {
    userNameSelector: ".profile__title",
    userAboutSelector: ".profile__subtitle",
};
const formValidatorEdit = new FormValidator(objectValidation, formEdit);
const formValidatorAdd = new FormValidator(objectValidation, formAdd);
const addPopup = new PopupWithForm(popupAdd, addCard);
const editPopup = new PopupWithForm(popupEdit, handleFormSubmitEdit);
const imgPopup = new Popup(popupImg);
const userInfo = new UserInfo({
    nameSelector: userInfoSelectors.userNameSelector,
    aboutSelector: userInfoSelectors.userAboutSelector,
});

function handleFormSubmitEdit(e) {
    userInfo.setUserInfo({
        userName: nameInput.value,
        userAbout: jobInput.value,
    });
    editPopup.close();
}
function openProfilePopup(e) {
    const currentUserInfo = userInfo.getUserInfo();
    nameInput.value = currentUserInfo.userName;
    jobInput.value = currentUserInfo.userAbout;
    formValidatorEdit.toggleButtonState();
    editPopup.open();
}

function createNewCard(item, cardSelector) {
    const newCard = new Card(item, cardSelector, () => {
        const popupImage = new PopupWithImage(popupImg);
        popupImage.open(item);
    });
    return newCard.generateCard();
}

const cards = new Section(
    {
        items: initialCards,
        renderer: (item) => {
            const cardElement = createNewCard(item, "#card");
            cards.addItem(cardElement);
        },
    },
    cardsContainer
);
cards.renderItems();

function addCard() {
    const editData = {
        name: locationInput.value,
        link: linkInput.value,
    };
    const userNewCard = new Section(
        {
            items: [editData],
            renderer: (item) => {
                const newCard = createNewCard(item, "#card");
                userNewCard.addItem(newCard);
            },
        },
        cardsContainer
    );
    userNewCard.renderItems();

    formValidatorAdd.toggleButtonState();
    addPopup.close();
    formAdd.reset();
}
formValidatorAdd.enableValidation();
formValidatorEdit.enableValidation();

openPopupProfile.addEventListener("click", openProfilePopup);

addCardButton.addEventListener("click", () => {
    addPopup.open();
});

addPopup.setEventListeners();
editPopup.setEventListeners();
imgPopup.setEventListeners();
