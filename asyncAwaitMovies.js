const axios = require('axios');
const fs = require('fs/promises');

async function saveMovies() {
    try {
        let response = await axios.get('https://ghibliapi.herokuapp.com/films');
        let moviesList = '';
        response.data.forEach(movie => {
            moviesList += `${movie['title']}, ${movie['release_date']} \n`;
        });   // end of forEach
        await fs.writeFile('asyncAwaitMovies.csv', moviesList);
    } catch (e) {
        console.error(`Could not save the Ghibli movies to a file : ${e.message}`);
    }
}
saveMovies();
