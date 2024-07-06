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

function setCurrentPageActiveLink(pageName, pageLink) {
  if (!currentPage) {
    const navLinks = document.querySelectorAll(".header-nav__link");
    navLinks.forEach((link) => {
      link.addEventListener("click", navigate);

      const page = link.getAttribute("href").slice(1);
      if (page === pageName) {
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

window.addEventListener("popstate", (event) => {
  const pageName = event.state?.pageName ?? "profile";
  renderPage(pageName);
});

const path = window.location.pathname;
const pageName = path.substring(1) || "profile";
history.replaceState({ pageName }, "", path);
renderPage(pageName);

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

// Render logic

function renderPage(pageName, pageLink) {
  if (pageName === currentPage) return;
  if (!Object.keys(pages).includes(pageName)) pageName = "404";

  const appElement = document.getElementById("app");

  //Pre-render "hook"
  if (currentPage) {
    pages[currentPage] = appElement.innerHTML;

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
}

function navigate(event) {
  event.preventDefault();

  const url = event.currentTarget.getAttribute("href");
  const pageName = url.slice(1);
  if (pageName === currentPage) return;

  history.pushState({ pageName }, "", url);
  renderPage(pageName, event.currentTarget);
}
