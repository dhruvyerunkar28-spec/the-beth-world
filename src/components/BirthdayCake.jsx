import { useState } from "react";
import confetti from "canvas-confetti";
import { Sparkles, Wind, Send, CheckCircle2, RotateCcw, Heart } from "lucide-react";
import { bethData } from "../data/bethContent";
import { audioEngine } from "../utils/audioEngine";
import "./BirthdayCake.css";

export default function BirthdayCake() {
  const [candles, setCandles] = useState([true, true, true, true, true]);
  const [isBlownOut, setIsBlownOut] = useState(false);
  const [wish, setWish] = useState("");
  const [wishSubmitted, setWishSubmitted] = useState(false);
  const [savedWish, setSavedWish] = useState(() => {
    return localStorage.getItem("beth_birthday_wish_2026") || null;
  });

  const triggerCelebrationConfetti = () => {
    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
      colors: ["#f472b6", "#c084fc", "#e879f9", "#38bdf8", "#fde047", "#ffffff"],
    };

    function fire(particleRatio, opts) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });
  };

  const blowOutSingleCandle = (index) => {
    if (!candles[index]) return;
    audioEngine.playBlowout();
    const newCandles = [...candles];
    newCandles[index] = false;
    setCandles(newCandles);

    if (newCandles.every((c) => !c)) {
      handleAllBlownOut();
    }
  };

  const handleAllBlownOut = () => {
    setIsBlownOut(true);
    audioEngine.playBlowout();
    setTimeout(() => {
      audioEngine.playFanfare();
      triggerCelebrationConfetti();
    }, 400);
  };

  const blowOutAll = () => {
    setCandles([false, false, false, false, false]);
    handleAllBlownOut();
  };

  const relightCandles = () => {
    audioEngine.playChime();
    setCandles([true, true, true, true, true]);
    setIsBlownOut(false);
  };

  const handleWishSubmit = (e) => {
    e.preventDefault();
    if (!wish.trim()) return;
    audioEngine.playChime();
    localStorage.setItem("beth_birthday_wish_2026", wish);
    setSavedWish(wish);
    setWishSubmitted(true);
    triggerCelebrationConfetti();
  };

  const unlitCount = candles.filter((c) => !c).length;

  return (
    <section id="cake" className="beth-card-section cake-section">
      <div className="section-header">
        <div className="section-tag">
          <Sparkles size={14} /> CELEBRATION CEREMONY
        </div>
        <h2 className="section-heading">{bethData.cake.title}</h2>
        <p className="section-subtext">{bethData.cake.subtitle}</p>
      </div>

      <div className="cake-interactive-stage">
        {/* Interactive Cake Graphic */}
        <div className="cake-pedestal">
          <div className="cake-container">
            {/* Candles Row */}
            <div className="candles-row">
              {candles.map((isLit, idx) => (
                <div
                  key={idx}
                  className={`candle candle-${idx} ${isLit ? "lit" : "blown"}`}
                  onClick={() => blowOutSingleCandle(idx)}
                  title={isLit ? "Click to blow out candle" : "Extinguished"}
                >
                  <div className="flame-wrapper">
                    {isLit && (
                      <div className="flame">
                        <div className="flame-inner" />
                        <div className="flame-glow" />
                      </div>
                    )}
                    {!isLit && <div className="smoke-puff" />}
                  </div>
                  <div className="wick" />
                  <div className="candle-stick">
                    <div className="candle-stripes" />
                  </div>
                </div>
              ))}
            </div>

            {/* Cake Layers */}
            <div className="cake-layer layer-top">
              <div className="frosting-drips">
                <span className="drip" />
                <span className="drip" />
                <span className="drip" />
                <span className="drip" />
                <span className="drip" />
              </div>
              <div className="cake-decorations">
                <span className="berry b1" />
                <span className="berry b2" />
                <span className="berry b3" />
                <span className="star-piping" />
              </div>
            </div>

            <div className="cake-layer layer-middle">
              <div className="middle-cream" />
            </div>

            <div className="cake-layer layer-bottom">
              <div className="bottom-accent" />
            </div>

            <div className="cake-plate" />
          </div>
        </div>

        {/* Action Controls */}
        <div className="cake-actions">
          {!isBlownOut ? (
            <button className="cake-action-btn blow-all-btn" onClick={blowOutAll}>
              <Wind size={16} /> Blow Out All Candles ({5 - unlitCount} remaining)
            </button>
          ) : (
            <button className="cake-action-btn relight-btn" onClick={relightCandles}>
              <RotateCcw size={16} /> Relight Candles ✦
            </button>
          )}
        </div>

        {/* Wish Ceremony Card */}
        {isBlownOut && (
          <div className="wish-ceremony-card animate-fade-in">
            <div className="wish-sparkle-header">
              <Heart size={20} className="wish-heart-icon" />
              <h3>The Universe is Listening</h3>
            </div>
            <p className="wish-instruction">{bethData.cake.wishPrompt}</p>

            {!wishSubmitted ? (
              <form onSubmit={handleWishSubmit} className="wish-form">
                <textarea
                  className="wish-input"
                  rows={3}
                  placeholder="e.g. Joy in every step, exciting milestones, peace in mind..."
                  value={wish}
                  onChange={(e) => setWish(e.target.value)}
                  maxLength={300}
                />
                <div className="wish-form-footer">
                  <span className="char-count">{300 - wish.length} chars left</span>
                  <button type="submit" className="submit-wish-btn">
                    <Send size={15} /> Send Wish to the Stars
                  </button>
                </div>
              </form>
            ) : (
              <div className="wish-success-box">
                <CheckCircle2 size={24} className="success-check-icon" />
                <p className="success-text">{bethData.cake.wishSubmittedText}</p>
                {savedWish && (
                  <div className="saved-wish-preview">
                    <span>Your Starlit Wish:</span>
                    <blockquote>"{savedWish}"</blockquote>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
