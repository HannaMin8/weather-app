function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let currentDay = days[currentTime.getDay()];
  let currentHours = currentTime.getHours();
  if (currentHours < 10) {
    currentHours = `0${currentHours}`;
  }
  let currentMinutes = currentTime.getMinutes();
  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  }
  return `${currentDay}, ${currentHours}:${currentMinutes}`;
}
let dateElement = document.querySelector("#date");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

function showData(response) {
  let currentTemperature = Math.round(response.data.main.temp);
  let currentCity = response.data.name;
  let temp = document.querySelector(".temp");
  let h1 = document.querySelector("#city");
  temp.innerHTML = currentTemperature;
  h1.innerHTML = currentCity;
}

function searchCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city-input");
  /*let h1 = document.querySelector("#city");
  h1.innerHTML = `${searchInput.value}`;*/
  let apiKey = "17e6938b8ca35f2e9d6cfa919b2079c1";
  let units = "metric";
  let city = `${searchInput.value}`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showData);
}

let formCity = document.querySelector("#search-form");
formCity.addEventListener("submit", searchCity);

function currentData(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "17e6938b8ca35f2e9d6cfa919b2079c1";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showData);
}

function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentData);
}

let current = document.querySelector("#current-location");
current.addEventListener("click", currentLocation);
