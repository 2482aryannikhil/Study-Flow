function TaskSelector() {
  const tasks = JSON.parse(localStorage.getItem("daily-targets") || "[]");

  return (
    <div className="task-selector">
      <h3>Today's Targets</h3>

      {tasks.length === 0 ? (
        <p>No tasks today.</p>
      ) : (
        tasks.map((task: any) => (
          <label key={task.id}>
            <input type="radio" />

            {task.title}
          </label>
        ))
      )}
    </div>
  );
}

export default TaskSelector;
