import MapPage from "./pages/map.js";
import ProfilePage from "./pages/profile.js";
import TimerPage from "./pages/timer.js";

// Initialization

const pages = {
  profile: ProfilePage,
  map: MapPage,
  timer: TimerPage,
};

let currentPage = null;
let isMapVisited = false;

const navLinks = document.querySelectorAll(".header-nav__link");
navLinks.forEach((link) => {
  link.addEventListener("click", navigate);
});

// В рамках тестового задания отключаем поведение ненужных для навигации ссылок
function removeLinkDefault() {
  const links = document.querySelectorAll("a:not(.header-nav__link)");
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => e.preventDefault());
  });
}

window.addEventListener("popstate", () => {
  const pageName = window.location.hash.slice(1) || "profile";
  renderPage(pageName);
});

const initialPage = window.location.hash.slice(1) || "profile";
renderPage(initialPage);

// Page scripts

function profilePageScript() {
  const sidebarCards = document.querySelectorAll(
    ".sidebar-card:not(.sidebar-card_user)"
  );

  sidebarCards.forEach((card) => {
    const cardHeader = card.querySelector(".sidebar-card__header");
    cardHeader.addEventListener("click", () => {
      card.classList.toggle("open");
    });
  });
}

function mapPageScript() {
  if (!isMapVisited) {
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
  }

  if (!isMapVisited) isMapVisited = true;
}

// Render logic

function renderPage(pageName) {
  if (pageName === currentPage) return;

  const appElement = document.getElementById("app");

  //Pre-render "hook"
  if (currentPage) {
    pages[currentPage] = appElement.innerHTML;
  }

  appElement.innerHTML = pages[pageName] || "<h1>404 Not Found</h1>";
  currentPage = pageName;

  //Post-render scripts
  switch (pageName) {
    case "profile":
      profilePageScript();
      break;
    case "map":
      mapPageScript();
      break;

    default:
      break;
  }

  removeLinkDefault();
}

function navigate(event) {
  event.preventDefault();
  const pageName = event.currentTarget.getAttribute("data-page");
  if (pageName === currentPage) return;

  history.pushState(null, "", `#${pageName}`);
  renderPage(pageName);

  const oldActiveLink = document.querySelector(".header-nav__link_active");
  oldActiveLink.classList.remove("header-nav__link_active");
  event.currentTarget.classList.add("header-nav__link_active");
}
