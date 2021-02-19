
// Buttons
const play = document.querySelector('#play')
const newGame = document.getElementById('new-game')
const answerBtn = document.getElementById('answer-btn')
const btnCountry = document.getElementById('btn-country')
const btnCapital = document.getElementById('btn-capital')
const btnFlag = document.getElementById('btn-flag')
const btnHard = document.getElementById('btn-hard')
const btnExplore = document.getElementById('btn-explore')
const search = document.querySelector('#search')
const rnd = document.querySelector('#random-country')
const newSearch = document.getElementById('new-search')
const newRandom = document.getElementById('new-random')

// Containers
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
const searchTerm = document.getElementById('search-term')
const countryDiv = document.querySelector('.country-div')
const sign = document.querySelector('.signature')
const signature = document.querySelector('.signature-box')

// Country data
const countryData = document.querySelector('.country__data')
const countryName = document.getElementById('country____name')
const countryRegion = document.getElementById('country-region')
const population = document.getElementById('population')
const capitalCity = document.getElementById('capital')
const currencie = document.getElementById('currencie')
const area = document.getElementById('area')
const callCode = document.getElementById('calling-code')
const internet = document.getElementById('internet')
const nativeName = document.getElementById('native-name')
const subregion = document.getElementById('subregion')
const language = document.getElementById('language')
const exploreImg = document.getElementById('explore-img')
const regionalBlock = document.getElementById('regional-blocks')
const density = document.getElementById('density')
const wiki = document.getElementById('wiki')

// Countries and capitals elements
const flag = document.getElementById('flag')
const resOne = document.getElementById('res-1')
const resTwo = document.getElementById('res-2')
const resThree = document.getElementById('res-3')
const resFour = document.getElementById('res-4')
const resArray = [resOne, resTwo, resThree, resFour]
const result = document.getElementById('res')
const video = document.querySelector('.bg-video')

// Flags
const flagOne = document.getElementById('fl-1')
const flagTwo = document.getElementById('fl-2')
const flagThree = document.getElementById('fl-3')
const flagFour = document.getElementById('fl-4')
const flags = document.querySelectorAll('.flag-image')

// Sounds
const rigthAnswerSound = new Audio('assets/sounds/right.wav')
rigthAnswerSound.volume = 0.4
const wrongAnswerSound = new Audio('assets/sounds/wrong.wav')
wrongAnswerSound.volume = 0.4
const goodScoreSound = new Audio('assets/sounds/success.wav')
goodScoreSound.volume = 0.4
const failure = new Audio('assets/sounds/failure.wav')
failure.volume = 0.4
const gameCountriesSound = new Audio('assets/sounds/countries.wav')
gameCountriesSound.volume = 0.4
const gameCapitalsSound = new Audio('assets/sounds/capitals.wav')
gameCapitalsSound.volume = 0.4
const gameFlagsSound = new Audio('assets/sounds/flag.wav')
gameFlagsSound.volume = 0.4
const gameExploreSound = new Audio('assets/sounds/explore.wav')
gameExploreSound.volume = 0.2
const countdownSound = new Audio('assets/sounds/countdown.wav')
countdownSound.volume = 0.4
const highestScore = new Audio('assets/sounds/highest-score.wav')
highestScore.volume = 0.3
const clickedSound = new Audio('assets/sounds/clicked.wav')
clickedSound.volume = 0.4
const randomSound = new Audio('assets/sounds/random.wav')
randomSound.volume = 0.4
const gameHardSound = new Audio('assets/sounds/hard.wav')
gameHardSound.volume = 0.1

// Score
const percent = document.querySelector('.percent')

// Progress bar
const progress = document.getElementById('progress')
const progressBox = document.querySelector('.progress-container')
const circles = document.querySelectorAll('.circle')
const modal = document.getElementById('openModal')

// Regions
const europe = document.querySelectorAll('.europe')
const asia = document.querySelectorAll('.asia')
const africa = document.querySelectorAll('.africa')
const northAmerica = document.querySelectorAll('.north_america')
const southAmerica = document.querySelectorAll('.south_america')
const oceania = document.querySelectorAll('.oceania')
// Regions array
let regionArr = [europe, asia, africa, northAmerica, southAmerica, oceania]

