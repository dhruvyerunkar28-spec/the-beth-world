import { useState } from "react";
import { Zap, CloudRain, Smile, Trophy, Gift, X } from "lucide-react";
import { bethData } from "../data/bethContent";
import { audioEngine } from "../utils/audioEngine";
import "./OpenWhenCards.css";

const ICON_MAP = {
  Zap: Zap,
  CloudRain: CloudRain,
  Smile: Smile,
  Trophy: Trophy,
  Gift: Gift,
};

export default function OpenWhenCards() {
  const [activeLetter, setActiveLetter] = useState(null);

  const openCard = (card) => {
    audioEngine.playUnseal();
    setActiveLetter(card);
  };

  const closeCard = () => {
    audioEngine.playChime();
    setActiveLetter(null);
  };

  return (
    <section id="open-when" className="beth-card-section open-when-section">
      <div className="section-header">
        <div className="section-tag">
          <Gift size={14} /> TIME CAPSULES OF SUPPORT
        </div>
        <h2 className="section-heading">"Open When..." Envelopes</h2>
        <p className="section-subtext">
          Letters crafted for specific moments in life when you need a gentle reminder that I've always got your back.
        </p>
      </div>

      <div className="open-when-grid">
        {bethData.openWhen.map((item) => {
          const Icon = ICON_MAP[item.icon] || Gift;
          return (
            <div
              key={item.id}
              className="open-when-card"
              onClick={() => openCard(item)}
              style={{
                borderColor: `${item.color}44`,
                boxShadow: `0 8px 30px rgba(0,0,0,0.4), 0 0 15px ${item.color}18`,
              }}
            >
              <div
                className="card-icon-bubble"
                style={{
                  background: `${item.color}22`,
                  borderColor: `${item.color}55`,
                  color: item.color,
                }}
              >
                <Icon size={24} />
              </div>

              <h4 className="card-trigger-title">{item.trigger}</h4>
              <span className="card-tap-badge" style={{ color: item.color }}>
                ✦ Tap to open
              </span>
            </div>
          );
        })}
      </div>

      {/* Modal Popup */}
      {activeLetter && (
        <div className="open-when-modal-backdrop" onClick={closeCard}>
          <div className="open-when-modal-card animate-modal-pop" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={closeCard}>
              <X size={20} />
            </button>

            <div
              className="modal-icon-header"
              style={{ color: activeLetter.color, background: `${activeLetter.color}22` }}
            >
              {(() => {
                const ActiveIcon = ICON_MAP[activeLetter.icon] || Gift;
                return <ActiveIcon size={32} />;
              })()}
            </div>

            <h3 className="modal-letter-title">{activeLetter.trigger}</h3>

            <div className="modal-letter-content">
              <p>"{activeLetter.letter}"</p>
            </div>

            <div className="modal-letter-footer">
              <span className="footer-signature">Always here for you, Dhruv ✦</span>
              <button className="modal-close-pill" onClick={closeCard}>
                Keep Safe in Heart
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
