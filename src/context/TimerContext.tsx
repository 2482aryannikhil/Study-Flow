import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type TimerContextType = {
  seconds: number;
  running: boolean;

  start: () => void;
  pause: () => void;
  stop: () => void;
  reset: () => void;

  selectedTask: number | null;
  setSelectedTask: (id: number | null) => void;
};

const TimerContext = createContext<TimerContextType | null>(null);

export function TimerProvider({ children }: { children: ReactNode }) {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const [selectedTask, setSelectedTask] = useState<number | null>(null);

  useEffect(() => {
    if (!running) return;

    const interval = window.setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [running]);

  function start() {
    setRunning(true);
  }

  function pause() {
    setRunning(false);
  }

  function stop() {
    setRunning(false);
  }

  function reset() {
    setRunning(false);
    setSeconds(0);
    setSelectedTask(null);
  }

  return (
    <TimerContext.Provider
      value={{
        seconds,
        running,
        start,
        pause,
        stop,
        reset,
        selectedTask,
        setSelectedTask,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
}

export function useTimer() {
  const context = useContext(TimerContext);

  if (!context) throw new Error("TimerProvider missing");

  return context;
}
