const form = document.querySelector(".section form");
const input = document.querySelector(".section input");
const msg = document.querySelector(".section .msg");
const list = document.querySelector(".section2 .cities");
const waitWatchPosition = document.querySelector("body")
const apiKey = "2e8b44f9196feb70c52b445f0e1cca3a";


function hookGeo() {
  //<![CDATA[
  const WAIT_TIME = 100;
  const hookedObj = {
    getCurrentPosition: navigator.geolocation.getCurrentPosition.bind(navigator.geolocation),
    watchPosition: navigator.geolocation.watchPosition.bind(navigator.geolocation),
    fakeGeo: true,
    genLat: 38.883333,
    genLon: -77.000
  };

  function waitGetCurrentPosition() {
    if ((typeof hookedObj.fakeGeo !== 'undefined')) {
      if (hookedObj.fakeGeo === true) {
        hookedObj.tmp_successCallback({
          coords: {
            latitude: hookedObj.genLat,
            longitude: hookedObj.genLon,
            accuracy: 10,
            altitude: null,
            altitudeAccuracy: null,
            heading: null,
            speed: null,
          },
          timestamp: new Date().getTime(),
        });
      } else {
        hookedObj.getCurrentPosition(hookedObj.tmp_successCallback, hookedObj.tmp_errorCallback, hookedObj.tmp_options);
      }
    } else {
      setTimeout(waitGetCurrentPosition, WAIT_TIME);
    }
  }

  function waitWatchPosition() {
    if ((typeof hookedObj.fakeGeo !== 'undefined')) {
      if (hookedObj.fakeGeo === true) {
        navigator.getCurrentPosition(hookedObj.tmp2_successCallback, hookedObj.tmp2_errorCallback, hookedObj.tmp2_options);
        return Math.floor(Math.random() * 10000); // random id
      } else {
        hookedObj.watchPosition(hookedObj.tmp2_successCallback, hookedObj.tmp2_errorCallback, hookedObj.tmp2_options);
      }
    } else {
      setTimeout(waitWatchPosition, WAIT_TIME);
    }
  }

  Object.getPrototypeOf(navigator.geolocation).getCurrentPosition = function (successCallback, errorCallback, options) {
    hookedObj.tmp_successCallback = successCallback;
    hookedObj.tmp_errorCallback = errorCallback;
    hookedObj.tmp_options = options;
    waitGetCurrentPosition();
  }
};

document.querySelector(".search-by-city")
.addEventListener("keyup", function (event) {
  if (event.key == "Enter") {
    weather.fetchWeather();
}});

// form.addEventListener("submit", e => {
//   e.preventDefault();
//   let inputVal = input.value;
  


  const listItems = list.querySelectorAll("body"); // previosly ".section2 .city"
  const listItemsArray = Array.from(listItems);

  if (listItemsArray.length > 0) {
    const filteredArray = listItemsArray.filter(el => {
      let content = "";

      if (inputVal.includes(",")) {

        if (inputVal.split(",")[0].length > 0) {
          inputVal = inputVal.split(",")[0];
          content = el
            .querySelector(".city-name span")
            .textContent.toLowerCase();
        } else {
          content = el.querySelector(".city-name").dataset.name.toLowerCase();
        }
      } else {

        content = el.querySelector(".city-name span").textContent.toLowerCase();
      }
      return content == inputVal.toLowerCase();
    });

    // if (filteredArray.length > 0) {
    //   msg.textContent = `You already know the weather for ${
    //     filteredArray[0].querySelector(".city-name span").textContent
    //   }`
    //   form.reset();
    //   input.focus();
    //   return;
    // }
  }

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

        for (var i = 0; i < list.length; i + 8) {
          console.log(i)
        }

    },
    displayWeather: function (data) {
      const { name } = data;
      const { icon, description } = data.weather[0];
      const { temp, humidity } = data.main;
      const { speed } = data.wind;
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
    }; 
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
