
import { Search, MapPin, LoaderCircle } from "lucide-react";
import { useState } from "react";

function SearchBar({ onSearch, loading }) {
  const [city, setCity] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!city.trim()) return;

    onSearch(city.trim());
  }

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <MapPin size={20} />

      <input
        type="text"
        placeholder="Search city..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />

      <button type="submit" disabled={loading}>
        {loading ? (
          <LoaderCircle className="spin" size={19} />
        ) : (
          <Search size={19} />
        )}
        Search
      </button>
    </form>
  );
}

export default SearchBar;
