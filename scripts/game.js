const word_list = [
  "flower",
  "cigarette",
  "coffe",
  "tablet",
  "keyboard",
  "concrete",
  "highway",
  "building",
  "sunset",
  "arrow",
  "train",
  "banana",
  "elephant",
  "guitar",
  "umbrella",
  "mountain"
];

const random_word = word_list[Math.floor(Math.random() * word_list.length)];
// console.log(random_word);

const word_div = document.getElementById("answer-section");
word_div.style.gap = "20px";

let letter_wrapper;
let letter;
let under_letter;

for (let i = 0; i < random_word.length; i++) {
  letter_wrapper = document.createElement("div");
  letter_wrapper.className = "letter_wrapper"
  letter_wrapper.style.display = "flex";
  letter_wrapper.style.flexDirection = "column"
  letter_wrapper.style.width = "5%";

  letter = document.createElement("div");
  letter.className = "answer-letter"
  letter.innerText = random_word[i].toUpperCase();
  letter.style.display = "flex";
  letter.style.justifyContent = "center";
  letter.style.visibility = "hidden"

  under_letter = document.createElement("div");
  under_letter.className = "under-letter"
  under_letter.style.display = "inline-block";
  under_letter.style.height = "4px";
  under_letter.style.background = "#303030";
  under_letter.style.width = "100%";
  under_letter.style.borderRadius = "50px";

  letter_wrapper.append(letter, under_letter);
  word_div.append(letter_wrapper);
}

const letters = document.querySelectorAll(".answer-letter");
const under = document.querySelectorAll(".under-letter");



let valid_word = 0
let tries_count = 0;
let clicked_element;
const hang_parts = [head, body, leftHand, rightHand, leftLeg, rightLeg];

function validateLetter(letter) {
  let found = false;
  for (let i = 0; i < random_word.length; i++) {
    if (random_word[i].toUpperCase() === letter) {
      letters[i].style.visibility = "visible";
      under[i].style.visibility = "hidden";
      found = true;
    }
  } return found
}

const clickable_letters = document.querySelectorAll(".letter");

let clicked_letter;

clickable_letters.forEach((element) => {
  element.addEventListener("click", function clicked(event) {
    const letter = element.innerText
    const found = validateLetter(letter)

    if (found) {
      element.style.background = "green"
      valid_word++
      console.log(valid_word)
      char_set = new Set(random_word.split(""))
      console.log(char_set)
      if (valid_word === (char_set.size)) {
        setTimeout(() => {
          alert("YOU WIN")
          window.location.href = window.location.href
        }, 200);
      }

    } else {
      element.style.background = "red"
      hang_parts[tries_count]();
      tries_count++
      console.log(tries_count)
      if (tries_count >= 6) {
        setTimeout(() => {
          alert("YOU LOSE")
          window.location.href = window.location.href
        }, 200);

      }

    }
    element.removeEventListener("click", clicked)
  });
});

document.addEventListener("keydown", (event) => {
  const key = event.key.toUpperCase()
  let found;
  let element;
  if (isLetter(key)) {
    console.log(key, typeof (key))
    for (let i = 0; i < clickable_letters.length; i++) {
      if (clickable_letters[i].innerText === key) {
        element = clickable_letters[i]
        console.log(element)
        break
      }
    }
    found = validateLetter(key)
  }
  if (found) {
    element.style.background = "green"
    valid_word++
    console.log(valid_word)
    char_set = new Set(random_word.split(""))
    console.log(char_set)
    if (valid_word === (char_set.size)) {
      setTimeout(() => {
        alert("you win")
        window.location.href = window.location.href
      }, 200);
    }

  } else {
    element.style.background = "red"
    hang_parts[tries_count]();
    tries_count++
    console.log(tries_count)
    if (tries_count >= 6) {
      setTimeout(() => {
        alert("YOU LOSE")
        window.location.href = window.location.href
      }, 200);

    }

  }
});


function isLetter(key) {
  if (key.charCodeAt(0) >= 65 && key.charCodeAt(0) <= 90) {
    return true
  } return false;
}



