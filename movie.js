const API_KEY = '54c081db8091c09bfa574339f528734d';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get('id');
    
    if (movieId) {
        fetchMovieDetails(movieId);
    }

    document.getElementById('back').addEventListener('click', () => {
        window.history.back();
    });
});

function fetchMovieDetails(movieId) {
    fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`)
        .then(response => response.json())
        .then(movie => {
            renderMovieDetails(movie);
        })
        .catch(error => console.error('Error fetching movie details:', error));
}

function renderMovieDetails(movie) {
    const movieDetails = document.getElementById('movie-details');
    movieDetails.innerHTML = `
        <img src="${IMAGE_BASE_URL}${movie.poster_path}" alt="${movie.title}">
        <h2>${movie.title}</h2>
        <p>${movie.overview}</p>
    `;
}
