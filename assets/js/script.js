// key 1  90a5b2cd046d7e3c1493dd6299106c4d
// key 2  b0032ccf1f942a837562c29b20858d84
// key 3  947940214a5feca7c6125ce4a4937d43

let searchBtnEl = document.querySelector("#search-btn")
let userInput = document.querySelector("#user-city")
let currentDayEl = document.querySelector("#current")
let fiveDayEl = document.querySelector("#five-day")
let fiveCardEl = fiveDayEl.children
let time = new Date()
let utcTime = 0
let cityName = ""
let uv = 0
let temp = 0
let wind = 0
let humid = 0
let month = 0
let day = 0
let year = 0
let lat = 0
let lon = 0
let test = "los angeles"

function searchCity() {
    let userCity = userInput.value
    fetch("http://api.openweathermap.org/geo/1.0/direct?q="+userCity+"&limit=1&appid=947940214a5feca7c6125ce4a4937d43")
    .then(header => header.json())
    .then(response => {
        console.log(response);
        lat = response[0].lat
        lon = response[0].lon
        cityName = response.name
        getCurrentDay()
        getFiveDay()
    })
}

function getCurrentDay() {
    fetch("https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&units=imperial&exclude=minutely,hourly,daily,alerts&appid=947940214a5feca7c6125ce4a4937d43")
    .then(header => header.json())
    .then(response => {
        utcTime = response.current.dt
        temp = response.current.temp
        wind = response.current.wind_speed
        humid = response.current.humidity
        uv = response.current.uvi
        editCurrent()
        console.log(response);
    })
}

function getFiveDay() {
    fetch("https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&units=imperial&exclude=current,minutely,hourly,alerts&appid=947940214a5feca7c6125ce4a4937d43")
    .then(header => header.json())
    .then(response => {
        for (let i = 0; i < fiveDayEl.children.length; i++) {
            utcTime = response.daily[i].dt
            temp = response.daily[i].temp.day
            wind = response.daily[i].wind_speed
            humid = response.daily[i].humidity
            fiveCardEl = fiveDayEl.children[i]
            editFive()
        }
        console.log(response)
    })
}

function editCurrent() {
    currentDayEl.children[0].innerText = cityName + " (" + time.toLocaleDateString(utcTime) + ") " + "icon"
    currentDayEl.children[1].innerText = "Temp : " + temp + " °F"
    currentDayEl.children[2].innerText = "Wind: " + wind + " MPH"
    currentDayEl.children[3].innerText = "Humidity: " + humid + " %"
    currentDayEl.children[4].innerText = "UV Index: " + uv
}

function editFive() {
    utcTime = time.toUTCString
    month = time.getMonth(utcTime) + 1
    day = time.getDate(utcTime)
    year = time.getFullYear(utcTime)
    fiveCardEl.children[0].innerText = month + "/" + day + "/" + year 
    fiveCardEl.children[1].innerText = "icon"
    fiveCardEl.children[2].innerText = "Temp : " + temp + " °F"
    fiveCardEl.children[3].innerText = "Wind: " + wind + " MPH"
    fiveCardEl.children[4].innerText = "Humidity: " + humid + " %"
 }

searchBtnEl.addEventListener("click", function() {
    searchCity()
})
// userInput.addEventListener("", function() {
//  searchCity()    
// })