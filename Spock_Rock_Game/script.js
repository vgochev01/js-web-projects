const playerContainer = document.getElementById('player');
const computerContainer = document.getElementById('computer');

const playerScore = document.getElementById('playerScore');
const computerScore = document.getElementById('computerScore');

const playerChoiceEl = document.getElementById('playerChoice');
const computerChoiceEl = document.getElementById('computerChoice');
const resultText = document.getElementById('resultText');
const resetBtn = document.getElementById('reset');

const playerIcons = [...playerContainer.querySelectorAll('i.far')];
const computerIcons = [...computerContainer.querySelectorAll('i.far')];

const initScore = {
  player: 0,
  computer: 0
}
const score = JSON.parse(localStorage.getItem('score')) || initScore;

const choices = {
  rock: { name: 'Rock', defeats: ['scissors', 'lizard'] },
  paper: { name: 'Paper', defeats: ['rock', 'spock'] },
  scissors: { name: 'Scissors', defeats: ['paper', 'lizard'] },
  lizard: { name: 'Lizard', defeats: ['paper', 'spock'] },
  spock: { name: 'Spock', defeats: ['scissors', 'rock'] },
};

updateScore();

function onPlayerChoice(ev){
  if(ev.target.tagName == 'I'){
    // Reset previously selected icons but do not reset score
    reset(true, false);

    // Get choices
    const playerChoice = ev.target.id;
    const computerChoice = generateComputerChoice(); //returns object entry

    // Update choice text
    playerChoiceEl.textContent = ' --- ' + ev.target.title;
    computerChoiceEl.textContent = ' --- ' + computerChoice[1].name;

    // Add .selected class
    ev.target.classList.add('selected');
    computerIcons.find(i => i.id == computerChoice[0]).classList.add('selected');

    if(playerChoice == computerChoice[0]){
      resultText.textContent = `It's a tie!`;
    } else if (choices[playerChoice].defeats.includes(computerChoice[0])){
      // Player won
      resultText.textContent = 'You Won!';
      score['player']++;
    } else {
      // Player lost
      resultText.textContent = 'You Lost!';
      score['computer']++;
    }

    // Update localStorage with the new score
    localStorage.setItem('score', JSON.stringify(score));

    updateScore();
  }
}

function updateScore(){
  playerScore.textContent = score['player'];
  computerScore.textContent = score['computer'];
}

function generateComputerChoice(){
  const randomIndex = Math.floor(Math.random() * 5);
  return Object.entries(choices)[randomIndex];
}

function reset(resetIcons, resetScore) {
  if(resetIcons){
    playerIcons.forEach(i => i.classList.remove('selected'));
    computerIcons.forEach(i => i.classList.remove('selected'));

    playerChoiceEl.textContent = '';
    computerChoiceEl.textContent = '';
  }

  if(resetScore) {
    score['player'] = 0;
    score['computer'] = 0;
    localStorage.setItem('score', JSON.stringify(score));

    updateScore()
    resultText.textContent = '';
  }
}

playerContainer.addEventListener('click', onPlayerChoice)
resetBtn.addEventListener('click', () => reset(true, true));