import { useEffect, useState } from "react";

function QuickStats() {
  const [streak, setStreak] = useState(0);
  const [focusToday, setFocusToday] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // ---------- DAILY TARGETS ----------
    const tasks = JSON.parse(localStorage.getItem("daily-targets") || "[]");

    const totalSeconds = tasks.reduce(
      (sum: number, task: any) => sum + (task.studySeconds || 0),
      0
    );

    setFocusToday(totalSeconds);

    // ---------- SYLLABUS ----------
    const tracker = JSON.parse(localStorage.getItem("tracker") || "[]");

    let total = 0;
    let done = 0;

    tracker.forEach((chapter: any) => {
      const items = [
        chapter.lectures,
        chapter.module,
        chapter.pyqs,
        chapter.sidebook,
        chapter.revision,
      ];

      items.forEach((item: boolean) => {
        total++;

        if (item) done++;
      });
    });

    if (total > 0) {
      setProgress(Math.round((done / total) * 100));
    }

    // ---------- STREAK ----------
    const saved = Number(localStorage.getItem("study-streak") || "0");

    setStreak(saved);
  }, []);

  function format(seconds: number) {
    const hrs = Math.floor(seconds / 3600);

    const mins = Math.floor((seconds % 3600) / 60);

    return `${hrs}h ${mins}m`;
  }

  return (
    <div className="stats-grid">
      <div className="stat-card">
        <h1>🔥</h1>

        <h2>{streak}</h2>

        <p>Day Streak</p>
      </div>

      <div className="stat-card">
        <h1>⏱</h1>

        <h2>{format(focusToday)}</h2>

        <p>Focused Today</p>
      </div>

      <div className="stat-card">
        <h1>📚</h1>

        <h2>{progress}%</h2>

        <p>Syllabus Done</p>
      </div>
    </div>
  );
}

export default QuickStats;
