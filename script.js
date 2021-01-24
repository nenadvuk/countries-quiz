

const btn = document.querySelector('#search')
const rnd = document.querySelector('#random-country')
const newGame = document.getElementById('new-game')

const countriesContainer = document.querySelector('.countries')
const countryList = document.getElementById('country-name')
const answerBtn = document.getElementById('answer-btn')
const radios = document.querySelectorAll('.answer')
const regionEl = document.getElementById('region-name')
const regions = document.querySelectorAll('.regions')
const titleText = document.querySelector('.title-text')

const flag = document.getElementById('flag')
const resOne = document.getElementById('res-1')
const resTwo = document.getElementById('res-2')
const resThree = document.getElementById('res-3')
const resFour = document.getElementById('res-4')
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

const odometer = document.getElementById('odometer')
/* const worlds = document.querySelectorAll('#country-name') */




let correctAnswer
let score = 0
let countries = []
let finished = false
let S_America = false
let world = false

// CountriesArray
let _CARR = []


let regionArr = [europe, asia, africa, northAmerica, southAmerica, oceania]


countriesContainer.style.display = "none"
countryList.style.display = "none"
progressBox.style.display = "none"


// If South American region is chosen number of questions is 5
regionEl.addEventListener('change', (e) => {
  if (e.target.value == 4) {
    S_America = true
    for (let i = 5; i < circles.length; i++) {
      circles[i].remove()
      endGame(4)
    }
  } else if (e.target.value == 6) {
    world = true
  }

})



//  Progress bar
let _CIRCLE_INDEX = 0


// funcion which changin style of circles and progress bar
function update() {

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


// Fuction which determines if answer is correct an changing styles of circles
function correct() {
  let userAnswer = getSelected()
  console.log(finished)
  if (userAnswer == correctAnswer) {
    score++;
    circles[_CIRCLE_INDEX].style.border = '3px solid #52E80C'
  } else circles[_CIRCLE_INDEX].style.border = '3px solid #FF0000'
  if (finished) {
    setTimeout(function () {
      countriesContainer.style.display = "none"
    }, 500);

  }

}


// Buttons
btn.addEventListener('click', () => {

  // Chosen region
  if(!world) {
    _CHOSEN = regionArr[Number(regionEl.value)]

  } else{

  }
  console.log(_CHOSEN)
  // Creating array of countries
  for (let country of _CHOSEN) {
    countries.push(country.value)

  }

  // New array for manipulating
  _CARR = countries


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
    }, 1500)

    newGame.addEventListener('click', () => {
      window.location.reload()
    })
  }
  correct()
  _CIRCLE_INDEX++

  // 
  !S_America ? endGame(9) : endGame(4)

  update()

  countriesContainer.className == 'zoomIn' ? countriesContainer.className = 'zoomOut' :
    countriesContainer.className = 'zoomOut'
  /* if (countriesContainer.className == "zoomIn") {
    countriesContainer.className = "zoomOut";
  } else countriesContainer.className = "zoomOut"; */

  // let userAnswer = getSelected()

  deselectAnswers()
  setTimeout(() => {
    getCountryData(randomCountry())
    countriesContainer.classList.add("zoomIn")
  }, 500)


})

// Reset cheched field
// Resetovanje oznacenog polja
const deselectAnswers = () => radios.forEach(radio => radio.checked = false)

// Funkcija za prekid dalje igre nakon 5/10 pitanja
const endGame =(questions) => _CIRCLE_INDEX === questions ? finished = true : false



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

  randC = _CARR[Math.floor(Math.random() * _CARR.length)]
  index = _CARR.indexOf(randC)
  _CARR.splice(index, 1)
  return randC

}

function getCountryData(country) {

  // Getting country name and flag from REST COUNTRIES API 
  const request = new XMLHttpRequest()
  request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`)
  request.send()

  let rndNmb = [];
  for (let i = 0; i <= 3; i++) {
    let number = Math.floor(Math.random() * _CARR.length);
    let genNumber = rndNmb.indexOf(number);
    if (genNumber === -1) {
      rndNmb.push(number);
    }
  }

  request.addEventListener('load', function () {

    const [data] = JSON.parse(this.responseText)
    console.log(data.name)
    let arr = [country, _CARR[rndNmb[0]], _CARR[rndNmb[1]], _CARR[rndNmb[2]]]
    shuffle(arr)
    correctAnswer = arr.indexOf(country)
    flag.src = data.flag
    resOne.innerHTML = arr[0]
    resTwo.innerHTML = arr[1]
    resThree.innerHTML = arr[2]
    resFour.innerHTML = arr[3]

  })
}



