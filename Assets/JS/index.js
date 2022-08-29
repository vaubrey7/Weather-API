//INTERATION 3 FINAL PRODUCT ===================================================================================================
//setting my weather and API function and fetch. I concatinate the API using deconstruction to make it easier to read and manage. 
let weathersharknado = {
  apiKey: "2e8b44f9196feb70c52b445f0e1cca3a",
  fetchWeather: function (city) {
    fetch("https://api.openweathermap.org/data/2.5/forecast?q=" +
        city +
        "&units=imperial&appid=" +
        this.apiKey)
      .then((response) => {
        if (!response.ok) {
          alert("No weather found.");
          throw new Error("No weather found.");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data)
        this.displayFiveDay(data, city)
        
      });
    fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=imperial&appid=" +
        this.apiKey
      ) //if it cant find the weather sets alert/throw err 
      .then((response) => {
        if (!response.ok) {
          alert("No weather found.");
          throw new Error("No weather found.");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data)
        this.displayWeather(data)

      });
  }, // adding elements and appending directly to the HTML for rest of the forecast. 
  displayFiveDay: function (data, city) {
    console.log(city,data )
    const fiveDayForecast = document.querySelector("#fiveDayForecast")
    for (var i = 0; i < data.list.length; i += 8) {
      const h1El = document.createElement("h1")
       h1El.classList.add("weather-cityboy")
        h1El.textContent = city
      const h2El = document.createElement("h2")
       h2El.classList.add("weather-temp")
       h2El.textContent = Math.floor(data.list[i].main.temp) + "°F";
       fiveDayForecast.append(h1El, h2El)
        const divEl = document.createElement("div")
       divEl.classList.add("flex")
      const imgEl = document.createElement(`img`)
      imgEl.src = "https://openweathermap.org/img/wn/04n.png" 
        imgEl.classList.add("weather-icon")
          divEl.append(imgEl)
      const weatherDescEL = document.createElement("div")
       weatherDescEL.classList.add("weather-description")
       weatherDescEL.textContent = (data.list[i].weather[i].description) 
          divEl.append(weatherDescEL)
      const weatherWind = document.createElement("div")
       weatherWind.classList.add("weather-wind")
       weatherWind.textContent = (data.list[i].wind.speed) + " mp/h";
       divEl.append(weatherWind)
       fiveDayForecast.append(divEl);
    }
  },

  //Function to set name of city, icon, weather description, temp and wind and append innertext of html elements
  displayWeather: function (data) {
    console.log(data)
    const {
      name
    } = data;
    const {
      icon,
      description
    } = data.weather[0];
    const {
      temp,
      humidity
    } = data.main;
    const {
      speed
    } = data.wind;

    document.querySelector(".weather-cityboy").innerText = "Weather in " + name;
    document.querySelector(".weather-icon").src =
      "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".weather-description").innerText = description;
    document.querySelector(".weather-temp").innerText = Math.floor(temp) + "°F";
    document.querySelector(".weather-humidity").innerText =
      "Humidity: " + humidity + "%";
    document.querySelector(".weather-wind").innerText =
      "Wind speed: " + speed + " mp/h";
    document.querySelector(".weather").classList.remove("loading");
    document.body.style.backgroundImage =
      "url('https://source.unsplash.com/1600x900/?" + name + "')";
  },
  search: function () {
    this.fetchWeather(document.querySelector(".weather-search__bar").value);
  },
};

//Event listener for when search button is clicked
document.querySelector(".weather-search button").addEventListener("click", function () {
  weathersharknado.search();
});

// If enter key is used to search for contents of search bar - it executes the search
document
  .querySelector(".weather-search__bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weathersharknado.search();
    }
  });


//Sets default weather location
weathersharknado.fetchWeather("Salt Lake City");

