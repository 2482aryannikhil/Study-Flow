function FocusHeader() {
  const hour = new Date().getHours();

  let greeting = "Good Evening 🌙";

  if (hour < 12) greeting = "Good Morning ☀";
  else if (hour < 18) greeting = "Good Afternoon 🌤";

  return (
    <div className="focus-header">
      <h2>🌧 Rain Ambience</h2>

      <p>{greeting}</p>
    </div>
  );
}

export default FocusHeader;
