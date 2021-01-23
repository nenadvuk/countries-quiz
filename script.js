


const btn = document.querySelector('#search')
const rnd = document.querySelector('#random-country')

const countriesContainer = document.querySelector('.countries')
const countryList = document.getElementById('country-name')
const answerBtn = document.getElementById('answer-btn')
const radios = document.querySelectorAll('.answer')
const regionEl = document.getElementById('region-name')
const regions = document.querySelectorAll('.regions')

const flag = document.getElementById('flag')
const resOne = document.getElementById('res-1')
const resTwo = document.getElementById('res-2')
const resThree = document.getElementById('res-3')
const resFour = document.getElementById('res-4')
const result = document.getElementById('res')

const progress = document.getElementById('progress')
const progressBox = document.querySelector('.progress-container')
const circles = document.querySelectorAll('.circle')

const europe = document.querySelectorAll('.europe')
const asia = document.querySelectorAll('.asia')
const africa = document.querySelectorAll('.africa')
const northAmerica = document.querySelectorAll('.north_america')
const southAmerica = document.querySelectorAll('.south_america')
const oceania = document.querySelectorAll('.oceania')
// const world = document.querySelectorAll('#country-name')


const titleText = document.querySelector('.title-text')

let correctAnswer
let score = 0
let countries = []
let finished = false

// CountriesArray
let _CARR = []


let regionArr = [europe, asia, africa, northAmerica, southAmerica, oceania]


countriesContainer.style.display = "none"
countryList.style.display = "none"
progressBox.style.display = "none"



regionEl.addEventListener('change', function (e) {
  if (e.target.value == 4) {
    
    radios[3].remove()
    resFour.remove()
   
  }
});



//  Progress bar
let _CIRCLE_INDEX = 0


function update() {

  circles.forEach((circle, idx) => {

    if (idx < _CIRCLE_INDEX) {
      circle.classList.add('active')
    }
  })

  let actives = document.querySelectorAll('.active')
  progress.style.width = (actives.length - 1) / (circles.length - 1) * 100 + '%'

}


function shuffle(array) {
  array.sort(() => Math.random() - 0.5)
  return array

}


function correct() {
  let userAnswer = getSelected()
  console.log(finished)
  if (userAnswer == correctAnswer) {
    score++;
    // result.innerHTML = score.toString()
    circles[_CIRCLE_INDEX].style.border = '3px solid #52E80C'
  } else circles[_CIRCLE_INDEX].style.border = '3px solid #FF0000'
  if (finished) {
    setTimeout(function () {
      countriesContainer.style.display = "none"
    }, 500);

  }

}


// Buttons
btn.addEventListener('click', function () {


  // Chosen region
  _CHOSEN = regionArr[Number(regionEl.value)]


  for (let country of _CHOSEN) {
    countries.push(country.value)

  }
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


answerBtn.addEventListener('click', function () {

  correct()
  _CIRCLE_INDEX++
  if (_CIRCLE_INDEX === 9) {
    finished = true
  }

  update()
  if (countriesContainer.className == "zoomIn") {
    countriesContainer.className = "zoomOut";
  } else countriesContainer.className = "zoomOut";

  // let userAnswer = getSelected()

  deselectAnswers()
  setTimeout(function () {
    getCountryData(randomCountry());
    countriesContainer.classList.add("zoomIn")
  }, 500);

})

// Reset cheched field
function deselectAnswers() {
  radios.forEach(radio => radio.checked = false)
}


// Getting checked field 
function getSelected() {
  let answer

  radios.forEach(radio => {
    if (radio.checked) {
      answer = radio.id
    }
  })

  return answer
}


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



