//  Create constant to be used for variables
const APILINK = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=73679ab32e2dd51a5a4606ce26fd2f74&page=1';
const IMG_PATH = "https://image.tmdb.org/t/p/w1280"; // ROOT path to every single image in the database
const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=73679ab32e2dd51a5a4606ce26fd2f74&query="; // Help you search for the movie

const main = document.getElementById("section");
const form = document.getElementById("form");
const search = document.getElementById("query");

returnMovies(APILINK)


function returnMovies(url){
    fetch(url).then(res => res.json())
    .then(function(data){
    console.log(data.results);
    data.results.forEach(element => {
        const div_card = document.createElement('div');
        div_card.setAttribute('class', 'card');
    });
});
}
    