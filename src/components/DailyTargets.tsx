import { useEffect, useState } from "react";
import { DailyTarget, Subject } from "../types/subject";
import { FiTrash2 } from "react-icons/fi";

function DailyTargets() {
  const [targets, setTargets] = useState<DailyTarget[]>(() => {
    const saved = localStorage.getItem("daily-targets");
    return saved ? JSON.parse(saved) : [];
  });

  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState<Subject>("Mathematics");

  useEffect(() => {
    localStorage.setItem("daily-targets", JSON.stringify(targets));
  }, [targets]);

  function addTarget() {
    if (!title.trim()) return;

    setTargets([
      ...targets,
      {
        id: Date.now(),
        title,
        subject,
        completed: false,
        studySeconds: 0,
      },
    ]);

    setTitle("");
  }

  function toggle(id: number) {
    setTargets(
      targets.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  }

  function remove(id: number) {
    setTargets(targets.filter((t) => t.id !== id));
  }

  return (
    <div>
      <h1>📅 Daily Targets</h1>

      <div className="add-target">
        <input
          placeholder="Today's target..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="subject-picker">
          {(["Mathematics", "Physics", "Chemistry"] as Subject[]).map(
            (item) => (
              <button
                key={item}
                type="button"
                className={`subject-chip ${subject === item ? "selected" : ""}`}
                onClick={() => setSubject(item)}
              >
                {item === "Mathematics" && "📘"}
                {item === "Physics" && "⚛️"}
                {item === "Chemistry" && "🧪"}

                {item}
              </button>
            )
          )}
        </div>
        <button onClick={addTarget}>Add</button>
      </div>

      <div className="target-list">
        {targets.length === 0 ? (
          <p>No targets for today.</p>
        ) : (
          targets.map((target) => (
            <div className="target-item" key={target.id}>
              <input
                type="checkbox"
                checked={target.completed}
                onChange={() => toggle(target.id)}
              />

              <div className="target-info">
                <strong>{target.title}</strong>

                <span
                  className={`subject-badge ${target.subject.toLowerCase()}`}
                >
                  {target.subject}
                </span>
              </div>

              <button className="delete-btn" onClick={() => remove(target.id)}>
                <FiTrash2 />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default DailyTargets;
