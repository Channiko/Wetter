function refreshweater(response) {
  let temperatureElement = document.querySelector("#temperature")
  let temperature = response.data.temperature.current;
  temperatureElement.innerHTML = Math.round(temperature);
   let cityElement = document.querySelector("#city")
  cityElement.innerHTML = response.data.city;
}

function searchCity(city) {
  let apikey = "201obc05f8b3t414d38b1ae0d468cf87";
  let apiurl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apikey}`
  axios.get(apiurl).then(refreshweater);
}


function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
 
searchCity(searchInput.value)
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);
searchCity("Antwerp");
