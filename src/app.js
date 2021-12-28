// *** SEARCH ENGINE ***

function citySearch(event) {
  event.preventDefault();
  let cityEntered = document.querySelector("#enter-city");
  cityEntered = cityEntered.value;
  if (cityEntered.length < 1) {
    alert("Please enter a city");
  } else {
    document.querySelector("#city").innerHTML = `${cityEntered}`;
    getTempApi(cityEntered);
  }
}

// Go button
let inputForm = document.querySelector("form");
inputForm.addEventListener("submit", citySearch);
