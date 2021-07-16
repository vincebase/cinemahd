const APIURL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=c464190ec9bc00f5bb66e49680b71749&page=1'
const IMGPATH = 'https://image.tmdb.org/t/p/w1280'
const SEARCHAPI_ENDPOINT = 'https://api.themoviedb.org/3/search/movie?api_key=c464190ec9bc00f5bb66e49680b71749&query="'

const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('search')

// Get initial movies
getMovies(APIURL)

async function getMovies(url) {
    const res = await fetch(url)
    const data = await res.json()

    showMovies(data.results)
}

function showMovies(movies) {
    main.innerHTML = ''

    movies.forEach((movie) => {
        const { title, poster_path, vote_average, overview } = movie

        const movieEl = document.createElement('div')
        movieEl.classList.add('movie')

        movieEl.innerHTML = `
            <img src="${IMGPATH + poster_path}" alt="${title}">
            <div class="movie-info">
          <h3>${title}</h3>
          <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
          <h3>Overview</h3>
          ${overview}
        </div>
        `
        main.appendChild(movieEl)
    })
}

function getClassByRate(vote) {
    if(vote >= 8) {
        return 'green'
    } else if(vote >= 5) {
        return 'orange'
    } else {
        return 'red'
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const searchTerm = search.value

    if(searchTerm && searchTerm !== '') {
        getMovies(SEARCHAPI_ENDPOINT + searchTerm)

        search.value = ''
    } else {
        window.location.reload()
    }
})