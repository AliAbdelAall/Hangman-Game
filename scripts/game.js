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
]

const random_word = word_list[Math.floor(Math.random() * word_list.length)]

const word_div = document.getElementById("answer-section")
word_div.style.gap = "10px"

let letter_wrapper
let letter
let under_letter

for (let i = 0; i < random_word.length; i++) {
  letter_wrapper = document.createElement("div")
  letter_wrapper.className = "letter_wrapper"
  letter_wrapper.style.display = "flex"
  letter_wrapper.style.flexDirection = "column"
  letter_wrapper.style.width = "4%"

  letter = document.createElement("div")
  letter.className = "answer-letter"
  letter.innerText = random_word[i].toUpperCase()
  letter.style.display = "flex"
  letter.style.justifyContent = "center"
  letter.style.visibility = "hidden"

  under_letter = document.createElement("div")
  under_letter.className = "under-letter"
  under_letter.style.display = "inline-block"
  under_letter.style.height = "4px"
  under_letter.style.background = "#303030"
  under_letter.style.width = "100%"
  under_letter.style.borderRadius = "50px"

  letter_wrapper.append(letter, under_letter)
  word_div.append(letter_wrapper)
}

const letters = document.querySelectorAll(".answer-letter")
const under = document.querySelectorAll(".under-letter")

let valid_word = 0
let tries_count = 0
const correct_choices = []
const incorrect_choices = []
const hang_parts = [head, body, leftHand, rightHand, leftLeg, rightLeg]

function checkClickedElement(element, arr) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === element.innerText) {
      return false
    }
  }
  return true
}

function showCorrectLetter(index) {
  letters[index].style.visibility = "visible"
  under[index].style.visibility = "hidden"
}

function handleCorrectGuess(element) {
  element.style.background = "green"
  if (checkClickedElement(element, correct_choices)) {
    valid_word++
    correct_choices.push(element.innerText)
  }
  const char_set = new Set(random_word.split(""))
  if (valid_word === char_set.size) {
    setTimeout(() => {
      alert("YOU WIN")
      window.location.href = window.location.href
    }, 200)
  }
}

function handleIncorrectGuess(element) {
  element.style.background = "red"
  if (checkClickedElement(element, incorrect_choices)) {
    hang_parts[tries_count]()
    tries_count++
    incorrect_choices.push(element.innerText)
  }
  if (tries_count >= 6) {
    setTimeout(() => {
      alert("YOU LOSE")
      window.location.href = window.location.href
    }, 200);
  }
}

function validateLetter(letter, element) {
  let found = false
  for (let i = 0; i < random_word.length; i++) {
    if (random_word[i].toUpperCase() === letter) {
      showCorrectLetter(i)
      found = true;
    }
  }
  if (found) {
    handleCorrectGuess(element);
  } else {
    handleIncorrectGuess(element);
  }
  return found;
}

const clickable_letters = document.querySelectorAll(".letter")

clickable_letters.forEach((element) => {
  element.addEventListener("click", function (event) {
    const letter = element.innerText
    validateLetter(letter, element)
  })
})

document.addEventListener("keydown", (event) => {
  const key = event.key.toUpperCase()
  let element;
  if (/^[A-Z]$/.test(key)) {
    for (let i = 0; i < clickable_letters.length; i++) {
      if (clickable_letters[i].innerText === key) {
        element = clickable_letters[i]
        console.log(element)
        break
      }
    }
    validateLetter(key, element)
  }
})