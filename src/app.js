let apiKey = "d974ef508c876cc2103a8078f476a785";

// *** ERROR HANDLING ***

function error(error) {
  document.querySelector("#city").innerHTML = "Mordor";
  document.querySelector("#temperatureNow").innerHTML = 5000;
  document.querySelector("#weather-description").innerHTML = "Crispy Hobbits";
  document.querySelector("#current-emoji").innerHTML = "🌋";
  document.querySelector("#wind").innerHTML = `500 `;
  document.querySelector("#humidity").innerHTML = `-50`;
  let tempColumn = document.querySelector(".nowTemp");
  tempColumn.classList.add("mordor");
  alert("Please enter a valid city.");
}

// *** API CALLS ***

// current temperature

function getCityTemp(response) {
  console.log(response);
  let temp = Math.round(response.data.main.temp);
  let location = response.data.name;
  let weatherDescription = response.data.weather[0].main;
  let humidity = response.data.main.humidity;
  let wind = Math.round(response.data.wind.speed);
  let timezoneOffset = response.data.timezone;
  document.querySelector("#temperatureNow").innerHTML = temp;
  document.querySelector("#city").innerHTML = location;
  document.querySelector("#weather-description").innerHTML = weatherDescription;
  document.querySelector("#humidity").innerHTML = `${humidity}`;
  document.querySelector("#wind").innerHTML = `${wind} `;
  document.querySelector("#timezone").innerHTML = `${timezoneOffset}`;

  getLocalTime(timezoneOffset);

  //for error handling
  let tempColumn = document.querySelector(".nowTemp");
  tempColumn.classList.remove("mordor");
}

function getEndpoint(cityEntered) {
  let city = cityEntered;
  let units = "metric";
  let convertTo = document.querySelector("#celsius");
  if (convertTo.classList.contains("selected")) {
    units = "metric";
    document.querySelector("#windUnits").innerHTML = "km/h";
  } else {
    units = "imperial";
    document.querySelector("#windUnits").innerHTML = "mph";
  }

  let endpoint = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(endpoint).then(getCityTemp).catch(error);
}

// *** SEARCH ENGINE ***

function handleCitySearch(event) {
  event.preventDefault();
  let cityEntered = document.querySelector("#enter-city");
  cityEntered = cityEntered.value;
  if (cityEntered.length < 1) {
    alert("Please enter a city");
  } else {
    document.querySelector("#city").innerHTML = `${cityEntered}`;
    getEndpoint(cityEntered);
  }
}

// Go button
let inputForm = document.querySelector("form");
inputForm.addEventListener("submit", handleCitySearch);

// *** CELSIUS TO FARENHEIT

function convertToFarenheit(event) {
  event.preventDefault();
  let cityEntered = document.querySelector("#city").innerHTML;
  let convertTo = document.querySelector("#farenheit");
  let convertFrom = document.querySelector("#celsius");
  convertTo.classList.add("selected");
  convertFrom.classList.remove("selected");
  getEndpoint(cityEntered);
}

function convertToCelsius(event) {
  event.preventDefault();
  let cityEntered = document.querySelector("#city").innerHTML;
  let convertTo = document.querySelector("#celsius");
  let convertFrom = document.querySelector("#farenheit");
  convertTo.classList.add("selected");
  convertFrom.classList.remove("selected");
  getEndpoint(cityEntered);
}

let farenehit = document.querySelector("#farenheit");
farenehit.addEventListener("click", convertToFarenheit);

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", convertToCelsius);

// *** DATE AND TIME ***

let currentDay = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let currentMonth = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];

function getLocalTime(timezoneOffset) {
  let now = new Date();
  let currentUnixTimestamp = now.getTime();
  let currentTimezone = now.getTimezoneOffset() * 60000;
  let utcTime = currentUnixTimestamp + currentTimezone;
  let localTimezone = timezoneOffset * 1000;
  let localTime = utcTime + localTimezone;
  now = new Date(localTime);

  let hour = now.getHours();
  let minutes = ("0" + now.getMinutes()).slice(-2);
  let date = now.getDate();
  let day = currentDay[now.getDay()];
  let month = currentMonth[now.getMonth()];
  let year = now.getFullYear();

  document.querySelector("#header-day").innerHTML = `${day}`;
  document.querySelector(
    "#header-month-date"
  ).innerHTML = `${month} ${date}, ${year} /  ${hour}:${minutes}`;
}
