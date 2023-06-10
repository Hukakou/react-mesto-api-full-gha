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
    const token = localStorage.getItem("token");
    return this._request(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${ token }`,
        "Content-Type": "application/json",
      }
    });
  }

  patchProfileInfo(name, about) {
    const token = localStorage.getItem("token");
    return this._request(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${ token }`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    });
  }

  patchProfileAvatar(newAvatar) {
    const token = localStorage.getItem("token");
    return this._request(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${ token }`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: newAvatar,
      }),
    });
  }

  addCard(name, link) {
    const token = localStorage.getItem("token");
    return this._request(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${ token }`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        link,
      }),
    });
  }

  getCards() {
    const token = localStorage.getItem("token");
    return this._request(`${this._baseUrl}/cards`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${ token }`,
        "Content-Type": "application/json",
      },
    });
  }

  deleteCard(id) {
    const token = localStorage.getItem("token");
    return this._request(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${ token }`,
        "Content-Type": "application/json",
      },
    });
  }

  addLikeCard(id) {
    const token = localStorage.getItem("token");
    return this._request(`${this._baseUrl}/cards/${id}/likes`, {
      method: "PUT",
      headers: {
        authorization: `Bearer ${ token }`,
        "Content-Type": "application/json",
      },
    });
  }

  deleteLikeCard(id) {
    const token = localStorage.getItem("token");
    return this._request(`${this._baseUrl}/cards/${id}/likes`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${ token }`,
        "Content-Type": "application/json",
      },
    });
  }

  changeLikeCardStatus(obj, variable) {
    this._status = variable ? this.addLikeCard(obj) : this.deleteLikeCard(obj);
    return this._status;
  }
}

export const api = new Api({
  baseUrl: "https://api.hukakou.nomoredomains.rocks",
  headers: {
    // authorization: "885318d6-d19f-4157-94c3-3c974e90ff3d",
    "Content-Type": "application/json",
  },
});
