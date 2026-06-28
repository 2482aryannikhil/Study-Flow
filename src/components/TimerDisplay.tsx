type Props = {
  seconds: number;
};

function TimerDisplay({ seconds }: Props) {
  function format(total: number) {
    const h = Math.floor(total / 3600)
      .toString()
      .padStart(2, "0");

    const m = Math.floor((total % 3600) / 60)
      .toString()
      .padStart(2, "0");

    const s = (total % 60).toString().padStart(2, "0");

    return `${h}:${m}:${s}`;
  }

  return <h1 className="focus-timer">{format(seconds)}</h1>;
}

export default TimerDisplay;
