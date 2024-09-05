// variables that will point to the div classes in the html file
const container = document.querySelector(".container");
const search = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const error404 = document.querySelector(".not-found");

search.addEventListener("click", () => {
  const APIKey = "77607aefffa481efe0a389f5d81287e5";
  const city = document.querySelector(".search-box input").value; // variable that points to search box input value

  if (city === "") {
    return;
  }
  // makes a request to the OpenWeatherMap API to get weather data for the entered city
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`
  )
    // converts the API response into JSON format
    .then((response) => response.json())
    .then((json) => {
      // checking if the city string is not found on OpenWeatherMap
      if (json.cod === "404") {
        container.style.height = "400px";
        weatherBox.style.display = "none";
        weatherDetails.style.display = "none";
        error404.style.display = "block";
        error404.classList.add("fadeIn");
        return;
      }
      // if the city is found on OpenWeatherMap
      error404.style.display = "none";
      error404.classList.remove("fadeIn");

      const image = document.querySelector(".weather-box img"); // variable that points to the specified div in the html file
      const temperature = document.querySelector(".weather-box .temperature"); // variable that points to the specified div in the html file
      const description = document.querySelector(".weather-box .description"); // variable that points to the specified div in the html file
      const humidity = document.querySelector(
        ".weather-details .humidity span"
      ); // variable that points to the specified div in the html file
      const wind = document.querySelector(".weather-details .wind span"); // variable that points to the specified div in the html file

      // this updates the image based on the weather condition
      switch (json.weather[0].main) {
        case "Clear":
          image.src = "images/clear.png";
          break;

        case "Rain":
          image.src = "images/rain.png";
          break;

        case "Snow":
          image.src = "images/snow.png";
          break;

        case "Clouds":
          image.src = "images/cloud.png";
          break;

        case "Haze":
          image.src = "images/mist.png";
          break;

        default:
          image.src = "";
      }

      //concatenate the string data to the html document
      temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span`;
      description.innerHTML = `${json.weather[0].description}`;
      humidity.innerHTML = `${json.main.humidity}%`;
      wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

      // showing weather information and manipulating the css to accommodate the displayed weather data
      weatherBox.style.display = "";
      weatherDetails.style.display = "";
      weatherBox.classList.add("fadeIn");
      weatherDetails.classList.add("fadeIn");
      container.style.height = "590px";
    });
});
