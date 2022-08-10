const form = document.querySelector(".section form");
const input = document.querySelector(".section input");
const msg = document.querySelector(".section .msg");
const list = document.querySelector(".section2 .cities");

const apiKey = "2e8b44f9196feb70c52b445f0e1cca3a";

form.addEventListener("submit", e => {
  e.preventDefault();
  let inputVal = input.value;


  const listItems = list.querySelectorAll(".section2 .city");
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

    if (filteredArray.length > 0) {
      msg.textContent = `You already know the weather for ${
        filteredArray[0].querySelector(".city-name span").textContent
      }`
      form.reset();
      input.focus();
      return;
    }
  }
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${inputVal}&appid=${apiKey}&units=imperial`;
  fetch(url.data.list.weather).then(response => response.json())
  //console.log("fetch")
    .then(data => {
      //console.log("api")
      const {
        main,
        name,
        sys,
        list,
        weather,
      } = data;
      console.log[fetch]
      console.log(response)
      for (var i = 0; i < list.length; i + 8) {
        console.log(i)
      }

      const li = document.createElement("li");
      li.classList.add("city");
      const markup = `
        <h2 class="city-name" data-name="${name},${sys.country}">
          <span>${name}</span>
          <sup>${sys.country}</sup>
        </h2>S
        <div class="city-temp">${Math.round(main.temp)}<sup>°F</sup></div>`

    })

    .catch(() => {
      msg.textContent = "Please search for a valid city";
    });

  msg.textContent = "";
  form.reset();
  input.focus();
});