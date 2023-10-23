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

            filmItem.addEventListener('click', () => {
                currentFilm = film;
                availableTickets = currentFilm.capacity - currentFilm.tickets_sold;
                displayMovieDetails(currentFilm);

                buyTicketButton.textContent = 'Buy Ticket';
                buyTicketButton.classList.remove('sold-out');
            });
        });

    })
    .catch(error => console.error('Error fetching movie data:', error));

    function displayMovieDetails(film) {
        
        document.getElementById('film-poster').src = film.poster;
        document.getElementById('film-title').textContent = film.title;
        document.getElementById('film-runtime').textContent = `Runtime: ${film.runtime} minutes`;
        document.getElementById('film-showtime').textContent = `Showtime: ${film.showtime}`;
        document.getElementById('film-tickets').textContent = `Available Tickets: ${availableTickets}`;
      }
});



