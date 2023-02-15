class Api {
  constructor(apiSetting) {
    this._url = apiSetting.url;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserInfoApi() {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      }
    })
      .then(this._checkResponse);
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      }
    })
      .then(this._checkResponse);
  }

  setUserInfoApi(name, job) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        about: job
      })
    })
      .then(this._checkResponse);
  }

  addNewElement(item) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: item.name,
        link: item.link
      })
    })
      .then(this._checkResponse);
  }

  changeLikeCardStatus(cardId, isLiked) {
    return fetch(`${this._url}/cards/likes/${cardId}`, {
      method: isLiked ? 'PUT' : 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      }
    })
      .then(this._checkResponse);
  }

  deleteElement(id) {
    return fetch(`${this._url}/cards/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      }
    })
      .then(this._checkResponse);
  }

  changeAvatar(item) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        avatar: item.avatar
      })
    })
      .then(this._checkResponse);
  }
}

const api = new Api({
  url: 'https://api.maxooin.nomoredomains.work',
});

export default api;
