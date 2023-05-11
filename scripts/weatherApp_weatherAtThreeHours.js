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
      const humidity = threeHourWeather.main.humidity;
      const clouds = threeHourWeather.clouds.all;
      const windSpeed = threeHourWeather.wind.speed;
      const windDegree = threeHourWeather.wind.deg;
      const rain = threeHourWeather.rain ? threeHourWeather.rain["3h"] : 0; // check if rain data exists, otherwise assign 0
      let windDirection = '';

      // calculate wind direction based on degree
      if (windDegree >= 337.5 || windDegree < 22.5) {
        windDirection = 'N';
      } else if (windDegree >= 22.5 && windDegree < 67.5) {
        windDirection = 'NE';
      } else if (windDegree >= 67.5 && windDegree < 112.5) {
        windDirection = 'E';
      } else if (windDegree >= 112.5 && windDegree < 157.5) {
        windDirection = 'SE';
      } else if (windDegree >= 157.5 && windDegree < 202.5) {
        windDirection = 'S';
      } else if (windDegree >= 202.5 && windDegree < 247.5) {
        windDirection = 'SW';
      } else if (windDegree >= 247.5 && windDegree < 292.5) {
        windDirection = 'W';
      } else {
        windDirection = 'NW';
      }

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
      const threeHoursLater = new Date(now.getTime() + 3 * 60 * 60 * 1000);
      const formattedTime = threeHoursLater.toLocaleString();

      const weatherAtThreeHoursHTML = `
        <h2>in 3 Hours :</h2>
        <p>${formattedTime}</p>
        <p><span class="cloud-icon">${cloudIcon}</span></p>
        <p>Temperature: ${temperature}°C</p>
        <p>Wind : ${windDirection} , ${windSpeed} m/s</p>
        <p>Rain: ${rain}mm</p>
     
        <p>Humidity: ${humidity}%</p>
        `;

      const weatherAtThreeHoursDiv = document.getElementById("weatherAtThreeHours");
      weatherAtThreeHoursDiv.innerHTML = weatherAtThreeHoursHTML;
    });
}

function error() {
  console.log("Unable to retrieve your location");
}


