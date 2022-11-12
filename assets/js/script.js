// elements
var apiKey = '9cfe7036b90b3a13af1a88f6bf534b32'

var searchBtn = document.querySelector('.searchBtn')





// functions
function getApi(e) {
    e.preventDefault()

    var inputValue = document.getElementById('searchInput').value

    var requestUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${inputValue}&appid=${apiKey}`

    fetch(requestUrl)
        .then(function(response){
            return response.json()
        })
        .then(function(data){
            console.log(data)

           
        })
}






// event listeners
searchBtn.addEventListener('click', getApi)