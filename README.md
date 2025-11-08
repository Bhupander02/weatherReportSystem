# 🌤️ Weather App

A simple, responsive **Weather Application** built with **HTML, TailwindCSS, and JavaScript**, that fetches live weather data using the **OpenWeatherMap API**.  
It allows users to search by city, ZIP code, or coordinates, view current weather conditions, and keep track of their **recent searches** with a handy **dropdown suggestion** feature.

---

## 🚀 Features

- **Live Weather Data:**  
  Fetches accurate real-time weather information (temperature, humidity, wind, sunrise/sunset, etc.) from the [OpenWeatherMap API](https://openweathermap.org/api).

- **Search Options:**  
  Supports multiple input types:

  - City name (e.g., `London`)
  - ZIP code (e.g., `10001`)
  - Latitude/Longitude (e.g., `40.71,-74.01`)

- **Recent Searches:**

  - Stores up to 5 recent searches using `localStorage`.
  - Click on a past search to quickly reload weather data.
  - Clear all recent searches or re-use the last one with dedicated buttons.

- **Search Dropdown Suggestions:**

  - Displays matching previous searches in a dropdown below the search bar.
  - Filters dynamically as you type.

- **Responsive Design:**

  - Works seamlessly on **laptops**, **tablets (iPad)**, and **phones (iPhone)**.
  - Uses TailwindCSS responsive utilities for proper scaling and layout adaptation.

- **Clean UI:**  
  Modern, minimal interface built with **TailwindCSS** and a smooth layout switch between mobile and desktop.

---

## 🧩 Tech Stack

| Technology               | Purpose                               |
| ------------------------ | ------------------------------------- |
| **HTML5**                | Markup and structure                  |
| **TailwindCSS**          | Responsive and modern styling         |
| **JavaScript (Vanilla)** | Functionality and API integration     |
| **OpenWeatherMap API**   | Weather data provider                 |
| **LocalStorage API**     | Persistent storage of recent searches |

---

## ⚙️ Setup and Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Bhupander02/weatherReportSystem.git
   cd weather-app
   ```
