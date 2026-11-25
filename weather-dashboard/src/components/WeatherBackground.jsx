
function WeatherBackground({ condition }) {
  const particles = Array.from({ length: 24 });

  return (
    <div className={`weather-background weather-${condition}`} aria-hidden="true">
      {condition === "rainy" &&
        particles.map((_, index) => (
          <span
            className="rain-drop"
            key={index}
            style={{
              left: `${(index * 37) % 100}%`,
              animationDelay: `${(index % 8) * -0.35}s`,
              animationDuration: `${0.8 + (index % 5) * 0.15}s`,
            }}
          />
        ))}

      {condition === "snowy" &&
        particles.map((_, index) => (
          <span
            className="snow-flake"
            key={index}
            style={{
              left: `${(index * 37) % 100}%`,
              animationDelay: `${(index % 10) * -0.7}s`,
              animationDuration: `${5 + (index % 6)}s`,
              "--drift": `${(index % 2 === 0 ? 1 : -1) * (15 + index * 2)}px`,
            }}
          >
            ❄
          </span>
        ))}

      {condition === "sunny" && (
        <>
          <div className="sun-glow" />
          <div className="sun-rays" />
        </>
      )}

      {condition === "foggy" && (
        <>
          <div className="fog-layer fog-one" />
          <div className="fog-layer fog-two" />
          <div className="fog-layer fog-three" />
        </>
      )}

      {condition === "cloudy" && (
        <>
          <div className="cloud cloud-one" />
          <div className="cloud cloud-two" />
          <div className="cloud cloud-three" />
        </>
      )}

      {condition === "stormy" && (
        <>
          <div className="storm-glow" />
          {particles.map((_, index) => (
            <span
              className="rain-drop"
              key={index}
              style={{
                left: `${(index * 37) % 100}%`,
                animationDelay: `${(index % 8) * -0.3}s`,
              }}
            />
          ))}
        </>
      )}
    </div>
  );
}

export default WeatherBackground;
