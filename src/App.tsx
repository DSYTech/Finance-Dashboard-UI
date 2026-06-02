//import React from 'react';
//import { useState, useEffect } from "react";
import { DashboardProvider, useDashboard } from './context/DashboardContext';
import { Header } from './components/layout/Header';
import { Dashboard } from './components/dashboard/Dashboard';
import './App.css';

function AppContent() {
  const { state, setRole, toggleDarkMode } = useDashboard();

  return (
    <div className={state.darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        <Header
          role={state.selectedRole}
          onRoleChange={setRole}
          darkMode={state.darkMode}
          onToggleDarkMode={toggleDarkMode}
        />
        <Dashboard />
      </div>
    </div>
  );
}

function App() {
  return (
    <DashboardProvider>
      <AppContent />
    </DashboardProvider>
  );
}

export default App;