const odometer = document.getElementById('odometer')

// Explore countries
const explore = document.querySelector('.explore-container')
const card = document.querySelector('.country-card')
const exploreBtns = document.querySelector('.explore-btns')

// Preventing to go to next question without answer
answerBtn.style.pointerEvents = 'none'

// Counter variables
const nums = document.querySelectorAll('.nums span')
const counter = document.querySelector('.counter')

let _GAME_COUNTRIES = false
let _GAME_CAPITALS = false
let _GAME_FLAG = false
let _GAME_HARD = false

let timer
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
//  Progress bar
let _CIRCLE_INDEX = 0

// On start
countriesContainer.style.display = 'none'
countryList.style.display = 'none'
progressBox.style.display = 'none'
goodScore.style.display = 'none'
allContent.style.display = 'none'
counter.style.display = 'none'
odometer.style.display = 'none'
video.style.display = 'none'
exploreBtns.style.display = 'none'
searchTerm.innerHTML = 'REGION'
card.style.display = 'none'
newSearch.style.display = 'none'
newRandom.style.display = 'none'
newGame.style.display = 'none'

for (let flag of flags) {
  flag.style.display = 'none'
}

// Video and signature load
setTimeout(() => {
  video.style.display = 'block'
  video.classList.add('fadeIn')
}, 500)

setTimeout(() => {
  sign.style.display = 'flex'
  signature.classList.add('fadeIn')
}, 2500)

const start = () => {
  load.classList.add('zoomOut')
  load.style.display = 'none'
  allContent.style.display = 'block'
  allContent.classList.add('bounceInDown')
  signature.style.display = 'none'

}

// Guess the country
btnCountry.addEventListener('click', () => {
  gameCountriesSound.play()
  _GAME_COUNTRIES = true
  setTimeout(() => {
    start()
  }, 500)

})

// Guess the capital city
btnCapital.addEventListener('click', () => {
  gameCapitalsSound.play()
  _GAME_COUNTRIES = true
  _GAME_CAPITALS = true
  setTimeout(() => {
    start()
  }, 500)

})

// Guess the flag
btnFlag.addEventListener('click', () => {
  gameFlagsSound.play()
  for (let flag of flags) {
    flag.style.display = 'inline-block'
  }
  countryDiv.style.backgroundColor = '#f2dcbb'
  _GAME_COUNTRIES = true
  _GAME_FLAG = true
  setTimeout(() => {
    start()
  }, 500)
})


// Hard mode
btnHard.addEventListener('click', () => {
  gameHardSound.play()
  _GAME_COUNTRIES = true
  _GAME_CAPITALS = true
  _GAME_HARD = true
  setTimeout(() => {
    start()
  }, 500)
})


