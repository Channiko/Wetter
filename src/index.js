function refreshweater(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let descriptionElement = document.querySelector("#weaterCondition");
  let cityElement = document.querySelector("#city");
  let humidityElement = document.querySelector("#humidity");
  let speedElement = document.querySelector("#windspeed");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#icon");

  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" />`;

  temperatureElement.innerHTML = Math.round(temperature);
  cityElement.innerHTML = response.data.city;
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  speedElement.innerHTML = `${response.data.wind.speed}km/h`;
  timeElement.innerHTML = formatDate(date);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
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
  return `${day} ${hours}:${minutes}`;
  if (minutes < 10) {
    minutes = `0 ${minutes}`;
  }
}

function searchCity(city) {
  let apikey = "201obc05f8b3t414d38b1ae0d468cf87";
  let apiurl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apikey}`;
  axios.get(apiurl).then(refreshweater);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");

  searchCity(searchInput.value);
}
function displayforecast() {
  let days = ["Tue", "Wed", "Thu", "Fri"];
  let forecastHtml = "";

  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `
      <div class="weaterForecast"></div>
      <div class="weaterForecastDay">${day}</div>
            <div class="weaterforecasticon">🌤️</div>
            <div class="weaterForecastTemperatures">
              <div class="weaterForecastTemperature"><strong>18°</strong></div>
              <div class="weaterForecastTemperature">20°</div>
            </div>
          </div>`;
  });
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);
searchCity("Antwerp");
displayforecast();
