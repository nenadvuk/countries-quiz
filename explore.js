
// Buttons
const btnExplore = document.getElementById('btn-explore')
const newSearch = document.getElementById('new-search')
const newRandom = document.getElementById('new-random')
const nextBtn = document.getElementById('next-btn')
const prevBtn = document.getElementById('previous-btn')

// Country data
const countryName = document.getElementById('country____name')

// Explore countries containers and cards
const explore = document.querySelector('.explore-container')
const card = document.querySelector('.country-card')
const exploreBtns = document.querySelector('.explore-btns')
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
const map = document.getElementById('map')
const tabTitle = document.getElementById('tab-title')

// On start
exploreBtns.style.display = 'none'
newSearch.style.display = 'none'
newRandom.style.display = 'none'
nextBtn.style.display = 'none'
prevBtn.style.display = 'none'
card.style.display = 'none'

// Index for next or previous mode
let _COUNTRIES_INDEX = 0

// Sounds
const gameExploreSound = new Audio('assets/sounds/explore.wav')
gameExploreSound.volume = 0.2
const randomSound = new Audio('assets/sounds/random.wav')
randomSound.volume = 0.4
const swipe = new Audio('assets/sounds/swipe.wav')
swipe.volume = 0.3

// All countries array
allCountriesArr = []
for (let country of countryList) {
  allCountriesArr.push(country.value)

}

// Explore countries
btnExplore.addEventListener('click', () => {
    gameExploreSound.play()
    start()
    exploreBtns.style.display = 'block'
    searchTerm.innerHTML = 'COUNTRY'
    countryList.style.display = 'block'
    regionEl.style.display = 'none'
    play.style.display = 'none'
  
    const getMeRandomCountry = () => countryList[Math.floor(Math.random()
      * countryList.length)].value
  
    const getCountry = (country) => {
      tabTitle.innerHTML = country
      _COUNTRIES_INDEX = allCountriesArr.indexOf(country)
      axios.get(`https://restcountries.com/v2/name/${country}`)
        .then(res => {
          let langArr = []
          let zoomIndex = 7 // Index for zoom on Google maps depending on surface area od country
          const DATA = res.data[0]
          card.style.display = 'block'
          console.log(DATA)
          exploreImg.src = DATA.flags.png
          countryName.innerHTML = `${DATA.name} - (${DATA.nativeName})`

          if (!DATA.regionalBlocs) {
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
            ${DATA.currencies[0].symbol})` /* [0].currencies.EUR */

          if (DATA.area == null) {
            area.innerHTML = '📏 >'
            zoomIndex = 10
          }
          else if (DATA.area < 1000) {
            area.innerHTML = `📏 > ${DATA.area} Km2`
            zoomIndex = 10
          } else {
            area.innerHTML = `📏 > ${DATA.area.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} Km2`
          }

          if (DATA.area == null || (DATA.population / DATA.area) < 1) density.innerHTML = '👥 >'
          else density.innerHTML = `👥 > ${Math.round(DATA.population / DATA.area)}🧍 per Km2 `

          callCode.innerHTML = `☎️ > +${DATA.callingCodes}`

          for (let i = 0; i < DATA.languages.length; i++) {
            langArr.push(` ${DATA.languages[i].name}`)
  
          }
          if (DATA.area > 250000 && DATA.area < 500000) zoomIndex = 6.5
          if (DATA.area > 500000 && DATA.area < 1500000) zoomIndex = 6
          if (DATA.area > 1500000 && DATA.area < 2000000) zoomIndex = 5
          if (DATA.area > 2000000) zoomIndex = 4

          language.innerHTML = `🗣️ > ${langArr}`
          internet.innerHTML = `🌐 > ${DATA.topLevelDomain[0]}`
          wiki.setAttribute("href", `https://en.wikipedia.org/wiki/${country}`, "_blank")
          map.setAttribute("href", `https://www.google.rs/maps/place/${country}/@${DATA.latlng[0]},${DATA.latlng[1]},${zoomIndex}z`, "_blank")
        })
        .catch(err => {
          console.log('error', err)
        })

      odometer.style.display = 'inline-block'
      odometer.classList.add('zoomIn')
      odometer.innerHTML = _COUNTRIES_INDEX
  
    }
    // Search button / Explore
    search.addEventListener('click', () => {
      sign.style.display = 'none'
      clickedSound.play()
      titleText.style.display = 'none'
      const userCountry = countryList.value

      getCountry(userCountry)
      removeEl()
      btnAppear()
      tabTitle.innerHTML = userCountry
  
    })
  
    // Random button / Explore
    rnd.addEventListener('click', () => {
      sign.style.display = 'none'
      randomSound.play()
      titleText.style.display = 'none'

      removeEl()
      getCountry(getMeRandomCountry())
      btnAppear()
  
    })
  
    // Appearance of next-prev, new search and new random buttons
    const btnAppear = () => {
      setTimeout(() => {
        nextBtn.style.display = 'inline-block'
        prevBtn.style.display = 'inline-block'
  
      }, 1000)
  
      setTimeout(() => {
        newSearch.style.display = 'inline-block'
        newRandom.style.display = 'inline-block'
        newSearch.classList.add('zoomInNoDelay')
        newRandom.classList.add('zoomInNoDelay')
  
      }, 2500)
    }
  
    const removeEl = () => {
      card.classList.add('zoomIn')
      countryList.style.display = 'none'
      search.style.display = 'none'
      rnd.style.display = 'none'
  
    }
  
    // Previous country by alphabetical order
    prevBtn.addEventListener('click', () => {
      swipe.play()
      explore.className = 'explore-container'
      explore.classList.add('fadeOutRightBig')
      if (_COUNTRIES_INDEX == 0) _COUNTRIES_INDEX = countryList.length
      _COUNTRIES_INDEX--
      odometer.innerHTML = _COUNTRIES_INDEX

      setTimeout(() => {
        swipe.play()
        explore.className = 'explore-container'
        explore.classList.add('fadeInLeftBig')
  
      }, 1500)
      setTimeout(() => {
        getCountry(countryList[_COUNTRIES_INDEX].value)
  
      }, 300);
  
    })
  
  
    // Next country by alphabetical order
    nextBtn.addEventListener('click', () => {
      swipe.play()
      explore.className = 'explore-container'
      explore.classList.add('fadeOutLeftBig')
      _COUNTRIES_INDEX++
      odometer.innerHTML = _COUNTRIES_INDEX
      if (_COUNTRIES_INDEX == countryList.length) _COUNTRIES_INDEX = 0
      setTimeout(() => {
        swipe.play()
        explore.className = 'explore-container'
        explore.classList.add('fadeInRightBig')
  
      }, 1500)
      setTimeout(() => {
        getCountry(countryList[_COUNTRIES_INDEX].value)
  
      }, 300);
  
    })
  
    newRandom.addEventListener('click', () => {
      randomSound.play()
      card.style.display = 'none'
      newSearch.style.display = 'none'
      newRandom.style.display = 'none'

      setTimeout(() => {
        getCountry(getMeRandomCountry())
        btnAppear()
  
      }, 400);
  
    })
  
    newSearch.addEventListener('click', () => {
      clickedSound.play()
      odometer.style.display = 'none'
      tabTitle.innerHTML = 'Country quiz'
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
  })
  
