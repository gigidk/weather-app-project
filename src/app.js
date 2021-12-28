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
  // current temperature

  console.log(response);
  let temp = Math.round(response.data.current.temp);
  let weatherDescription = response.data.current.weather[0].main;
  let humidity = response.data.current.humidity;
  let wind = Math.round(response.data.current.wind_speed);
  let timezoneOffset = response.data.timezone_offset;
  document.querySelector("#temperatureNow").innerHTML = temp;
  document.querySelector("#weather-description").innerHTML = weatherDescription;
  document.querySelector("#humidity").innerHTML = `${humidity}`;
  document.querySelector("#wind").innerHTML = `${wind} `;

  // forecast temperature

  // forecast date

  function getForecastDate() {
    let dayOfWeek = document.querySelector("#header-day").innerHTML;
    find = currentDay.find((element) => element === dayOfWeek);
    dayOfWeek = currentDay.indexOf(find);

    for (let i = 0; i < 5; i++) {
      let weekday = dayOfWeek + i;
      let highTemp = Math.round(response.data.daily[`${i}`].temp.max);
      let lowTemp = Math.round(response.data.daily[`${i}`].temp.min);
      console.log(highTemp);
      document.querySelector(`#day${i}`).innerHTML = currentDay[weekday];
      document.querySelector(`#highDay${i}`).innerHTML = `${highTemp}°`;
      document.querySelector(`#lowDay${i}`).innerHTML = `${lowTemp}°`;
    }
  }

  //for error handling
  let tempColumn = document.querySelector(".nowTemp");
  tempColumn.classList.remove("mordor");

  //functions called

  getLocalTime(timezoneOffset);
  getForecastDate();
}

function getEndpoint(cityEntered) {
  let city = cityEntered;
  let endpoint = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;
  axios.get(endpoint).then(getLonLat).catch(error);
}

function getLonLat(response) {
  let location = response.data.city.name;
  let lat = response.data.city.coord.lat;
  let lon = response.data.city.coord.lon;
  let units = "metric";
  let convertTo = document.querySelector("#celsius");
  if (convertTo.classList.contains("selected")) {
    units = "metric";
    document.querySelector("#windUnits").innerHTML = "km/h";
  } else {
    units = "imperial";
    document.querySelector("#windUnits").innerHTML = "mph";
  }
  document.querySelector("#city").innerHTML = location;
  let endpoint = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude={part}&appid=${apiKey}&units=${units}`;
  console.log(endpoint);
  axios.get(endpoint).then(getCityTemp);
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

// Preset handle clicks

function handlePresetCity(event) {
  let selectedCity = event.target.innerHTML;
  getEndpoint(selectedCity);
}

for (let i = 1; i < 6; i++) {
  let presetCity = document.querySelector(`#preset${i}`);
  presetCity.addEventListener("click", handlePresetCity);
}

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
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
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

// current date and time

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

  document.querySelector(
    "#header-month-date"
  ).innerHTML = `${month} ${date}, ${year} /  ${hour}:${minutes}`;
  document.querySelector("#header-day").innerHTML = `${day}`;
}
