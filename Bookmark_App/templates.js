import { html } from "./node_modules/lit-html/lit-html.js";

export const bookmarkTemplate = (bookmark, deleteBookmark) => html`
  <div class="item">
    <i @click=${() => deleteBookmark(bookmark.id)} class="far fa-trash-alt" id=${bookmark.id} title="Delete Bookmark"></i>
    <div class="name">
      <img
        src="https://s2.googleusercontent.com/s2/favicons?domain=${bookmark.url}"
        alt="Favicon"
      />
      <a href="${bookmark.url}" target="_blank">${bookmark.title}</a>
    </div>
  </div>
`;
