import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Preloader from "./components/Preloader/Preloader.jsx";

import HomePage from "./components/HomePage/HomePage.jsx";
import Footer from "./components/HomePage/Footer.jsx";
import Aboutus from "./components/Aboutus/Aboutus.jsx";
import Events from "./components/Eventspage/Events.jsx";
import Team from "./components/Team/Team.jsx";
import Projects from "./components/Projects/Projects.jsx";
import JoinUs from "./components/JoinUs/JoinUs.jsx";
import HistoryTimeline from "./components/History/HistoryTimeline.jsx";
import Achievements from "./components/Achievements/Achievements.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import useLenisScroll from "./utils/smoothScroll";
import Navbar from "./components/HomePage/Navbar.jsx";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { ThemeProvider } from "./contexts/ThemeContext";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";

const AppContent = () => {
  const location = useLocation();
  const showFooter = location.pathname !== "/team" && location.pathname !== "/achievements";

  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<Aboutus />} />
        <Route path="/history" element={<HistoryTimeline />} />
        <Route path="/events" element={<Events />} />
        <Route path="/team" element={<Team />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/recruitment" element={<JoinUs />} />
        <Route path="/achievements" element={<Achievements />} />
      </Routes>
      {showFooter && <Footer />}
    </>
  );
};

const App = () => {
  useLenisScroll();
  const [showPreloader, setShowPreloader] = useState(true);

  return (
    <ThemeProvider>
      {showPreloader && (
        <Preloader 
          onComplete={() => {
            window.scrollTo(0, 0);
            if (window.lenis) window.lenis.scrollTo(0, { immediate: true });
            setShowPreloader(false);
          }} 
        />
      )}
      
      <div 
        className="app-container"
        style={showPreloader ? { position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', overflow: 'hidden' } : {}}
      >
        <Router>
          <AppContent />
        </Router>

          <ToastContainer
            position="top-center"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            pauseOnHover
            theme="colored"
          />

          <SpeedInsights />
        </div>
    </ThemeProvider>
  );
};

export default App;