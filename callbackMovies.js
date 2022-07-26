const request = require('request');
const fs = require('fs');

request('https://ghibliapi.herokuapp.com/films', (error, response, body) => {
    if (error) {
        console.error(`Could not send request to API: ${error.message}`);
        return;
    }

    if (response.statusCode !== 200) {
        console.log(`Expected Status code: 200 but get ${response.statusCode}`);
        return;
    }

    console.log('Processing our list of movies');
    let moviesList = '';
    let movies = JSON.parse(body);
    movies.forEach(movie => {
        moviesList += `${movie['title']}, (${movie['release_date']})\n`;
        console.log(`${movie['title']}, ${movie['release_date']}`);
    });

    fs.writeFile('callbackMovies.csv', moviesList, (error) => {
        if (error) {
            console.error(`Could not save the Ghibli movies to a file: ${error.message}`);
            return;
        }
        console.log('Saved our list of movies to callbackMovies.csv');
    });
});

