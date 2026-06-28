import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

import Sidebar from "./components/Sidebar";
import PageTransition from "./components/PageTransition";
import LoadingScreen from "./components/LoadingScreen";

import Dashboard from "./pages/Dashboard";
import DailyTargetsPage from "./pages/DailyTargetsPage";
import MonthlyGoalsPage from "./pages/MonthlyGoalsPage";
import SyllabusTrackerPage from "./pages/SyllabusTrackerPage";
import StudyTimerPage from "./pages/StudyTimerPage";
import AmbientPage from "./pages/AmbientPage";
import SettingsPage from "./pages/SettingsPage";

import { ThemeProvider } from "./context/ThemeContext";
import { AmbientProvider } from "./context/AmbientContext";
import { TimerProvider } from "./context/TimerContext";

import "./styles/global.css";

function App() {
  const location = useLocation();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <ThemeProvider>
        <LoadingScreen />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <AmbientProvider>
        <TimerProvider>
          <div className="app">
            <Sidebar />

            <main className="content">
              <AnimatePresence mode="wait">
                <Routes location={location} key={location.pathname}>
                  <Route
                    path="/"
                    element={
                      <PageTransition>
                        <Dashboard />
                      </PageTransition>
                    }
                  />

                  <Route
                    path="/daily"
                    element={
                      <PageTransition>
                        <DailyTargetsPage />
                      </PageTransition>
                    }
                  />

                  <Route
                    path="/monthly"
                    element={
                      <PageTransition>
                        <MonthlyGoalsPage />
                      </PageTransition>
                    }
                  />

                  <Route
                    path="/tracker"
                    element={
                      <PageTransition>
                        <SyllabusTrackerPage />
                      </PageTransition>
                    }
                  />

                  <Route
                    path="/timer"
                    element={
                      <PageTransition>
                        <StudyTimerPage />
                      </PageTransition>
                    }
                  />

                  <Route
                    path="/ambient"
                    element={
                      <PageTransition>
                        <AmbientPage />
                      </PageTransition>
                    }
                  />

                  <Route
                    path="/settings"
                    element={
                      <PageTransition>
                        <SettingsPage />
                      </PageTransition>
                    }
                  />
                </Routes>
              </AnimatePresence>
            </main>
          </div>
        </TimerProvider>
      </AmbientProvider>
    </ThemeProvider>
  );
}

export default App;
