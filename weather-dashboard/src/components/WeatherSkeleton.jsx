
function SkeletonBlock({ className = "" }) {
  return <div className={`skeleton-block ${className}`} />;
}

function WeatherSkeleton() {
  return (
    <div className="weather-skeleton">
      {/* Current weather and details */}
      <div className="skeleton-top-grid">
        <div className="skeleton-card skeleton-current">
          <div className="skeleton-row">
            <SkeletonBlock className="skeleton-circle" />
            <div className="skeleton-text-group">
              <SkeletonBlock className="skeleton-line medium" />
              <SkeletonBlock className="skeleton-line short" />
            </div>
          </div>

          <SkeletonBlock className="skeleton-temperature" />
          <SkeletonBlock className="skeleton-line medium" />

          <div className="skeleton-divider" />

          <div className="skeleton-row">
            <SkeletonBlock className="skeleton-line medium" />
            <SkeletonBlock className="skeleton-line medium" />
          </div>
        </div>

        <div className="skeleton-details-grid">
          {Array.from({ length: 4 }).map((_, index) => (
            <div className="skeleton-card skeleton-detail" key={index}>
              <SkeletonBlock className="skeleton-circle small" />
              <SkeletonBlock className="skeleton-line short" />
              <SkeletonBlock className="skeleton-line medium" />
            </div>
          ))}
        </div>
      </div>

      {/* Hourly forecast */}
      <div className="skeleton-card skeleton-panel">
        <SkeletonBlock className="skeleton-line medium" />

        <div className="skeleton-hourly-list">
          {Array.from({ length: 8 }).map((_, index) => (
            <div className="skeleton-hour" key={index}>
              <SkeletonBlock className="skeleton-line short" />
              <SkeletonBlock className="skeleton-circle" />
              <SkeletonBlock className="skeleton-line short" />
            </div>
          ))}
        </div>
      </div>

      {/* Weekly forecast */}
      <div className="skeleton-card skeleton-panel">
        <SkeletonBlock className="skeleton-line medium" />

        <div className="skeleton-weekly-list">
          {Array.from({ length: 7 }).map((_, index) => (
            <div className="skeleton-week-row" key={index}>
              <SkeletonBlock className="skeleton-line short" />
              <SkeletonBlock className="skeleton-circle small" />
              <SkeletonBlock className="skeleton-line medium" />
              <SkeletonBlock className="skeleton-line short" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default WeatherSkeleton;
