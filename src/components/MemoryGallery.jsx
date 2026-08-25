import { useState } from "react";
import { Sparkles, Moon, Shield, Compass, Heart, Star, Plus, X, Tag } from "lucide-react";
import { bethData } from "../data/bethContent";
import { audioEngine } from "../utils/audioEngine";
import "./MemoryGallery.css";

const ICON_MAP = {
  Moon: Moon,
  Sparkles: Sparkles,
  Shield: Shield,
  Compass: Compass,
  Heart: Heart,
  Star: Star,
};

const CATEGORIES = ["All", "Unforgettable", "Chaos & Joy", "Best Friends", "Milestones"];

export default function MemoryGallery() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [flippedCards, setFlippedCards] = useState({});
  const [customMemories, setCustomMemories] = useState(() => {
    try {
      const saved = localStorage.getItem("beth_custom_memories");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newNote, setNewNote] = useState("");
  const [newCategory, setNewCategory] = useState("Best Friends");

  const allMemories = [...bethData.memories, ...customMemories];

  const filteredMemories =
    selectedCategory === "All"
      ? allMemories
      : allMemories.filter((m) => m.category === selectedCategory);

  const toggleFlip = (id) => {
    audioEngine.playChime();
    setFlippedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleAddMemory = (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newNote.trim()) return;
    audioEngine.playChime();

    const newMem = {
      id: Date.now(),
      title: newTitle,
      category: newCategory,
      date: "New Chapter",
      note: newNote,
      tag: "Special Memory",
      accent: "#f472b6",
      icon: "Star",
    };

    const updated = [newMem, ...customMemories];
    setCustomMemories(updated);
    localStorage.setItem("beth_custom_memories", JSON.stringify(updated));

    setNewTitle("");
    setNewNote("");
    setIsModalOpen(false);
  };

  return (
    <section id="memories" className="beth-card-section memory-gallery-section">
      <div className="section-header">
        <div className="section-tag">
          <Sparkles size={14} /> THE CONSTELLATION VAULT
        </div>
        <h2 className="section-heading">Memory Gallery & Polaroids</h2>
        <p className="section-subtext">
          Click any polaroid to flip it over and reveal the story behind the moment.
        </p>
      </div>

      {/* Fairy Lights Top Line */}
      <div className="fairy-lights-line">
        {Array.from({ length: 14 }).map((_, i) => (
          <span key={i} className="fairy-bulb" style={{ animationDelay: `${(i % 5) * 0.4}s` }} />
        ))}
      </div>

      {/* Category Pills */}
      <div className="memory-filter-tabs">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={`cat-pill ${selectedCategory === cat ? "active" : ""}`}
            onClick={() => {
              audioEngine.playChime();
              setSelectedCategory(cat);
            }}
          >
            {cat}
          </button>
        ))}

        <button
          className="cat-pill add-memory-pill"
          onClick={() => {
            audioEngine.playChime();
            setIsModalOpen(true);
          }}
        >
          <Plus size={14} /> Add Memory
        </button>
      </div>

      {/* Grid of Polaroid Cards */}
      <div className="polaroid-grid">
        {filteredMemories.map((mem) => {
          const IconComponent = ICON_MAP[mem.icon] || Star;
          const isFlipped = !!flippedCards[mem.id];

          return (
            <div
              key={mem.id}
              className={`polaroid-card-wrapper ${isFlipped ? "flipped" : ""}`}
              onClick={() => toggleFlip(mem.id)}
            >
              <div className="polaroid-card-inner">
                {/* Front Side */}
                <div className="polaroid-face polaroid-front">
                  <div className="washi-tape" />
                  <div
                    className="polaroid-photo-frame"
                    style={{
                      background: `radial-gradient(circle at center, ${mem.accent || "#c084fc"}33 0%, rgba(20, 10, 35, 0.9) 100%)`,
                      borderColor: `${mem.accent || "#c084fc"}55`,
                    }}
                  >
                    <div className="photo-art-circle" style={{ color: mem.accent || "#c084fc" }}>
                      <IconComponent size={38} className="photo-icon" />
                    </div>
                    <span className="photo-category-tag">
                      <Tag size={10} /> {mem.category}
                    </span>
                  </div>

                  <div className="polaroid-caption">
                    <h4 className="polaroid-title">{mem.title}</h4>
                    <span className="polaroid-date">{mem.date}</span>
                    <span className="flip-prompt">Click to flip ✦</span>
                  </div>
                </div>

                {/* Back Side */}
                <div className="polaroid-face polaroid-back">
                  <div className="washi-tape back-tape" />
                  <div className="back-content">
                    <span className="back-tag" style={{ color: mem.accent || "#f472b6" }}>
                      ✦ {mem.tag || mem.category} ✦
                    </span>
                    <h4 className="back-title">{mem.title}</h4>
                    <p className="back-note">"{mem.note}"</p>
                    <span className="back-flip-prompt">Click to flip back</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Memory Modal */}
      {isModalOpen && (
        <div className="memory-modal-backdrop" onClick={() => setIsModalOpen(false)}>
          <div className="memory-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Add A New Memory ✦</h3>
              <button className="modal-close-btn" onClick={() => setIsModalOpen(false)}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddMemory} className="memory-modal-form">
              <label>
                Memory Title
                <input
                  type="text"
                  placeholder="e.g. That Rainy Afternoon"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  required
                />
              </label>

              <label>
                Category
                <select value={newCategory} onChange={(e) => setNewCategory(e.target.value)}>
                  {CATEGORIES.filter((c) => c !== "All").map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                The Story / Why it's special
                <textarea
                  rows={3}
                  placeholder="Describe what made this moment unforgettable..."
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  required
                />
              </label>

              <button type="submit" className="save-memory-btn">
                <Sparkles size={15} /> Pin to Constellation Wall
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
