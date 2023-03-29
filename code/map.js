document.addEventListener("touchmove",(e) => {},{ passive: true });
navigator.geolocation.watchPosition(position => {
  localStorage.setItem('latitude', position.coords.latitude);
  localStorage.setItem('longitude', position.coords.longitude);
});

let userLatitude = Number(localStorage.getItem('latitude'));
let userLongitude = Number(localStorage.getItem('longitude'));
let userClickedLatitude, userClickedLongitude;

function initMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 15,
    center: { lat: userLatitude, lng: userLongitude },
  });

  const marker = new google.maps.Marker({
    position: { lat: userLatitude, lng: userLongitude },
    map: map,
  })

  const circle = new google.maps.Marker({
    position: { lat: userLatitude, lng: userLongitude },
    map: map,
    icon: {
      path: google.maps.SymbolPath.CIRCLE,
      fillColor: 'blue',
      fillOpacity: 0.7,
      strokeColor: 'white',
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
  })

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
  const url = `https://api.weatherapi.com/v1/current.json?q=${userLatitude},${userLongitude}&key=245c1273ceb84fa58ad05454232203`;
  const response = await fetch(url);
  const data = response.json();
  console.log(data);
}

function createCircle (map, lat, lng, radius, color) {
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
      console.log(data)
    } catch (error) {
      console.error(`Error fetching weather data for ${eachCity}: ${error.message}`);
    }
  }
}
// console.time("fetchWeather");
// fetchWeather();
// console.timeEnd("fetchWeather");

async function fetchWorldCapitals() {
  for (let i = 0; i < countriesCapitals.length; i++) {
    const capital = countriesCapitals[i];
    const url = `https://api.weatherapi.com/v1/current.json?q=${capital}&key=245c1273ceb84fa58ad05454232203`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        continue;
      }
      const data = await response.json();
      console.log(data)
    } catch (error) {
      console.error(`Error fetching weather data for ${eachCity}: ${error.message}`);
    }
  }
}

// fetchWorldCapitals();
function makeCircle() {
  const divEl = document.createElement('div');
  divEl.classList.add("circle")
  divEl.style.backgroundColor = "pink"
  return divEl;
}

console.log(makeCircle());