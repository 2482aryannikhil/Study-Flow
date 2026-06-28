import { useAmbient } from "../context/AmbientContext";

const sounds = [
  {
    name: "Rain",
    emoji: "🌧️",
    file: "/sounds/rain.mp3",
    description: "Soft rainfall on a cozy evening",
  },
  {
    name: "Forest",
    emoji: "🌲",
    file: "/sounds/forest.mp3",
    description: "Birds and leaves rustling",
  },
  {
    name: "Cafe",
    emoji: "☕",
    file: "/sounds/cafe.mp3",
    description: "Busy coffee shop ambience",
  },
  {
    name: "Library",
    emoji: "📚",
    file: "/sounds/library.mp3",
    description: "Quiet study atmosphere",
  },
  {
    name: "Night",
    emoji: "🌌",
    file: "/sounds/night.mp3",
    description: "Crickets and peaceful night",
  },
];

function AmbientPage() {
  const { play, pause, current, playing, volume, setVolume } = useAmbient();

  return (
    <div className="ambient-page">
      <h1>🌧 Ambient Sounds</h1>

      <p className="ambient-subtitle">
        Pick a relaxing background while studying.
      </p>

      <div className="ambient-grid">
        {sounds.map((sound) => {
          const active = current?.file === sound.file;

          return (
            <div
              key={sound.file}
              className={`ambient-card ${active ? "active" : ""}`}
            >
              <div className="ambient-emoji">{sound.emoji}</div>

              <h2>{sound.name}</h2>

              <p>{sound.description}</p>

              {active && playing ? (
                <button onClick={pause}>⏸</button>
              ) : (
                <button onClick={() => play(sound)}>▶</button>
              )}
            </div>
          );
        })}
      </div>

      <div className="volume-card">
        <h3>🔊 Volume</h3>

        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
        />
      </div>
    </div>
  );
}

export default AmbientPage;
