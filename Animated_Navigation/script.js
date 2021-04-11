const menuIcon = document.getElementById("menu-bars");
const overlay = document.getElementById("overlay");
const nav = document.querySelector("nav");

attachEventListeners();

function attachEventListeners() {
  menuIcon.addEventListener("click", toggleNav);

  nav.addEventListener("click", (ev) => {
    if (ev.target.tagName == "A") {
      toggleNav();
    }
  });
}

function toggleNav() {
  // Toggle: Menu Icon
  menuIcon.classList.toggle("change");
  // Toggle: Menu Active
  overlay.classList.toggle("overlay-active");
  if (overlay.classList.contains("overlay-active")) {
    switchClass("overlay-slide-left", "overlay-slide-right");
  } else {
    switchClass("overlay-slide-right", "overlay-slide-left");
  }
}

function switchClass(toRemove, toAdd){
    overlay.classList.remove(toRemove);
    overlay.classList.add(toAdd);
}