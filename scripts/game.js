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
console.log(random_word);

const word_div = document.getElementById("answer-section");
word_div.style.gap = "20px";

let letter_wrapper;
let letter;
let under_letter;

for (let i = 0; i < random_word.length; i++) {
  letter_wrapper = document.createElement("div");
  letter_wrapper.style.display = "flex";
  letter_wrapper.style.flexDirection = "column"
  letter_wrapper.style.width = "5%";

  letter = document.createElement("div");
  letter.innerText = random_word[i].toUpperCase();
  letter.style.display = "flex";
  letter.style.justifyContent = "center";
  letter.style.visibility = "hidden"

  under_letter = document.createElement("div");
  under_letter.style.display = "inline-block";
  under_letter.style.height = "4px";
  under_letter.style.background = "#303030";
  under_letter.style.width = "100%";
  under_letter.style.borderRadius = "50px";

  letter_wrapper.append(letter, under_letter);
  word_div.append(letter_wrapper);
}
