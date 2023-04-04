import "./index.css";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import {
    openPopupProfile,
    addCardButton,
    cardsContainer,
    formEdit,
    formAdd,
    nameInput,
    jobInput,
    locationInput,
    linkInput,
    initialCards,
    objectValidation,
} from "../utils/constants.js";

const formValidatorEdit = new FormValidator(objectValidation, formEdit);
const formValidatorAdd = new FormValidator(objectValidation, formAdd);
const addPopup = new PopupWithForm(".popup-add", addCard);
const editPopup = new PopupWithForm(".popup-edit", handleFormSubmitEdit);
const imgPopup = new PopupWithImage(".popup-img");
const userInfo = new UserInfo({
    nameSelector: ".profile__title",
    aboutSelector: ".profile__subtitle",
});

function handleFormSubmitEdit() {
    userInfo.setUserInfo({
        userName: nameInput.value,
        userAbout: jobInput.value,
    });
}
function openProfilePopup() {
    const currentUserInfo = userInfo.getUserInfo();
    nameInput.value = currentUserInfo.userName;
    jobInput.value = currentUserInfo.userAbout;
    formValidatorEdit.toggleButtonState();
    editPopup.open();
}

function createNewCard(item) {
    const newCard = new Card(item, "#card", () => {
        imgPopup.open(item);
    });
    return newCard.generateCard();
}
const renderCard = (item) => {
    cards.prependItem(createNewCard(item));
};

const cards = new Section(
    {
        items: initialCards,
        renderer: (item) => {
            cards.addItem(createNewCard(item));
        },
    },
    cardsContainer
);

cards.renderItems();

function addCard() {
    const addData = {
        name: locationInput.value,
        link: linkInput.value,
    };
    renderCard(addData);
}

formValidatorAdd.enableValidation();

formValidatorEdit.enableValidation();

openPopupProfile.addEventListener("click", openProfilePopup);

addCardButton.addEventListener("click", () => {
    formValidatorAdd.toggleButtonState();
    addPopup.open();
});

addPopup.setEventListeners();
editPopup.setEventListeners();
imgPopup.setEventListeners();

// получаем год
document.querySelector(
    ".footer__copyright span"
).textContent = `${new Date().getFullYear()}`;
