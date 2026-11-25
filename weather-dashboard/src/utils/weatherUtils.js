
export function getWeatherInfo(code, isDay = true) {
  if (code === 0) {
    return {
      label: "Clear sky",
      icon: isDay ? "sun" : "moon",
    };
  }

  if (code === 1) {
    return {
      label: "Mainly clear",
      icon: isDay ? "sun" : "moon",
    };
  }

  if (code === 2) {
    return {
      label: "Partly cloudy",
      icon: "cloud-sun",
    };
  }

  if (code === 3) {
    return {
      label: "Overcast",
      icon: "cloud",
    };
  }

  if ([45, 48].includes(code)) {
    return {
      label: "Fog",
      icon: "cloud-fog",
    };
  }

  if ([51, 53, 55, 56, 57].includes(code)) {
    return {
      label: "Drizzle",
      icon: "cloud-drizzle",
    };
  }

  if ([61, 63, 65, 66, 67].includes(code)) {
    return {
      label: "Rain",
      icon: "cloud-rain",
    };
  }

  if ([71, 73, 75, 77].includes(code)) {
    return {
      label: "Snow",
      icon: "snowflake",
    };
  }

  if ([80, 81, 82].includes(code)) {
    return {
      label: "Rain showers",
      icon: "cloud-rain",
    };
  }

  if ([85, 86].includes(code)) {
    return {
      label: "Snow showers",
      icon: "snowflake",
    };
  }

  if (code === 95 || code === 96 || code === 99) {
    return {
      label: "Thunderstorm",
      icon: "cloud-lightning",
    };
  }

  return {
    label: "Unknown conditions",
    icon: "cloud",
  };
}

export function formatDay(date, index) {
  if (index === 0) return "Today";

  return new Date(`${date}T12:00:00`).toLocaleDateString(
    "en-US",
    { weekday: "short" }
  );
}

export function formatHour(time) {
  return new Date(time).toLocaleTimeString("en-US", {
    hour: "numeric",
    hour12: true,
  });
}
