
import { useEffect, useState } from "react";
import { RefreshCw, CloudOff } from "lucide-react";

import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import CurrentWeather from "./components/CurrentWeather";
import WeatherDetails from "./components/WeatherDetails";
import HourlyForecast from "./components/HourlyForecast";
import WeeklyForecast from "./components/WeeklyForecast";
import WeatherSkeleton from "./components/WeatherSkeleton";
import WeatherBackground from "./components/WeatherBackground";

import { searchCity, getWeather } from "./services/weatherApi";

import "./App.css";

const DEFAULT_CITY = {
  name: "Chennai",
  country: "India",
  admin1: "Tamil Nadu",
  latitude: 13.0827,
  longitude: 80.2707,
};

// Detect the background from Open-Meteo weather codes
function getWeatherCondition(weather) {
  const code = weather?.current?.weather_code;

  if (code === undefined || code === null) {
    return "cloudy";
  }

  // Clear sky and mainly clear
  if ([0, 1].includes(code)) {
    return "sunny";
  }

  // Fog and depositing rime fog
  if ([45, 48].includes(code)) {
    return "foggy";
  }

  // Snowfall and snow showers
  if ([71, 73, 75, 77, 85, 86].includes(code)) {
    return "snowy";
  }

  // Thunderstorms
  if ([95, 96, 99].includes(code)) {
    return "stormy";
  }

  // Drizzle, rain and rain showers
  if (
    [51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(code)
  ) {
    return "rainy";
  }

  // Partly cloudy and overcast
  return "cloudy";
}

function App() {
  const [city, setCity] = useState(DEFAULT_CITY);
  const [weather, setWeather] = useState(null);

  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState("");

  const weatherCondition = getWeatherCondition(weather);

  // Load weather using coordinates
  async function loadWeather(location) {
    setLoading(true);
    setError("");

    try {
      const data = await getWeather(
        location.latitude,
        location.longitude
      );

      setCity(location);
      setWeather(data);
    } catch (err) {
      setError(err.message || "Unable to load weather data.");
    } finally {
      setLoading(false);
    }
  }

  // Search for a city
  async function handleSearch(query) {
    setSearching(true);
    setError("");

    try {
      const results = await searchCity(query);

      if (!results || results.length === 0) {
        throw new Error("City not found. Try another city.");
      }

      const selected = results[0];

      const selectedCity = {
        name: selected.name,
        country: selected.country || "",
        admin1: selected.admin1 || "",
        latitude: selected.latitude,
        longitude: selected.longitude,
      };

      await loadWeather(selectedCity);
    } catch (err) {
      setError(err.message || "Unable to search city.");
    } finally {
      setSearching(false);
    }
  }

  // Initial weather request
  useEffect(() => {
    loadWeather(DEFAULT_CITY);
  }, []);

  return (
    <div className={`app theme-${weatherCondition}`}>
      {/* Animated background */}
      <WeatherBackground condition={weatherCondition} />

      <Navbar />

      <main className="dashboard">
        {/* Dashboard heading */}
        <div className="dashboard-heading">
          <div>
            <p className="eyebrow">WEATHER OVERVIEW</p>

            <h1>Weather Dashboard</h1>

            <p className="subtitle">
              Real-time conditions and weather forecasts.
            </p>
          </div>

          <button
            className="refresh-button"
            onClick={() => loadWeather(city)}
            disabled={loading}
          >
            <RefreshCw
              size={17}
              className={loading ? "spin" : ""}
            />
            Refresh
          </button>
        </div>

        {/* City search */}
        <SearchBar
          onSearch={handleSearch}
          loading={searching}
        />

        {/* Error message */}
        {error && (
          <div className="error-message">
            <CloudOff size={20} />
            <span>{error}</span>
          </div>
        )}

        {/* Weather dashboard content */}
        <section className="weather-content">
          {loading ? (
            <WeatherSkeleton />
          ) : weather ? (
            <>
              <div className="top-grid">
                <CurrentWeather
                  weather={weather}
                  city={city}
                />

                <WeatherDetails weather={weather} />
              </div>

              <HourlyForecast weather={weather} />

              <WeeklyForecast weather={weather} />

              <p className="api-credit">
                Weather data provided by{" "}
                <a
                  href="https://open-meteo.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Open-Meteo
                </a>
              </p>
            </>
          ) : (
            <div className="loading-state">
              <CloudOff size={32} />
              <p>
                Weather data is unavailable. Please try refreshing.
              </p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
