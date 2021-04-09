const audioElement = document.getElementById('audio');
const button = document.getElementById('button');

import { voiceApi } from './voice.js';

// Attach event listeners
button.addEventListener('click', getJoke);
audioElement.addEventListener('ended', () => button.disabled = false);

const speech = voiceApi(audioElement);

async function getJoke(){
    let joke = '';
    try{
        const jokeApiUrl = 'https://v2.jokeapi.dev/joke/Programming';
        const response = await fetch(jokeApiUrl);
        const data = await response.json();
        joke = data.joke || `${data.setup} ... ${data.delivery}`
        speech(joke);
        button.disabled = true;
    } catch(err) {
        console.error(err.message);
        alert("Please try again!");
        throw err;
    }
}