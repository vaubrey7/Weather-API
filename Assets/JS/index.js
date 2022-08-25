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
  },
  displayFiveDay: function (data, city) {
    const fiveDayForecast = documnet.querySelector("#fiveDayForecast")
    for (var i = 0; i < data.length; i += 8) {
      const h1El = document.createElement("h1")
       h1El.classList.add("weather-cityboy")
        h1El.textContent = city
      const h2El = document.createElement("h2")
       h2El.classList.add("weather-temp")
        h2El.document.querySelector(".weather-temp").innerText = Math.floor(temp) + "°F";
         document.querySelector(".weather-humidity").innerText =
           "Humidity: " + humidity + "%";
      const divEl = document.createElement("div")
       divEl.classList.add("flex")
      const imgEl = document.createElement(`img src="https://openweathermap.org/img/wn/04n.png" alt=""`)
        imgEl.classList.add("westher-icon")
         imgEl.append("appending to divEl")
          divEl.append(imgEl)
      const weatherDescEL = document.createElement("div")
       weatherDescEL.classList.add("weather-description")
         weatherDescEL.append("appending to the div")
          divEl.append(weatherDescEL)
      const weatherHumidEl = document.createElement("div")
       weatherHumidEl.classList.add("weather-humidity")
      const weatherWind = document.createElement("div")
       weatherWind.classList.add("weather-wind")
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
displayFiveDay.fiveDayForecast()
//=============================================================================================================     

//INTERATION 2 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++=
//weather.fetchWeather("").city.name
// if (filteredArray.length > 0) {
//   msg.textContent = `You already know the weather for ${
//     filteredArray[0].querySelector(".city-name span").textContent
//   }`
//   form.reset();
//   input.focus();
//   return;
// }
// }

// let weather = {
//   apiKey: "2e8b44f9196feb70c52b445f0e1cca3a",
//   fetchWeather: function (city) {
//     fetch(
//       "https://api.openweathermap.org/data/2.5/weather?q=" +
//         city +
//         "&units=imperial&appid=" +
//         this.apiKey
//     )
//       .then((response) => {
//         if (!response.ok) {
//           alert("No weather found.");
//           throw new Error("No weather found.");
//         }
//         return response.json();
//       })
//       .then((data) => this.displayWeather(data));

//       for (var i = 0; i < list.length; i + 8) {
//         console.log(i)
//       }

//   },
//   displayWeather: function (data) {
//     const { name } = data;
//     const { icon, description } = data.weather[0];
//     const { temp, humidity } = data.main;
//     const { speed } = data.wind;
//     document.querySelector(".city").innerText = "Weather in " + name;
//     document.querySelector(".icon").src =
//       "https://openweathermap.org/img/wn/" + icon + ".png";
//     document.querySelector(".description").innerText = description;
//     document.querySelector(".temp").innerText = temp + "°F";
//     document.querySelector(".humidity").innerText =
//       "Humidity: " + humidity + "%";
//     document.querySelector(".wind").innerText =
//       "Wind speed: " + speed + " mp/h";
//     document.querySelector(".weather").classList.remove("loading");
//     document.body.style.backgroundImage =
//       "url('https://source.unsplash.com/1600x900/?" + name + "')";
//   },
//   }; 
//   document.querySelector("search-by-city")
//   .addEventListener("keyup", function (event) {
//     if (event.key == "Enter") {
//       weather.search();
// }})
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


//INTERATION 1 ---------------------------------------------------------------------------------------------------------------------------------
// const url = `https://api.openweathermap.org/data/2.5/forecast?q=${inputVal}&appid=${apiKey}&units=imperial`;
// fetch(url.data.list.weather).then(response => response.JSON())
// .then(data => {
//   const {
//     main,
//     name,
//     sys,
//     list,
//     weather,
//   } = data;
// for (var i = 0; i < list.length; i + 8) {
//   console.log(i)
// }
//     document.querySelector("search-by-city")
// .addEventListener("keyup", function (event) {
//   if (event.key == "Enter") {
//     weather.search();
//   }
// });

//   const li = document.createElement("li");
//   li.classList.add("city");
//   const markup = `
//     <h2 class="city-name" data-name="${name},${sys.country}">
//       <span>${name}</span>
//       <sup>${sys.country}</sup>
//     </h2>S
//     <div class="city-temp">${Math.round(main.temp)}<sup>°F</sup></div>`

// })

// .catch(() => {
//   msg.textContent = "Please search for a valid city";
// });

// msg.textContent = "";
// form.reset();
// input.focus();
//----------------------------------------------------------------------------------------------------------------------------------