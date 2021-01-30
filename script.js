

const btn = document.querySelector('#search')
const newGame = document.getElementById('new-game')
const answerBtn = document.getElementById('answer-btn')
const btnCountry = document.getElementById('btn-country')
const btnCapital = document.getElementById('btn-capital')
const btnFlag = document.getElementById('btn-flag')

const countriesContainer = document.querySelector('.countries')
const allContent = document.querySelector('.container-box')
const countryList = document.getElementById('country-name')
const radios = document.querySelectorAll('.answer')
const regionEl = document.getElementById('region-name')
const regions = document.querySelectorAll('.regions')
const titleText = document.querySelector('.title-text')
const goodScore = document.getElementById('good-score')
const load = document.querySelector('.loading-page')
const gameMode = document.getElementById('game-mode')

const flag = document.getElementById('flag')
const resOne = document.getElementById('res-1')
const resTwo = document.getElementById('res-2')
const resThree = document.getElementById('res-3')
const resFour = document.getElementById('res-4')
const resArray = [resOne, resTwo, resThree, resFour]
const result = document.getElementById('res')

const progress = document.getElementById('progress')
const progressBox = document.querySelector('.progress-container')
const circles = document.querySelectorAll('.circle')
const modal = document.getElementById('openModal')

const europe = document.querySelectorAll('.europe')
const asia = document.querySelectorAll('.asia')
const africa = document.querySelectorAll('.africa')
const northAmerica = document.querySelectorAll('.north_america')
const southAmerica = document.querySelectorAll('.south_america')
const oceania = document.querySelectorAll('.oceania')
// Regions array
let regionArr = [europe, asia, africa, northAmerica, southAmerica, oceania]

const odometer = document.getElementById('odometer')

// Preventing to go to next question without answer
answerBtn.style.pointerEvents = 'none'


let _GAME_COUNTRIES = false
let _GAME_CAPITALS = false


let correctAnswer
let score = 0
let finished = false
let S_America = false
let checkedField = false
/* let world = false */

let countries = []
let capitals = []
let _COUNTRIES_ARRAY = []
let _CAPITALS_ARRAY = []



// On start
countriesContainer.style.display = "none"
countryList.style.display = "none"
progressBox.style.display = "none"
goodScore.style.display = "none"
allContent.style.display = "none"


btnCountry.addEventListener('click', () => {

  _GAME_COUNTRIES = true
  setTimeout(() => {
    start()
  }, 500);

})

btnCapital.addEventListener('click', () => {

  _GAME_COUNTRIES = true
  _GAME_CAPITALS = true
  setTimeout(() => {
    start()
  }, 500);

})

const start = () => {

  load.classList.add("zoomOut")
  load.style.display = "none"
  allContent.style.display = "block"
  allContent.classList.add("bounceInDown")

}

// If South American region is chosen number of questions is 5
regionEl.addEventListener('change', (e) => {

  if (e.target.value == 4) {
    S_America = true
    for (let i = 5; i < circles.length; i++) {
      circles[i].remove()
      endGame(4)
    }
  } /* else if (e.target.value == 6) {
    world = true
  } */

})

//  Progress bar
let _CIRCLE_INDEX = 0


// funcion which changin style of circles and progress bar
function update() {

  answerBtn.style.pointerEvents = 'none'
  circles.forEach((circle, idx) => {

    if (idx < _CIRCLE_INDEX) {
      circle.classList.add('active')
    }
  })
  let actives = document.querySelectorAll('.active')
  if (!S_America) {
    progress.style.width = (actives.length - 1) / (circles.length - 1) * 100 + '%'
  } else {
    progress.style.width = (actives.length - 1) / (circles.length - 6) * 100 + '%'
  }

}

// Funcion which puts answers in random order
const shuffle = (array) => array.sort(() => Math.random() - 0.5)


// Function which determines if answer is correct and changing styles of circles
function correct() {

  let userAnswer = getSelected()
  if (userAnswer == correctAnswer) {
    score++;
    circles[_CIRCLE_INDEX].style.border = '3px solid #52E80C'
    resArray[correctAnswer].style.color = '#52E80C'
    resArray[correctAnswer].innerHTML += '✅'
  } else {
    circles[_CIRCLE_INDEX].style.border = '3px solid #FF0000'
    resArray[correctAnswer].style.color = '#52E80C'
    resArray[userAnswer].style.color = '#FF0000'
    resArray[userAnswer].innerHTML += '❌'
  }
  if (finished) {
    setTimeout(function () {
      countriesContainer.style.display = "none"
    }, 500);

  }

}


