var firstDay = document.getElementById('firstDay')
var currentDay = document.getElementById('currentDate')
var city = document.getElementById('cities')
var todayTemp = document.getElementById('temp')
var todayIcon = document.getElementById('todayIcon')
var conText = document.getElementById('condition')
var humidityPersent = document.getElementById('humidityPersent')
var kiloPerHoure = document.getElementById('kiloPerHoure')
var windDirection = document.getElementById('windDirection')

var nextDayIcon = document.getElementById('nextDayIcon')
var nextDayMaxTemp = document.getElementById('nextDayMaxTemp')
var nextDayMinTemp = document.getElementById('nextDayMinTemp')
var nextDayDesc = document.getElementById('nextDayDesc')

var thirdDay = document.getElementById('thirdDay')
var thirdtDayMinTemp = document.getElementById('thirdtDayMinTemp')
var thirdDesc = document.getElementById('thirdDesc')

var locationSearch = document.getElementById('locationSearch')

async function getData(cityname)
{
   var weatherData = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=039ee9fe907e4102ae2190930240901&q=${cityname}&days=7`)
   var weather = await weatherData.json()
   return weather
}
function displayToday(data)
{
    city.innerHTML = data.location.country
    todayTemp.innerHTML = data.current.temp_c
    todayIcon.setAttribute("src",data.current.condition.icon)
    conText.innerHTML = data.current.condition.text
    humidityPersent.innerHTML = data.current.humidity+"%"
    kiloPerHoure.innerHTML = data.current.wind_kph+"km/h"
    windDirection.innerHTML = data.current.wind_dir
}

function displayNext(data)
{
    var forecastData = data.forecast.forecastday
    for (var i = 0 ; i<2 ; i++)
    {
        nextDayMaxTemp.innerHTML = forecastData[i+1].day.maxtemp_c
        nextDayMinTemp.innerHTML = forecastData[i+1].day.mintemp_c
        nextDayIcon.setAttribute("src",forecastData[i+1].day.condition.icon)
        nextDayDesc.innerHTML = forecastData[i+1].day.condition.text
    }
    
}
function thirdDay(data)
{
    var forecastData = data.forecast.forecastday
    for (var i = 0 ; i<3 ; i++)
    {
        thirdtDayMinTemp.innerHTML = forecastData[i+1].day.mintemp_c
        thirdDesc.innerHTML = forecastData[i+1].day.condition.text
    }

}


async function allProducts(city="cairo")
{
    var weatherData = await getData(city)
    if(!weatherData.error)
    {
        displayToday(weatherData)
        displayNext(weatherData)
        thirdDay(weatherData)
    } 
}
allProducts()

locationSearch.addEventListener("input",function(){
    allProducts(locationSearch.value)
})