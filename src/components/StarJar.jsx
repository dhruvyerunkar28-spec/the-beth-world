import { useState } from "react";
import { Sparkles, Star, RefreshCw, Heart } from "lucide-react";
import { bethData } from "../data/bethContent";
import { audioEngine } from "../utils/audioEngine";
import "./StarJar.css";

export default function StarJar() {
  const [currentIndex, setCurrentIndex] = useState(null);
  const [unlockedIndices, setUnlockedIndices] = useState(new Set());
  const [isOpening, setIsOpening] = useState(false);

  const drawStar = () => {
    audioEngine.playChime();
    setIsOpening(true);

    setTimeout(() => {
      // Pick a random unread reason or random reason
      const unread = bethData.reasons
        .map((_, i) => i)
        .filter((i) => !unlockedIndices.has(i));

      const nextIdx =
        unread.length > 0
          ? unread[Math.floor(Math.random() * unread.length)]
          : Math.floor(Math.random() * bethData.reasons.length);

      setCurrentIndex(nextIdx);
      setUnlockedIndices((prev) => new Set([...prev, nextIdx]));
      setIsOpening(false);
    }, 450);
  };

  return (
    <section id="reasons" className="beth-card-section star-jar-section">
      <div className="section-header">
        <div className="section-tag">
          <Sparkles size={14} /> JAR OF 24 STARLIGHT TRUTHS
        </div>
        <h2 className="section-heading">Why Beth is Irreplaceable</h2>
        <p className="section-subtext">
          24 starlight crystals representing 24 genuine truths and reasons why you are one-of-a-kind.
        </p>
      </div>

      <div className="star-jar-interactive">
        {/* Glowing Glass Jar Graphic */}
        <div className="glass-jar-wrapper" onClick={drawStar} title="Click to draw a starlight crystal">
          <div className="jar-lid">
            <span className="jar-lid-knob" />
          </div>

          <div className="jar-body">
            <div className="jar-glare" />
            <div className="jar-stars-inside">
              {Array.from({ length: 18 }).map((_, i) => (
                <span
                  key={i}
                  className="floating-jar-star"
                  style={{
                    left: `${15 + (i % 6) * 13}%`,
                    top: `${20 + Math.floor(i / 6) * 24}%`,
                    animationDelay: `${i * 0.25}s`,
                  }}
                >
                  ✦
                </span>
              ))}
            </div>

            <div className="jar-label">
              <span>BETH'S</span>
              <strong>STARLIGHT JAR</strong>
            </div>
          </div>

          <button className="draw-star-btn">
            <Sparkles size={16} /> Draw A Crystal
          </button>
        </div>

        {/* Revealed Starlight Card */}
        <div className="revealed-star-container">
          {currentIndex === null ? (
            <div className="empty-state-jar">
              <Star size={36} className="empty-jar-icon" />
              <p>Tap the jar or button to pull out a starlight crystal.</p>
              <span className="progress-badge">
                {unlockedIndices.size} of {bethData.reasons.length} crystals uncovered
              </span>
            </div>
          ) : (
            <div className={`revealed-star-card ${isOpening ? "animating-shake" : "animate-star-reveal"}`}>
              <div className="star-card-badge">
                <Heart size={14} className="star-heart" /> Reason #{currentIndex + 1}
              </div>

              <p className="star-reason-text">"{bethData.reasons[currentIndex]}"</p>

              <div className="star-card-actions">
                <span className="progress-badge">
                  {unlockedIndices.size} of {bethData.reasons.length} uncovered
                </span>
                <button className="draw-again-btn" onClick={drawStar}>
                  <RefreshCw size={14} /> Draw Another ✦
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
