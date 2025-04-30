function refreshWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#icon");
  
   cityElement.innerHTML = response.data.city;
   timeElement.innerHTML = formatDate(date);
   descriptionElement.innerHTML = response.data.condition.description;
   humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
   windSpeedElement.innerHTML = `${response.data.wind.speed} mph`;
   temperatureElement.innerHTML = Math.round(response.data.temperature.current);
   iconElement.innerHTML= `<img src="${response.data.condition.icon_url}" class="weather-app-icon"/>`;
}

function formatDate(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes().toString().padStart(2, "0");  
  let ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  
   return `${day} ${hours}:${minutes} ${ampm}`;
}

function searchCity(city) {
  let apiKey = "6o6b1f68btc323d6b261b3e92ad24092";
  let apiUrl =
    `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(refreshWeather);
  }

function handleSearchFormSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  
  searchCity (searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchFormSubmit);

searchCity("Sarasota");