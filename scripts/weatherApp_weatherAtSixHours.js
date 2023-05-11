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
      const clouds = sixHourWeather.clouds.all;
      const windSpeed = sixHourWeather.wind.speed;
      const windDirection = sixHourWeather.wind.deg;
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

      const weatherAtSixHoursHTML = `
        <h2>in 6 Hours :</h2>
        <p>Temperature: ${temperature}°C</p>
        <p><span class="cloud-icon">${cloudIcon}</span></p>
        <p>Wind Speed: ${windSpeed} m/s</p>
        <p>Wind Direction: ${windDirection}°</p>
      `;

      const weatherAtSixHoursDiv = document.getElementById("weatherAtSixHours");
      weatherAtSixHoursDiv.innerHTML = weatherAtSixHoursHTML;
    });
}

function error() {
  console.log("Unable to retrieve your location");
}
