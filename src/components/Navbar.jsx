import { Cake, Mail, Images, Gift, Sparkles, Disc, Trophy, Home, Heart } from "lucide-react";
import { audioEngine } from "../utils/audioEngine";
import "./Navbar.css";

const NAV_ITEMS = [
  { id: "cake", label: "Birthday Cake", icon: Cake },
  { id: "letter", label: "Golden Letter", icon: Mail },
  { id: "memories", label: "Memories", icon: Images },
  { id: "open-when", label: "Open When...", icon: Gift },
  { id: "reasons", label: "Starlight Jar", icon: Sparkles },
  { id: "mixtape", label: "Mixtape", icon: Disc },
  { id: "game", label: "Star Quest", icon: Trophy },
  { id: "surprise", label: "Special Gift 🌸", icon: Heart },
];

export default function Navbar({ activeSection, setActiveSection, onGoHome }) {
  const handleSelect = (id) => {
    audioEngine.playChime();
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <header className="beth-navbar-container">
      <nav className="beth-navbar-glass">
        {onGoHome && (
          <button
            className="nav-item-btn home-btn"
            onClick={() => {
              audioEngine.playChime();
              onGoHome();
            }}
            title="Return to Intro Gate"
          >
            <Home size={16} />
            <span className="nav-label">Intro</span>
          </button>
        )}

        <div className="nav-divider" />

        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              className={`nav-item-btn ${isActive ? "active" : ""}`}
              onClick={() => handleSelect(item.id)}
            >
              <Icon size={16} className="nav-icon" />
              <span className="nav-label">{item.label}</span>
              {isActive && <span className="nav-active-dot" />}
            </button>
          );
        })}
      </nav>
    </header>
  );
}
