export default class Card {
    constructor(
        {
            data,
            userId,
            handleCardClick,
            handleDeleteCard,
            handleLike,
            handleDeleteLike,
        },
        cardSelector
    ) {
        this._text = data.name;
        this._imageUrl = data.link;
        this._likes = data.likes;
        this._cardId = data._id;
        this._ownerId = data.owner._id;
        this._userId = userId;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
        this._handleDeleteLike = handleDeleteLike;
        this._handleLike = handleLike;
        this._handleDeleteCard = handleDeleteCard;
    }

    _getTemplate() {
        const cardTemplate = document
            .querySelector(this._cardSelector)
            .content.querySelector(".card")
            .cloneNode(true);

        return cardTemplate;
    }

    _setEventListeners() {
        this._element.addEventListener("click", (e) => {
            if (e.target === this._cardImage) {
                this._handleCardClick(this._text, this._imageUrl);
            }
            if (e.target === this._delete) {
                this._handleDeleteCard(this._cardId);
            }
            if (e.target === this._heart) {
                this._setLikes();
            }
        });
    }

    generateCard() {
        this._element = this._getTemplate();
        this._cardImage = this._element.querySelector(".card__image");
        this._cardText = this._element.querySelector(".card__title");
        this._delete = this._element.querySelector(".card__delete");
        this._heart = this._element.querySelector(".card__heart");
        this._count = this._element.querySelector(".card__count");
        this._cardImage.src = this._imageUrl;
        this._cardImage.alt = this._text;
        this._cardText.textContent = this._text;
        this._count.textContent = this._likes.length;
        this._setEventListeners();
        this._isLiked();
        this._checkUser();
        return this._element;
    }

    deleteCard() {
        this._element.remove();
        this._element = null;
    }

    _isLiked() {
        if (
            this._likes.some((data) => {
                return this._userId === data._id;
            })
        ) {
            this._heart.classList.add("card__heart_active");
        }
    }
    _checkUser() {
        if (this._ownerId !== this._userId) {
            this._delete.remove();
        }
    }
    _setLikes() {
        if (this._heart.classList.contains("card__heart_active")) {
            this._handleDeleteLike(this._cardId);
        } else {
            this._handleLike(this._cardId);
        }
    }
    toggleLike(data) {
        this._heart.classList.toggle("card__heart_active");
        this._likes = data.likes;
        this._count.textContent = this._likes.length;
    }
}
