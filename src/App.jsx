import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ChevronDown } from "lucide-react";
import BackgroundSky from "./components/BackgroundSky";
import AudioPlayer from "./components/AudioPlayer";
import Navbar from "./components/Navbar";
import BirthdayCake from "./components/BirthdayCake";
import WaxLetter from "./components/WaxLetter";
import MemoryGallery from "./components/MemoryGallery";
import OpenWhenCards from "./components/OpenWhenCards";
import StarJar from "./components/StarJar";
import MixtapePlayer from "./components/MixtapePlayer";
import StarCatcherGame from "./components/StarCatcherGame";
import FinalSurprise from "./components/FinalSurprise";
import { bethData } from "./data/bethContent";
import { audioEngine } from "./utils/audioEngine";
import "./App.css";

function App() {
  const [entered, setEntered] = useState(false);
  const [activeSection, setActiveSection] = useState("cake");

  const handleEnter = () => {
    audioEngine.playChime();
    audioEngine.startAmbientMusic();
    setEntered(true);
  };

  const handleReturnToIntro = () => {
    setEntered(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="beth-world-root">
      {/* Background Celestial Sky */}
      <BackgroundSky />

      {/* Floating Audio Controller */}
      <AudioPlayer />

      <AnimatePresence mode="wait">
        {!entered ? (
          /* ACT 1: INTRO GATE */
          <motion.section
            key="intro"
            className="intro-scene-wrapper"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 1 }}
          >
            {/* Silhouette Tree */}
            <div className="tree-container">
              <div className="tree-glow" />
              <div className="tree-crown crown-one" />
              <div className="tree-crown crown-two" />
              <div className="tree-crown crown-three" />
              <div className="tree-crown crown-four" />
              <div className="tree-trunk" />
            </div>

            {/* Silhouette Houses */}
            <div className="village-houses">
              <div className="house house-one"><span className="window-glow" /></div>
              <div className="house house-two"><span className="window-glow" /></div>
              <div className="house house-three"><span className="window-glow" /></div>
            </div>

            {/* Glowing Path */}
            <div className="path-glow" />

            {/* Intro Content */}
            <motion.div
              className="intro-hero-box"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              <p className="intro-badge">✦ {bethData.intro.subtitle} ✦</p>

              <h1 className="intro-name-title">{bethData.intro.greeting}</h1>

              <div className="intro-message-box">
                {bethData.intro.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              <motion.button
                className="enter-portal-btn"
                whileHover={{
                  scale: 1.06,
                  boxShadow: "0 0 40px rgba(236, 72, 153, 0.7)",
                }}
                whileTap={{ scale: 0.95 }}
                onClick={handleEnter}
              >
                <span>{bethData.intro.buttonText}</span>
                <Sparkles size={16} className="btn-sparkle" />
              </motion.button>
            </motion.div>
          </motion.section>
        ) : (
          /* ACT 2: THE BETH WORLD EXPLORABLE REALM */
          <motion.div
            key="world"
            className="world-content-wrapper"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Sticky/Floating Navigation Bar */}
            <Navbar
              activeSection={activeSection}
              setActiveSection={setActiveSection}
              onGoHome={handleReturnToIntro}
            />

            {/* Realm Welcome Header */}
            <header className="realm-hero-header">
              <div className="realm-badge">
                <Sparkles size={14} /> {bethData.welcome.badge}
              </div>
              <h1 className="realm-main-title">{bethData.welcome.title}</h1>
              <p className="realm-subtitle">{bethData.welcome.subtitle}</p>

              <div className="realm-scroll-hint">
                <span>Explore your world below</span>
                <ChevronDown size={18} className="bounce-arrow" />
              </div>
            </header>

            {/* Main Interactive Sections Container */}
            <main className="realm-sections-container">
              {/* 1. Birthday Cake Ceremony */}
              <BirthdayCake />

              {/* 2. Golden Letter from Dhruv */}
              <WaxLetter />

              {/* 3. Memory Gallery */}
              <MemoryGallery />

              {/* 4. Open When... Capsules */}
              <OpenWhenCards />

              {/* 5. Starlight Jar */}
              <StarJar />

              {/* 6. Nostalgia Mixtape */}
              <MixtapePlayer />

              {/* 7. Star Catcher Game & Certificate */}
              <StarCatcherGame />

              {/* 8. Final Surprise: Necklace & Callout */}
              <FinalSurprise />
            </main>

            {/* Footer Sign-off */}
            <footer className="realm-footer">
              <div className="footer-glow-line" />
              <div className="footer-content">
                <p className="footer-sign">
                  Made with infinite care, gratitude & best friendship by <strong>{bethData.senderName}</strong> for <strong>{bethData.recipientName}</strong> ✦
                </p>
                <span className="footer-date">August 2026 • The Beth World</span>
              </div>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;