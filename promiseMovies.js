const axios = require('axios');
const fs = require('fs/promises');

axios.get('https://ghibliapi.herokuapp.com/films')
    .then((response) => {
        console.log('Successfully retrieved list of movies');
        let moviesList = '';
        response.data.forEach(movie => {
            moviesList += `${movie['title']}, ${movie['release_date']} \n`;
        });
        return fs.writeFile('promiseMovies.csv', moviesList);
    }).then(() => {
        console.log('Saved our list of movies to promiseMovies.csv');
    }).catch((error) => {
        console.error(`Could not save the Ghibli movies to a file : ${error.message}`);
    });