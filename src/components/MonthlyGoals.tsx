import { useEffect, useState } from "react";
import { MonthlyGoal, Subject } from "../types/monthly";
import { FiTrash2 } from "react-icons/fi";

function MonthlyGoals() {
  const [goals, setGoals] = useState<MonthlyGoal[]>(() => {
    const saved = localStorage.getItem("monthly-goals");
    return saved ? JSON.parse(saved) : [];
  });

  const [chapter, setChapter] = useState({
    Mathematics: "",
    Physics: "",
    Chemistry: "",
  });

  useEffect(() => {
    localStorage.setItem("monthly-goals", JSON.stringify(goals));
  }, [goals]);

  function addChapter(subject: Subject) {
    const title = chapter[subject].trim();

    if (!title) return;

    setGoals([
      ...goals,
      {
        id: Date.now(),
        title,
        subject,
        completed: false,
      },
    ]);

    setChapter({
      ...chapter,
      [subject]: "",
    });
  }

  function toggle(id: number) {
    setGoals(
      goals.map((g) =>
        g.id === id ? { ...g, completed: !g.completed } : g
      )
    );
  }

  function remove(id: number) {
    setGoals(goals.filter((g) => g.id !== id));
  }

  const subjects: Subject[] = [
    "Mathematics",
    "Physics",
    "Chemistry",
  ];

  return (
    <div>
      <h1>🎯 Monthly Goals</h1>

      {subjects.map((subject) => (
        <div key={subject} className="monthly-section">
          <h2>{subject}</h2>

          <div className="monthly-input">
            <input
              placeholder="Add chapter..."
              value={chapter[subject]}
              onChange={(e) =>
                setChapter({
                  ...chapter,
                  [subject]: e.target.value,
                })
              }
            />

            <button onClick={() => addChapter(subject)}>
              + Add
            </button>
          </div>

          {goals
            .filter((g) => g.subject === subject)
            .map((goal) => (
              <div key={goal.id} className="target-item">
                <input
                  type="checkbox"
                  checked={goal.completed}
                  onChange={() => toggle(goal.id)}
                />

                <div className="target-info">
                  <strong>{goal.title}</strong>
                </div>

                <button
                  className="delete-btn"
                  onClick={() => remove(goal.id)}
                >
                  <FiTrash2 />
                </button>
              </div>
            ))}
        </div>
      ))}
    </div>
  );
}

export default MonthlyGoals;