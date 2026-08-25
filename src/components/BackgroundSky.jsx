import { useEffect, useState } from "react";
import "./BackgroundSky.css";

// Deterministic pseudo-random number generator for star distribution
function pseudoRandom(seed) {
  const x = Math.sin(seed * 9999) * 10000;
  return x - Math.floor(x);
}

const STARS_DATA = Array.from({ length: 65 }).map((_, i) => {
  const r1 = pseudoRandom(i * 1.3 + 1);
  const r2 = pseudoRandom(i * 2.7 + 5);
  const r3 = pseudoRandom(i * 4.1 + 9);
  const r4 = pseudoRandom(i * 5.9 + 13);
  return {
    id: i,
    left: r1 * 100,
    top: r2 * 75,
    size: r3 > 0.8 ? 3 : r3 > 0.4 ? 2 : 1.5,
    delay: r4 * 5,
    duration: 2.5 + r1 * 3,
    opacity: 0.3 + r2 * 0.7,
    color: i % 7 === 0 ? "#ffd6ff" : i % 5 === 0 ? "#e0aaff" : "#ffffff",
  };
});

const FIREFLIES_DATA = Array.from({ length: 20 }).map((_, i) => {
  const r1 = pseudoRandom(i * 3.7 + 17);
  const r2 = pseudoRandom(i * 5.3 + 23);
  const r3 = pseudoRandom(i * 7.1 + 29);
  const r4 = pseudoRandom(i * 8.9 + 31);
  return {
    id: i,
    left: 10 + r1 * 80,
    top: 30 + r2 * 60,
    delay: r3 * 6,
    duration: 4 + r4 * 4,
    size: 3 + r1 * 3,
  };
});

export default function BackgroundSky({ interactive = true }) {
  const [shootingStars, setShootingStars] = useState([]);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  // Periodic shooting star
  useEffect(() => {
    const triggerShootingStar = () => {
      const id = Date.now();
      const startX = 20 + Math.random() * 60;
      const startY = 5 + Math.random() * 25;
      setShootingStars((prev) => [...prev.slice(-3), { id, startX, startY }]);
      setTimeout(() => {
        setShootingStars((prev) => prev.filter((s) => s.id !== id));
      }, 1500);
    };

    const interval = setInterval(() => {
      if (Math.random() > 0.3) {
        triggerShootingStar();
      }
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  // Mouse move parallax glow
  const handleMouseMove = (e) => {
    if (!interactive) return;
    const x = (e.clientX / window.innerWidth) * 100;
    const y = (e.clientY / window.innerHeight) * 100;
    setMousePos({ x, y });
  };

  return (
    <div className="celestial-sky-wrapper" onMouseMove={handleMouseMove}>
      {/* Background gradients */}
      <div className="sky-gradient-base" />
      <div
        className="sky-mouse-glow"
        style={{
          background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(200, 130, 255, 0.12) 0%, transparent 40%)`,
        }}
      />

      {/* Moon */}
      <div className="celestial-moon">
        <div className="moon-halo" />
        <div className="moon-crater c1" />
        <div className="moon-crater c2" />
        <div className="moon-crater c3" />
      </div>

      {/* Clouds */}
      <div className="sky-cloud cloud-a" />
      <div className="sky-cloud cloud-b" />
      <div className="sky-cloud cloud-c" />

      {/* Stars */}
      <div className="stars-container">
        {STARS_DATA.map((s) => (
          <span
            key={s.id}
            className="celestial-star"
            style={{
              left: `${s.left}%`,
              top: `${s.top}%`,
              width: `${s.size}px`,
              height: `${s.size}px`,
              backgroundColor: s.color,
              animationDelay: `${s.delay}s`,
              animationDuration: `${s.duration}s`,
              opacity: s.opacity,
            }}
          />
        ))}
      </div>

      {/* Shooting Stars */}
      {shootingStars.map((meteor) => (
        <span
          key={meteor.id}
          className="shooting-star-streak"
          style={{
            left: `${meteor.startX}%`,
            top: `${meteor.startY}%`,
          }}
        />
      ))}

      {/* Fireflies */}
      <div className="fireflies-container">
        {FIREFLIES_DATA.map((f) => (
          <span
            key={f.id}
            className="celestial-firefly"
            style={{
              left: `${f.left}%`,
              top: `${f.top}%`,
              width: `${f.size}px`,
              height: `${f.size}px`,
              animationDelay: `${f.delay}s`,
              animationDuration: `${f.duration}s`,
            }}
          />
        ))}
      </div>

      {/* Horizon Glow */}
      <div className="horizon-purple-glow" />
    </div>
  );
}
