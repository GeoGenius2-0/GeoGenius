document.addEventListener(
  "touchmove",
  function (e) {
    // do something
  },
  { passive: true }
);
function initMap() {
  var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 8,
    center: { lat: 37.7749, lng: -122.4194 },
    // disableDefaultUI: true,
  });

  map.addListener("click", function (e) {
    console.log(e.latLng.lat(), e.latLng.lng());
  });
}