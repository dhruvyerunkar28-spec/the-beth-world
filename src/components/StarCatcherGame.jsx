import { useState } from "react";
import confetti from "canvas-confetti";
import { Trophy, Check, RotateCcw, Award } from "lucide-react";
import { bethData } from "../data/bethContent";
import { audioEngine } from "../utils/audioEngine";
import "./StarCatcherGame.css";

export default function StarCatcherGame() {
  const [collectedCharms, setCollectedCharms] = useState(new Set());
  const [isUnlocked, setIsUnlocked] = useState(false);
  const { charms, certificate } = bethData.game;

  const handleCollect = (charmId, index) => {
    if (collectedCharms.has(charmId)) return;
    const newSet = new Set([...collectedCharms, charmId]);
    setCollectedCharms(newSet);
    audioEngine.playStarCatch(1 + index * 0.15);

    if (newSet.size === charms.length) {
      setTimeout(() => {
        setIsUnlocked(true);
        audioEngine.playFanfare();
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
          colors: ["#ffd166", "#f472b6", "#c084fc", "#38bdf8", "#4ade80"],
        });
      }, 400);
    }
  };

  const handleReset = () => {
    audioEngine.playChime();
    setCollectedCharms(new Set());
    setIsUnlocked(false);
  };

  return (
    <section id="game" className="beth-card-section star-game-section">
      <div className="section-header">
        <div className="section-tag">
          <Trophy size={14} /> CELESTIAL QUEST
        </div>
        <h2 className="section-heading">{bethData.game.title}</h2>
        <p className="section-subtext">{bethData.game.subtitle}</p>
      </div>

      {/* Interactive Charms Row */}
      <div className="charms-collection-row">
        {charms.map((charm, idx) => {
          const isCollected = collectedCharms.has(charm.id);
          return (
            <div
              key={charm.id}
              className={`charm-crystal-orb ${isCollected ? "collected" : "uncollected"}`}
              onClick={() => handleCollect(charm.id, idx)}
              style={{
                borderColor: isCollected ? charm.color : "rgba(216, 180, 254, 0.3)",
                boxShadow: isCollected ? `0 0 25px ${charm.color}88` : "none",
              }}
              title={isCollected ? `${charm.name} (Collected)` : `Click to collect ${charm.name}`}
            >
              <span className="charm-icon-emoji">{charm.icon}</span>
              <span className="charm-name-label">{charm.name}</span>
              {isCollected ? (
                <span className="charm-status-badge collected-badge">
                  <Check size={12} /> Unlocked
                </span>
              ) : (
                <span className="charm-status-badge tap-badge">Tap ✦</span>
              )}
            </div>
          );
        })}
      </div>

      {/* Progress tracker */}
      <div className="quest-progress-bar-container">
        <div className="quest-progress-track">
          <div
            className="quest-progress-fill"
            style={{ width: `${(collectedCharms.size / charms.length) * 100}%` }}
          />
        </div>
        <span className="quest-progress-label">
          {collectedCharms.size} of {charms.length} Starlight Charms Gathered
        </span>
      </div>

      {/* Unlocked Certificate */}
      {isUnlocked && (
        <div className="certificate-wrapper animate-unfold-certificate">
          <div className="certificate-card">
            <div className="certificate-ornament-corner tl" />
            <div className="certificate-ornament-corner tr" />
            <div className="certificate-ornament-corner bl" />
            <div className="certificate-ornament-corner br" />

            <div className="certificate-badge-top">
              <Award size={32} className="gold-medal-icon" />
            </div>

            <span className="certificate-tagline">GOLDEN ACCORD OF BEST FRIENDSHIP</span>
            <h3 className="certificate-main-title">{certificate.title}</h3>

            <p className="cert-recipient-line">
              Proudly presented to: <strong className="cert-name-highlight">{certificate.issuedTo}</strong>
            </p>

            <p className="cert-reason-text">"{certificate.reason}"</p>

            <div className="cert-benefits-list">
              {certificate.benefits.map((benefit, i) => (
                <div key={i} className="benefit-item">
                  <span>{benefit}</span>
                </div>
              ))}
            </div>

            <div className="cert-signature-block">
              <div className="sig-item">
                <span className="sig-line-drawn">Dhruv ✦</span>
                <span className="sig-label">Certified by Best Friend (Dhruv)</span>
              </div>
              <div className="sig-item">
                <span className="sig-line-drawn">August 2026</span>
                <span className="sig-label">Sealed for Eternity</span>
              </div>
            </div>

            <button className="reset-game-btn" onClick={handleReset}>
              <RotateCcw size={14} /> Replay Quest
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
