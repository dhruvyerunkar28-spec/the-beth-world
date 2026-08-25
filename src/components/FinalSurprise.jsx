import { Sparkles, Phone, MessageCircle, Heart } from "lucide-react";
import { bethData } from "../data/bethContent";
import { audioEngine } from "../utils/audioEngine";
import "./FinalSurprise.css";

export default function FinalSurprise() {
  const { finalSurprise } = bethData;

  const handleCallClick = () => {
    audioEngine.playChime();
    window.location.href = "tel:";
  };

  const handleMessageClick = () => {
    audioEngine.playChime();
    window.open("https://wa.me/?text=Hi%20Dhruv!%20I%20just%20saw%20The%20Beth%20World%20%E2%9C%A8", "_blank");
  };

  return (
    <section id="surprise" className="final-surprise-clean-section">
      {/* Top Birthday Wish */}
      <div className="final-top-wish-header">
        <div className="final-wish-tag">
          <Sparkles size={14} /> {finalSurprise.tag}
        </div>
        <h2 className="final-wish-main-heading">
          {finalSurprise.title}
        </h2>
      </div>

      {/* Front-facing isolated necklace floating seamlessly on celestial night background with NO box */}
      <div className="isolated-necklace-stage">
        <div className="necklace-float-container">
          <img
            src={finalSurprise.image}
            alt="Golden Rose Pendant Necklace"
            className="isolated-pendant-img"
          />
          {/* Subtle Starlight Glints */}
          <span className="isolated-sparkle is1">✦</span>
          <span className="isolated-sparkle is2">✦</span>
          <span className="isolated-sparkle is3">✦</span>
          <div className="necklace-soft-glow" />
        </div>
      </div>

      {/* Heartfelt Message Below Necklace */}
      <div className="final-heart-message-wrapper">
        <div className="heart-icon-glow">
          <Heart size={26} className="heart-pulse-anim" />
        </div>

        <div className="final-message-lines">
          {finalSurprise.messages.map((line, idx) => (
            <p
              key={idx}
              className={`message-line ${idx === finalSurprise.messages.length - 1 ? "love-line" : idx === 1 ? "call-line" : "chance-line"}`}
            >
              {line}
            </p>
          ))}
        </div>

        <div className="final-action-buttons">
          <button className="final-btn call-dhruv-btn" onClick={handleCallClick}>
            <Phone size={18} /> Call Dhruv
          </button>
          <button className="final-btn message-dhruv-btn" onClick={handleMessageClick}>
            <MessageCircle size={18} /> Send Message
          </button>
        </div>
      </div>
    </section>
  );
}
