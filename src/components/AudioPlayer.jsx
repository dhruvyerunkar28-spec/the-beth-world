import { useState } from "react";
import { Volume2, VolumeX, SkipForward, Play, Pause, Sparkles } from "lucide-react";
import { audioEngine } from "../utils/audioEngine";
import "./AudioPlayer.css";

const VIBE_NAMES = ["Starlit Lo-Fi", "Celestial Chimes", "Midnight Serenity"];

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.4);
  const [trackIndex, setTrackIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  const togglePlay = () => {
    audioEngine.playChime();
    if (isPlaying) {
      audioEngine.stopAmbientMusic();
      setIsPlaying(false);
    } else {
      audioEngine.startAmbientMusic();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    const muted = audioEngine.toggleMute();
    setIsMuted(muted);
    if (!muted && !isPlaying) {
      audioEngine.startAmbientMusic();
      setIsPlaying(true);
    }
  };

  const handleVolumeChange = (e) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    audioEngine.setVolume(val);
  };

  const nextTrack = () => {
    audioEngine.playChime();
    audioEngine.nextTrack();
    setTrackIndex((prev) => (prev + 1) % VIBE_NAMES.length);
  };

  return (
    <div className={`audio-player-wrapper ${isExpanded ? "expanded" : ""}`}>
      <div className="audio-player-pill" onClick={() => setIsExpanded(!isExpanded)}>
        <button
          className={`play-toggle-btn ${isPlaying ? "playing" : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            togglePlay();
          }}
          title={isPlaying ? "Pause Ambient Music" : "Play Ambient Music"}
        >
          {isPlaying ? <Pause size={15} /> : <Play size={15} />}
        </button>

        <div className="audio-info">
          <span className="vibe-title">
            <Sparkles size={12} className="vibe-sparkle" /> {VIBE_NAMES[trackIndex]}
          </span>
          <div className="visualizer-bars">
            <span className={`v-bar ${isPlaying ? "animating" : ""}`} style={{ animationDelay: "0ms" }} />
            <span className={`v-bar ${isPlaying ? "animating" : ""}`} style={{ animationDelay: "200ms" }} />
            <span className={`v-bar ${isPlaying ? "animating" : ""}`} style={{ animationDelay: "400ms" }} />
            <span className={`v-bar ${isPlaying ? "animating" : ""}`} style={{ animationDelay: "150ms" }} />
          </div>
        </div>

        <button
          className="mute-btn"
          onClick={(e) => {
            e.stopPropagation();
            toggleMute();
          }}
          title={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </button>
      </div>

      {isExpanded && (
        <div className="audio-expanded-controls">
          <div className="volume-slider-row">
            <Volume2 size={14} className="slider-icon" />
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={handleVolumeChange}
              className="volume-slider"
            />
          </div>

          <button className="next-vibe-btn" onClick={nextTrack}>
            <SkipForward size={14} /> Switch Vibe
          </button>
        </div>
      )}
    </div>
  );
}
