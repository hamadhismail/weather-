
const GEOCODING_URL = import.meta.env.VITE_GEOCODING_API_URL;

const FORECAST_URL = import.meta.env.VITE_WEATHER_API_URL;

// Search for a city
export async function searchCity(city) {
  const params = new URLSearchParams({
    name: city,
    count: "5",
    language: "en",
    format: "json",
  });

  const response = await fetch(`${GEOCODING_URL}?${params}`);

  if (!response.ok) {
    throw new Error("Unable to search for this city.");
  }

  const data = await response.json();

  return data.results || [];
}

// Get weather forecast
export async function getWeather(latitude, longitude) {
  const params = new URLSearchParams({
    latitude,
    longitude,

    current: [
      "temperature_2m",
      "relative_humidity_2m",
      "apparent_temperature",
      "is_day",
      "precipitation",
      "weather_code",
      "wind_speed_10m",
    ].join(","),

    hourly: [
      "temperature_2m",
      "precipitation_probability",
      "weather_code",
    ].join(","),

    daily: [
      "weather_code",
      "temperature_2m_max",
      "temperature_2m_min",
      "sunrise",
      "sunset",
      "uv_index_max",
    ].join(","),

    timezone: "auto",
    forecast_days: "7",
    forecast_hours: "24",
  });

  const response = await fetch(`${FORECAST_URL}?${params}`);

  if (!response.ok) {
    throw new Error("Unable to fetch weather data.");
  }

  return await response.json();
}
