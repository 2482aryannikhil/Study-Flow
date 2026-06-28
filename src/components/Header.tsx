function Header() {
  const hour = new Date().getHours();

  let greeting = "Good Evening 🌙";

  if (hour < 12) greeting = "Good Morning ☀️";
  else if (hour < 18) greeting = "Good Afternoon 🌤️";

  return (
    <div>
      <h1>{greeting}</h1>
      <p>
        {new Date().toLocaleDateString("en-IN", {
          weekday: "long",
          day: "numeric",
          month: "long",
        })}
      </p>
    </div>
  );
}

export default Header;
