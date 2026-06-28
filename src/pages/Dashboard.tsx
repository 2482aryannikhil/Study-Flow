import Header from "../components/Header";
import QuoteCard from "../components/QuoteCard";
import QuickStats from "../components/QuickStats";

function Dashboard() {
  const settings = JSON.parse(
    localStorage.getItem("studyflow-settings") || "{}"
  );

  const showGreeting = settings.showGreeting ?? true;
  const showQuote = settings.showQuote ?? true;

  return (
    <>
      {showGreeting && <Header />}

      <div className="dashboard-grid">
        {showQuote && <QuoteCard />}

        <QuickStats />
      </div>
    </>
  );
}

export default Dashboard;
