document.addEventListener("touchmove", (e) => {}, { passive: true });

// const weather_KEY = config.Weather_API_KEY;
// const airQuality_KEY = config.Air_Quality_API_KEY;

const weather_KEY = "f072ddef24d047afaae202017232803";
const airQuality_KEY = "f42bda7ce438693d1b9966abceb83f10";


const userLatitude = Number(localStorage.getItem("latitude")) || 40.6578084;
const userLongitude = Number(localStorage.getItem("longitude")) || -74.0070693;

async function initMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 12,
    center: { lat: userLatitude, lng: userLongitude },
    styles: [
      {
        featureType: 'poi.business',
        stylers: [{ visibility: 'off' }]
      },
      {
        featureType: 'transit',
        elementType: 'labels.icon',
        stylers: [{ visibility: 'off' }]
      }
    ]
  });

  map.addListener("click", async (event) => {
    const userClickedLat = event.latLng.lat();
    const userClickedLng = event.latLng.lng();
    const clickedCity = await userCurrCity(userClickedLat, userClickedLng);
    const createCircle = new google.maps.Marker({
      position: { lat: userClickedLat, lng: userClickedLng },
      map: map,
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        fillColor: await determineAQIColor(clickedCity),
        fillOpacity: 1,
        strokeColor: "white",
        strokeWeight: 2,
        scale: 10,
      }
    })
    const clickedTemp = await userCurrTemperature(userClickedLat, userClickedLng);
    const clickedAQI = await fetchAirQuality(userClickedLat, userClickedLng);
    const clickedInfoWindow = new google.maps.InfoWindow({
      content: `<div id="map-text">City: ${clickedCity}<br>Temperature: ${clickedTemp}˚C <br>Air Quality Index: ${clickedAQI}</div>`,
    });

    
    createCircle.addListener("mouseover", () => {
      clickedInfoWindow.open(map, createCircle);
    });

    createCircle.addListener("mouseout", () => {
      clickedInfoWindow.close();
    })

  })

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
    content: `<div id="map-text">You are here!</div>`,
  });

  const infoWindow = new google.maps.InfoWindow({
    content: `<div id="map-text">You're here!</div>`,
  });

  userMarker.addListener("mouseover", () => {
    infoWindow.open(map, userMarker);
  });

  userMarker.addListener("mouseout", () => {
    infoWindow.close();
  })

  const data = new google.maps.InfoWindow({
    content: `<div id="map-text">City: ${userCity}<br>Temperature: ${userTemp}˚C <br>Air Quality Index: ${userAQI}</div>`,
  });
  userCircle.addListener("mouseover", () => {
    data.open(map, userCircle);
  });

  userCircle.addListener("mouseout", () => {
    data.close();
  })

  capitals.forEach(async (capital) => {
    try {
      const usCapital = await getCapitalCoordinates(capital);
      const circle = new google.maps.Marker({
        position: { lat: usCapital.location.lat, lng: usCapital.location.lon },
        map: map,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          fillColor: await determineAQIColor(capital),
          fillOpacity: 1,
          strokeColor: "white",
          strokeWeight: 2,
          scale: 10,
        },
      });
      const capitalTemperature = await getCapitalWeather(capital);
      const capitalAQI = await getCapitalAirQuality(capital);
      const capitalName = await getCapitalCoordinates(capital);
      const infoWindow = new google.maps.InfoWindow({
        content: `<div id="map-text">Capital: ${capitalName.location.name}<br>Temperature: ${capitalTemperature}˚C <br>Air Quality Index: ${capitalAQI}</div>`,
      });

      // Listen for click events on the marker instance
      circle.addListener("mouseover", () => {
        infoWindow.open(map, circle);
      });

      circle.addListener("mouseout", () => {
        infoWindow.close();
      })
    } catch (error) {
      console.error(
        `Error fetching weather data for ${capital}: ${error.message}`
      );
    }
  });
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

// This function takes the AQI and determines the color based on the number.
async function determineAQIColor(city) {
  const AQI = await getCapitalAirQuality(city);
  if (AQI === 1) {
    return "green";
  } else if (AQI === 2) {
    return "yellow";
  } else if (AQI === 3) {
    return "orange";
  } else if (AQI === 4) {
    return "pink";
  } else if (AQI === 5) {
    return "red";
  }
}

async function userCurrTemperature(lat, lng) {
  const url = `https://api.weatherapi.com/v1/current.json?q=${lat},${lng}&key=${weather_KEY}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return Math.round(data.current.temp_c);
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

