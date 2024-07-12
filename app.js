const API_KEY = '54c081db8091c09bfa574339f528734d';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
let currentPage = 1;

document.addEventListener('DOMContentLoaded', () => {
    fetchMovies(currentPage);

    document.getElementById('prev').addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            fetchMovies(currentPage);
        }
    });

    document.getElementById('next').addEventListener('click', () => {
        currentPage++;
        fetchMovies(currentPage);
    });
});

function fetchMovies(page) {
    fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`)
        .then(response => response.json())
        .then(data => {
            renderMovies(data.results);
            updatePageInfo(page, data.total_pages);
        })
        .catch(error => console.error('Error fetching data:', error));
}

function renderMovies(movies) {
    const moviesContainer = document.getElementById('movies');
    moviesContainer.innerHTML = '';

    movies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.className = 'movie-card';
        movieCard.addEventListener('click', () => {
            window.location.href = `movie.html?id=${movie.id}`;
        });

        movieCard.innerHTML = `
            <img src="${IMAGE_BASE_URL}${movie.poster_path}" alt="${movie.title}">
            <div class="movie-info">
                <h3 class="movie-title">${movie.title}</h3>
            </div>
        `;

        moviesContainer.appendChild(movieCard);
    });
}

function updatePageInfo(current, total) {
    document.getElementById('page-info').textContent = `Page ${current} of ${total}`;
}
