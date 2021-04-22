import { render } from './node_modules/lit-html/lit-html.js';
import { until } from './node_modules/lit-html/directives/until.js';
import page from './node_modules/page/page.mjs';
import { cardTemplate, loader, emptyFavourites } from './templates.js';

const imagesContainer = document.querySelector('.images-container');
const saveConfirmed = document.querySelector('.save-confirmed');
const resultsNav = document.getElementById('resultsNav');
const favouritesNav = document.getElementById('favouritesNav');

const count = 5;
const apiKey = '2RcWciZPNTtKI66p9szPQyWbP0d9WylBiXZLkx6v';
const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=${count}`;

let favourites = JSON.parse(localStorage.getItem('favourites')) || [];

page('/', renderPhotos);
page('/favourites', renderFavourites);
page.start();

async function getNasaPictures(){
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.map(data => cardTemplate(data, addToFavourites, false));
    } catch (err) {
        console.error(err.message);
        return alert('Please try again later!');
    }
}

function renderPhotos(){
    toggleNavs(resultsNav, favouritesNav);
    render(until(getNasaPictures(), loader()), imagesContainer);
}

function renderFavourites(){
    toggleNavs(favouritesNav, resultsNav);
    if(favourites.length){
        render(favourites.map((data) => cardTemplate(data, deleteFavourites, true)), imagesContainer);
    } else {
        render(emptyFavourites(), imagesContainer);
    }
}

function addToFavourites(ev, data){
    if(favourites.some(cur => cur == data)){
        return alert('Already added to favourites!');
    }
    favourites.push(data);
    localStorage.setItem('favourites', JSON.stringify(favourites));
    toggleSavedConfirmation()
    ev.target.remove();
    setTimeout(() => toggleSavedConfirmation(), 2500);
}

function deleteFavourites(data){
    const index = favourites.indexOf(data);
    favourites.splice(index, 1);
    localStorage.setItem('favourites', JSON.stringify(favourites));
    renderFavourites();
}

function toggleSavedConfirmation(){
    saveConfirmed.hidden = !saveConfirmed.hidden;
}

function toggleNavs(toShow, toHide){
    toShow.classList.remove('hidden');
    toHide.classList.add('hidden');
}