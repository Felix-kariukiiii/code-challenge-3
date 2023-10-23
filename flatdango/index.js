document.addEventListener('DOMContentLoaded', () => {
    const filmsList = document.getElementById('films');
    const filmDetails = document.getElementById('film-details');
    const buyTicketButton = document.getElementById('buy-ticket');

    let currentFilm; 
    let availableTickets; 

    fetch('http://localhost:3000/films')
      .then(response => response.json())
      .then(films => {
