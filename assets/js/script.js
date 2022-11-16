// elements
var apiKey = '9cfe7036b90b3a13af1a88f6bf534b32'

var searchBtn = document.getElementById('searchBtn1')
var form = document.querySelector('.form')
var newButtonsBox = document.getElementById('additionalButtons')

var input = document.getElementById('searchInput').value

// main info box
var fullBox = document.querySelector('.returnedData')
var mainBox = document.querySelector('.currentDay')
// 5 day blocks
var blocksContainer = document.querySelector('.dayBlocks')

var weatherBox1 = document.getElementById('weatherBox1')
var weatherBox2 = document.getElementById('weatherBox2')
var weatherBox3 = document.getElementById('weatherBox3')
var weatherBox4 = document.getElementById('weatherBox4')
var weatherBox5 = document.getElementById('weatherBox5')


// create new elements
var mainHeader = document.createElement('h3')
var newHeader = document.createElement('h4')
var newIcon = document.createElement('img')
var newP1 = document.createElement('p')
var newP2 = document.createElement('p')
var newP3 = document.createElement('p')



var currentDate = moment().format('MMMM Do YYYY')

// search history

var searchHistory = []


renderSearches()




// functions
function getCurrentWeather(city) {

    fullBox.style.display = 'block'


    var requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`

    fetch(requestUrl)
        .then(function(response){
            return response.json()
        })
        .then(function(data){
            console.log(data)

            // main box append
            var name = data.name
            mainHeader.textContent = name + ` (${currentDate})`


            var icon = data.weather[0].icon
            var iconUrl = "http://openweathermap.org/img/w/" + icon + ".png"
            newIcon.setAttribute('src', iconUrl)

            var iconDescription = data.weather[0].description
            newIcon.setAttribute('alt', iconDescription)

            var temp = Math.floor(((data.main.temp - 273.15) * 1.8 + 32))
            newP1.textContent = 'Temperature: ' + temp + ' °F'


            var wind = data.wind.speed
            var conversion = Math.ceil((wind * 2.237) * 100) / 100
            newP2.textContent = 'Wind Speed: ' + conversion + ' MPH'

            var humidity = data.main.humidity
            newP3.textContent = 'Humidity: ' + humidity + '%'

            mainBox.appendChild(mainHeader)
            mainBox.appendChild(newIcon)
            mainBox.appendChild(newP1)
            mainBox.appendChild(newP2)
            mainBox.appendChild(newP3)
        })

        
}





function getForecast(city) {
    

    var requestUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`

    fetch(requestUrl)
        .then(function(response){
            return response.json()
        })
        .then(function(data){
            console.log(data)

            blocksContainer.innerHTML = ''
            // box 1 append
            for (var i = 0; i < data.list.length; i += 8) {
                var dt = data.list[i].dt_txt
                var dt1 = dt.split('')
                var dateArr = dt1.splice(0, 10)
                var date = dateArr.join('')
                

                var icon = data.list[i].weather[0].icon
                var iconDescription = data.list[i].weather[0].description
                var temp = Math.floor(((data.list[i].main.temp - 273.15) * 1.8 + 32))
                var wind = data.list[i].wind.speed
                var conversion = Math.ceil((wind * 2.237) * 100) / 100
                var humidity = data.list[i].main.humidity
                
                var newDiv = document.createElement('div')
                newDiv.classList.add('weatherBox')

                var iconUrl = "http://openweathermap.org/img/w/" + icon + ".png"

                var newHead = document.createElement('h5')
                var newIcon = document.createElement('img')
                var newP1 = document.createElement('p')
                var newP2 = document.createElement('p')
                var newP3 = document.createElement('p')
                
                newHead.textContent = date
                newHead.setAttribute('style', 'font-weight: bold; text-decoration: underline;')
                newIcon.setAttribute('src', iconUrl)
                newIcon.setAttribute('alt', iconDescription)
                newP1.textContent = 'Temp: ' + temp + ' °F'
                newP2.textContent = 'Wind: ' + conversion + ' MPH'
                newP3.textContent = 'Humidity: ' + humidity + '%'

                newDiv.appendChild(newHead)
                newDiv.appendChild(newIcon)
                newDiv.appendChild(newP1)
                newDiv.appendChild(newP2)
                newDiv.appendChild(newP3)
                
                
                blocksContainer.appendChild(newDiv)

            }     
        })
    

}


function saveSearch(input) {
    searchHistory.push(input)

    localStorage.setItem('history', JSON.stringify(searchHistory))

    renderSearches()

}

function renderSearches() {
    var newData = JSON.parse(localStorage.getItem('history')) || []

    newButtonsBox.innerHTML = ''
    
    for ( var i = 0; i < newData.length; i++) {

        var returned = newData[i]
        var newButton = document.createElement('button')
        newButton.classList.add('searchBtn')
        newButton.innerHTML = returned
        newButtonsBox.appendChild(newButton)

    }
}


function searchEvent(e) {
    e.preventDefault()
    var city = document.getElementById('searchInput').value
    getCurrentWeather(city)
    getForecast(city)
    saveSearch(city)

}




// event listeners





searchBtn.addEventListener('click', searchEvent)


newButtonsBox.addEventListener('click', function(e){
    e.preventDefault()


    if (e.target.tagName !== 'BUTTON') {
        return
    } else {
        var search = e.target.textContent

        getCurrentWeather(search)
        getForecast(search)
    }
    
})

