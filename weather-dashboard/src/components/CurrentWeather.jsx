
import {
  Sun,
  Moon,
  Cloud,
  CloudSun,
  CloudFog,
  CloudDrizzle,
  CloudRain,
  CloudLightning,
  Snowflake,
} from "lucide-react";

import { getWeatherInfo } from "../utils/weatherUtils";

const icons = {
  sun: Sun,
  moon: Moon,
  cloud: Cloud,
  "cloud-sun": CloudSun,
  "cloud-fog": CloudFog,
  "cloud-drizzle": CloudDrizzle,
  "cloud-rain": CloudRain,
  "cloud-lightning": CloudLightning,
  snowflake: Snowflake,
};

function CurrentWeather({ weather, city }) {
  const current = weather.current;

  const info = getWeatherInfo(
    current.weather_code,
    current.is_day === 1
  );

  const WeatherIcon = icons[info.icon] || Cloud;

  return (
    <section className="current-card">
      <div className="current-top">
        <div>
          <p className="eyebrow">CURRENT WEATHER</p>
          <h2>{city.name}</h2>
          <p className="location-country">
            {city.admin1 ? `${city.admin1}, ` : ""}
            {city.country}
          </p>
        </div>

        <span className="live-badge">LIVE</span>
      </div>

      <div className="current-main">
        <div className="weather-icon">
          <WeatherIcon size={82} strokeWidth={1.4} />
        </div>

        <div>
          <h1>
            {Math.round(current.temperature_2m)}
            <span>°C</span>
          </h1>

          <p className="weather-description">
            {info.label}
          </p>

          <p className="feels-like">
            Feels like {Math.round(current.apparent_temperature)}°C
          </p>
        </div>
      </div>

      <div className="current-footer">
        <span>
          <Sun size={17} />
          Sunrise:{" "}
          {new Date(weather.daily.sunrise[0]).toLocaleTimeString(
            "en-US",
            { hour: "numeric", minute: "2-digit" }
          )}
        </span>

        <span>
          <Moon size={17} />
          Sunset:{" "}
          {new Date(weather.daily.sunset[0]).toLocaleTimeString(
            "en-US",
            { hour: "numeric", minute: "2-digit" }
          )}
        </span>
      </div>
    </section>
  );
}

export default CurrentWeather;
