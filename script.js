import MapPage from "./pages/map.js";
import ProfilePage from "./pages/profile.js";
import TimerPage from "./pages/timer.js";

// Initialization

const pages = {
  profile: ProfilePage,
  map: MapPage,
  timer: TimerPage,
  404: "<h1>404 Not Found</h1>",
};

let currentPage = null;
let isMapVisited = false;

function setCurrentPageActiveLink(pageName, pageLink) {
  if (!currentPage) {
    const navLinks = document.querySelectorAll(".header-nav__link");
    navLinks.forEach((link) => {
      link.addEventListener("click", navigate);

      const dataPage = link.getAttribute("data-page");
      if (dataPage === pageName) {
        link.classList.add("header-nav__link_active");
      }
    });
  }

  if (currentPage) {
    const oldActiveLink = document.querySelector(".header-nav__link_active");
    oldActiveLink.classList.remove("header-nav__link_active");
    pageLink.classList.add("header-nav__link_active");
  }
}

window.addEventListener("popstate", () => {
  const pageName = window.location.hash.slice(1) || "profile";
  renderPage(pageName);
});

// Timer logic

let isTimerVisible = false;
let seconds = 0;
let minutes = 0;
let hours = 0;
setInterval(updateTimer, 1000);

function updateTimer() {
  seconds++;
  if (seconds >= 60) {
    seconds = 0;
    minutes++;
    if (minutes >= 60) {
      minutes = 0;
      hours++;
    }
  }

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

function timerPageScript() {
  isTimerVisible = !isTimerVisible;
}

// В рамках тестового задания отключаем поведение ненужных для навигации ссылок
function removeLinkDefault(needCleanup) {
  const links = document.querySelectorAll("a:not(.header-nav__link)");

  if (needCleanup) {
    links.forEach((link) => {
      link.removeEventListener("click", (e) => e.preventDefault());
    });
  } else {
    links.forEach((link) => {
      link.addEventListener("click", (e) => e.preventDefault());
    });
  }
}

// Render logic

function renderPage(pageName, pageLink) {
  if (pageName === currentPage) return;

  const appElement = document.getElementById("app");

  //Pre-render "hook"
  if (currentPage) {
    pages[currentPage] = appElement.innerHTML;
    removeLinkDefault(true);

    if (currentPage === "profile") profilePageScript(true);
    if (currentPage === "timer") timerPageScript();
  }

  appElement.innerHTML = pages[pageName];
  setCurrentPageActiveLink(pageName, pageLink);
  currentPage = pageName;

  //Post-render scripts
  switch (pageName) {
    case "profile":
      profilePageScript(false);
      break;
    case "map":
      mapPageScript();
      break;
    case "timer":
      timerPageScript();
      break;
    default:
      break;
  }

  removeLinkDefault(false);
}

function navigate(event) {
  event.preventDefault();
  const pageName = event.currentTarget.getAttribute("data-page") ?? "404";
  if (pageName === currentPage) return;

  history.pushState(null, "", `#${pageName}`);
  renderPage(pageName, event.currentTarget);
}

const initialPage = window.location.hash.slice(1) || "profile";
renderPage(initialPage);
