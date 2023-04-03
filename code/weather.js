const lat = localStorage.getItem("latitude");
const lon = localStorage.getItem("longitude");
// const weatherKEY = config.Weather_API_KEY;
const weatherKEY = "f072ddef24d047afaae202017232803";
const weatherApp = document.querySelector(".weather-app");
const temperature = document.querySelector(".temp");
const dateShown = document.querySelector(".date");
const timeShown = document.querySelector(".time");
const condition = document.querySelector(".condition");
const nameShown = document.querySelector(".name");
const cloudShown = document.querySelector(".cloud");
const humidityShown = document.querySelector(".humidity");
const iconShown = document.querySelector("#icon");
const form = document.querySelector("#locationInput");
const searchInput = document.querySelector(".search");
const submitButton = document.querySelector(".submit");
const windShown = document.querySelector(".wind");
const citiesAsShown = document.querySelectorAll(".city");



temperature.addEventListener('click', () => {
  const tempValue = parseInt(temperature.innerText);
  const isCelsius = temperature.innerText.includes('˚C');
  const newTempValue = isCelsius ? Math.round(tempValue * 1.8 + 32) : Math.round((tempValue - 32) / 1.8);
  const newTempUnit = isCelsius ? '˚F' : '˚C';
  temperature.innerText = `${newTempValue}${newTempUnit}`;
});

let cityInput = "NYC";

window.addEventListener("load", async () => {
  try {
    await userCity(lat, lon);
  } catch (error) {
    console.error(error);
    cityInput = "London";
    await fetchWeatherData();
  }
});



citiesAsShown.forEach((el) => {
  el.addEventListener("click", (el) => {
    cityInput = el.target.innerHTML;
    fetchWeatherData();
    weatherApp.style.opacity = 0;
  });
});


form.addEventListener("submit", (el) => {
  if (searchInput.value.length === 0) {
    alert("ADD A CITY MY GUY");
  } else {
    cityInput = searchInput.value;
    fetchWeatherData(); //
    searchInput.value = "";
    weatherApp.style.opacity = 0;
  }
  el.preventDefault();
});

function getMonth(month) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return months[month - 1];
}

function dayOfWeek(day, month, year) {
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return weekday[new Date(`${year}-${month - 1}-${day}`).getDay()];
}



async function fetchWeatherData() {
  const url = `https://api.weatherapi.com/v1/current.json?key=${weatherKEY}&q=${cityInput}&aqi=no`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    displayWeatherData(data);
    setWeatherBackground(data);
    weatherApp.style.opacity = "1";
  } catch (error) {
    console.log(error);
    //alert('city cannot be found my boy')
    weatherApp.style.opacity = "1";
  }
}

