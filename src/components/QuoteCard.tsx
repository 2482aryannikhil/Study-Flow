import Card from "./Card";

const quotes = [
  "Small progress every day adds up.",
  "Discipline beats motivation.",
  "Stay consistent. Success follows.",
  "One chapter at a time.",
  "Trust the process.",
];

function QuoteCard() {
  const quote = quotes[Math.floor(Math.random() * quotes.length)];

  return (
    <Card>
      <h3>💬 Daily Quote</h3>

      <p
        style={{
          marginTop: "15px",
          opacity: 0.8,
        }}
      >
        "{quote}"
      </p>
    </Card>
  );
}

export default QuoteCard;
