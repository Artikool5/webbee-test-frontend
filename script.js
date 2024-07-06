import MapPage from "./pages/map.js";
import ProfilePage from "./pages/profile.js";
import TimerPage from "./pages/timer.js";

// Mobile menu

const mobileMenuBtns = document.querySelectorAll("header button");
const mobileMenu = document.querySelector(".page-header__bottom");
const mobileMenuBackdrop = document.querySelector(".mobile-menu__backdrop");

function openMenu() {
  mobileMenu.classList.add("mobile-menu-open");
  mobileMenuBackdrop.addEventListener("click", closeMenu);
}
function closeMenu() {
  mobileMenu.classList.remove("mobile-menu-open");
  mobileMenuBackdrop.removeEventListener("click", closeMenu);
}

mobileMenuBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const openedMenu = document.querySelector(".mobile-menu-open");
    if (openedMenu) {
      closeMenu();
    } else openMenu();
  });
});

// Initialization

const pages = {
  profile: ProfilePage,
  map: MapPage,
  timer: TimerPage,
  404: "<h1>404 Not Found</h1>",
};

let currentPage = null;
let isMapVisited = false;

function setCurrentPageActiveLink(pageName) {
  if (!currentPage) {
    const navLinks = document.querySelectorAll(".header-nav__link");
    navLinks.forEach((link) => {
      link.addEventListener("click", navigate);

      const page = link.getAttribute("href");
      if (page === pageName) {
        link.classList.add("header-nav__link_active");
      }
    });
  }

  if (currentPage) {
    const oldActiveLink = document.querySelector(".header-nav__link_active");
    oldActiveLink.classList.remove("header-nav__link_active");

    let pageLink;
    document.querySelectorAll(".header-nav__link").forEach((link) => {
      if (link.getAttribute("href") === pageName) pageLink = link;
    });
    pageLink.classList.add("header-nav__link_active");
  }
}

window.addEventListener("popstate", (event) => {
  const pageName = event.state?.pageName ?? "profile";
  renderPage(pageName);
});

// Timer logic

let isTimerVisible = false;
let seconds = 0;
let minutes = 0;
let hours = 0;
const siteUsageStartTime = Date.now();
setInterval(updateTimer, 1000);

function updateTimer() {
  const currentTime = Date.now();
  seconds = Math.floor((currentTime - siteUsageStartTime) / 1000) % 60;
  minutes = Math.floor((currentTime - siteUsageStartTime) / (1000 * 60)) % 60;
  hours = Math.round((currentTime - siteUsageStartTime) / (1000 * 60 * 60));

  if (isTimerVisible) updateDisplay();
}

function updateDisplay() {
  const display = document.getElementById("timer");
  display.textContent = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

function pad(number) {
  return number < 10 ? "0" + number : number;
}

// Page scripts

function profilePageScript(needCleanup) {
  function cleanup(cardHeader) {
    cardHeader.removeEventListener("click", () => {
      card.classList.toggle("open");
    });
  }

  const sidebarCards = document.querySelectorAll(
    ".sidebar-card:not(.sidebar-card_user)"
  );

  sidebarCards.forEach((card) => {
    const cardHeader = card.querySelector(".sidebar-card__header");
    if (needCleanup) {
      cleanup(cardHeader);
    } else {
      cardHeader.addEventListener("click", () => {
        card.classList.toggle("open");
      });
    }
  });
}

let map;
const mapState = {
  markers: [],
};

function mapPageScript(needCleanup) {
  function initMap(loadState, lat, lon) {
    if (loadState) {
      map = L.map("map").setView(mapState.center, mapState.zoom);

      mapState.markers.forEach((markerState) => {
        let marker = L.marker(markerState.latlng).addTo(map);
        if (markerState.popupContent) {
          marker.bindPopup(markerState.popupContent);
        }
      });
    } else {
      map = L.map("map").setView([lat, lon], 13);
      L.marker([lat, lon]).addTo(map).bindPopup("You are here").openPopup();
    }

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    const loadingImg = document.getElementById("loading");
    loadingImg?.remove();
  }

  if (needCleanup) {
    mapState.center = map.getCenter();
    mapState.zoom = map.getZoom();

    map.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        let markerState = {
          latlng: layer.getLatLng(),
          popupContent: null,
        };

        if (layer.getPopup()) {
          markerState.popupContent = layer.getPopup().getContent();
        }

        mapState.markers.push(markerState);
      }
    });

    map.remove();
  } else if (isMapVisited) {
    initMap(true);
  }

  if (!isMapVisited) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          initMap(false, lat, lon);
        },
        (error) => {
          alert("Geolocation failed. Default location will be used.");
          // London
          initMap(false, 51.505, -0.09);
        }
      );
    } else {
      alert(
        "Geolocation is not supported by this browser. Default location will be used."
      );
      // London
      initMap(false, 51.505, -0.09);
    }

    isMapVisited = true;
  }
}

function timerPageScript() {
  isTimerVisible = !isTimerVisible;
}

// Render logic

function renderPage(realPageName) {
  if (realPageName === currentPage) return;
  let filteredPageName;
  if (!Object.keys(pages).includes(realPageName)) filteredPageName = "404";

  const pageName = filteredPageName ?? realPageName;

  const appElement = document.getElementById("app");

  //Pre-render "hook"
  if (currentPage) {
    if (currentPage !== "map") pages[currentPage] = appElement.innerHTML;

    if (currentPage === "profile") profilePageScript(true);
    if (currentPage === "map") mapPageScript(true);
    if (currentPage === "timer") timerPageScript();
  }

  history.replaceState({ pageName }, "", pageName);
  appElement.innerHTML = pages[pageName];
  setCurrentPageActiveLink(realPageName);
  currentPage = pageName;

  //Post-render scripts
  switch (pageName) {
    case "profile":
      profilePageScript(false);
      break;
    case "map":
      mapPageScript(false);
      break;
    case "timer":
      timerPageScript();
      break;
    default:
      break;
  }
}

function navigate(event) {
  event.preventDefault();

  const pageName = event.currentTarget.getAttribute("href");
  if (pageName === currentPage) return;

  history.pushState({ pageName }, "", pageName);
  renderPage(pageName);
}

const path = window.location.pathname;
const pageName = path.split("/").at(-1) || "profile";
renderPage(pageName);
