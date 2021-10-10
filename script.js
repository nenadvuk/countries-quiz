// Buttons
const play = document.querySelector("#play");
const newGame = document.getElementById("new-game");
const answerBtn = document.getElementById("answer-btn");
const btnCapital = document.getElementById("btn-capital");
const btnFlag = document.getElementById("btn-flag");
const btnHard = document.getElementById("btn-hard");
const btnCountry = document.getElementById("btn-country");
const search = document.querySelector("#search");
const rnd = document.querySelector("#random-country");
const sideNEwGame = document.getElementById("side-new-game");
const nextGame = document.getElementById("next-game");

// Containers
const countriesContainer = document.querySelector(".countries");
const allContent = document.querySelector(".container-box");
const countryList = document.getElementById("country-name");
const radios = document.querySelectorAll(".answer");
const regionEl = document.getElementById("region-name");
const regions = document.querySelectorAll(".regions");
const titleText = document.querySelector(".title-text");
const goodScore = document.getElementById("good-score");
const load = document.querySelector(".loading-page");
const gameMode = document.getElementById("game-mode");
const searchTerm = document.getElementById("search-term");
const countryDiv = document.querySelector(".country-div");
const sign = document.querySelector(".signature");
const signature = document.querySelector(".signature-box");

// Country data
const countryData = document.querySelector(".country__data");

// Countries and capitals elements
const flag = document.getElementById("flag");
const resOne = document.getElementById("res-1");
const resTwo = document.getElementById("res-2");
const resThree = document.getElementById("res-3");
const resFour = document.getElementById("res-4");
const resArray = [resOne, resTwo, resThree, resFour];
const result = document.getElementById("res");
const video = document.querySelector(".bg-video");

// Flags
const flagOne = document.getElementById("fl-1");
const flagTwo = document.getElementById("fl-2");
const flagThree = document.getElementById("fl-3");
const flagFour = document.getElementById("fl-4");
const flags = document.querySelectorAll(".flag-image");

// Burger menu
const sideBar = document.getElementById("sidebar");
const burgerMenu = document.querySelector(".burger-menu");

// Sounds
const rigthAnswerSound = new Audio("assets/sounds/right.wav");
rigthAnswerSound.volume = 0.4;
const wrongAnswerSound = new Audio("assets/sounds/wrong.wav");
wrongAnswerSound.volume = 0.4;
const goodScoreSound = new Audio("assets/sounds/success.wav");
goodScoreSound.volume = 0.4;
const failure = new Audio("assets/sounds/failure.wav");
failure.volume = 0.4;
const nextGameSound = new Audio("assets/sounds/next-game.wav");
nextGameSound.volume = 0.4;
const gameCountriesSound = new Audio("assets/sounds/countries.wav");
gameCountriesSound.volume = 0.4;
const gameCapitalsSound = new Audio("assets/sounds/capitals.wav");
gameCapitalsSound.volume = 0.4;
const gameFlagsSound = new Audio("assets/sounds/flag.wav");
gameFlagsSound.volume = 0.4;
const countdownSound = new Audio("assets/sounds/countdown.wav");
countdownSound.volume = 0.4;
const highestScore = new Audio("assets/sounds/highest-score.wav");
highestScore.volume = 0.3;
const clickedSound = new Audio("assets/sounds/clicked.wav");
clickedSound.volume = 0.4;
const gameHardSound = new Audio("assets/sounds/hard.wav");
gameHardSound.volume = 0.3;

// Score
const percent = document.querySelector(".percent");

// Progress bar
const progress = document.getElementById("progress");
const progressBox = document.querySelector(".progress-container");
const circles = document.querySelectorAll(".circle");
const modal = document.getElementById("openModal");

// Regions
const europe = document.querySelectorAll(".europe");
const asia = document.querySelectorAll(".asia");
const africa = document.querySelectorAll(".africa");
const northAmerica = document.querySelectorAll(".north_america");
const southAmerica = document.querySelectorAll(".south_america");
const oceania = document.querySelectorAll(".oceania");
const regionNames = [
  "Europe",
  "Asia",
  "Africa",
  "North America",
  "South America",
  "Oceania"
];

// Regions array
let regionArr = [europe, asia, africa, northAmerica, southAmerica, oceania];
const odometer = document.getElementById("odometer");

// Preventing to go to next question without answer
answerBtn.style.pointerEvents = "none";

// Counter variables
const nums = document.querySelectorAll(".nums span");
const counter = document.querySelector(".counter");

