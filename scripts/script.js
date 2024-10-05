const hangmanImage=document.querySelector(".hangman-box img");
const wordDisplay=document.querySelector(".word-display");
const guessesText=document.querySelector(".guesses-text b");
const keyboardDiv=document.querySelector(".keyboard");

let currentWord, wrongGuessCount = 0;
const maxGuesses = 6;

const getRandomWord = () => {
  //Getting a random word from the word list
  const{word,hint}=wordList[Math.floor(Math.random() * wordList.length)];
  currentWord = word;
  console.log(word);
  document.querySelector(".hint-text").innerText = hint;
  wordDisplay.innerHTML = word.split("").map(() => `<li class="letter"></li>`).join("");
}

const initGame = (button, clickedLetter) => {
  //check if clicked letter exists
  if(currentWord.includes(clickedLetter)){
    //display letters
    [...currentWord].forEach((letter, index) => {
      if(letter == clickedLetter){
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
guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`
}

//keyboard created
for(let i=97;i<122;i++){
  const button =document.createElement("button");
  button.innerText=String.fromCharCode(i);
  keyboardDiv.appendChild(button);
  button.addEventListener("click", e => initGame(e.target, String.fromCharCode(i)));
}

getRandomWord();