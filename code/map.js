document.addEventListener("touchmove", (e) => {}, { passive: true });

const weather_KEY = config.Weather_API_KEY;
const airQuality_KEY = config.Air_Quality_API_KEY;

let userLatitude = Number(localStorage.getItem("latitude")) || 40.6578084;
let userLongitude = Number(localStorage.getItem("longitude")) || -74.0070693;
let userClickedLatitude, userClickedLongitude;

async function initMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 12,
    center: { lat: userLatitude, lng: userLongitude },
  });

  const userCity = await userCurrCity(userLatitude, userLongitude);
  const userTemp = await userCurrTemperature(userLatitude, userLongitude);
  const userAQI = await fetchAirQuality(userLatitude, userLongitude);
  const userColor = await determineAQIColor(userCity);
  const userCircle = new google.maps.Marker({
    position: { lat: userLatitude, lng: userLongitude },
    map: map,
    icon: {
      path: google.maps.SymbolPath.CIRCLE,
      fillColor: userColor,
      fillOpacity: 1,
      strokeColor: "white",
      strokeWeight: 2,
      scale: 10,
    },
  });

  const userMarker = new google.maps.Marker({
    position: { lat: userLatitude, lng: userLongitude },
    map: map,
  });


  // capitals.forEach(async (capital) => {
  //   try {
  //     const usCapital = await getCapitalCoordinates(capital);
  //     const circle = new google.maps.Marker({
  //       position: { lat: usCapital.location.lat, lng: usCapital.location.lon },
  //       map: map,
  //       icon: {
  //         path: google.maps.SymbolPath.CIRCLE,
  //         fillColor: await determineAQIColor(capital),
  //         fillOpacity: 1,
  //         strokeColor: "white",
  //         strokeWeight: 2,
  //         scale: 10,
  //       },
  //     });
  //     const capitalTemperature = await getCapitalWeather(capital);
  //     const capitalAQI = await getCapitalAirQuality(capital);
  //     const capitalName = await getCapitalCoordinates(capital);
  //     const infoWindow = new google.maps.InfoWindow({
  //       content: `<div id="map-text">Capital: ${capitalName.location.name}<br>Temperature: ${capitalTemperature}˚C <br>Air Quality Index: ${capitalAQI}</div>`,
  //     });

  //     // Listen for click events on the marker instance
  //     circle.addListener("click", () => {
  //       infoWindow.open(map, circle);
  //     });
  //   } catch (error) {
  //     console.error(
  //       `Error fetching weather data for ${capital}: ${error.message}`
  //     );
  //   }
  // });
}

// function addMarker(map, coords) {
//   const marker = new google.maps.Marker({
//     position: coords,
//     map: map,
//   });

//   if (coords.iconImage) {
//     marker.setIcon(coords.iconImage);
//   }
// }

function createCircle(map, lat, lng, radius, color) {
  const circle = new google.maps.Circle({
    strokeColor: color,
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: color,
    fillOpacity: 0.35,
    map: map,
    center: { lat: lat, lng: lng },
    radius: radius,
  });
  return circle;
}

// This function returns and object of the city coordinates including the weather data
async function getCapitalCoordinates(city) {
  try {
    const url = `https://api.weatherapi.com/v1/current.json?q=${city}&key=${weather_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

// This function takes getCapitalCoordinates and returns the temperature of the city
async function getCapitalWeather(city) {
  const capital = await getCapitalCoordinates(city);
  return capital.current.temp_c;
}

//This function takes getCapitalCoordinates and returns the air quality of the city
async function getCapitalAirQuality(city) {
  const capital = await getCapitalCoordinates(city);
  const airQuality = await fetchAirQuality(
    capital.location.lat,
    capital.location.lon
  );
  return airQuality;
}

// This function takes the latitude and longitude and returns the air quality of the city
async function fetchAirQuality(lat, lng) {
  const url = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lng}&appid=${airQuality_KEY}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.list[0].main.aqi;
  } catch (error) {
    console.error(error);
  }
}

async function determineAQIColor(city) {
  if ((await getCapitalAirQuality(city)) === 1) {
    return "green";
  } else if ((await getCapitalAirQuality(city)) === 2) {
    return "yellow";
  } else if ((await getCapitalAirQuality(city)) === 3) {
    return "orange";
  } else if ((await getCapitalAirQuality(city)) === 4) {
    return "pink";
  } else if ((await getCapitalAirQuality(city)) === 5) {
    return "red";
  }
}

async function userCurrTemperature(lat, lng) {
  const url = `https://api.weatherapi.com/v1/current.json?q=${lat},${lng}&key=${weather_KEY}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.current.temp_c;
  } catch (error) {
    console.error(error);
  }
}

async function userCurrCity(lat, lng) {
  const url = `https://api.weatherapi.com/v1/current.json?q=${lat},${lng}&key=${weather_KEY}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.location.name;
  } catch (error) {
    console.error(error);
  }
}