let _GAME_COUNTRIES = false;
let _GAME_CAPITALS = false;
let _GAME_FLAG = false;
let _GAME_HARD = false;
let finished_REGION = false;
let S_America = false;
let checkedField = false;

// Defautl region
let chosenRegion = "Europe";

let timer;
let correctAnswer;
let score = 0;
let counterDelay;
let modalDelay;
let scoreDelay;
// For leaderboard
let overallScore = 0;

/* let world = false */

let countries = [];
let capitals = [];
let _COUNTRIES_ARRAY = [];
let _CAPITALS_ARRAY = [];
let _CHOSEN = [];

//  Progress bar
let _CIRCLE_INDEX = 0;

const ACCESS_KEY = "055a56f48e35621689692048c469c846";

// On start
countriesContainer.style.display = "none";
countryList.style.display = "none";
progressBox.style.display = "none";
goodScore.style.display = "none";
allContent.style.display = "none";
counter.style.display = "none";
odometer.style.display = "none";
video.style.display = "none";
searchTerm.innerHTML = "REGION";
// newGame.style.display = 'none'
nextGame.style.display = "none";
sign.style.display = "none";

for (let flag of flags) {
  flag.style.display = "none";
}

// Video and signature load
// setTimeout(() => {
//   video.style.display = 'block'

// }, 300)
// video.style.animation = 'fadeIn 5s'

// Back to loading page
sideNEwGame.addEventListener("click", () => {
  window.location.reload();
});

const burgerMenuFade = () => {
  sideBar.style.display = "none";
  burgerMenu.style.display = "none";
};

const start = () => {
  load.classList.add("zoomOut");
  load.style.display = "none";
  allContent.style.display = "block";
  allContent.classList.add("bounceInDown");
  signSideBarToggle();
};

const signSideBarToggle = () => {
  sign.style.display = "flex";
  signature.style.animation = "fadeIn 2s";
  sideBar.style.display = "block";
  burgerMenu.style.display = "block";
  burgerMenu.style.animation = "fadeInLeftBig 1s";
};

// Guess the country
btnCountry.addEventListener("click", () => {
  chosenGame = "Guess the country";
  gameCountriesSound.play();
  _GAME_COUNTRIES = true;
  setTimeout(() => {
    start();
  }, 500);
});

// Guess the capital city
btnCapital.addEventListener("click", () => {
  chosenGame = "Guess the capital";
  gameCapitalsSound.play();
  _GAME_COUNTRIES = true;
  _GAME_CAPITALS = true;
  setTimeout(() => {
    start();
  }, 500);
});

// Guess the flag
btnFlag.addEventListener("click", () => {
  chosenGame = "Guess the flag";
  document.querySelector(".country__img").style.minHeight = "0";
  gameFlagsSound.play();
  for (let flag of flags) {
    flag.style.display = "inline-block";
  }
  countryDiv.style.backgroundColor = "#f2dcbb";
  _GAME_COUNTRIES = true;
  _GAME_FLAG = true;
  setTimeout(() => {
    start();
  }, 500);
});

// Hard mode
btnHard.addEventListener("click", () => {
  chosenGame = "Hard mode";
  gameHardSound.play();
  _GAME_COUNTRIES = true;
  _GAME_CAPITALS = true;
  _GAME_HARD = true;
  setTimeout(() => {
    start();
  }, 500);
});

// document.getElementById('elementId').selectedOptions[0].value
// If South American region is chosen number of questions is 5
regionEl.addEventListener("change", (e) => {
  play.disabled = false;
  chosenRegion = regionNames[regionEl.value];
  console.log(chosenRegion);

  if (e.target.value == 4) {
    S_America = true;
    for (let i = 5; i < circles.length; i++) {
      circles[i].style.display = "none";
    }
  }
});

// Reseting counter after click event on answer button or automaticly
const resetCounter = () => {
  counter.classList.remove("hide");
  nums.forEach((num) => {
    num.classList.value = "";
  });
  nums[0].classList.add("in");
};

const runCounter = () => {
  nums.forEach((num, idx) => {
    const nextToLast = nums.length - 1;
    num.addEventListener("animationend", (e) => {
      if (e.animationName === "goIn" && idx !== nextToLast) {
        num.classList.remove("in");
        num.classList.add("out");
      } else if (e.animationName === "goOut" && num.nextElementSibling) {
        num.nextElementSibling.classList.add("in");
      } else {
        counter.classList.add("hide");
      }
    });
  });
};

