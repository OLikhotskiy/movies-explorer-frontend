class MainApi {
  constructor({ baseUrl, headers, beatfilmBaseUrl}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
    this._beatfilmBaseUrl = beatfilmBaseUrl;
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  _request(url, options) {
    return fetch(url, options).then(this._getResponseData);
  }
  
  registration(name, email, password) {
    return this._request(`${this._baseUrl}/signup`, {
      method: "POST",
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({ name, email, password }),
    });
  }
  
  login(email, password) {
    return this._request(`${this._baseUrl}/signin`, {
      method: "POST",
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({ email, password }),
    })
    .then((res) => {
      if (res.token) {
        return res
      }
    })
  }

  getToken(token) {
    return this._request(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: {
        'Content-Type': "application/json",
        'Authorization': `Bearer ${token}`,
      },
      credentials: 'include',
    })
  }

  logout() {
    return this._request(`${this._baseUrl}/signout`, {
      method: 'POST',
      headers: this._headers,
      credentials: 'include',
    });
  }

  getUserInfo() {
    return this._request(`${this._baseUrl}/users/me/`, {
      headers: this._headers,
      credentials: 'include',
    });
  }

  setUserInfo(newData) {
    return this._request(`${this._baseUrl}/users/me/`, {
      method: "PATCH",
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        name: newData.name,
        email: newData.email,
      }),
    });
  }

  getMovies() {
    return this._request(`${this._baseUrl}/movies/`, {
      headers: this._headers,
      credentials: 'include',
    });
  }

  addMovie(movieData) {
    return this._request(`${this._baseUrl}/movies/`, {
      method: "POST",
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        country: movieData.country,
        director: movieData.director,
        duration: movieData.duration,
        year: movieData.year,
        description: movieData.description,
        image: `${this._filmsBaseUrl}${movieData.image.url}`,
        trailerLink: movieData.trailerLink,
        thumbnail: `${this._filmsBaseUrl}${movieData.image.url}`,
        movieId: movieData.movieId,
        nameRU: movieData.nameRU,
        nameEN: movieData.nameEN,
      }),
    });
  }

  deletemovie(movieData) {
    return this._request(`${this._baseUrl}/cards/${movieData._id}`, {
      method: "DELETE",
      headers: this._headers,
      credentials: 'include',
    });
  }

  
  

}

const mainApi = new MainApi({
  baseUrl: "https://api.project-movies-exp.nomoredomains.rocks",
  headers: {
    'Accept': 'application/json',
    "Content-Type": "application/json",
  },
  beatfilmBaseUrl: 'https://api.nomoreparties.co',
});

export default mainApi;