// Buttons
btn.addEventListener('click', () => {

  // Chosen region
  _CHOSEN = regionArr[regionEl.value]
  // Creating an array of countries
  for (let country of _CHOSEN) {
    countries.push(country.value)

  }
  // Creating an array of capitals
  for (let country of _CHOSEN) {
    capitals.push(country.id)
  }
  // New arrays for manipulating
  _COUNTRIES_ARRAY = countries
  _CAPITALS_ARRAY = capitals

  progressBox.style.display = "flex"
  progressBox.classList.add("zoomIn")
  progressBox.style.animationDuration = "1s";
  countriesContainer.style.display = "block"
  countriesContainer.classList.add("bounceInDown")
  titleText.style.display = "none"
  countryList.style.display = "none"
  btn.style.display = "none"
  regionEl.style.display = "none"
  getCountryData(randomCountry())

})


// If radio button is checked answer button is no longer disabled
radios.forEach(radio => radio.addEventListener('click', () =>
  answerBtn.style.pointerEvents = 'all'))


// Answer button
// Dugme za odgovor

answerBtn.addEventListener('click', () => {

  if (finished) {
    setTimeout(() => {
      modal.style.opacity = "1"
      modal.style.zIndex = '99';
    }, 1000)

    setTimeout(() => {
      !S_America ? odometer.innerHTML = score * 10 :
        odometer.innerHTML = score * 20
      if (!S_America) {
        if (score >= 8) {
          goodScore.style.display = "block"
        }
      }
      if (S_America) {
        if (score >= 4) {
          goodScore.style.display = "block"
        }
      }

    }, 1500)

    newGame.addEventListener('click', () => {
      window.location.reload()
    })
  }
  correct()
  _CIRCLE_INDEX++
  // Finishing the game after 10 or 5 questions
  !S_America ? endGame(9) : endGame(4)

  update()

  countriesContainer.className == 'zoomIn' ? countriesContainer.className = 'zoomOut' :
    countriesContainer.className = 'zoomOut'

  setTimeout(() => {
    getCountryData(randomCountry())
    deselectAnswers()
    countriesContainer.classList.add("zoomIn")
  }, 700)

})

// Reset cheched field
// Resetovanje oznacenog polja
const deselectAnswers = () => {

  radios.forEach(radio => radio.checked = false)
  resArray.forEach(res => res.style.color = '#555')

}

// Funkcija za prekid dalje igre nakon 5/10 pitanja
const endGame = (questions) => _CIRCLE_INDEX === questions ? finished = true : false


// Getting checked field 
const getSelected = () => {

  let answer
  radios.forEach(radio => {
    if (radio.checked) {
      answer = radio.id
    }
  })
  return answer

}


// Generating random country and deleting it from new array
/* Generisanje nasumicne drzave i uklanjanje iste iz novog niza 
   da bi se izbeglo ponavljanje istog pitanja */

function randomCountry() {

  randC = _COUNTRIES_ARRAY[Math.floor(Math.random() * _COUNTRIES_ARRAY.length)]
  index = _COUNTRIES_ARRAY.indexOf(randC)
  _COUNTRIES_ARRAY.splice(index, 1)
  _CAPITALS_ARRAY.splice(index, 1)
  return randC

}

function getCountryData(country) {

  // Niz od 4 nasumicna broja koja korisitim za nasumicne odgovore iz niza _COUNTRIES_ARRAY
  // koji se svakim klikom smanjuje za jednu drzavu koja je bila u prethodnom pitanju
  let rndNmb = [];
  for (let i = 0; i <= 3; i++) {
    let number = Math.floor(Math.random() * _COUNTRIES_ARRAY.length);
    let genNumber = rndNmb.indexOf(number);
    if (genNumber === -1) {
      rndNmb.push(number);
    }
  }
  console.log(rndNmb)
  console.log(_COUNTRIES_ARRAY.length)
  console.log(_CAPITALS_ARRAY.length)

  // Getting country name and flag from REST COUNTRIES API 
  axios.get(`https://restcountries.eu/rest/v2/name/${country}`)
    .then(res => {
      flag.src = res.data[0].flag
      capital = res.data[0].capital
      if (_GAME_CAPITALS) {
        gameMode.innerHTML = `Capital of ${country}?`
        _CORRECT = capital
        _RANDOM = _CAPITALS_ARRAY
      } else {
        gameMode.innerHTML = 'Guess the country'
        _CORRECT = country
        _RANDOM = _COUNTRIES_ARRAY
      }

      let arr = [_CORRECT, _RANDOM[rndNmb[0]], _RANDOM[rndNmb[1]], _RANDOM[rndNmb[2]]]
      shuffle(arr)
      correctAnswer = arr.indexOf(_CORRECT)
      resOne.innerHTML = arr[0]
      resTwo.innerHTML = arr[1]
      resThree.innerHTML = arr[2]
      resFour.innerHTML = arr[3]
    })
    .catch(err => {
      console.log("error", err)
    })

}



