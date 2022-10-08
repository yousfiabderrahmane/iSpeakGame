const msgEl = document.getElementById("msg");

const randomNum = getRandomNumber();
console.log(`Number : ${randomNum}`);

window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new window.SpeechRecognition();
// Start Recognition and game
recognition.start();
// capture user speak
function onSpeak(e) {
  const msg = e.results[0][0].transcript;
  writeMessage(msg);
  checkNumber(msg);
}
//check the guessed number/msg
function checkNumber(msg) {
  const num = +msg; //convert it from string to number

  //check if its a valid number
  if (Number.isNaN(num)) {
    msgEl.innerHTML = `<span class="box">${msg}</span>
    <div>That is not a valid number !</div>`;
  }
  //check in range
  if (num < 1 && num > 100) {
    msgEl.innerHTML = `<div>I said between 1-100 !</div>`; // += to append
  }
  //check number
  if (num === randomNum) {
    document.querySelector(".container").innerHTML = `
    <h2>🎈 Congrats! You guessed the number 🎈<br><br>
    It was ${num} .</h2>
    <button class="play-again" id="play-again">Play Again</button>`;
  } else if (num > randomNum) {
    msgEl.innerHTML += `<div>GO LOWER !</div>`;
  } else if (num < randomNum) {
    msgEl.innerHTML += `<div>GO HIGHER !</div>`;
  }
}

//write message
function writeMessage(msg) {
  msgEl.innerHTML = `
<div>You said :</div>
<span class="box">${msg}</span>
`;
}
//Generate Random number
function getRandomNumber() {
  return Math.floor(Math.random() * 100) + 1;
}

// Speak result
recognition.addEventListener("result", onSpeak);

//End SR service
recognition.addEventListener("end", () => {
  recognition.start();
});

document.body.addEventListener("click", (e) => {
  if (e.target.id == "play-again") {
    window.location.reload(); //reload the page
  }
});
