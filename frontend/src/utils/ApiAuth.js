const BASE_URL = "https://api.hukakou.nomoredomains.rocks";

//Регистрация
function register(email, password) {
  const options = {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  };
  return fetch(`${BASE_URL}/signup`, options).then(responseTransformation);
}

//Вход
function login(email, password) {
  const options = {
    method: "POST",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  };
  return fetch(`${BASE_URL}/signin`, options).then(responseTransformation);
}

// Проверка токена
function authorize(token) {
  const options = {
    method: "GET",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${token}`,
    },
  };
  return fetch(`${BASE_URL}/users/me`, options).then(responseTransformation);
}

function responseTransformation(response) {
  return response.ok
    ? response.json()
    : Promise.reject(`${response.status} ${response.statusText}`);
}

export { register, login, authorize };
