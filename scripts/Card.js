class Card {
    constructor(data, templateSelector, openPopupImage) {
        this._text = data.name;
        this._imageUrl = data.link;
        this._templateSelector = templateSelector;
        this._element = this._getTemplate();
        this._cardImage = this._element.querySelector(".card__image");
        this._cardText = this._element.querySelector(".card__title");
        this._delete = this._element.querySelector(".card__delete");
        this._heart = this._element.querySelector(".card__heart");
        this._setEventListeners();
        this._openPopupImage = openPopupImage;
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
        this._openPopupImage(this._text, this._imageUrl);
    }
    _clickCardDelete() {
        this._element.remove();
    }
    _clickCardHeart() {
        this._heart.classList.toggle("card__heart_active");
    }
    generateCard() {
        this._cardImage.src = this._imageUrl;
        this._cardImage.alt = this._text;
        this._cardText.textContent = this._text;
        return this._element;
    }
}
export default Card;
