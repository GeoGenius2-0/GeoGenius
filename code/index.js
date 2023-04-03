navigator.geolocation.watchPosition((position) => {
  localStorage.setItem("latitude", position.coords.latitude);
  localStorage.setItem("longitude", position.coords.longitude);
});

async function searchStories (input) {
  const url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=election ${input}&api-key=8OFA2fIkQvc7Px7NUvIrz1GEiQ0QM24v`;
  const data = await fetch(url);
  const parse = await data.json();
  for (let i = 0; i < 8; i++) {
    const splitText = parse.response.docs[i].abstract.split(" ");
    if (splitText.length > 30 || splitText.length < 8) {
      continue;
    } else {
      sentences.push(parse.response.docs[i].abstract);
    }
  }
};

searchStories("air quality pollution");
searchStories("weather news")
searchStories("climate change news")

const sentences = [
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
        }, 20);
      }, 2500);
    }
  },20);
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

