const apiKey = "2e526ee5e5562740cf5d34ce13953e31"; // <-- Replace with your real API key

// Selectors matching index.html
const form = document.querySelector("#search-form");
const input = document.querySelector("#location-input");
const errorBox = document.querySelector("#error");
const loader = document.querySelector("#loader");
const weatherCard = document.querySelector("#weather-card");
const emptyState = document.querySelector("#empty-state");
const dropDown = document.querySelector("#dropdown-list");

// Weather info elements
const cityEl = document.querySelector("#city");
const countryEl = document.querySelector("#country");
const tempEl = document.querySelector("#temp");
const descEl = document.querySelector("#desc");
const feelsEl = document.querySelector("#feels");
const humidityEl = document.querySelector("#humidity");
const pressureEl = document.querySelector("#pressure");
const windEl = document.querySelector("#wind");
const sunriseEl = document.querySelector("#sunrise");
const sunsetEl = document.querySelector("#sunset");
const updatedEl = document.querySelector("#updated");
const iconEl = document.querySelector("#weather-icon");

// Recent searches
const recentList = document.querySelector("#recent-list");
const clearRecentBtn = document.querySelector("#clear-recent");
const useLastBtn = document.querySelector("#use-last");

let recentSearches = JSON.parse(localStorage.getItem("recentSearches") || "[]");

// Fetch and Render

async function fetchWeather(query) {
  if (!query) return showError("Please enter a city, ZIP, or coordinates.");

  clearError();
  showLoader();

  try {
    const url = buildUrl(query);
    const res = await fetch(url);
    const data = await res.json();

    if (!res.ok) throw new Error(data.message || "Unable to fetch weather.");

    renderWeather(data);
    saveSearch(query);
  } catch (err) {
    showError(err.message);
  } finally {
    hideLoader();
  }
}

function buildUrl(query) {
  if (/^-?\d+(\.\d+)?,-?\d+(\.\d+)?$/.test(query)) {
    const [lat, lon] = query.split(",").map(Number);
    return `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  }

  return `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
    query
  )}&units=metric&appid=${apiKey}`;
}

function renderWeather(data) {
  const name = data.name;
  const country = data.sys?.country;
  const temp = Math.round(data.main?.temp);
  const feels = Math.round(data.main?.feels_like);
  const humidity = data.main?.humidity;
  const pressure = data.main?.pressure;
  const wind = data.wind?.speed;
  const desc = capitalize(data.weather?.[0]?.description || "");
  const icon = data.weather?.[0]?.icon;
  const sunrise = formatTime(data.sys?.sunrise, data.timezone);
  const sunset = formatTime(data.sys?.sunset, data.timezone);
  const updated = new Date().toLocaleTimeString();

  // Fill values
  cityEl.textContent = name;
  countryEl.textContent = country;
  tempEl.textContent = `${temp}°C`;
  descEl.textContent = desc;
  feelsEl.textContent = `${feels}°C`;
  humidityEl.textContent = `${humidity}%`;
  pressureEl.textContent = `${pressure} hPa`;
  windEl.textContent = `${wind} m/s`;
  sunriseEl.textContent = sunrise;
  sunsetEl.textContent = sunset;
  updatedEl.textContent = updated;

  iconEl.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
  iconEl.alt = desc;

  weatherCard.classList.remove("hidden");
  emptyState.classList.add("hidden");
}

// Helpers

function showLoader() {
  loader.classList.remove("hidden");
}
function hideLoader() {
  loader.classList.add("hidden");
}
function showError(msg) {
  errorBox.textContent = msg;
}
function clearError() {
  errorBox.textContent = "";
}

function capitalize(s = "") {
  return s
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function formatTime(unix, tzOffset) {
  if (!unix) return "-";
  const date = new Date((unix + tzOffset) * 1000);
  return date.toUTCString().match(/\d{2}:\d{2}/)[0];
}

// Recent Searches

function saveSearch(query) {
  recentSearches = recentSearches.filter((q) => q !== query);
  recentSearches.unshift(query);
  if (recentSearches.length > 5) recentSearches.pop();
  localStorage.setItem("recentSearches", JSON.stringify(recentSearches));
  renderRecent();
}

function renderRecent() {
  recentList.innerHTML = "";
  recentSearches.forEach((q) => {
    const li = document.createElement("li");
    li.textContent = q;
    li.className = "cursor-pointer hover:underline";
    li.dataset.loc = q;
    li.addEventListener("click", () => fetchWeather(q));
    recentList.appendChild(li);
  });
}

clearRecentBtn.addEventListener("click", () => {
  recentSearches = [];
  localStorage.removeItem("recentSearches");
  renderRecent();
});

useLastBtn.addEventListener("click", () => {
  if (recentSearches.length === 0) return showError("No recent searches.");
  fetchWeather(recentSearches[0]);
});

// Dropdown for Recent Searches

input.addEventListener("focus", showDropdown);
input.addEventListener("input", showDropdown);

document.addEventListener("click", (e) => {
  if (!form.contains(e.target)) hideDropdown();
});

function showDropdown() {
  dropDown.innerHTML = "";

  if (recentSearches.length === 0) {
    hideDropdown();
    return;
  }

  const filter = input.value.toLowerCase();
  const filtered = recentSearches.filter((q) =>
    q.toLowerCase().includes(filter)
  );

  if (filtered.length === 0) {
    hideDropdown();
    return;
  }

  filtered.forEach((q) => {
    const li = document.createElement("li");
    li.textContent = q;
    li.className =
      "px-3 py-2 hover:bg-sky-50 cursor-pointer border-b last:border-b-0";
    li.addEventListener("click", () => {
      input.value = q;
      hideDropdown();
      fetchWeather(q);
    });
    dropDown.appendChild(li);
  });
  dropDown.classList.remove("hidden");
}

function hideDropdown() {
  dropDown.classList.add("hidden");
}

// Events

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const query = input.value.trim();
  if (query) fetchWeather(query);
});

renderRecent();
