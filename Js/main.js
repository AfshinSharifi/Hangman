const hangBtn = document.querySelectorAll(".hang-word__btn");
const rstBtn = document.querySelector(".reset");
const hangImg = document.querySelector(".hang-body--img img");

//Global Variables
const randomWrd = [
  "never",
  "welcome",
  "please",
  "flower",
  "brown",
  "comfortable",
  "hangman",
  "immediately",
  "scientist",
  "secretary",
];
let randChoose = randomWrd[Math.floor(Math.random() * randomWrd.length)];
let clicked = [];
let some = true;
let result;
let mistake = 0;

//AddEventListeners
document.addEventListener("DOMContentLoaded", getWrd);
rstBtn.addEventListener("click", () => {
  location.reload();
});
hangBtn.forEach((item) =>
  item.addEventListener("click", (ev) => {
    chooseWrd(ev);
  })
);

//Functions
function chooseWrd(item) {
  if (some) {
    item.target.style.backgroundColor = "gray";
    let letter = item.target.innerText.toLowerCase();
    clicked.indexOf(letter) === -1 ? clicked.push(letter) : null;
    if (randChoose.indexOf(letter) >= 0) {
      getWrd();
      winner();
    } else if (randChoose.indexOf(letter) === -1) {
      mistake++;
      changeImg();
      loser();
    }
  }
}

function getWrd() {
  result = randChoose
    .split("")
    .map((item) => (clicked.indexOf(item) >= 0 ? item : "_"))
    .join("");
  document.querySelector(".hang-body--text").innerHTML = `<p>${result}</p>`;
}

function changeImg() {
  hangImg.src = `Images/hangman${mistake}.png`;
}

function winner() {
  if (result === randChoose) {
    some = false;
    document.querySelector(".winner").classList.add("anim");
    hangImg.src = "Images/winner.png";
  }
}
function loser() {
  if (mistake == 6) {
    some = false;
    document.querySelector(".gOver").classList.add("anim");
    document.querySelector(
      ".hang-body--text"
    ).innerHTML = `<p>${randChoose}</p>`;
  }
}
