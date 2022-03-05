let apiData = 0;
let citySearch = "New York";
let currentDayEl = document.querySelector("#current")
let fiveDayEl = document.querySelector("#five-day")

function getCurrentDay() {
    fetch("https://api.openweathermap.org/data/2.5/weather?q="+citySearch+"&appid=fa6a5bb676fc0a7edc88cf13590ef043")
    .then(header => header.json())
    .then(response => {
        apiData = response
        console.log(apiData);
        toFaren(apiData.main.temp)
        console.log(faren);
    })
}

function getFiveDay() {
    fetch("https://api.openweathermap.org/data/2.5/forecast?q=orlando&appid=fa6a5bb676fc0a7edc88cf13590ef043")
    .then(header => header.json())
    .then(response => {
        apiData = response
        console.log(apiData);
        toFaren(apiData.list[0].main.temp)
        console.log(faren);
    })
}

// function displayCurrent() {
    
//     getCurrentDay()
// }

// function displayFive() {
//     for (let i = 0; i < 5; i++) {

//     }
//     getFiveDay()
// }

 function toFaren(num) {
    faren = ((num - 273.15)*1.8)+32
    faren = faren.toFixed(2)
}