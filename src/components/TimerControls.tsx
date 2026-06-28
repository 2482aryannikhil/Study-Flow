type Props = {
  running: boolean;

  start: () => void;

  pause: () => void;

  reset: () => void;
};

function TimerControls({
  running,

  start,

  pause,

  reset,
}: Props) {
  return (
    <div className="focus-controls">
      <button onClick={running ? pause : start}>{running ? "⏸" : "▶"}</button>

      <button onClick={reset}>↺</button>
    </div>
  );
}

export default TimerControls;
