const hangmanImage=document.querySelector(".hangman-box img");
const wordDisplay=document.querySelector(".word-display");
const guessesText=document.querySelector(".guesses-text b");
const keyboardDiv=document.querySelector(".keyboard");
const gameModel=document.querySelector(".game-model");

let currentWord, correctLetters=[], wrongGuessCount = 0;
const maxGuesses = 6;

const getRandomWord = () => {
  //Getting a random word from the word list
  const{word,hint}=wordList[Math.floor(Math.random() * wordList.length)];
  currentWord = word;
  console.log(word);
  document.querySelector(".hint-text").innerText = hint;
  wordDisplay.innerHTML = word.split("").map(() => `<li class="letter"></li>`).join("");
}

const gameOver = (isVictory) => {
  setTimeout(() => {
    const modelText = isVictory ? `You found the word:` : `The correct word was:`;
    gameModel.querySelector("img").src = `images/${isVictory ? 'victory' : 'lost'}.gif`;
    gameModel.querySelector("h4").innerText = `${isVictory ? 'Congrats!' : 'Game Over!'}`;
    gameModel.querySelector("p").innerHTML = `${modelText} <b>${currentWord}</b>`;
    gameModel.classList.add("show");
  }, 300);
}

const initGame = (button, clickedLetter) => {
  //check if clicked letter exists
  if(currentWord.includes(clickedLetter)){
    //display letters
    [...currentWord].forEach((letter, index) => {
      if(letter == clickedLetter){
        correctLetters.push(letter);
        wordDisplay.querySelectorAll("li")[index].innerText=letter;
        wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
      }
    });
  }
  else{
    // adding parts of hangman via image by updating wrongGuessCount
    wrongGuessCount++;
    hangmanImage.src = `images/hangman-${wrongGuessCount}.svg` ;
  }
  button.disabled=true;
  guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`

  //gameover function calls
  if(wrongGuessCount ===maxGuesses) return gameOver(false);
  if(correctLetters.length ===currentWord.length) return gameOver(true);
}

//keyboard created
for(let i=97;i<122;i++){
  const button =document.createElement("button");
  button.innerText=String.fromCharCode(i);
  keyboardDiv.appendChild(button);
  button.addEventListener("click", e => initGame(e.target, String.fromCharCode(i)));
}

getRandomWord();