
import { CloudSun } from "lucide-react";

function Navbar() {
  return (
    <header className="navbar">
      <a href="/" className="brand">
        <CloudSun size={30} />
        <span>Weatherly</span>
      </a>

      <div className="nav-status">
        <span className="status-dot"></span>
        Live Forecast Dashboard
      </div>
    </header>
  );
}

export default Navbar;
