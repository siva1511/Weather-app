const apiKey = "3ac187d344479dbeb71fd1a93ca55e39";

function getWeather() {
  const location = document.getElementById("cityInput").value.trim();
  const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${location},IN&limit=1&appid=${apiKey}`;

  fetch(geoUrl)
    .then(response => response.json())
    .then(geoData => {
      if (geoData.length === 0) {
        document.getElementById("weatherResult").innerHTML = `<p>Location not found.</p>`;
        return;
      }

      const lat = geoData[0].lat;
      const lon = geoData[0].lon;

      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

      fetch(weatherUrl)
        .then(response => response.json())
        .then(data => {
          // ✅ Set dynamic background here
          updateBackground(data.weather[0].main.toLowerCase());

          const weatherData = `
            <p><strong>Location:</strong> ${data.name}</p>
            <p><strong>Temperature:</strong> ${data.main.temp}°C</p>
            <p><strong>Condition:</strong> ${data.weather[0].description}</p>
            <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
            <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
            <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" />
          `;
          document.getElementById("weatherResult").innerHTML = weatherData;
        })
        .catch(error => {
          console.error("Weather error:", error);
          document.getElementById("weatherResult").innerHTML = `<p>Error fetching weather data.</p>`;
        });
    })
    .catch(error => {
      console.error("Geolocation error:", error);
      document.getElementById("weatherResult").innerHTML = `<p>Error fetching location.</p>`;
    });
}

function updateBackground(condition) {
  let imageUrl = "";

  if (condition.includes("clear")) {
    imageUrl = "https://images.unsplash.com/photo-1502082553048-f009c37129b9";
  } else if (condition.includes("cloud")) {
    imageUrl = "https://images.unsplash.com/photo-1499346030926-9a72daac6c63";
  } else if (condition.includes("rain")) {
    imageUrl = "https://images.unsplash.com/photo-1504384308090-c894fdcc538d";
  } else if (condition.includes("snow")) {
    imageUrl = "https://images.unsplash.com/photo-1608889175119-e13f43c176d1";
  } else if (condition.includes("mist") || condition.includes("fog")) {
    imageUrl = "https://images.unsplash.com/photo-1502209524162-68b5d5647583";
  } else {
    imageUrl = "https://images.unsplash.com/photo-1501594907352-04cda38ebc29";
  }

  document.body.style.backgroundImage = `url('${imageUrl}?auto=format&fit=crop&w=1600&q=80')`;
  document.body.style.backgroundSize = "cover";
  document.body.style.backgroundRepeat = "no-repeat";
  document.body.style.backgroundPosition = "center";
  document.body.style.transition = "background-image 0.5s ease-in-out"; // Optional: smooth transition
}