// funcion which changing style of circles and progress bar
const updateProgress = () => {
  answerBtn.style.pointerEvents = "none";
  circles.forEach((circle, idx) => {
    if (idx < _CIRCLE_INDEX) {
      circle.classList.add("active");
    }
  });
  let actives = document.querySelectorAll(".active");
  if (!S_America) {
    progress.style.width =
      ((actives.length - 1) / (circles.length - 1)) * 100 + "%";
  } else {
    progress.style.width =
      ((actives.length - 1) / (circles.length - 6)) * 100 + "%";
  }
};

// Funcion which puts answers in random order
const shuffle = (array) => array.sort(() => Math.random() - 0.5);

// Function which determines if answer is correct and changing styles of circles
const correct = () => {
  let userAnswer = getSelected();
  if (userAnswer == correctAnswer) {
    rigthAnswerSound.play();
    score++;
    odometer.innerHTML = score;
    circles[_CIRCLE_INDEX].style.border = "3px solid #52E80C";
    resArray[correctAnswer].style.color = "#52E80C";
    resArray[correctAnswer].innerHTML += "✅";
  } else {
    wrongAnswerSound.play();
    circles[_CIRCLE_INDEX].style.border = "3px solid #FF0000";
    resArray[correctAnswer].style.color = "#52E80C";
    resArray[userAnswer].style.color = "#FF0000";
    resArray[userAnswer].innerHTML += "❌";
    if (_GAME_FLAG) resArray[correctAnswer].innerHTML += "✅";
  }
  if (finished_REGION) {
    counter.style.display = "none";
    setTimeout(() => {
      countriesContainer.style.display = "none";
    }, 500);
  }
};

// Play

// let playTimer;
play.addEventListener("click", () => {
  sideBar.style.display = "none";
  burgerMenu.style.display = "none";
  sign.style.display = "none";
  clickedSound.play();
  odometer.style.display = "inline-block";
  odometer.classList.add("zoomIn");

  setTimeout(() => {
    counter.style.display = "block";
    runCounter();
  }, 1500);

  // Chosen region
  _CHOSEN = regionArr[regionEl.value];

  // Creating an array of countries
  for (let country of _CHOSEN) {
    countries.push(country.value);
  }

  // Creating an array of capitals
  for (let country of _CHOSEN) {
    capitals.push(country.id);
  }

  // New arrays for manipulating
  _COUNTRIES_ARRAY = countries;
  _CAPITALS_ARRAY = capitals;

  progressBox.style.display = "flex";
  progressBox.classList.add("zoomIn");
  // progressBox.style.animationDuration = '1s';
  countriesContainer.style.display = "block";
  countriesContainer.classList.add("bounceInDown");
  titleText.style.display = "none";
  countryList.style.display = "none";
  play.style.display = "none";
  regionEl.style.display = "none";

  getCountryData(randomCountry());

  // Counter is running until the end if player doesn't answer any question
  timer = setInterval(() => {
    if (!finished_REGION) {
      noAnswer();
    }
  }, 15000);
});

// Answer button
// Dugme za odgovor
answerBtn.addEventListener("click", () => {
  // On every click, timer is reset to default value(10s)
  clearInterval(timer);
  console.log(_CIRCLE_INDEX);
  counterDelay = setTimeout(() => {
    counter.style.display = "block";
  }, 2600);

  !S_America ? endRegionGame(9) : endRegionGame(4);
  correct();
  _CIRCLE_INDEX++;

  if (!finished_REGION) {
    counter.style.display = "none";
    resetCounter();
    runCounter();
    timer = setInterval(() => {
      noAnswer();
    }, 14500);
  }
  if (finished_REGION) {
    clearInterval(timer);
    regionGameOver();
  }

  updateProgress();
  // Toggle animations on country cards
  countriesContainer.className == "zoomIn"
    ? (countriesContainer.className = "zoomOut")
    : (countriesContainer.className = "zoomOut");
  if (!finished_REGION) {
    setTimeout(() => {
      getCountryData(randomCountry());
      deselectAnswers();
      countriesContainer.classList.add("zoomIn");
    }, 400);
  }
});

// Function which automaticly goes to the next question if player doesn't answer
// Timer is set to 10 seconds
//
const noAnswer = () => {
  countriesContainer.className = "zoomOut";
  if (!finished_REGION) {
    circles[_CIRCLE_INDEX].style.border = "3px solid #FF0000";
  }
  counter.style.display = "none";
  resetCounter();
  !S_America ? endRegionGame(9) : endRegionGame(4);
  _CIRCLE_INDEX++;
  updateProgress();
  if (finished_REGION) {
    clearInterval(timer);
    regionGameOver();
  }
  setTimeout(() => {
    if (!finished_REGION) {
      countriesContainer.classList.add("zoomIn");
      getCountryData(randomCountry());
    }
  }, 2000);
  setTimeout(() => {
    if (!finished_REGION) {
      runCounter();
      counter.style.display = "block";
    }
  }, 4000);
};

