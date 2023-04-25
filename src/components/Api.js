export default class Api {
    constructor({ baseUrl, headers }) {
        this.baseUrl = baseUrl;
        this.headers = headers;
    }

    setId(id) {
        this.id = id;
    }

    async getCards() {
        const res = await fetch(`${this.baseUrl}/cards`, {
            method: "GET",
            headers: this.headers,
        });
        if (res.ok) {
            return res.json();
        }
        return await Promise.reject(`Error ${res.status}`);
    }

    async getUserInfo() {
        const res = await fetch(`${this.baseUrl}/users/me`, {
            method: "GET",
            headers: this.headers,
        });
        if (res.ok) {
            return res.json();
        }
        return await Promise.reject(`Error ${res.status}`);
    }

    async newCard({ name, link }) {
        const res = await fetch(`${this.baseUrl}/cards`, {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify({
                name,
                link,
            }),
        });
        if (res.ok) {
            return res.json();
        }
        return await Promise.reject(`Error ${res.status}`);
    }

    async deleteCards(cardId) {
        const res = await fetch(`${this.baseUrl}/cards/${cardId}`, {
            method: "DELETE",
            headers: this.headers,
        });
        if (res.ok) {
            return res.json();
        }
        return await Promise.reject(`Error ${res.status}`);
    }

    async updateUserInfo(data) {
        console.log(data);
        const res = await fetch(`${this.baseUrl}/users/me`, {
            method: "PATCH",
            headers: this.headers,
            body: JSON.stringify({
                name: data.name,
                about: data.about,
            }),
        });
        if (res.ok) {
            return res.json();
        }
        return await Promise.reject(`Error ${res.status}`);
    }

    async updateAvatarInfo(data) {
        const res = await fetch(`${this.baseUrl}/users/me/avatar`, {
            method: "PATCH",
            headers: this.headers,
            body: JSON.stringify({
                avatar: data.link,
            }),
        });
        if (res.ok) {
            return res.json();
        }
        return await Promise.reject(`Error ${res.status}`);
    }

    async addLike(cardId) {
        const res = await fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
            method: "PUT",
            headers: this.headers,
        });
        if (res.ok) {
            return res.json();
        }
        return await Promise.reject(`Error ${res.status}`);
    }

    async removeLike(cardId) {
        const res = await fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
            method: "DELETE",
            headers: this.headers,
        });
        if (res.ok) {
            return res.json();
        }
        return await Promise.reject(`Error ${res.status}`);
    }
}
