
import {
  Droplets,
  Wind,
  Gauge,
  Sun,
} from "lucide-react";

function WeatherDetails({ weather }) {
  const current = weather.current;
  const uv = weather.daily.uv_index_max[0];

  const details = [
    {
      label: "Humidity",
      value: `${current.relative_humidity_2m}%`,
      icon: Droplets,
      description: "Relative humidity",
    },
    {
      label: "Wind Speed",
      value: `${current.wind_speed_10m} km/h`,
      icon: Wind,
      description: "At 10 metres",
    },
    {
      label: "UV Index",
      value: `${uv}`,
      icon: Sun,
      description: "Today's maximum",
    },
    {
      label: "Precipitation",
      value: `${current.precipitation} mm`,
      icon: Gauge,
      description: "Current amount",
    },
  ];

  return (
    <section className="details-grid">
      {details.map((item) => {
        const Icon = item.icon;

        return (
          <article className="detail-card" key={item.label}>
            <div className="detail-icon">
              <Icon size={22} />
            </div>

            <p>{item.label}</p>
            <h3>{item.value}</h3>
            <span>{item.description}</span>
          </article>
        );
      })}
    </section>
  );
}

export default WeatherDetails;
