

navigator.geolocation.getCurrentPosition(success, error);

function success(position) {
  const api_key = "b83e33a3dadd84e5e5b93751e517e246";
const url = `https://api.openweathermap.org/data/2.5/forecast?appid=${api_key}&units=metric`;
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  fetch(`${url}&lat=${latitude}&lon=${longitude}`)
    .then(response => response.json())
    .then(data => {
      const threeHourWeather = data.list[1];
      const temperature = threeHourWeather.main.temp;
      const clouds = threeHourWeather.clouds.all;
      const windSpeed = threeHourWeather.wind.speed;
      const windDirection = threeHourWeather.wind.deg;
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

      const weatherAtThreeHoursHTML = `
        <h2>in 3 Hours :</h2>
        <p>Temperature: ${temperature}°C</p>
        <p><span class="cloud-icon">${cloudIcon}</span></p>
        <p>Wind Speed: ${windSpeed} m/s</p>
        <p>Wind Direction: ${windDirection}°</p>
      `;

      const weatherAtThreeHoursDiv = document.getElementById("weatherAtThreeHours");
      weatherAtThreeHoursDiv.innerHTML = weatherAtThreeHoursHTML;
    });
}

function error() {
  console.log("Unable to retrieve your location");
}