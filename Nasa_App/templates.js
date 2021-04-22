import { html } from './node_modules/lit-html/lit-html.js';

export const cardTemplate = (data, favouritesHandler, isFavourite) => html`
<!-- Card -->
<div class="card">
    <a href="${data.hdurl || data.url}" title="View Full Image" target="_blank">
        <img src="${data.hdurl || data.url}" alt="Nasa Picture of the Day" class="card-image-top">
    </a>
    <div class="card-body">
        <h5 class="card-title">${data.title}</h5>
        ${!isFavourite ? 
        html`
        <p @click=${(ev) => favouritesHandler(ev, data)} class="clickable">Add to Favourites</p>
        ` : 
        html`
        <p @click=${() => favouritesHandler(data)} class="clickable">Remove from Favourites</p>
        `}
        <p class="card-text">${data.explanation}</p>
        <small class="text-muted">
            <strong>${data.date}</strong>
            <span>${data.copyright}</span>
        </small>
    </div>
</div>
`;

export const loader = () => html`
<div class="loader">
    <img src="./rocket.svg" alt="Rocket Loading Animation">
</div>
`;