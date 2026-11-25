
import { Cloud, Sun, CloudRain } from "lucide-react";
import { getWeatherInfo, formatHour } from "../utils/weatherUtils";

const icons = {
  sun: Sun,
  moon: Sun,
  cloud: Cloud,
  "cloud-sun": Sun,
  "cloud-fog": Cloud,
  "cloud-drizzle": CloudRain,
  "cloud-rain": CloudRain,
  "cloud-lightning": CloudRain,
  snowflake: Cloud,
};

function HourlyForecast({ weather }) {
  const hourly = weather.hourly;

  const start = Math.max(
    0,
    hourly.time.findIndex(
      (time) => time >= weather.current.time
    )
  );

  const hours = hourly.time.slice(start, start + 12);

  return (
    <section className="panel">
      <div className="section-title">
        <div>
          <p className="eyebrow">NEXT 12 HOURS</p>
          <h2>Hourly Forecast</h2>
        </div>
      </div>

      <div className="hourly-list">
        {hours.map((time, index) => {
          const actualIndex = start + index;

          const info = getWeatherInfo(
            hourly.weather_code[actualIndex]
          );

          const Icon = icons[info.icon] || Cloud;

          return (
            <article className="hour-card" key={time}>
              <p>
                {index === 0 ? "Now" : formatHour(time)}
              </p>

              <Icon size={25} />

              <h3>
                {Math.round(
                  hourly.temperature_2m[actualIndex]
                )}°
              </h3>

              <span>
                {hourly.precipitation_probability[actualIndex] ?? 0}%
                <small> Rain</small>
              </span>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default HourlyForecast;
