const airQualityKey = api.Air_Quality_API_KEY



// let typing = document.querySelector("#typing")
//   const text = "This is a typing effect";
//   let index = 0;
//  let interval =  setInterval(() => {
//     typing.innerText += text[index];
//     index++;
//     if (index === text.length) {
//       clearInterval(interval);
//     }
//   }, 100);
// next get an array 
const sentences = [
    "This is MF.Doom",
    "Hello, world!",
    "Lorem ipsum dolor sit amet",
    "Nayan is a cool guy",
    'Thank you ben'
  ];
  
  //Mine
  
  //   let intervalId;
  //   const typing = document.querySelector("#typing");
  
  //   function startTyping() {
  //     let sentenceIndex = Math.floor(Math.random() * sentences.length);
  //     let sentence = sentences[sentenceIndex];
  //     let index = 0;
  //     intervalId = setInterval(() => {
  //       typing.innerHTML += sentence[index];
  //       index++;
  //       if (index === sentence.length) {
  //         clearInterval(intervalId);
  //         setTimeout(() => {
  //           typing.innerText = "";
  //           startTyping();
  //         }, 2000);
  //       }
  //     }, 100);
  //   }
  
  // startTyping()
  
  //chat gpt 
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
          }, 100);
        }, 3000);
      }
    }, 100);
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
          const response = await fetch(`http://api.openweathermap.org/data/2.5/air_pollution?lat=${long}&lon=${lat}&appid=f42bda7ce438693d1b9966abceb83f10`);
          const data = await response.json();
          console.log(data)
          // console.log(data.list['0'].components)
      
        })
      }
  
    }
    catch (error) {
      console.log(error)
    }
  }
  
  
  
  
  
  // const lat = 40.712776;
  // const lon = -74.005974;
  // const apiKey = 'YOUR_API_KEY'; // Replace with your API key
  
  // const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=${apiKey}`;
  
  // fetch(url)
  //   .then(response => response.json())
  //   .then(data => {
  //     const location = data.results[0].formatted;
  //     console.log(location); // "New York, NY, USA"
  //   })
  //   .catch(error => console.error(error));
  