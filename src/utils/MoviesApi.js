const BASE_URL = 'https://api.nomoreparties.co/beatfilm-movies'
const checkResponseData = (res) => {
  if (!res.ok) {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  return res.json();
}

export function getBeatfilmMovies() {
  
  return fetch(BASE_URL, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  })
  .then((res) => checkResponseData(res))
  .then(moviesData => moviesData)
  .catch(err => console.log(err))
}