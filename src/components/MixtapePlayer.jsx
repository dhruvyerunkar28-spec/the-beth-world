import { useState } from "react";
import { Disc, Play, Pause, SkipForward, SkipBack, Sparkles } from "lucide-react";
import { bethData } from "../data/bethContent";
import { audioEngine } from "../utils/audioEngine";
import "./MixtapePlayer.css";

export default function MixtapePlayer() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const track = bethData.mixtape[currentTrackIndex];

  const handlePlayToggle = () => {
    audioEngine.playChime();
    if (isPlaying) {
      audioEngine.stopAmbientMusic();
      setIsPlaying(false);
    } else {
      audioEngine.startAmbientMusic();
      setIsPlaying(true);
    }
  };

  const nextTrack = () => {
    audioEngine.playChime();
    audioEngine.nextTrack();
    setCurrentTrackIndex((prev) => (prev + 1) % bethData.mixtape.length);
  };

  const prevTrack = () => {
    audioEngine.playChime();
    audioEngine.nextTrack();
    setCurrentTrackIndex(
      (prev) => (prev - 1 + bethData.mixtape.length) % bethData.mixtape.length
    );
  };

  return (
    <section id="mixtape" className="beth-card-section mixtape-section">
      <div className="section-header">
        <div className="section-tag">
          <Disc size={14} /> NOSTALGIA SOUNDTRACK
        </div>
        <h2 className="section-heading">Beth's Vintage Mixtape</h2>
        <p className="section-subtext">
          A retro cassette dedicated to the soundtrack of our journey and chapters together.
        </p>
      </div>

      <div className="mixtape-container">
        {/* Retro Cassette Graphic */}
        <div className="cassette-tape">
          <div className="tape-header">
            <span className="tape-brand">BETH & DHRUV MEMORY MIX</span>
            <span className="tape-side">SIDE A ✦</span>
          </div>

          <div className="tape-label-window">
            <div className={`tape-reel left-reel ${isPlaying ? "spinning" : ""}`}>
              <div className="reel-teeth" />
            </div>

            <div className="tape-window-center">
              <div className="tape-spool-line" />
              <span className="tape-current-name">{track.title}</span>
            </div>

            <div className={`tape-reel right-reel ${isPlaying ? "spinning" : ""}`}>
              <div className="reel-teeth" />
            </div>
          </div>

          <div className="tape-bottom-screw-row">
            <span className="screw s1" />
            <div className="tape-notch" />
            <span className="screw s2" />
          </div>
        </div>

        {/* Player Controls & Info */}
        <div className="mixtape-controls-card">
          <div className="track-details">
            <span className="track-vibe-tag">
              <Sparkles size={12} /> {track.vibe}
            </span>
            <h3 className="track-title">{track.title}</h3>
            <p className="track-artist">{track.artist}</p>
            <p className="track-description">"{track.description}"</p>
          </div>

          <div className="mixtape-action-row">
            <button className="tape-nav-btn" onClick={prevTrack} title="Previous Track">
              <SkipBack size={18} />
            </button>

            <button
              className={`tape-play-main-btn ${isPlaying ? "active-playing" : ""}`}
              onClick={handlePlayToggle}
              title={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </button>

            <button className="tape-nav-btn" onClick={nextTrack} title="Next Track">
              <SkipForward size={18} />
            </button>
          </div>

          {/* Tracklist Selector */}
          <div className="track-playlist-pills">
            {bethData.mixtape.map((t, idx) => (
              <button
                key={t.id}
                className={`playlist-item-btn ${currentTrackIndex === idx ? "active" : ""}`}
                onClick={() => {
                  audioEngine.playChime();
                  setCurrentTrackIndex(idx);
                }}
              >
                <span className="track-idx">0{idx + 1}</span>
                <span className="track-name-short">{t.title}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
