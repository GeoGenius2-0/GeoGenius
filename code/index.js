const airQualityKey = config.Air_Quality_API_KEY



const sentences = [
  "Unit-6 API Project",
  "Hello, world!",
  "Clean air FTW",
  "#BreatheQualityAir",
];

  let intervalId;
  const typing = document.querySelector("#typing");
  
  function startTyping() {
    let sentenceIndex = Math.floor(Math.random() * sentences.length);
    let sentence = sentences[sentenceIndex];
    let index = 0;
    intervalId = setInterval(() => {
      typing.innerHTML += sentence[index];
      index++;
      if (index === sentence.length) {
        clearInterval(intervalId);
        setTimeout(() => {
          intervalId = setInterval(() => {
            typing.innerText = typing.innerText.slice(0, -1);
            if (typing.innerText === "") {
              clearInterval(intervalId);
              startTyping();
            }
          }, 50);
        }, 3000);
      }
    }, 50);
  }
  
  startTyping();
  
  
  
  
  
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      console.log(entry)
      if (entry.isIntersecting) {
        entry.target.classList.add('show')
      } else {
        entry.target.classList.add('remove')
      }
    })
  })
  
  const hiddenElements = document.querySelectorAll('.hidden')
  // hiddenElements.forEach((el) => observer.observe(el))
  hiddenElements.forEach(el => console.log(observer.observe(el)));
  
  
  
  
  
  let buttonElement = document.querySelector('#button1')
  buttonElement.addEventListener('click', airPollution)
  
  
  
  async function airPollution() {
    try {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async position => {
          console.log('My General Position:', position);
          const long = position.coords.longitude;
          const lat = position.coords.latitude;
          localStorage.setItem('longitude', long);
          localStorage.setItem('latitude', lat);
          const response = await fetch(`http://api.openweathermap.org/data/2.5/air_pollution?lat=${long}&lon=${lat}&appid=${airQualityKey}`);
          const data = await response.json();
          console.log(data)

        })
      }
    }
    catch (error) {
      console.log(error)
    }
  }

//   const longitude = localStorage.getItem('longitude');
// const latitude = localStorage.getItem('latitude');

  
  
  
  
  
  
 