class Player {
  constructor(username, chosenGame, chosenRegion, score, overallScore) {
    this.username = username;
    this.chosenGame = chosenGame;
    this.chosenRegion = chosenRegion;
    this.score = score;
    this.overallScore = overallScore;
  }
  currentScore() {
    // alert(`Chosen region: ${chosenRegion}, score: ${score}`)
  }
}

// Activating modal with score and percent of accuracy
const regionGameOver = () => {
  overallScore += score;
  clearTimeout(counterDelay);
  clearInterval(timer);

  // Preventing current region from selection
  regionEl[regionEl.value].disabled = true;
  regionEl[regionEl.value].style.color = "green";
  regionEl[regionEl.value].innerHTML += "    ✅";
  regionEl[0].selected = "selected";

  if (regionEl[regionEl.value].disabled === true) {
    play.disabled = true;
  } else play.disabled = false;

  modalDelay = setTimeout(() => {
    modal.style.display = "block";
    modal.style.opacity = "1";
    modal.style.zIndex = "99";
    percent.style.display = "block";
  }, 1000);

  scoreDelay = setTimeout(() => {
    !S_America
      ? (percent.innerHTML = `${score * 10} %`)
      : (percent.innerHTML = `${score * 20} %`);
    percent.style.animation = "flash 2s infinite";
    if (!S_America) {
      if (score == 10) {
        highestScore.play();
        goodScore.style.display = "block";
      } else goodScore.style.display = "none";
      if (score >= 8 && score < 10) {
        goodScoreSound.play();
      }
      if (score <= 3) {
        failure.play();
      }
    }
    if (S_America) {
      if (score == 5) {
        highestScore.play();
        goodScore.style.display = "block";
      } else goodScore.style.display = "none";
      if (score >= 4 && score < 5) {
        goodScoreSound.play();
      }
      if (score <= 1) {
        failure.play();
      }
    }

    nextGame.classList.add("zoomIn");
    nextGame.style.display = "block";

    const player1 = new Player(
      "nenad",
      chosenGame,
      chosenRegion,
      score,
      overallScore
    );
    localStorage.setItem("nenad", JSON.stringify(player1));
    console.log(player1);
    // player1.currentScore()
    score = 0;
  }, 1500);
};

// Next region game play button
nextGame.addEventListener("click", () => {
  nextGameSound.play();

  odometer.innerHTML = "1";
  odometer.innerHTML = "0";
  odometer.style.display = "none";
  goodScore.style.display = "none";
  percent.style.display = "none";
  finished_REGION = false;
  modal.style.opacity = "0";
  modal.style.zIndex = "-99";

  clearTimeout(modalDelay);
  clearTimeout(scoreDelay);

  signSideBarToggle();
  resetCounter();

  progressBox.classList.add("zoomOut");
  progressBox.style.display = "none";
  regionEl.style.display = "block";
  play.style.display = "block";
  regionEl.classList.add("bounceInDown");
  play.classList.add("bounceInDown");
  titleText.style.display = "block";

  circles.forEach((circle) => {
    circle.style.display = "flex";
    circle.style.border = "";
    circle.classList.remove("active");
  });

  progress.style.border = "";
  _CIRCLE_INDEX = 0;

  deselectAnswers();

  countriesContainer.classList.remove("zoomOut");
  countriesContainer.classList.remove("zoomIn");
  countriesContainer.classList.add("countries");

  S_America = false;
  countries = [];
  capitals = [];
  _CHOSEN = [];
  // Default region
  chosenRegion = "Europe";

  progress.style.width = "0%";
});

// If radio button is checked answer button is no longer disabled
radios.forEach((radio) =>
  radio.addEventListener("click", () => (answerBtn.style.pointerEvents = "all"))
);

// Reset cheched field
// Resetovanje oznacenog polja
const deselectAnswers = () => {
  radios.forEach((radio) => (radio.checked = false));
  resArray.forEach((res) => (res.style.color = "#555"));
  resArray.forEach((res) => (res.innerHTML = ""));
};

// Funkcija za prekid dalje igre nakon 5/10 pitanja
const endRegionGame = (questions) =>
  _CIRCLE_INDEX === questions ? (finished_REGION = true) : false;

