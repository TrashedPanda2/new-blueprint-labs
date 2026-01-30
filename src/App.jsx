import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import BlueprintBuilder from './components/BlueprintBuilder';
import BlueprintList from './components/BlueprintList';
import Gallery from './components/Gallery';
import BlueprintPools from './components/BlueprintPools';
import CamoTracker from './components/CamoTracker';
import Credits from './components/Credits';
import DiscordSupportModal from './components/DiscordSupportModal';
import { Analytics } from "@vercel/analytics/next"
import './App.css';

function AppContent() {
  const [blueprints, setBlueprints] = useState([]);
  const [editingBlueprint, setEditingBlueprint] = useState(null);
  const location = useLocation();

  // Update page title based on route
  useEffect(() => {
    if (location.pathname === '/gallery') {
      document.title = 'Blueprint Labs - Showcase';
    } else if (location.pathname === '/generator') {
      document.title = 'Blueprint Labs - Generator';
    } else if (location.pathname === '/camos') {
      document.title = 'Blueprint Labs - Camo Tracker';
    } else {
      document.title = 'Blueprint Labs - Pools';
    }
  }, [location.pathname]);

  // Load blueprints from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('blueprints');
    if (saved) {
      setBlueprints(JSON.parse(saved));
    }
  }, []);

  // Save blueprints to localStorage
  const saveBlueprints = (updated) => {
    localStorage.setItem('blueprints', JSON.stringify(updated));
    setBlueprints(updated);
  };

  const addBlueprint = (blueprint) => {
    const newBlueprint = {
      ...blueprint,
      id: Date.now()
    };
    const updated = [...blueprints, newBlueprint];
    saveBlueprints(updated);
  };

  const updateBlueprint = (id, updated) => {
    const updatedList = blueprints.map(bp =>
      bp.id === id ? { ...updated, id } : bp
    );
    saveBlueprints(updatedList);
    setEditingBlueprint(null);
  };

  const deleteBlueprint = (id) => {
    const updated = blueprints.filter(bp => bp.id !== id);
    saveBlueprints(updated);
    if (editingBlueprint?.id === id) {
      setEditingBlueprint(null);
    }
  };

  return (
    <>
<header className="app-header">
  <div className="header-left">
    <h1>
      <img src="/logo.png" alt="Blueprint Labs Logo" className="header-logo" />
      Blueprint Labs
    </h1>

    <nav className="app-nav">
      <a href="/" className="nav-link">Pools</a>
      <a href="/generator" className="nav-link">Generator</a>
      <a href="/gallery" className="nav-link">Showcase</a>
      <a href="/camos" className="nav-link">Camo Tracker</a>
    </nav>
  </div>

  <div className="header-announcement">
    <h3>Announcements</h3>
    <p>+70 Blueprints and multiple pools added! More coming soon</p>
  </div>
</header>


      {/* PAGE CONTENT */}
      <main className="app-main">
        <Routes>
          <Route path="/" element={<BlueprintPools />} />
    <Route
  path="/generator"
  element={
    <div className="builder-layout">
      <div className="builder-section-container">
        <BlueprintBuilder
          blueprint={editingBlueprint}
          onAdd={addBlueprint}
          onUpdate={updateBlueprint}
          onClear={() => setEditingBlueprint(null)}
        />
      </div>

      <div className="list-section-container">
        <BlueprintList
          blueprints={blueprints}
          onEdit={setEditingBlueprint}
          onDelete={deleteBlueprint}
        />
      </div>
    </div>
  }
/>


          <Route path="/gallery" element={<Gallery />} />
          <Route path="/pools" element={<BlueprintPools />} />
          <Route path="/camos" element={<CamoTracker />} />
        </Routes>
      </main>

      {/* GLOBAL FLOATING DISCORD PANEL */}
      <DiscordSupportModal />
    </>
  );
}

function App() {
  return (
    <Router>
      <Credits />
      <AppContent />
    </Router>
  );
}

export default App;
