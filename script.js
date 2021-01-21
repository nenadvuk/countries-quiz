


const btn = document.querySelector('#search')
const rnd = document.querySelector('#random-country')
const countriesContainer = document.querySelector('.countries')
const countryList = document.getElementById('country-name')
const answerBtn = document.getElementById('answer-btn')
const radios = document.querySelectorAll('.answer')
const region = document.getElementById('region-name')
const europe = document.querySelectorAll('.europe')
const flag = document.getElementById('flag')
const resOne = document.getElementById('res-1')
const resTwo = document.getElementById('res-2')
const resThree = document.getElementById('res-3')
const resFour = document.getElementById('res-4')
const result = document.getElementById('res')
const progress = document.getElementById('progress')
const circles = document.querySelectorAll('.circle')

// countriesArray
let _CARR = []
let correctAnswer
let score = 0
let countries = []

let ten = false


countriesContainer.style.display = "none"
countryList.style.display = "none"



//  Progress bar
let currentActive = 0


function update() {

  circles.forEach((circle, idx) => {

    if (idx < currentActive) {
      circle.classList.add('active')
    }
  })

  const actives = document.querySelectorAll('.active')
  progress.style.width = (actives.length - 1) / (circles.length - 1) * 100 + '%'

}



function shuffle(array) {
  array.sort(() => Math.random() - 0.5)
  return array

}

console.log(document.querySelectorAll('.north_america'))

function correct() {
  let userAnswer = getSelected()
  console.log(ten)
  if (userAnswer == correctAnswer) {
    score++;
    // result.innerHTML = score.toString()
    circles[currentActive].style.border = '3px solid #93C700'
  } else circles[currentActive].style.border = '3px solid #D60000'
  if (ten) {
    setTimeout(function () {
      countriesContainer.style.display = "none"
    }, 500);
    
  } 
    
 
  
}
// Buttons
btn.addEventListener('click', function () {

  countriesContainer.style.display = "block"
  countriesContainer.classList.add("bounceInDown")
  countryList.style.display = "none"
  btn.style.display = "none"
  region.style.display = "none"
  getCountryData(randomCountry())

})


answerBtn.addEventListener('click', function () {
 
  correct()
  
  currentActive++
  if (currentActive === 9) {
    ten = true
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



function deselectAnswers() {
  radios.forEach(radio => radio.checked = false)
}


function getSelected() {
  let answer

  radios.forEach(radio => {
    if (radio.checked) {
      answer = radio.id
    }
  })

  return answer
}


for (let country of europe) {
  countries.push(country.value)
}

_CARR = countries

function randomCountry() {

  randC = _CARR[Math.floor(Math.random() * _CARR.length)]
  index = _CARR.indexOf(randC)
  _CARR.splice(index, 1)
  return randC

}

function getCountryData(country) {


  const request = new XMLHttpRequest()
  request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`)
  request.send()

  console.log(_CARR.length)
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



