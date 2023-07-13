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
  
  registration(userData) {
    return this._request(`${this._baseUrl}/signup`, {
      method: "POST",
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({ 
        name: userData.name,
        email: userData.email,
        password: userData.password }),
    });
  }
  
  login(userData) {
    return this._request(`${this._baseUrl}/signin`, {
      method: "POST",
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        email: userData.email,
        password: userData.password
      })
    })
    .then((res) => {
      if (res.token) {
        return res
      }
    })
  }

  // getToken(token) {
  //   return this._request(`${this._baseUrl}/users/me`, {
  //     method: "GET",
  //     headers: {
  //       'Content-Type': "application/json",
  //       'Authorization': `Bearer ${token}`,
  //     },
  //     credentials: 'include',
  //   })
  // }

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

  addMovie(movie) {
    return this._request(`${this._baseUrl}/movies/`, {
      method: "POST",
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: `${this._beatfilmBaseUrl}${movie.image.url}`,
        trailerLink: movie.trailerLink,
        thumbnail: `${this._beatfilmBaseUrl}${movie.image.url}`,
        movieId: movie.id,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
      }),
    });
  }

  deleteMovie(movieData) {
    return this._request(`${this._baseUrl}/movies/${movieData._id}`, {
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

