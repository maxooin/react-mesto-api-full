export const BASE_URL = "https://api.maxooin.nomoredomains.work"

// export const BASE_URL = "http://localhost:3000"

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

export function singup(email, password) {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
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
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
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

export function checkToken() {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      "Content-Type": "application/json",
      // "Authorization": `Bearer ${token}`
    }
  })
    .then(checkResponse)
}
