import { openPopup } from "./index.js";
class Card {
    constructor(data, templateSelector) {
        this._text = data.text;
        this._image = data.image;
        this._templateSelector = templateSelector;
        this._element = this._getTemplate();
        this._cardImage = this._element.querySelector(".card__image");
        this._cardText = this._element.querySelector(".card__title");
        this._delete = this._element.querySelector(".card__delete");
        this._heart = this._element.querySelector(".card__heart");
        this._setEventListeners();
    }

    _getTemplate() {
        const cardTemplate = document
            .querySelector(this._templateSelector)
            .content.querySelector(".card")
            .cloneNode(true);
        return cardTemplate;
    }

    _setEventListeners() {
        this._element.addEventListener("click", (e) => {
            if (e.target === this._cardImage) {
                this._clickCardOpenPopupImg();
            }
            if (e.target === this._delete) {
                this._clickCardDelete();
            }
            if (e.target === this._heart) {
                this._clickCardHeart();
            }
        });
    }

    _clickCardOpenPopupImg() {
        const popupImg = document.querySelector(".popup-img");
        openPopup(popupImg);
        const imgThumb = popupImg.querySelector(".popup__image_thumb");
        const titleThumb = popupImg.querySelector(".popup__title_thumb");
        imgThumb.setAttribute("src", this._cardImage.getAttribute("src"));
        imgThumb.setAttribute("alt", this._cardImage.getAttribute("alt"));
        titleThumb.textContent = this._cardImage.getAttribute("alt");
    }
    _clickCardDelete() {
        this._element.remove();
    }
    _clickCardHeart() {
        this._heart.classList.toggle("card__heart_active");
    }
    generateCard() {
        this._cardImage.src = this._image;
        this._cardImage.alt = this._text;
        this._cardText.textContent = this._text;
        return this._element;
    }
}
export default Card;
