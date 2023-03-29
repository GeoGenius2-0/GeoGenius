const locationInp = document.querySelector("#location")
const latInp = document.querySelector("#latitude")
const longInp = document.querySelector("#longitude")
const airQuality = document.querySelector(".air-quality")
const airQualityStat = document.querySelector(".air-quality-status")
const srchBtn = document.querySelector(".search-btn")
// const componentsEle = document.querySelectorAll(".component-val")

const appId = "f42bda7ce438693d1b9966abceb83f10" 
const apiKey = '61380ea7a1e94e3a834965ee9dfac99f'

const getUserLocation = () => {
    const location = locationInp.value;

    if (location) {
      // Get coordinates from OpenCage Geocoding API using user input location
      getCoordinates(location);
    } else if (latInp.value && longInp.value) {
      // Get Air data from weather API using user input coordinates
      getAirQuality(latInp.value, longInp.value);
    } else if (navigator.geolocation) {
      // Get user Location using geolocation API
      navigator.geolocation.getCurrentPosition(onPositionGathered, onPositionGatherError);
    } else {
      onPositionGatherError({ message: "Can't Access your location. Please enter your location or co-ordinates" });
    }
};

const onPositionGathered = (pos) => {
  let lat = pos.coords.latitude, long = pos.coords.longitude

  // Set values of for user to know
  latInp.value = lat
  longInp.value = long

  // Get location from OpenCage Geocoding API
  getLocation(lat, long);

  // Get Air data from weather API
  getAirQuality(lat, long)
}

const getCoordinates = async (location) => {
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${location}&key=${apiKey}`;
  const rawData = await fetch(url).catch(err => {})
  const data = await rawData.json()
  console.log(data)
  const { lat, lng } = data.results[0].geometry;
  locationInp.innerText = data.results[0].formatted;
  latInp.value = lat;
  longInp.value = lng;
  getAirQuality(lat, lng);
  getLocation(lat, lng);
}

const getAirQuality = async (lat, long) => {
  // Get data from api
  const rawData = await fetch(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${long}&appid=${appId}`).catch(err => {})
  const airData = await rawData.json()
  setValuesOfAir(airData)
  setComponentsOfAir(airData)
}

const getLocation = async (lat, long) => {
  const apiKey = '61380ea7a1e94e3a834965ee9dfac99f';
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${long}&key=${apiKey}`;
  const rawData = await fetch(url).catch(err => {})
  const data = await rawData.json()
  const location = data.results[0].formatted;
  locationInp.value = location;
}

const setValuesOfAir = airData => {
  const aqi = airData.list[0].main.aqi
  let airStat = "", color = ""

  // Set Air Quality Index
  airQuality.innerText = aqi

  // Set status of air quality
  if (aqi === 1) {
    airStat = "Good"
    color = "rgb(19, 201, 28)"

	} else if (aqi === 2) {
		airStat = "Fair"
		color = "rgb(15, 134, 25)"
	} else if (aqi === 3) {
		airStat = "Moderate"
		color = "rgb(201, 204, 13)"
	} else if (aqi === 4) {
		airStat = "Poor"
		color = "rgb(204, 83, 13)"
	} else if (aqi === 5) {
		airStat = "Very Poor"
		color = "rgb(204, 13, 13)"
	} else {
		airStat = "Unknown"
	}

	airQualityStat.innerText = airStat
	airQualityStat.style.color = color
}

const setComponentsOfAir = airData => {
  const components = airData.list[0].components;
  const componentsEle = document.querySelectorAll('.component-val');
  
  componentsEle.forEach(ele => {
    const attr = ele.getAttribute('data-comp');
    const value = components[attr] + " μg/m³";
    ele.textContent = value;
  });
};


const onPositionGatherError = e => {
	errorLabel.innerText = e.message
}

srchBtn.addEventListener("click", () => {
    getUserLocation()
})

  