// Открытие попапа

const openPopupProfile = document.querySelector(".profile__button-edit");
const addCardButton = document.querySelector(".profile__button-add");
const cardsContainer = document.querySelector(".cards");
const icons = document.querySelectorAll(".card__heart");
const popupAdd = document.querySelector(".popup-add");
const popupEdit = document.querySelector(".popup-edit");
const popupImg = document.querySelector(".popup-img");
const closeList = document.querySelectorAll(".popup__close");
const popupImage = popupImg.querySelector(".popup__wrapper");
const formEdit = document.querySelector("#form-edit");
const formAdd = document.querySelector("#form-add");
const nameInput = formEdit.querySelector(".form__input_name_value");
const jobInput = formEdit.querySelector(".form__input_about_value");
const locationInput = formAdd.querySelector(".form__input_location_value");
const linkInput = formAdd.querySelector(".form__input_link_value");
const title = document.querySelector(".profile__title");
const subtitle = document.querySelector(".profile__subtitle");
const cardTemplate = document.querySelector("#card").content;
const imgThumb = popupImg.querySelector(".popup__image_thumb");
const titleThumb = popupImg.querySelector(".popup__title_thumb");
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

function closePopup() {
    if (document.querySelector(".popup.popup_opened")) {
        document
            .querySelector(".popup.popup_opened")
            .classList.remove("popup_opened");
    }
    if (document.querySelector(".card__image_thumb")) {
        document.querySelector(".card__image_thumb").remove();
        document.querySelector(".card__title_thumb").remove();
    }
}
function createCards(link, name) {
    const cardTemplate = document.querySelector("#card").content;
    const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

    cardElement.querySelector(".card__image").src = `${link}`;
    cardElement.querySelector(".card__image").alt = `${name}`;
    cardElement.querySelector(".card__title").textContent = `${name}`;
    cardElement.querySelector(".card__title").title = `${name}`;
    cardsContainer.prepend(cardElement);
}
initialCards.forEach((item) => {
    createCards(item.link, item.name);
});

function openPopup() {
    popupEdit.classList.add("popup_opened");
}

function clearValue(input1, input2) {
    input1.value = "";
    input2.value = "";
}

function handleFormSubmitEdit(e) {
    e.preventDefault();
    title.textContent = nameInput.value;
    subtitle.textContent = jobInput.value;
    closePopup();
    clearValue(nameInput, jobInput);
}
function openProfilePopup() {
    nameInput.value = title.textContent;
    jobInput.value = subtitle.textContent;
    openPopup();
}
function addPopupCard() {
    popupAdd.classList.add("popup_opened");
}
function addCard(e) {
    e.preventDefault();
    createCards(linkInput.value, locationInput.value);
    closePopup();
    clearValue(locationInput, linkInput);
}

function clickCards(e) {
    if (e.target.classList.contains("card__heart")) {
        e.target.classList.toggle("card__heart_active");
    }
    if (e.target.classList.contains("card__delete")) {
        e.target.closest(".card").remove();
    }
    if (e.target.classList.contains("card__image")) {
        popupImg.classList.add("popup_opened");
        imgThumb.setAttribute("src", e.target.getAttribute("src"));
        imgThumb.setAttribute("alt", e.target.getAttribute("alt"));
        titleThumb.setAttribute("title", e.target.getAttribute("alt"));
        titleThumb.textContent = e.target.getAttribute("alt");
        popupImage.append(imgThumb, titleThumb);
    }
}

openPopupProfile.addEventListener("click", openProfilePopup);

cardsContainer.addEventListener("click", clickCards);

addCardButton.addEventListener("click", addPopupCard);

closeList.forEach((close) => {
    close.addEventListener("click", closePopup);
});

formEdit.addEventListener("submit", handleFormSubmitEdit);

formAdd.addEventListener("submit", addCard);