// Getting checked field
const getSelected = () => {
  let answer;
  radios.forEach((radio) => {
    if (radio.checked) {
      answer = radio.id;
    }
  });
  return answer;
};

// Generating random country and deleting it from new array
/* Generisanje nasumicne drzave i uklanjanje iste iz novog niza 
   da bi se izbeglo ponavljanje istog pitanja */
const randomCountry = () => {
  if (finished_REGION) {
    clearInterval(timer);
  }
  randC = _COUNTRIES_ARRAY[Math.floor(Math.random() * _COUNTRIES_ARRAY.length)];
  index = _COUNTRIES_ARRAY.indexOf(randC);
  _COUNTRIES_ARRAY.splice(index, 1);
  _CAPITALS_ARRAY.splice(index, 1);
  return randC;
};

const getCountryData = (country) => {
  if (finished_REGION) {
    setTimeout(() => {
      countriesContainer.style.display = "none";
    }, 500);
  }

  // Niz od 4 nasumicna broja koja korisitim za nasumicne odgovore iz niza _COUNTRIES_ARRAY
  // koji se svakim klikom smanjuje za jednu drzavu koja je bila u prethodnom pitanju
  let rndNmb = [];
  for (let i = 0; i <= 4; i++) {
    let number = Math.floor(Math.random() * _COUNTRIES_ARRAY.length);
    let genNumber = rndNmb.indexOf(number);
    if (genNumber === -1) {
      rndNmb.push(number);
    }
  }

  // Getting country name and flag from REST COUNTRIES API
  axios
    .get(`https://restcountries.com/v2/name/${country}`) /* http://api.countrylayer.com/v2/all?access_key=${ACCESS_KEY} */ /*https://restcountries.com/v3.1/name/${country}  */
    .then((res) => {
      console.log(res.data[0].flags);
      if (!_GAME_FLAG) {
        flag.src = res.data[0].flags.png;
        capital = res.data[0].capital;
        // What is writen in question row, depending of chosen game
        if (_GAME_CAPITALS) {
          _CORRECT = capital;
          _RANDOM = _CAPITALS_ARRAY;
          if (!_GAME_HARD) {
            gameMode.innerHTML = `Capital city of ${country}?`;
          } else {
            gameMode.innerHTML = `Capital city of this country?`;
          }
        } else {
          gameMode.innerHTML = "Name of the country?";
          _CORRECT = country;
          _RANDOM = _COUNTRIES_ARRAY;
        }
      } else {
        gameMode.innerHTML = `Flag of ${country}?`;
        _CORRECT = country;
        _RANDOM = _COUNTRIES_ARRAY;
      }
      // Array with answers, one is true, three are false
      let arr = [
        _CORRECT,
        _RANDOM[rndNmb[0]],
        _RANDOM[rndNmb[1]],
        _RANDOM[rndNmb[2]]
      ];
      // Function which positioning the right answer randomly
      shuffle(arr);
      // Variable with positon of the correct answer for matching
      correctAnswer = arr.indexOf(_CORRECT);
      console.log(_CORRECT);
      if (!_GAME_FLAG) {
        resOne.innerHTML = arr[0];
        resTwo.innerHTML = arr[1];
        resThree.innerHTML = arr[2];
        resFour.innerHTML = arr[3];
      }
      // If player choses guess the flag game, we use other logic
      if (_GAME_FLAG) {
        const getJSON = function (url, errorMsg = "Something went wrong") {
          return fetch(url).then((response) => {
            if (!response.ok)
              throw new Error(`${errorMsg} (${response.status})`);

            return response.json();
          });
        };

        const getFourFlags = async function (fl_1, fl_2, fl_3, fl_4) {
          try {
            const [data1] = await getJSON(
              `https://restcountries.com/v2/name/${fl_1}`
            );
            const [data2] = await getJSON(
              `https://restcountries.com/v2/name/${fl_2}`
            );
            const [data3] = await getJSON(
              `https://restcountries.com/v2/name/${fl_3}`
            );
            const [data4] = await getJSON(
              `https://restcountries.com/v2/name/${fl_4}`
            );
            flagOne.src = data1.flag;
            flagTwo.src = data2.flag;
            flagThree.src = data3.flag;
            flagFour.src = data4.flag;
          } catch (err) {
            console.error(err);
          }
        };
        getFourFlags(arr[0], arr[1], arr[2], arr[3]);
      }
    })
    .catch((err) => {
      console.log("error", err);
    });
};
