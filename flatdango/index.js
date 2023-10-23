document.addEventListener('DOMContentLoaded', () => {
    const filmsList = document.getElementById('films');
    const filmDetails = document.getElementById('film-details');
    const buyTicketButton = document.getElementById('buy-ticket');

    let currentFilm; 
    let availableTickets; 

    fetch('http://localhost:3000/films')
      .then(response => response.json())
      .then(films => {

        currentFilm = films[0];
        availableTickets = currentFilm.capacity - currentFilm.tickets_sold;

        displayMovieDetails(currentFilm);

        buyTicketButton.addEventListener('click', () => {
            if (availableTickets > 0) {
                
                availableTickets--;
                currentFilm.tickets_sold++;
                displayMovieDetails(currentFilm);

                if (availableTickets === 0) {
                    buyTicketButton.textContent = 'Sold Out';
                    buyTicketButton.classList.add('sold-out');
                }
            }
        });

        films.forEach(film => {
            const filmItem = document.createElement('li');
            filmItem.textContent = film.title;
            filmItem.className = 'film-item';
            filmsList.appendChild(filmItem);

