import { createContext, useContext, useRef, useState, ReactNode } from "react";

type Sound = {
  name: string;
  file: string;
};

type AmbientContextType = {
  current: Sound | null;
  playing: boolean;
  volume: number;

  play: (sound: Sound) => void;
  pause: () => void;
  setVolume: (volume: number) => void;
};

const AmbientContext = createContext<AmbientContextType | null>(null);

export function AmbientProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef(new Audio());

  const [current, setCurrent] = useState<Sound | null>(null);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolumeState] = useState(0.5);

  function play(sound: Sound) {
    if (current && current.file === sound.file) {
      audioRef.current.play();
      setPlaying(true);
      return;
    }

    audioRef.current.pause();

    audioRef.current = new Audio(sound.file);

    audioRef.current.loop = true;
    audioRef.current.volume = volume;

    audioRef.current.play();

    setCurrent(sound);
    setPlaying(true);
  }

  function pause() {
    audioRef.current.pause();
    setPlaying(false);
  }

  function setVolume(volume: number) {
    audioRef.current.volume = volume;

    setVolumeState(volume);
  }

  return (
    <AmbientContext.Provider
      value={{
        current,
        playing,
        volume,
        play,
        pause,
        setVolume,
      }}
    >
      {children}
    </AmbientContext.Provider>
  );
}

export function useAmbient() {
  const context = useContext(AmbientContext);

  if (!context) {
    throw new Error("useAmbient must be used inside AmbientProvider");
  }

  return context;
}
