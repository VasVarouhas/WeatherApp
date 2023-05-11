const api_key = "b83e33a3dadd84e5e5b93751e517e246";
const url = `https://api.openweathermap.org/data/2.5/forecast?appid=${api_key}&units=metric`;

navigator.geolocation.getCurrentPosition(success, error);

function success(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  fetch(`${url}&lat=${latitude}&lon=${longitude}`)
    .then(response => response.json())
    .then(data => {
      const sixHourWeather = data.list[2];
      const temperature = sixHourWeather.main.temp;
      const humidity = sixHourWeather.main.humidity;
      const clouds = sixHourWeather.clouds.all;
      const windSpeed = sixHourWeather.wind.speed;
      const windDirection = getWindDirection(sixHourWeather.wind.deg);
      const rain = (sixHourWeather.rain && sixHourWeather.rain["3h"]) ? sixHourWeather.rain["3h"] : 0;
      let cloudIcon = '';

      // check cloudiness percentage and display corresponding icon
      if (clouds < 25) {
        cloudIcon = '☀️'; // sunny
      } else if (clouds < 50) {
        cloudIcon = '⛅️'; // partly cloudy
      } else if (clouds < 75) {
        cloudIcon = '🌥️'; // mostly cloudy
      } else {
        cloudIcon = '☁️'; // cloudy
      }

      const now = new Date();
const sixHoursLater = new Date(now.getTime() + 6 * 60 * 60 * 1000);
const formattedTime = sixHoursLater.toLocaleString();

      const weatherAtSixHoursHTML = `
        <h2>After 6 hours</h2>
        <p>${formattedTime}</p>
        <p><span class="cloud-icon">${cloudIcon}</span></p>
        <p>Temperature: ${temperature}°C</p>
        <p>Wind : ${windDirection} , ${windSpeed} m/s</p>
        <p>Rain: ${rain}mm</p>     
        <p>Humidity: ${humidity}%</p>
        `;

      const weatherAtSixHoursDiv = document.getElementById("weatherAtSixHours");
      weatherAtSixHoursDiv.innerHTML = weatherAtSixHoursHTML;
    });
}

function error() {
  console.log("Unable to retrieve your location");
}

function getWindDirection(degrees) {
  const val = Math.floor((degrees / 22.5) + 0.5);
  const directions = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
  return directions[(val % 16)];
}
