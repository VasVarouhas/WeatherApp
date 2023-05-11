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
      const windDegrees = data.wind.deg;
      const humidity = data.main.humidity;
      const rain = (data.rain && data.rain["1h"]) || 0;
      let cloudIcon = '';
      let windDirection = '';
  // get current date and time
  const now = new Date();
  const date = now.toLocaleDateString();
  const time = now.toLocaleTimeString();
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

      // convert wind degrees to NESW direction
      if (windDegrees >= 0 && windDegrees < 22.5) {
        windDirection = 'N';
      } else if (windDegrees >= 22.5 && windDegrees < 67.5) {
        windDirection = 'NE';
      } else if (windDegrees >= 67.5 && windDegrees < 112.5) {
        windDirection = 'E';
      } else if (windDegrees >= 112.5 && windDegrees < 157.5) {
        windDirection = 'SE';
      } else if (windDegrees >= 157.5 && windDegrees < 202.5) {
        windDirection = 'S';
      } else if (windDegrees >= 202.5 && windDegrees < 247.5) {
        windDirection = 'SW';
      } else if (windDegrees >= 247.5 && windDegrees < 292.5) {
        windDirection = 'W';
      } else if (windDegrees >= 292.5 && windDegrees < 337.5) {
        windDirection = 'NW';
      } else if (windDegrees >= 337.5 && windDegrees < 360) {
        windDirection = 'N';
      } else {
        windDirection = 'unknown';
      }

    
      // display weather information with cloud icon and NESW wind direction
      document.getElementById("currentWeather").innerHTML =
      ` <h2>Weather live </h2>
      <p>${date}, ${time}</p>
      <p><span class="cloud-icon">${cloudIcon}</span></p>
      <p>Temperature: ${temperature}°C</p>
      <p>Wind : ${windDirection} , ${windSpeed} m/s</p>
      <p>Rain: ${rain}mm</p>     
      <p>Humidity: ${humidity}%</p>
      `;
    })
    .catch(error => {
      console.log(error);
    });
});
