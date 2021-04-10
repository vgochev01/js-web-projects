const settings = {
    count: 5,
    apiKey: 'ZHe9YwLLTq9oCardyhP45LESPsNn-9ekcLqYNK8C5zM'
}
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${settings.apiKey}&count=${settings.count}`;


const imgContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let loadedImages = 0;
let totalImages = 0;
let readyToFetch = false;

// initialize
getPhotos();

window.addEventListener('scroll', async (ev) => {
    if(readyToFetch){
        if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000) {
            readyToFetch = false;
            await getPhotos();
        }
    }
})


async function getPhotos() {
    try {
        // Show Loader
        loader.hidden = false;
        // Fetch new photos
        const response = await fetch(apiUrl);
        let photos = await response.json();
        // Attach new photos to the image container
        displayPhotos(photos);
    } catch (err) {
        console.error(err.message);
        alert('Please try again later!');
        throw err;
    }
}

function displayPhotos(photos) {
    loadedImages = 0;
    totalImages = photos.length;
    photos.forEach(p => {
        const imgLink = document.createElement('a');
        imgLink.href = p.links.html;
        imgLink.target = '_blank';

        const imgEl = document.createElement('img');
        imgEl.src = p.urls.regular;
        imgEl.alt = p.alt_description;

        imgEl.addEventListener('load', (ev) => {
            loadedImages++;
            if(loadedImages == totalImages){
                readyToFetch = true;
                // Hide Loader
                loader.hidden = true;
            }
        })

        imgLink.appendChild(imgEl);
        imgContainer.appendChild(imgLink);
    });
}