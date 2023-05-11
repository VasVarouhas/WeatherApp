const apiKey = "b83e33a3dadd84e5e5b93751e517e246";
const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}`;

// get user's location coordinates
navigator.geolocation.getCurrentPosition((position) => {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;

  // make API request to get current weather
  const url = `${weatherUrl}&lat=${lat}&lon=${lon}&units=metric`;
  fetch(url)
    .then(response => response.json())
    .then(data => {
      const temperature = data.main.temp;
      const clouds = data.clouds.all;
      const windSpeed = data.wind.speed;
      const windDirection = data.wind.deg;
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

      // display weather information with cloud icon
      document.getElementById("currentWeather").innerHTML =
      ` <h2>Weather live :</h2>
        <p>Temperature: ${temperature} &#8451;</p>
        <p> <span class="cloud-icon">${cloudIcon}</span></p>
        <p>Wind speed: ${windSpeed} m/s</p>
        <p>Wind direction: ${windDirection} &deg;</p>`;
    })
    .catch(error => {
      console.log(error);
    });
});
