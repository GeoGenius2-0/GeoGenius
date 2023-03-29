const weatherApp = document.querySelector('.weather-app')
const temperature = document.querySelector('.temp')
const dateShown = document.querySelector('.date')
const timeShown = document.querySelector('.time');
const condition = document.querySelector('.condition');
const nameShown = document.querySelector('.name');
const cloudShown = document.querySelector('.cloud');
const humidityShown = document.querySelector('.humidity');
const iconShown = document.querySelector('#icon')
const form = document.querySelector('#locationInput')
const searchInput = document.querySelector('.search');
const submitButton = document.querySelector('.submit');
const windShown = document.querySelector('.wind')
const citiesAsShown = document.querySelectorAll('.city')


let cityInput = "KINGSTON"

citiesAsShown.forEach((el) => {
    el.addEventListener('click', (el) => {
        cityInput = el.target.innerHTML
        fetchWeatherData()
        weatherApp.style.opacity = 0
    })
})



form.addEventListener('submit', (el) => {
    if (searchInput.value.length === 0){
        alert('ADD A CITY MY GUY')
    } else {
        cityInput = searchInput.value
        fetchWeatherData()//fecth later
        searchInput.value = "";
        weatherApp.style.opacity = 0
    }

    el.preventDefault();
})


function dayOfWeek (day, month, year) {
    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
     return weekday[new Date(`${year}-${month-1}-${day}`).getDay()];

//      const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
// const date = new Date(`${year}-${month}-${day}`);
// const formattedDate = date.toLocaleString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
// return formattedDate;

    
// const date = new Date(`${year}-${month-1}-${day}`);

// const monthName = date.toLocaleString('default', { month: 'long' });
// const weekdayName = weekday[date.getDay()];
// const dayOfMonth = date.getDate();
// return `${weekdayName}, ${monthName} ${dayOfMonth}`;
}

async function fetchWeatherData() {
    const url = `https://api.weatherapi.com/v1/current.json?key=f072ddef24d047afaae202017232803&q=${cityInput}&aqi=no`;
    try {
        const response = await fetch(url);
		const data = await response.json();
		console.log(data)
        temperature.innerHTML = data.current.temp_c + '&#176C';
        condition.innerHTML = data.current.condition.text;
        const date = data.location.localtime;
        const y = Number(date.substring(0, 4));
        const m = Number(date.substring(5, 7));
        const d = Number(date.substring(8, 10));
        const time = date.substring(11);

        dateShown.innerHTML = `${dayOfWeek(d, m, y)}, ${m} ${d} ${y}`;
        timeShown.innerHTML = time;
        nameShown.innerHTML = data.location.name;
        iconShown.src = data.current.condition.icon;
        cloudShown.innerHTML = `${data.current.cloud}%`;
        humidityShown.innerHTML = data.current.humidity + '%';
        windShown.innerHTML = data.current.wind_kph + ' km/h';

        let timeOfDay = 'day';
        
        const code = data.current.condition.code;

        if(!data.current.is_day) {
            timeOfDay = 'night';
        }

        if(code == 1000) { 
            weatherApp.style.backgroundImage = `url('../images/day/sunny1.gif')`;//sunny
            submitButton.style.background = '#e5ba92';
            if (timeOfDay == 'night') {
                submitButton.style.background = '#181e27';
            }
        } else if (
            code == 1003 ||
            code == 1006 ||
            code == 1009 ||
            code == 1030 ||
            code == 1069 ||
            code == 1087 ||
            code == 1135 ||
            code == 1273 ||
            code == 1276 ||
            code == 1279 ||
            code == 1282
            
        ) {
            weatherApp.style.backgroundImage = `url('../images/day/cloudy.gif')`;//cloudy
            submitButton.style.background = '#fa6d1b';
            if (timeOfDay == 'night') {
                submitButton.style.background = '#181e27';
            }
        } else if (
            code == 103 || code == 1069 || code == 1072 || code == 1150 || code == 1153 || code == 1180 || code == 1183 | code == 1186 || code == 1189 || code == 1192 ||code == 1195 || code == 1204 || code == 1207 || code == 1240 || code == 1243 || code == 1246 || code == 1249 || code == 1252
        ) {
            weatherApp.style.backgroundImage = `url('../images/day/rain.gif')`;//rainy
            submitButton.style.background = '#647675';
            if (timeOfDay == 'night') {
                submitButton.style.background = '#325c80';
            } 
        } else {
            weatherApp.style.backgroundImage = `url('../images/day/snow.gif')`;//snow

                submitButton.style.background = '#4d72aa'
                if (timeOfDay == 'night') {
                    submitButton.style.background = '#1b1b1b'
                }
            }
            weatherApp.style.opacity = '1';
        }
    catch (error) {
        console.log(error)
        //alert('city cannot be found my boy')
        weatherApp.style.opacity = '1'
    }
}

fetchWeatherData()

weatherApp.style.opacity = '1'
//f072ddef24d047afaae202017232803

