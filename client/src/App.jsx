import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import RegisterPage from './components/RegisterPage';
import HomePage from './components/HomePage';
import NewPlanPage from './components/NewPlanPage';
import DietPlanPage from './components/DietPlanPage';
import AdminViewPage from './components/AdminViewPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Landing root defaults to the Welcome view */}
        <Route path="/" element={<LandingPage />} />
        
        {/* Route for both Login and Signup screens */}
        <Route path="/login" element={<LandingPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        {/* Main Application Core Views */}
        <Route path="/home" element={<HomePage />} />
        <Route path="/new-plan" element={<NewPlanPage />} />
        <Route path="/diet-plan" element={<DietPlanPage />} />
        
        {/* Admin Dashboard Control Panel View */}
        <Route path="/admin" element={<AdminViewPage />} />
        
        {/* Fallback redirect safely routes back to Landing */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;