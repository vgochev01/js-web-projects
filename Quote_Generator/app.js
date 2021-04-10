const settings = {
    apiUrl: 'https://type.fit/api/quotes',
    twitterApi: 'https://twitter.com/intent/tweet'
}

let quotes;

const quoteContainer = document.getElementById('quote-container');
const spanQuote = document.getElementById('quote');
const spanAuthor = document.getElementById('author');
const loader = document.getElementById('loader');

init();

async function init() {
    showLoader(true);
    quotes = await fetchQuotes();
    showLoader(false);

    attachEvents()
    
    return updateQuote(quotes[generateIndex()]);
}

async function fetchQuotes() {
    try{
        const response = await fetch(settings.apiUrl);
        const data = await response.json();
        return data;
    } catch (err) {
        console.error(err.message);
        alert(err.message);
        throw err;
    }
}

function updateQuote(quote){
    showLoader(true);
    // Make quote text smaller if the quote is longer than 120 characters
    spanQuote.classList.toggle('long-quote', quote.text.length >  120);
    spanQuote.textContent = quote.text;
    spanAuthor.textContent = quote.author || 'Unknown';
    showLoader(false);
}

function tweetQuote() {
    const twitterUrl = settings.twitterApi + `?text=${spanQuote.textContent} - ${spanAuthor.textContent}`;
    window.open(twitterUrl, '_blank');
}

function attachEvents(){
    document.getElementById('new-quote').addEventListener('click', () => {
        updateQuote(quotes[generateIndex()]);
    })

    document.getElementById('twitter').addEventListener('click', tweetQuote)
}

function generateIndex(){
    const num = Math.random() * quotes.length;
    const index = Math.floor(num);
    return index;
}

//if true show loader, if false show quote
function showLoader(showLoader) {
    loader.hidden = !showLoader;
    quoteContainer.hidden = showLoader;
}