import "./index.css";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api";
import {
    openPopupProfile,
    addCardButton,
    cardsContainer,
    formEdit,
    formAdd,
    formAvatar,
    nameInput,
    jobInput,
    objectValidation,
    avatar,
} from "../utils/constants.js";

const api = new Api({
    baseUrl: "https://mesto.nomoreparties.co/v1/cohort-64",
    headers: {
        authorization: "13e186c5-85ac-489b-b88e-7248260de319",
        "Content-Type": "application/json",
    },
});

const formValidatorEdit = new FormValidator(objectValidation, formEdit);
const formValidatorAdd = new FormValidator(objectValidation, formAdd);
const formValidatorAvatar = new FormValidator(objectValidation, formAvatar);
const addPopup = new PopupWithForm(".popup-add", addCard);
const editPopup = new PopupWithForm(".popup-edit", handleSubmit);
const editAvatar = new PopupWithForm(".popup-avatar", handleAvatarSubmit);
const imgPopup = new PopupWithImage(".popup-img");
const popupDelete = new PopupWithConfirmation(".popup-delete");
const userInfo = new UserInfo({
    nameSelector: ".profile__title",
    aboutSelector: ".profile__subtitle",
    avatar: ".profile__avatar",
});
addPopup.setEventListeners();
editPopup.setEventListeners();
imgPopup.setEventListeners();
editAvatar.setEventListeners();
let userId;

Promise.all([api.getUserInfo(), api.getCards()])
    .then(([userData, card]) => {
        userId = userData._id;
        userInfo.setUserInfo(userData);
        userInfo.setAvatarInfo(userData);
        cards.renderItems(card);
    })
    .catch((err) => console.log(err));
const cards = new Section(
    {
        renderer: (item) => {
            cards.addItem(createNewCard(item));
        },
    },
    cardsContainer
);
function handleSubmit(data) {
    editPopup.renderLoading(true, "Сохраниние...");

    api.updateUserInfo(data)
        .then((res) => {
            userInfo.setUserInfo(res);
            editPopup.close();
        })

        .catch((err) => console.log(err))
        .finally(() => {
            editPopup.renderLoading(false);
        });
}
function openProfilePopup() {
    const currentUserInfo = userInfo.getUserInfo();
    nameInput.value = currentUserInfo.userName;
    jobInput.value = currentUserInfo.userAbout;
    editPopup.open();
    formValidatorEdit.toggleButtonState();
}

function handleAvatarSubmit(avatar) {
    editAvatar.renderLoading(true, "Сохраниние...");
    api.updateAvatarInfo(avatar)
        .then((res) => {
            userInfo.setAvatarInfo(res);
        })
        .then(() => editAvatar.close())
        .catch((err) => console.log(err))
        .finally(() => {
            editAvatar.renderLoading(false);
        });
}

function handleCardClick(name, link) {
    imgPopup.open(link, name);
}

const createNewCard = (data) => {
    const card = new Card(
        {
            data: data,
            userId: userId,
            handleCardClick,
            handleDeleteCard: (cardId) => {
                popupDelete.open();
                popupDelete.renderLoading(true);
                popupDelete.setSubmitHandler(() => {
                    api.deleteCards(cardId)
                        .then(() => {
                            popupDelete.close();
                            card.deleteCard();
                        })
                        .catch((err) => console.log(err))
                        .finally(() => {
                            popupDelete.renderLoading(false);
                        });
                });
            },
            handleLike: (cardId) => {
                api.addLike(cardId)
                    .then((data) => {
                        card.toggleLike(data);
                    })
                    .catch((err) => console.log(err));
            },
            handleDeleteLike: (cardId) => {
                api.removeLike(cardId)
                    .then((data) => {
                        card.toggleLike(data);
                    })
                    .catch((err) => console.log(err));
            },
        },
        "#card"
    );
    return card.generateCard();
};

popupDelete.setEventListeners();
const renderCard = (item) => {
    cards.prependItem(createNewCard(item));
};

function addCard(data) {
    addPopup.renderLoading(true, "Сохраниние...");
    const addData = {
        name: data.location,
        link: data.link,
    };

    api.newCard(addData)
        .then((item) => {
            cards.prependItem(createNewCard(item));
            addPopup.close();
        })

        .catch((err) => console.log(err))
        .finally(() => {
            addPopup.renderLoading(false);
        });
}

formValidatorAdd.enableValidation();
formValidatorEdit.enableValidation();
formValidatorAvatar.enableValidation();
openPopupProfile.addEventListener("click", openProfilePopup);

addCardButton.addEventListener("click", () => {
    formValidatorAdd.toggleButtonState();
    addPopup.open();
});
avatar.addEventListener("click", function () {
    editAvatar.open();
    formValidatorAvatar.toggleButtonState();
});
