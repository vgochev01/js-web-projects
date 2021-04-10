const toggleSwitch = document.querySelector('input[type="checkbox"]');
const nav = document.getElementById('nav');
const toggleIcon = document.getElementById('toggle-icon');
const image1 = document.getElementById('image1');
const image2 = document.getElementById('image2');
const image3 = document.getElementById('image3');
const textBox = document.getElementById('text-box');


if(sessionStorage.getItem('themeMode') == 'dark'){
    toggleSwitch.checked = true;
    toggleDarkLightMode('dark');
}

toggleSwitch.addEventListener('change', switchTheme);

// Switch Light/Dark Modes
function switchTheme(ev) {
    if(ev.target.checked){
        toggleDarkLightMode('dark');
        sessionStorage.setItem('themeMode', 'dark');
    } else {
        toggleDarkLightMode('light');
        sessionStorage.setItem('themeMode', 'light');
    }
}

function toggleDarkLightMode(mode = 'light'){
    document.documentElement.setAttribute('data-theme', mode == 'dark' ? 'dark' : 'light');
    nav.style.backgroundColor = mode == 'dark' ? 'rgb(0 0 0 / 50%)' : 'rgb(255 255 255 / 50%)';
    textBox.style.backgroundColor = mode == 'dark' ? 'rgb(255 255 255 / 50%)' : 'rgb(0 0 0 / 50%)';
    toggleIcon.children[0].textContent = mode == 'dark' ? 'Dark Mode' : 'Light Mode';
    toggleIcon.children[1].className = mode == 'dark' ? 'fas fa-moon' : 'fas fa-sun';
    mode == 'dark' ? imageMode('dark') : imageMode('light');
}

// Set Images src according to the mode
function imageMode(mode = 'light') {
    image1.src = `./img/undraw_conceptual_idea_${mode}.svg`;
    image2.src = `./img/undraw_proud_coder_${mode}.svg`;
    image3.src = `./img/undraw_feeling_proud_${mode}.svg`;
}