// Explore countries
btnExplore.addEventListener('click', () => {
  gameExploreSound.play()
  searchTerm.innerHTML = 'COUNTRY'
  exploreBtns.style.display = 'block'
  start()
  countryList.style.display = 'block'
  regionEl.style.display = 'none'
  play.style.display = 'none'
  const getMeRandomCountry = () => countryList[Math.floor(Math.random() * countryList.length)].value
  const getCountry = (country) => {
    axios.get(`https://restcountries.eu/rest/v2/name/${country}`)
      .then(res => {

        let langArr = []
        const DATA = res.data[0]
        card.style.display = 'flex'
        console.log(res.data)
        exploreImg.src = DATA.flag
        countryName.innerHTML = `${DATA.name} - (${DATA.nativeName})`
        if (DATA.regionalBlocs.length == 0) {
          regionalBlock.innerHTML = ''
        } else {
          regionalBlock.innerHTML = `${DATA.regionalBlocs[0].name} - 
          "${DATA.regionalBlocs[0].acronym}"`

        }
        countryRegion.innerHTML = `${DATA.region} - (${DATA.subregion})`
        population.innerHTML = `👫 >   
           ${DATA.population.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} people`
        capitalCity.textContent = `🏙️ >  ${DATA.capital}`
        currencie.innerHTML = `💶 > ${DATA.currencies[0].name} (${DATA.currencies[0].code} - 
          ${DATA.currencies[0].symbol})`
        if (DATA.area == null) area.innerHTML = '📏 >'
        else if (DATA.area < 1000) {
          area.innerHTML = `📏 > ${DATA.area} Km2`
        } else {
          area.innerHTML = `📏 > ${DATA.area.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} Km2`
        }
        if (DATA.area == null || (DATA.population / DATA.area) < 1) density.innerHTML = '👥 >'
        else density.innerHTML = `👥 > ${Math.round(DATA.population / DATA.area)}🧍 per Km2 `
        callCode.innerHTML = `☎️ > +${DATA.callingCodes}`
        for (let i = 0; i < DATA.languages.length; i++) {
          langArr.push(` ${DATA.languages[i].name}`)

        }
        language.innerHTML = `🗣️ > ${langArr}`
        internet.innerHTML = `🌐 > ${DATA.topLevelDomain[0]}`
        wiki.setAttribute("href", `https://en.wikipedia.org/wiki/${country}`,"_blank")
      })
      .catch(err => {
        console.log('error', err)
      })
  }

  const btnAppear = () => {

    setTimeout(() => {
      newSearch.style.display = 'inline-block'
      newRandom.style.display = 'inline-block'
    }, 2500)

  }

  newRandom.addEventListener('click', () => {
    randomSound.play()
    card.style.display = 'none'
    newSearch.style.display = 'none'
    newRandom.style.display = 'none'
    setTimeout(() => {
      getCountry(getMeRandomCountry())
      btnAppear()
    }, 1000);

  })

  const removeEl = () => {

    card.classList.add('zoomIn')
    countryList.style.display = 'none'
    search.style.display = 'none'
    rnd.style.display = 'none'

  }

  search.addEventListener('click', () => {
    clickedSound.play()
    titleText.style.display = 'none'
    const userCountry = countryList.value.toLowerCase();
    getCountry(userCountry)
    removeEl()
    btnAppear()

  })

  newSearch.addEventListener('click', () => {
    clickedSound.play()
    card.style.display = 'none'
    newSearch.style.display = 'none'
    newRandom.style.display = 'none'
    countryList.classList.add('zoomIn')
    search.classList.add('zoomIn')
    rnd.classList.add('zoomIn')
    setTimeout(() => {

      titleText.style.display = 'block'
      countryList.style.display = 'block'
      search.style.display = 'inline-block'
      rnd.style.display = 'inline-block'

    }, 500)

  })

  rnd.addEventListener('click', () => {
    randomSound.play()
    titleText.style.display = 'none'
    removeEl()
    getCountry(getMeRandomCountry())
    btnAppear()

  })

})

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


// Reseting counter after click event on answer button or automaticly
const resetCounter = () => {

  counter.classList.remove('hide')
  nums.forEach((num) => {
    num.classList.value = ''
  })
  nums[0].classList.add('in')

}

const runCounter = () => {

  nums.forEach((num, idx) => {
    const nextToLast = nums.length - 1
    num.addEventListener('animationend', (e) => {
      if (e.animationName === 'goIn' && idx !== nextToLast) {
        num.classList.remove('in')
        num.classList.add('out')
      } else if (e.animationName === 'goOut' && num.nextElementSibling) {
        num.nextElementSibling.classList.add('in')
      } else {
        counter.classList.add('hide')

      }
    })
  })
}


