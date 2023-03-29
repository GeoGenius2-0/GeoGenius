document.addEventListener("touchmove", (e) => {}, { passive: true });

navigator.geolocation.watchPosition((position) => {
  localStorage.setItem("latitude", position.coords.latitude);
  localStorage.setItem("longitude", position.coords.longitude);
});

const weather_KEY = config.Weather_API_KEY;
const airQuality_KEY = config.Air_Quality_API_KEY;

let userLatitude = Number(localStorage.getItem("latitude"));
let userLongitude = Number(localStorage.getItem("longitude"));
let userClickedLatitude, userClickedLongitude;

function initMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 15,
    center: { lat: userLatitude, lng: userLongitude },
  });

  const marker = new google.maps.Marker({
    position: { lat: userLatitude, lng: userLongitude },
    map: map,
  });

  const circle = new google.maps.Marker({
    position: { lat: userLatitude, lng: userLongitude },
    map: map,
    icon: {
      path: google.maps.SymbolPath.CIRCLE,
      fillColor: "blue",
      fillOpacity: 0.7,
      strokeColor: "white",
      strokeWeight: 2,
      scale: 10,
    },
  });

  const weatherInfo = new google.maps.InfoWindow({
    content: "<div>Temperature: 50C<br>Air Quality: 4</div>",
  });

  circle.addListener("click", () => {
    weatherInfo.open(map, circle);
  });

  const infoWindow = new google.maps.InfoWindow({
    content: "<div>You're here!</div>",
  });

  marker.addListener("click", () => {
    infoWindow.open(map, marker);
  });

  map.addListener("click", (e) => {
    userClickedLatitude = e.latLng.lat();
    userClickedLongitude = e.latLng.lng();
    console.log(userClickedLatitude, userClickedLongitude);
  });


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

async function userCurrLocWeather() {
  const url = `https://api.weatherapi.com/v1/current.json?q=${userLatitude},${userLongitude}&key=${weather_KEY}`;
  const response = await fetch(url);
  const data = response.json();
  console.log(data);
}

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

async function fetchUsCapitals() {
  for (let i = 0; i < usCapitals.length; i++) {
    const capital = usCapitals[i];
    const url = `https://api.weatherapi.com/v1/current.json?q=${capital}&key=245c1273ceb84fa58ad05454232203`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        continue;
      }
      const data = await response.json();
    } catch (error) {
      console.error(
        `Error fetching weather data for ${eachCity}: ${error.message}`
      );
    }
  }
}
// fetchWeather();
// async function fetchWorldCapitals() {
//   for (let i = 0; i < usCapitals.length; i++) {
//     const capital = usCapitals[i];
//     const url = `https://api.weatherapi.com/v1/current.json?q=${capital}&key=245c1273ceb84fa58ad05454232203`;
//     try {
//       const response = await fetch(url);
//       if (!response.ok) {
//         continue;
//       }
//       const data = await response.json();
//       const lat = data.location.lat;
//       const lng = data.location.lon;
//       const airQuality = await fetchAirQuality(lat, lng);
//       arr.push(airQuality);
//     } catch (error) {
//       console.error(`${error.message}`);
//     }
//   }
// }


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
  const airQuality = await fetchAirQuality(capital.location.lat, capital.location.lon);
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
      console.error(`${error.message}`);
    }
}

async function determineAQIColor(city) {
  if (await getCapitalAirQuality(city) === 1) {
    return "green";
  } else if (await getCapitalAirQuality(city) === 2) {
    return "yellow";
  } else if (await getCapitalAirQuality(city) === 3) {
    return "orange";
  } else if (await getCapitalAirQuality(city) === 4) {
    return "burgundy";
  } else if (await getCapitalAirQuality(city) === 5) {
    return "red";
  }
}







