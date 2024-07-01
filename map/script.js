function initMap(lat, lon) {
  const map = L.map("map").setView([lat, lon], 13);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  L.marker([lat, lon]).addTo(map).bindPopup("You are here").openPopup();

  const loadingImg = document.getElementById("loading");
  loadingImg.remove();
}
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      initMap(lat, lon);
    },
    (error) => {
      alert("Geolocation failed. Default location will be used.");
      console.log("error", error);
      // London
      initMap(51.505, -0.09);
    }
  );
} else {
  alert(
    "Geolocation is not supported by this browser. Default location will be used."
  );
  // London
  initMap(51.505, -0.09);
}
