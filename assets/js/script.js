// elements
var apiKey = '9cfe7036b90b3a13af1a88f6bf534b32'

var searchBtn = document.querySelector('.searchBtn')

// main info box
var fullBox = document.querySelector('.returnedData')
var mainBox = document.querySelector('.currentDay')
// 5 day blocks
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




// functions
function getCurrentWeather(e) {
    e.preventDefault()

    fullBox.style.display = 'block'

    var inputValue = document.getElementById('searchInput').value

    var requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${apiKey}`

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

            var iconDesription = data.weather[0].description
            newIcon.setAttribute('alt', iconDesription)

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





function getForecast(e) {
    e.preventDefault()

    var inputValue = document.getElementById('searchInput').value

    var requestUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${inputValue}&appid=${apiKey}`

    fetch(requestUrl)
        .then(function(response){
            return response.json()
        })
        .then(function(data){
            console.log(data)

            // box 1 append
            var name = data.city.name
            



            for (var i = 0; i < data.length; i++) {
                
            }

           
        })
}






// event listeners
searchBtn.addEventListener('click', getCurrentWeather)
searchBtn.addEventListener('click', getForecast)