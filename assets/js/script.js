// key 1  90a5b2cd046d7e3c1493dd6299106c4d
// key 2  b0032ccf1f942a837562c29b20858d84
// key 3  947940214a5feca7c6125ce4a4937d43

let searchBtnEl = document.querySelector("#search-btn")
let userInput = document.querySelector("#user-city")
let currentDayEl = document.querySelector("#current")
let currentNameEl = document.querySelector("#current-name")
let currentIconEl = document.querySelector("#current-icon")
let fiveDayEl = document.querySelector("#five-day")
let historyBtns = document.querySelector(".buttons")
let fiveCardEl = fiveDayEl.children
let icon = ""
let utcTime = 0
let cityName = ""
let capName = ""
let uv = 0
let temp = 0
let wind = 0
let humid = 0
let month = 0
let day = 0
let year = 0
let lat = 0
let lon = 0
let historyArray = []

function searchCity() {
    fetch("https://api.openweathermap.org/geo/1.0/direct?q="+userCity+"&limit=1&appid=947940214a5feca7c6125ce4a4937d43")
    .then(header => header.json())
    .then(response => {
        lat = response[0].lat
        lon = response[0].lon
        cityName = response[0].name
        getCurrentDay()
        getFiveDay()
    })
}

function getCurrentDay() {
    fetch("https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&units=imperial&exclude=minutely,hourly,daily,alerts&appid=947940214a5feca7c6125ce4a4937d43")
    .then(header => header.json())
    .then(response => {
        utcTime = response.current.dt
        icon = response.current.weather[0].icon
        temp = response.current.temp
        wind = response.current.wind_speed
        humid = response.current.humidity
        uv = response.current.uvi
        editCurrent()
    })
}

function getFiveDay() {
    fetch("https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&units=imperial&exclude=current,minutely,hourly,alerts&appid=947940214a5feca7c6125ce4a4937d43")
    .then(header => header.json())
    .then(response => {
        for (let i = 0; i < fiveDayEl.children.length; i++) {
            utcTime = response.daily[i].dt
            icon = response.daily[i].weather[0].icon
            temp = response.daily[i].temp.day
            wind = response.daily[i].wind_speed
            humid = response.daily[i].humidity
            fiveCardEl = fiveDayEl.children[i]
            editFive()
        }
    })
}

function editCurrent() {
    let time = new Date(utcTime * 1000)
    currentNameEl.innerText = cityName + " (" + time.toLocaleDateString(utcTime) + ") "
    currentIconEl.src = "https://openweathermap.org/img/wn/"+icon+".png"
    currentDayEl.children[1].innerText = "Temp : " + temp + " °F"
    currentDayEl.children[2].innerText = "Wind: " + wind + " MPH"
    currentDayEl.children[3].innerText = "Humidity: " + humid + " %"
    currentDayEl.children[4].innerText = "UV Index: " + uv
    // uvIndex()
}

//need to fix date
function editFive() {
    let time = new Date(utcTime * 1000)
    month = time.getMonth() + 1
    day = time.getDate()
    year = time.getFullYear()
    fiveCardEl.children[0].innerText = month + "/" + day + "/" + year 
    fiveCardEl.children[1].src = "https://openweathermap.org/img/wn/"+icon+".png"
    fiveCardEl.children[2].innerText = "Temp : " + temp + " °F"
    fiveCardEl.children[3].innerText = "Wind: " + wind + " MPH"
    fiveCardEl.children[4].innerText = "Humidity: " + humid + " %"
 }

// function uvIndex() {
//     currentDayEl.children[4].
// }

function storeHistory() {
    historyArray.push(userInput.value)
    localStorage.setItem("userHistory", JSON.stringify(historyArray))
}

function showHistory() {
    let fromHistory = JSON.parse(localStorage.getItem("userHistory"))
    let newHistoryArray = fromHistory.reverse()
    let buttonEl = document.createElement("button")
    let i = 0

    buttonEl.setAttribute("id", "history")
    buttonEl.setAttribute("class", "button is-fullwidth has-background-grey-light")
    buttonEl.textContent = newHistoryArray[i]
    historyBtns.append(buttonEl)
    i++
}

function clickSearch() {
    userCity = userInput.value
    searchCity()
    storeHistory()
    showHistory()
}

searchBtnEl.addEventListener("click", function() {
    clickSearch()
})
historyBtns.addEventListener("click", function(event) {
    buttonClicked = event.target
    userCity = buttonClicked.textContent
    searchCity(userInput)
})