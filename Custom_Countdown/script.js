import { render } from "./node_modules/lit-html/lit-html.js";
import { selectDateTemplate, countdownTemplate, completedTemplate } from "./templates.js";

const mainContainer = document.querySelector(".container");

const second = 1000; //ms
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

// start app
showInput();

function showInput(interval) {
  if (interval) {
    clearInterval(interval);
  }
  // get today date
  const today = new Date().toISOString().split("T")[0];
  render(selectDateTemplate(today, updateCountdown), mainContainer);
}

function updateCountdown(ev) {
  ev.preventDefault();
  const formData = new FormData(ev.target);
  const title = formData.get("title");
  const selectedDate = formData.get("date");

  if (title == "" || selectedDate == "") {
    return alert("Please select a date and title!");
  }

  const todayDate = new Date().getTime();
  let duration = new Date(selectedDate).getTime() - todayDate;

  renderCountdown();

  const interval = setInterval(() => {
    duration -= 1000;
    //if countdown is completed
    if(duration <= 0){
      clearInterval(interval);
      return render(completedTemplate(title, showInput), mainContainer);
    }
    renderCountdown();
  }, 1000);

  function renderCountdown() {
    const date = {
      days: Math.floor(duration / day),
      hours: Math.floor((duration % day) / hour),
      minutes: Math.floor((duration % hour) / minute),
      seconds: Math.floor((duration % minute) / second),
    };
    render(countdownTemplate(date, title, () => showInput(interval)), mainContainer);
  }
}
