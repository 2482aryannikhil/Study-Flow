import { useEffect, useState } from "react";

function StudyTimer() {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("daily-targets");
    return saved ? JSON.parse(saved) : [];
  });

  const [selectedTask, setSelectedTask] = useState<number | null>(null);
  useEffect(() => {
    let interval: number | undefined;

    if (running) {
      interval = window.setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [running]);

  function formatTime(total: number) {
    const hrs = Math.floor(total / 3600)
      .toString()
      .padStart(2, "0");

    const mins = Math.floor((total % 3600) / 60)
      .toString()
      .padStart(2, "0");

    const secs = (total % 60).toString().padStart(2, "0");

    return `${hrs}:${mins}:${secs}`;
  }

  function stopTimer() {
    saveSession();
    setRunning(false);
    setSeconds(0);
    setSelectedTask(null);
  }
  function saveSession() {
    if (selectedTask === null || seconds === 0) return;

    const updatedTasks = tasks.map((task: any) => {
      if (task.id !== selectedTask) return task;

      return {
        ...task,
        studySeconds: (task.studySeconds || 0) + seconds,
      };
    });

    localStorage.setItem("daily-targets", JSON.stringify(updatedTasks));

    setTasks(updatedTasks);
  }
  function resetTimer() {
    setRunning(false);
    setSeconds(0);
  }

  return (
    <div className="timer-page">
      <div className="timer-glass">
        <h2>Deep Focus</h2>
        <div className="focus-list">
          <h3>Today's Focus</h3>

          {tasks.length === 0 ? (
            <p>No daily targets added.</p>
          ) : (
            tasks
              .filter((task: any) => !task.completed)
              .map((task: any) => (
                <label key={task.id} className="focus-task">
                  <input
                    type="radio"
                    checked={selectedTask === task.id}
                    onChange={() => setSelectedTask(task.id)}
                    disabled={running}
                  />

                  <div className="focus-task-info">
                    <span>{task.title}</span>

                    <small>
                      ⏱ {Math.floor((task.studySeconds || 0) / 3600)}h{" "}
                      {Math.floor(((task.studySeconds || 0) % 3600) / 60)}m
                    </small>
                  </div>
                </label>
              ))
          )}
        </div>
        <h1 className="timer">{formatTime(seconds)}</h1>

        <div className="timer-buttons">
          {!running ? (
            <button onClick={() => setRunning(true)}>▶ Start</button>
          ) : (
            <button onClick={() => setRunning(false)}>⏸ Pause</button>
          )}

          <button onClick={stopTimer}>⏹ Stop</button>

          <button onClick={resetTimer}>↺ Reset</button>
        </div>
      </div>
    </div>
  );
}

export default StudyTimer;
