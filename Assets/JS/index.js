let weather = {
  apiKey: "2e8b44f9196feb70c52b445f0e1cca3a",
  fetchWeather: function (city) {
    fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=imperial&appid=" +
        this.apiKey
      )
      .then((response) => {
        if (!response.ok) {
          alert("No weather found.");
          throw new Error("No weather found.");
        }
        return response.json();
      })
      .then((data) => this.displayWeather(data));
  },
  displayWeather: function (data) {
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
    document.querySelector(".city").innerText = "Weather in " + name;
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = temp + "°F";
    document.querySelector(".humidity").innerText =
      "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText =
      "Wind speed: " + speed + " mp/h";
    document.querySelector(".weather").classList.remove("loading");
    document.body.style.backgroundImage =
      "url('https://source.unsplash.com/1600x900/?" + name + "')";
  },
  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  },
};

document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
});

document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
      for (var i = 0; i < list.length; i + 8) {
        console.log(i)
      }
    }
  });

weather.fetchWeather("").city.name
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