async function userCity(lat, lng) {
  const url = `https://api.weatherapi.com/v1/current.json?q=${lat},${lng}&key=${weatherKEY}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    displayWeatherData(data);
    setWeatherBackground(data);
    console.log(data.location);
    weatherApp.style.opacity = "1";
  } catch (error) {
    console.error(error);
  }
}

function displayWeatherData(data) {
  temperature.innerHTML = Math.round(data.current.temp_c) + "&#176C";
  condition.innerHTML = data.current.condition.text;
  const date = data.location.localtime;
  const y = Number(date.substring(0, 4));
  const m = Number(date.substring(5, 7));
  const d = Number(date.substring(8, 10));
  const time = date.substring(11);
  const imgSrc = "https://" + data.current.condition.icon;
  dateShown.innerHTML = `${dayOfWeek(d, m, y)}, ${getMonth(m)} ${d}`;
  timeShown.innerHTML = time;
  nameShown.innerHTML = data.location.name;
  iconShown.src = imgSrc;
  cloudShown.innerHTML = `${data.current.cloud}%`;
  humidityShown.innerHTML = data.current.humidity + "%";
  windShown.innerHTML = data.current.wind_kph + " km/h";
}

function setWeatherBackground(data) {
  let timeOfDay = "day";
  const code = data.current.condition.code;
  const cloudy = [
    1003, 1006, 1009, 1030, 1069, 1087, 1135, 1273, 1276, 1279, 1282,
  ];
  const rainy = [
    103, 1069, 1072, 1150, 1153, 1180, 1183, 1186, 1189, 1192, 1195, 1204,
    1207, 1240, 1243, 1246, 1249, 1252,
  ];
  if (!data.current.is_day) {
    timeOfDay = "night";
  }
  if (code == 1000) {
    weatherApp.style.backgroundImage = `url('../images/day/sunny1.gif')`; //sunny
    submitButton.style.background = "#e5ba92";
    if (timeOfDay == "night") {
      submitButton.style.background = "#181e27";
    }
  } else if (cloudy.includes(code)) {
    weatherApp.style.backgroundImage = `url('../images/day/cloudy.gif')`; //cloudy
    submitButton.style.background = "#fa6d1b";
    if (timeOfDay == "night") {
      submitButton.style.background = "#181e27";
    }
  } else if (rainy.includes(code)) {
    weatherApp.style.backgroundImage = `url('../images/day/rain.gif')`; //rainy
    submitButton.style.background = "#647675";
    if (timeOfDay == "night") {
      submitButton.style.background = "#325c80";
    }
  } else {
    weatherApp.style.backgroundImage = `url('../images/day/snow.gif')`; //snow
    submitButton.style.background = "#4d72aa";
    if (timeOfDay == "night") {
      submitButton.style.background = "#1b1b1b";
    }
  }
}

weatherApp.style.opacity = "1";


// async function fetchWeatherData() {
//   const url = `https://api.weatherapi.com/v1/current.json?key=${weatherKEY}&q=${cityInput}&aqi=no`;
//   try {
//     const response = await fetch(url);
//     const data = await response.json();
//     console.log(data);
//     temperature.innerHTML = data.current.temp_c + "&#176C";
//     condition.innerHTML = data.current.condition.text;
//     const date = data.location.localtime;
//     const y = Number(date.substring(0, 4));
//     const m = Number(date.substring(5, 7));
//     const d = Number(date.substring(8, 10));
//     const time = date.substring(11);
//     const imgSrc = "https://" + data.current.condition.icon;
//     dateShown.innerHTML = `${dayOfWeek(d, m, y)}, ${getMonth(m)} ${d}`;
//     timeShown.innerHTML = time;
//     nameShown.innerHTML = data.location.name;
//     iconShown.src = imgSrc;
//     cloudShown.innerHTML = `${data.current.cloud}%`;
//     humidityShown.innerHTML = data.current.humidity + "%";
//     windShown.innerHTML = data.current.wind_kph + " km/h";

//     let timeOfDay = "day";

//     const code = data.current.condition.code;
//     const cloudy = [
//       1003, 1006, 1009, 1030, 1069, 1087, 1135, 1273, 1276, 1279, 1282,
//     ];

//     const rainy = [
//       103, 1069, 1072, 1150, 1153, 1180, 1183, 1186, 1189, 1192, 1195, 1204,
//       1207, 1240, 1243, 1246, 1249, 1252,
//     ];

//     if (!data.current.is_day) {
//       timeOfDay = "night";
//     }

//     if (code == 1000) {
//       weatherApp.style.backgroundImage = `url('../images/day/sunny1.gif')`; //sunny
//       submitButton.style.background = "#e5ba92";
//       if (timeOfDay == "night") {
//         submitButton.style.background = "#181e27";
//       }
//     } else if (cloudy.includes(code)) {
//       weatherApp.style.backgroundImage = `url('../images/day/cloudy.gif')`; //cloudy
//       submitButton.style.background = "#fa6d1b";
//       if (timeOfDay == "night") {
//         submitButton.style.background = "#181e27";
//       }
//     } else if (rainy.includes(code)) {
//       weatherApp.style.backgroundImage = `url('../images/day/rain.gif')`; //rainy
//       submitButton.style.background = "#647675";
//       if (timeOfDay == "night") {
//         submitButton.style.background = "#325c80";
//       }
//     } else {
//       weatherApp.style.backgroundImage = `url('../images/day/snow.gif')`; //snow

//       submitButton.style.background = "#4d72aa";
//       if (timeOfDay == "night") {
//         submitButton.style.background = "#1b1b1b";
//       }
//     }
//     weatherApp.style.opacity = "1";
//   } catch (error) {
//     console.log(error);
//     //alert('city cannot be found my boy')
//     weatherApp.style.opacity = "1";
//   }
// }