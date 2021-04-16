import { html } from "./node_modules/lit-html/lit-html.js";

export const selectDateTemplate = (minDate, updateCountdown) => html`
  <!-- Input -->
  <div class="input-container" id="input-container">
    <h1>Create a Custom Countdown!</h1>
    <form @submit=${updateCountdown} class="form" id="countdownForm">
      <label for="title">Title</label>
      <input
        type="text"
        id="title"
        placeholder="What are you counting down to?"
        name="title"
      />
      <label for="date-picker">Select a Date</label>
      <input type="date" id="date-picker" name="date" min=${minDate} />
      <button type="submit">Submit</button>
    </form>
  </div>
`;

export const countdownTemplate = (date, title, resetCountdown) => html`
  <!-- Countdown -->
  <div class="countdown" id="countdown">
    <h1 id="countdown-title">${title}</h1>
    <ul>
      <li><span>${date.days}</span>Days</li>
      <li><span>${date.hours}</span>Hours</li>
      <li><span>${date.minutes}</span>Minutes</li>
      <li><span>${date.seconds}</span>Seconds</li>
    </ul>
    <button @click=${resetCountdown} id="countdown-button">RESET</button>
  </div>
`;

export const completedTemplate = (title, showInput) => html`
  <!-- Complete -->
  <div class="complete" id="complete">
    <h1 class="complete-title">Countdown Complete!</h1>
    <h1 id="complete-info">${title}</h1>
    <button @click=${showInput} id="complete-button">NEW COUNTDOWN</button>
  </div>
`;
