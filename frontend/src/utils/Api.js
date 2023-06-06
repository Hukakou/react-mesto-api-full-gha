export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _returnJson(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Что-то пошло не так: ${res.status}`);
  }

  _request(url, options) {
    return fetch(url, options).then(this._returnJson);
  }

  getProfileInfo() {
    return this._request(`${this._baseUrl}users/me`, {
      method: "GET",
      headers: this._headers,
    });
  }

  patchProfileInfo(name, about) {
    return this._request(`${this._baseUrl}users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    });
  }

  patchProfileAvatar(newAvatar) {
    return this._request(`${this._baseUrl}users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: newAvatar,
      }),
    });
  }

  addCard(name, link) {
    return this._request(`${this._baseUrl}cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name,
        link,
      }),
    });
  }

  getCards() {
    return this._request(`${this._baseUrl}cards`, {
      method: "GET",
      headers: this._headers,
    });
  }

  deleteCard(id) {
    return this._request(`${this._baseUrl}cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    });
  }

  addLikeCard(id) {
    return this._request(`${this._baseUrl}/cards/${id}/likes`, {
      method: "PUT",
      headers: this._headers,
    });
  }

  deleteLikeCard(id) {
    return this._request(`${this._baseUrl}/cards/${id}/likes`, {
      method: "DELETE",
      headers: this._headers,
    });
  }

  changeLikeCardStatus(obj, variable) {
    this._status = variable ? this.addLikeCard(obj) : this.deleteLikeCard(obj);
    return this._status;
  }
}

export const api = new Api({
  baseUrl: "https://nomoreparties.co/v1/cohort-60/",
  headers: {
    authorization: "885318d6-d19f-4157-94c3-3c974e90ff3d",
    "Content-Type": "application/json",
  },
});
