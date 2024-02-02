let words = [];

function fetchWords() {
  const apiUrl = 'https://api.datamuse.com/words?ml=common&max=100';

  return fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      // Exclude the word "plebeian" from the list
      words = data.filter(item => item.word.toLowerCase() !== 'plebeian').map(item => item.word);
      displayWord();
    })
    .catch(error => console.error('Error fetching words:', error));
}

let currentIndex = 0;

function getRandomIndex() {
  return Math.floor(Math.random() * words.length);
}

function displayWord() {
  currentIndex = getRandomIndex();
  const wordDisplay = document.getElementById('game-container');
  speakWord();
}

function speakWord() {
  const currentWord = words[currentIndex];
  responsiveVoice.speak(currentWord, 'UK English Female', { rate: 1.0 });
}

function toggleSpeech() {
  speakWord();
}

function checkAnswer() {
  const userInput = document.getElementById('user-input').value.toLowerCase();
  const currentWord = words[currentIndex].toLowerCase();

  if (userInput === currentWord) {
    alert('Correct! Next word.');
    displayWord();
    document.getElementById('user-input').value = '';
  } else {
    alert('Incorrect. Try again.');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  fetchWords();
});

document.getElementById('speak-btn').addEventListener('click', toggleSpeech);

document.getElementById('user-input').addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    checkAnswer();
  }
});
  