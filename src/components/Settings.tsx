import { useEffect, useRef, useState } from "react";
import { useTheme } from "../context/ThemeContext";

function Settings() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { theme, setTheme } = useTheme();

  const [showQuote, setShowQuote] = useState(true);
  const [showGreeting, setShowGreeting] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("studyflow-settings");

    if (saved) {
      const settings = JSON.parse(saved);

      setShowQuote(settings.showQuote ?? true);
      setShowGreeting(settings.showGreeting ?? true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "studyflow-settings",
      JSON.stringify({
        showQuote,
        showGreeting,
      })
    );
  }, [showQuote, showGreeting]);

  function exportData() {
    const data = {
      dailyTargets: JSON.parse(localStorage.getItem("daily-targets") || "[]"),
      monthlyGoals: JSON.parse(localStorage.getItem("monthly-goals") || "[]"),
      tracker: JSON.parse(localStorage.getItem("tracker") || "[]"),
      settings: JSON.parse(localStorage.getItem("studyflow-settings") || "{}"),
      theme: localStorage.getItem("theme"),
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "studyflow-backup.json";
    a.click();

    URL.revokeObjectURL(url);
  }

  function importData(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result as string);

        localStorage.setItem(
          "daily-targets",
          JSON.stringify(data.dailyTargets || [])
        );

        localStorage.setItem(
          "monthly-goals",
          JSON.stringify(data.monthlyGoals || [])
        );

        localStorage.setItem("tracker", JSON.stringify(data.tracker || []));

        localStorage.setItem(
          "studyflow-settings",
          JSON.stringify(data.settings || {})
        );

        if (data.theme) {
          localStorage.setItem("theme", data.theme);
          setTheme(data.theme);
        }

        alert("Data imported successfully!");

        window.location.reload();
      } catch {
        alert("Invalid backup file.");
      }
    };

    reader.readAsText(file);
  }

  function resetData() {
    if (!window.confirm("Delete ALL StudyFlow data?")) return;

    localStorage.clear();

    alert("All data deleted.");

    window.location.reload();
  }

  return (
    <div className="settings-page">
      <h1>⚙️ Settings</h1>

      <section>
        <h2>🎨 Themes</h2>

        <div className="theme-grid">
          <button
            className={theme === "rain" ? "active-theme" : ""}
            onClick={() => setTheme("rain")}
          >
            🌧
            <br />
            Cozy Rain Morning
          </button>

          <button
            className={theme === "seoul" ? "active-theme" : ""}
            onClick={() => setTheme("seoul")}
          >
            🌆
            <br />
            Seoul Sunset
          </button>

          <button
            className={theme === "cafe" ? "active-theme" : ""}
            onClick={() => setTheme("cafe")}
          >
            ☕
            <br />
            Cafeteria
          </button>

          <button
            className={theme === "night" ? "active-theme" : ""}
            onClick={() => setTheme("night")}
          >
            🌙
            <br />
            Night
          </button>
        </div>
      </section>

      <section>
        <h2>📊 Data</h2>

        <button onClick={exportData}>📤 Export Data</button>

        <button onClick={() => fileInputRef.current?.click()}>
          📥 Import Data
        </button>

        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          hidden
          onChange={importData}
        />

        <button onClick={resetData}>🗑 Reset All Data</button>
      </section>

      <section>
        <h2>📚 Dashboard</h2>

        <label>
          <input
            type="checkbox"
            checked={showQuote}
            onChange={() => setShowQuote(!showQuote)}
          />
          Show Motivational Quote
        </label>

        <label>
          <input
            type="checkbox"
            checked={showGreeting}
            onChange={() => setShowGreeting(!showGreeting)}
          />
          Show Greeting
        </label>
      </section>

      <section>
        <h2>ℹ️ About</h2>

        <p>
          <strong>StudyFlow v1.0</strong>
        </p>

        <p>Made with ❤️ by Aryan</p>
      </section>
    </div>
  );
}

export default Settings;
