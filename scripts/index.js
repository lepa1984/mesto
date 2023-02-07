const openPopupProfile = document.querySelector(".profile__button-edit");
const addCardButton = document.querySelector(".profile__button-add");
const cardsContainer = document.querySelector(".cards");
const popupAdd = document.querySelector(".popup-add");
const popupEdit = document.querySelector(".popup-edit");
const popupImg = document.querySelector(".popup-img");
const closeList = document.querySelectorAll(".popup__close");
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

function closePopup(popup) {
    popup.classList.remove("popup_opened");
}
function createCards(link, name) {
    const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
    cardElement.querySelector(".card__image").src = `${link}`;
    cardElement.querySelector(".card__image").alt = `${name}`;
    cardElement.querySelector(".card__title").textContent = `${name}`;
    return cardElement;
}
initialCards.forEach((item) => {
    renderCard(item.link, item.name);
});

function openPopup(popup) {
    popup.classList.add("popup_opened");
}

function clearValue(input1, input2) {
    input1.value = "";
    input2.value = "";
}

function handleFormSubmitEdit(e) {
    e.preventDefault();
    title.textContent = nameInput.value;
    subtitle.textContent = jobInput.value;
    closePopup(popupEdit);
    clearValue(nameInput, jobInput);
}
function openProfilePopup() {
    nameInput.value = title.textContent;
    jobInput.value = subtitle.textContent;
    openPopup(popupEdit);
}
function renderCard(link, name) {
    cardsContainer.prepend(createCards(link, name));
    cardsContainer.addEventListener("click", clickCards);
}
function addCard(e) {
    e.preventDefault();
    renderCard(linkInput.value, locationInput.value);
    closePopup(popupAdd);
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
        openPopup(popupImg);
        imgThumb.setAttribute("src", e.target.getAttribute("src"));
        imgThumb.setAttribute("alt", e.target.getAttribute("alt"));
        titleThumb.textContent = e.target.getAttribute("alt");
    }
}

openPopupProfile.addEventListener("click", openProfilePopup);

addCardButton.addEventListener("click", () => openPopup(popupAdd));

closeList.forEach((close) => {
    close.addEventListener("click", () => closePopup(close.closest(".popup")));
});

formEdit.addEventListener("submit", handleFormSubmitEdit);

formAdd.addEventListener("submit", addCard);
