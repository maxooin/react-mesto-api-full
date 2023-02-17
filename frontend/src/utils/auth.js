export const BASE_URL = "https://api.maxooin.nomoredomains.work"

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${ res.status }`);
}

export function singup(email, password) {
  return fetch(`${ BASE_URL }/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email: email,
      password: password
    })
  })
    .then(checkResponse)
}

export function login(email, password) {
  return fetch(`${ BASE_URL }/signin`, {
    method: "POST",
    credentials: 'include',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
        email: email,
        password: password
      }
    )
  })
    .then(checkResponse)
}

export function logout() {
  return fetch(`${ BASE_URL }/logout`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      "Content-Type": "application/json"
    },
  })
    .then(checkResponse)
}

export function checkToken() {
  return fetch(`${ BASE_URL }/users/me`, {
    method: "GET",
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
    }
  })
    .then(checkResponse)
}
