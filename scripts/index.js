// Открытие попапа

const openPopupButton = document.querySelector(".profile__button-edit");
const addCardButton = document.querySelector(".profile__button-add");
const cards = document.querySelector(".cards");
const icons = document.querySelectorAll(".card__heart");
const popupAdd = document.querySelector(".popup-add");
const popupEdit = document.querySelector(".popup-edit");
const popupImg = document.querySelector(".popup-img");
const popupClose = document.querySelectorAll(".popup__close");
const popupContainer = popupImg.querySelector(".popup__wrapper");
const formEdit = document.querySelector("#form-edit");
const formAdd = document.querySelector("#form-add");
const nameInput = formEdit.querySelector(".form__input_name_value");
const jobInput = formEdit.querySelector(".form__input_about_value");
const locationInput = formAdd.querySelector(".form__input_location_value");
const linkInput = formAdd.querySelector(".form__input_link_value");
const title = document.querySelector(".profile__title");
const subtitle = document.querySelector(".profile__subtitle");
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
    document.querySelectorAll(".popup_opened").forEach((close) => {
        close.classList.remove("popup_opened");
    });
    if (document.querySelector(".card__image_thumb")) {
        document.querySelector(".card__image_thumb").remove();
        document.querySelector(".card__title_thumb").remove();
    }
}
function createCards() {
    initialCards.forEach((item) => {
        const article = document.createElement("article");
        article.classList.add("card");
        article.innerHTML = `
        <div class="card__delete"></div>
        <img  src="${item.link}"  alt="${item.name}" class="card__image" />
       <h2 class="card__title" title="${item.name}">${item.name}</h2>
       <button type="button" class="card__heart"></button>
    `;
        cards.append(article);
    });
}

function openPopup() {
    popupEdit.classList.add("popup_opened");
    nameInput.value = title.textContent;
    jobInput.value = subtitle.textContent;
}

function handleFormSubmit(e) {
    e.preventDefault();
    title.textContent = nameInput.value;
    subtitle.textContent = jobInput.value;
    closePopup();
}
function popupAddCard() {
    popupAdd.classList.add("popup_opened");
}
function addCard(e) {
    e.preventDefault();
    const article = document.createElement("article");
    article.classList.add("card");
    article.innerHTML = `
        <div class="card__delete"></div>
        <img  src="${linkInput.value}"  alt="${locationInput.value}" class="card__image" />
       <h2 class="card__title" title="${locationInput.value}">${locationInput.value}</h2>
       <button type="button" class="card__heart"></button>
    `;
    cards.prepend(article);
    closePopup();
    locationInput.value = "";
    linkInput.value = "";
}
function clickCards(e) {
    if (e.target.classList.contains("card__heart")) {
        e.target.classList.toggle("card__heart_active");
    }
    if (e.target.classList.contains("card__delete")) {
        e.target.parentNode.remove();
    }
    if (e.target.classList.contains("card__image")) {
        popupImg.classList.add("popup_opened");

        const img = document.createElement("img");
        const title = document.createElement("h3");
        img.classList.add("card__image_thumb");
        title.classList.add("card__title_thumb");
        img.setAttribute("src", e.target.getAttribute("src"));
        img.setAttribute("alt", e.target.getAttribute("alt"));
        title.setAttribute(
            "title",
            e.target.nextElementSibling.getAttribute("title")
        );
        title.textContent = e.target.nextElementSibling.innerHTML;
        popupContainer.append(img, title);
    }
}
openPopupButton.addEventListener("click", openPopup);

cards.addEventListener("click", clickCards);

addCardButton.addEventListener("click", popupAddCard);

popupClose.forEach((close) => {
    close.addEventListener("click", closePopup);
});

formEdit.addEventListener("submit", handleFormSubmit);

formAdd.addEventListener("submit", addCard);

createCards();
