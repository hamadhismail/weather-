
import {
  Sun,
  Cloud,
  CloudSun,
  CloudRain,
  CloudLightning,
  CloudFog,
  Snowflake,
} from "lucide-react";

import {
  getWeatherInfo,
  formatDay,
} from "../utils/weatherUtils";

const icons = {
  sun: Sun,
  moon: Sun,
  cloud: Cloud,
  "cloud-sun": CloudSun,
  "cloud-fog": CloudFog,
  "cloud-drizzle": CloudRain,
  "cloud-rain": CloudRain,
  "cloud-lightning": CloudLightning,
  snowflake: Snowflake,
};

function WeeklyForecast({ weather }) {
  const daily = weather.daily;

  return (
    <section className="panel">
      <div className="section-title">
        <div>
          <p className="eyebrow">7-DAY OUTLOOK</p>
          <h2>Weekly Forecast</h2>
        </div>
      </div>

      <div className="weekly-list">
        {daily.time.map((date, index) => {
          const info = getWeatherInfo(
            daily.weather_code[index]
          );

          const Icon = icons[info.icon] || Cloud;

          return (
            <article className="day-row" key={date}>
              <p className="day-name">
                {formatDay(date, index)}
              </p>

              <div className="day-condition">
                <Icon size={25} />
                <span>{info.label}</span>
              </div>

              <div className="temperature-range">
                <span>
                  {Math.round(
                    daily.temperature_2m_max[index]
                  )}°
                </span>

                <div className="temperature-bar">
                  <div
                    className="temperature-bar-fill"
                    style={{
                      width: `${
                        Math.max(
                          15,
                          Math.min(
                            100,
                            daily.temperature_2m_max[index] * 2
                          )
                        )
                      }%`,
                    }}
                  />
                </div>

                <span className="min-temperature">
                  {Math.round(
                    daily.temperature_2m_min[index]
                  )}°
                </span>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default WeeklyForecast;
