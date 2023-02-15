class Api {
  constructor(apiSetting) {
    this._url = apiSetting.url;
    this._headers = apiSetting.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserInfoApi() {
    return fetch(`${this._url}users/me`, {
      method: "GET",
      headers: this._headers
    })
      .then(this._checkResponse);
  }

  getInitialCards() {
    return fetch(`${this._url}cards`, {
      method: "GET",
      headers: this._headers
    })
      .then(this._checkResponse);
  }

  setUserInfoApi(name, job) {
    return fetch(`${this._url}users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: job
      })
    })
      .then(this._checkResponse);
  }

  addNewElement(item) {
    return fetch(`${this._url}cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: item.name,
        link: item.link
      })
    })
      .then(this._checkResponse);
  }

  changeLikeCardStatus(cardId, isLiked) {
    return fetch(`${this._url}cards/likes/${cardId}`, {
      method: isLiked ? 'PUT' : 'DELETE',
      headers: this._headers
    })
      .then(this._checkResponse);
  }

  deleteElement(id) {
    return fetch(`${this._url}cards/${id}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(this._checkResponse);
  }

  changeAvatar(item) {
    return fetch(`${this._url}users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: item.avatar
      })
    })
      .then(this._checkResponse);
  }
}

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-48/',
  headers: {
    authorization: 'dc493407-c65d-4755-8236-dab7c7a9e0c4',
    'Content-Type': 'application/json'
  }
});

export default api;
