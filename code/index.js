const airQualityKey = config.Air_Quality_API_KEY;

navigator.geolocation.watchPosition((position) => {
  localStorage.setItem("latitude", position.coords.latitude);
  localStorage.setItem("longitude", position.coords.longitude);
});

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

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      } else {
        entry.target.classList.remove("show");
      }
    });
  },
  {
    // Set the threshold to 0.5 (50% of section in view)
    threshold: 0.5,
  }
);

const hiddenElements = document.querySelectorAll(".hidden");
hiddenElements.forEach((el) => observer.observe(el));

