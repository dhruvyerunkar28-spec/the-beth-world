import { useState } from "react";
import { Mail, Sparkles, Feather } from "lucide-react";
import { bethData } from "../data/bethContent";
import { audioEngine } from "../utils/audioEngine";
import "./WaxLetter.css";

export default function WaxLetter() {
  const [isOpen, setIsOpen] = useState(false);
  const { letter } = bethData;

  const handleToggle = () => {
    audioEngine.playUnseal();
    setIsOpen(!isOpen);
  };

  return (
    <section id="letter" className="beth-card-section wax-letter-section">
      <div className="section-header">
        <div className="section-tag">
          <Feather size={14} /> FROM DHRUV'S HEART
        </div>
        <h2 className="section-heading">A Golden Letter for Beth</h2>
        <p className="section-subtext">
          {isOpen
            ? "Read slowly — every word was written with deep appreciation for who you are."
            : "Tap the wax seal below to break the seal and open your personal letter."}
        </p>
      </div>

      <div className="wax-letter-container">
        {!isOpen ? (
          /* Sealed Vintage Envelope */
          <div className="sealed-envelope" onClick={handleToggle} title="Click to break seal & open letter">
            <div className="envelope-top-flap" />
            <div className="envelope-pocket">
              <div className="envelope-stamps">
                <span className="stamp-icon">✦</span>
                <span className="stamp-text">SPECIAL DELIVERY</span>
              </div>
              <div className="envelope-address">
                <p className="to-line">To: Beth 🌸</p>
                <p className="sub-line">World's Best Friend</p>
              </div>
            </div>

            {/* 3D Wax Seal */}
            <button className="wax-seal-button" onClick={handleToggle}>
              <div className="wax-seal-outer">
                <div className="wax-seal-inner">
                  <span className="seal-monogram">D✦B</span>
                </div>
              </div>
              <span className="seal-instruction">TAP TO OPEN ✦</span>
            </button>
          </div>
        ) : (
          /* Unfolded Parchment Letter */
          <div className="unfolded-parchment animate-unfold">
            <div className="parchment-top-bar">
              <span className="parchment-date">{letter.date}</span>
              <button className="close-letter-btn" onClick={handleToggle}>
                <Mail size={14} /> Fold Envelope
              </button>
            </div>

            <div className="letter-body-content">
              <h3 className="letter-salutation">{letter.salutation}</h3>

              <p className="letter-intro-p">{letter.introParagraph}</p>

              {letter.bodyParagraphs.map((paragraph, idx) => (
                <p key={idx} className="letter-para">
                  {paragraph}
                </p>
              ))}

              <div className="letter-closing-section">
                <p className="closing-line">{letter.closing}</p>
                <h4 className="signature-line">{letter.signature}</h4>
              </div>

              {letter.ps && (
                <div className="letter-ps-box">
                  <p>{letter.ps}</p>
                </div>
              )}
            </div>

            <div className="parchment-footer-decor">
              <Sparkles size={16} className="decor-sparkle" />
              <span>✦ The Beth World ✦</span>
              <Sparkles size={16} className="decor-sparkle" />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