// funcion which changing style of circles and progress bar
const update = () => {

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
const correct = () => {

  let userAnswer = getSelected()
  if (userAnswer == correctAnswer) {
    rigthAnswerSound.play()
    score++;
    odometer.innerHTML = score
    circles[_CIRCLE_INDEX].style.border = '3px solid #52E80C'
    resArray[correctAnswer].style.color = '#52E80C'
    resArray[correctAnswer].innerHTML += '✅'
  } else {
    wrongAnswerSound.play()
    circles[_CIRCLE_INDEX].style.border = '3px solid #FF0000'
    resArray[correctAnswer].style.color = '#52E80C'
    resArray[userAnswer].style.color = '#FF0000'
    resArray[userAnswer].innerHTML += '❌'
    if (_GAME_FLAG) resArray[correctAnswer].innerHTML += '✅'
  }
  if (finished) {
    counter.style.display = 'none'
    setTimeout(() => {
      countriesContainer.style.display = 'none'
    }, 500);

  }
}

// Buttons

play.addEventListener('click', () => {
  clickedSound.play()
  odometer.style.display = 'inline-block'
  odometer.classList.add('zoomIn')
  runCounter()
  setTimeout(() => {
    counter.style.display = 'block'
  }, 2000);
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

  progressBox.style.display = 'flex'
  progressBox.classList.add('zoomIn')
  progressBox.style.animationDuration = '1s';
  countriesContainer.style.display = 'block'
  countriesContainer.classList.add('bounceInDown')
  titleText.style.display = 'none'
  countryList.style.display = 'none'
  play.style.display = 'none'
  regionEl.style.display = 'none'
  getCountryData(randomCountry())
  // Counter is running until the end if player doesn't answer any question
  timer = setInterval(() => {
    if (!finished) {
      noAnswer()
    }
  }, 14000)

})


// Answer button
// Dugme za odgovor
answerBtn.addEventListener('click', () => {
  // On every click, timer is reset to default value(10s)
  clearInterval(timer)

  setTimeout(() => {
    counter.style.display = 'block'
  }, 3000)

  !S_America ? endGame(9) : endGame(4)
  correct()
  _CIRCLE_INDEX++
  console.log(finished)
  if (!finished) {
    counter.style.display = 'none'
    resetCounter()
    runCounter()
    timer = setInterval(() => {

      noAnswer()
    }, 14000)

  }
  if (finished) {
    clearInterval(timer)
    gameOver()
  }

  update()

  countriesContainer.className == 'zoomIn' ? countriesContainer.className = 'zoomOut' :
    countriesContainer.className = 'zoomOut'
  if (!finished) {
    setTimeout(() => {
      getCountryData(randomCountry())
      deselectAnswers()
      countriesContainer.classList.add('zoomIn')
    }, 700)

  }

})

// Function which automaticly goes to the next question if player doesn't answer 
// Timer is set to 10 seconds
// 
const noAnswer = () => {

  countriesContainer.className = 'zoomOut'
  if (!finished) {
    circles[_CIRCLE_INDEX].style.border = '3px solid #FF0000'

  }
  counter.style.display = 'none'
  resetCounter()
  !S_America ? endGame(9) : endGame(4)
  _CIRCLE_INDEX++
  update()
  if (finished) {
    clearInterval(timer)
    gameOver()
  }
  setTimeout(() => {
    if (!finished) {
      countriesContainer.classList.add('zoomIn')
      getCountryData(randomCountry())
    }
  }, 2000)
  setTimeout(() => {
    if (!finished) {
      runCounter()
      counter.style.display = 'block'
    }
  }, 4000)

}

// Activating modal with score and percent of accuracy
const gameOver = () => {

  clearInterval(timer)
  setTimeout(() => {
    modal.style.opacity = '1'
    modal.style.zIndex = '99'
  }, 1000)

  setTimeout(() => {

    !S_America ? percent.innerHTML = `${score * 10} %` :
      percent.innerHTML = `${score * 20} %`
    percent.style.animation = 'flash 2s infinite'
    if (!S_America) {
      if (score == 10) {
        highestScore.play()
        goodScore.style.display = 'block'
      } else goodScore.style.display = 'none'
      if (score >= 8 && score < 10) {
        goodScoreSound.play()
      } if (score <= 3) {
        failure.play()
      }
    }
    if (S_America) {
      if (score == 5) {
        highestScore.play()
        goodScore.style.display = 'block'
      } else goodScore.style.display = 'none'
      if (score >= 4 && score < 5) {
        goodScoreSound.play()
      }
      if (score <= 1) {
        failure.play()
      }
    }

    newGame.classList.add('zoomIn')
    newGame.style.display = 'block'
  }, 1500)

  newGame.addEventListener('click', () => {
    window.location.reload()
  })

}


// If radio button is checked answer button is no longer disabled
radios.forEach(radio => radio.addEventListener('click', () =>
  answerBtn.style.pointerEvents = 'all'))


// Reset cheched field
// Resetovanje oznacenog polja
const deselectAnswers = () => {

  radios.forEach(radio => radio.checked = false)
  resArray.forEach(res => res.style.color = '#555')
  resArray.forEach(res => res.innerHTML = '')

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
const randomCountry = () => {

  if (finished) {
    clearInterval(timer)

  }
  randC = _COUNTRIES_ARRAY[Math.floor(Math.random() * _COUNTRIES_ARRAY.length)]
  index = _COUNTRIES_ARRAY.indexOf(randC)
  _COUNTRIES_ARRAY.splice(index, 1)
  _CAPITALS_ARRAY.splice(index, 1)
  return randC

}

const getCountryData = (country) => {

  if (finished) {
    setTimeout(() => {
      countriesContainer.style.display = 'none'
    }, 500);

  }

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

  // Getting country name and flag from REST COUNTRIES API 
  axios.get(`https://restcountries.eu/rest/v2/name/${country}`)
    .then(res => {
      if (!_GAME_FLAG) {
        flag.src = res.data[0].flag
        capital = res.data[0].capital
        if (_GAME_CAPITALS) {
          _CORRECT = capital
          _RANDOM = _CAPITALS_ARRAY
          if (!_GAME_HARD) {
            gameMode.innerHTML = `Capital city of ${country}?`
          } else {
            gameMode.innerHTML = `Capital city of this country?`
          }
        }
        else {
          gameMode.innerHTML = 'Name of the country?'
          _CORRECT = country
          _RANDOM = _COUNTRIES_ARRAY
        }
      } else {
        gameMode.innerHTML = `Flag of ${country}?`
        _CORRECT = country
        _RANDOM = _COUNTRIES_ARRAY
      }

      let arr = [_CORRECT, _RANDOM[rndNmb[0]], _RANDOM[rndNmb[1]], _RANDOM[rndNmb[2]]]
      shuffle(arr)
      correctAnswer = arr.indexOf(_CORRECT)
      console.log(_CORRECT)
      if (!_GAME_FLAG) {
        resOne.innerHTML = arr[0]
        resTwo.innerHTML = arr[1]
        resThree.innerHTML = arr[2]
        resFour.innerHTML = arr[3]
      }
      if (_GAME_FLAG) {
        const getJSON = function (url, errorMsg = 'Something went wrong') {
          return fetch(url).then(response => {
            if (!response.ok) throw new Error(`${errorMsg} (${response.status})`)

            return response.json();
          })
        }

        const getFourFlags = async function (fl_1, fl_2, fl_3, fl_4) {
          try {
            const [data1] = await getJSON(
              `https://restcountries.eu/rest/v2/name/${fl_1}`
            )
            const [data2] = await getJSON(
              `https://restcountries.eu/rest/v2/name/${fl_2}`
            )
            const [data3] = await getJSON(
              `https://restcountries.eu/rest/v2/name/${fl_3}`
            )
            const [data4] = await getJSON(
              `https://restcountries.eu/rest/v2/name/${fl_4}`
            )
            flagOne.src = data1.flag
            flagTwo.src = data2.flag
            flagThree.src = data3.flag
            flagFour.src = data4.flag

          } catch (err) {
            console.error(err)
          }
        }
        getFourFlags(arr[0], arr[1], arr[2], arr[3])

      }

    })
    .catch(err => {
      console.log('error', err)
    })

}



// https://www.countryflags.io/

// API key for Google mmaps
// AIzaSyBXlnMA1W-LMjHEse9nTJnRpzt_onjgS_0

/*

let map;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8,
  });
}


*/