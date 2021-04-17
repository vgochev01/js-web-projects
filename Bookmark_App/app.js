import { render } from './node_modules/lit-html/lit-html.js';
import { bookmarkTemplate } from './templates.js';

const addBookmarkBtn = document.getElementById("show-modal");
const closeModalBtn = document.getElementById("close-modal");
const modalContainer = document.getElementById("modal");
const bookmarkForm = document.getElementById("bookmark-form");
const bookmarkContainer = document.getElementById("bookmarks-container");


const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];

renderBookmarks()

attachEventListeners();

function attachEventListeners() {
  addBookmarkBtn.addEventListener("click", () =>
    modalContainer.classList.add("show-modal")
  );

  closeModalBtn.addEventListener("click", closeModal);

  bookmarkForm.addEventListener("submit", addBookmark);
}

function addBookmark(ev) {
  ev.preventDefault();
  const formData = new FormData(ev.target);
  const title = formData.get("title");
  let url = formData.get("url");

  if (!url.includes("https://") && !url.includes("http://")) {
    url = `https://${url}`;
  }

  try {

    validateForm(title, url);

    const id = generateBookmarkId();

    bookmarks.push({title, url, id});
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    bookmarkForm.reset();
    closeModal();

    renderBookmarks()

  } catch (err) {
      return alert(err.message);
  }
}

function deleteBookmark(id) {
    const bookmark = bookmarks.find(b => b.id == id);
    const index = bookmarks.indexOf(bookmark)
    bookmarks.splice(index, 1);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    renderBookmarks();
}

function closeModal() {
  modalContainer.classList.remove("show-modal");
}

function validateForm(title, url) {
    const validUrlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
    
    if (title == "" || url == "") {
    throw new Error("All fields are required!");
    }


    if (!url.match(validUrlRegex)) {
    throw new Error("Please enter a valid URL address!");
    }

    return true;
}

function renderBookmarks() {
    render(bookmarks.map(bookmark => bookmarkTemplate(bookmark, deleteBookmark)), bookmarkContainer);
}

function generateBookmarkId() {
    const id = Math.floor(Math.random() * 1000);
    if(bookmarks.find(b => b.id == id)) {
        generateBookmarkId();
    } else {
        return id;
    }
}