import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { NotificationProvider } from './components/NotificationProvider';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Students from './pages/Students';
import Teachers from './pages/Teachers';
import Classes from './pages/Classes';
import Progressions from './pages/Progressions';
import Evaluations from './pages/Evaluations';
import Grades from './pages/Grades';
import Reports from './pages/Reports';
import Incidents from './pages/Incidents';
import Communications from './pages/Communications';
import Settings from './pages/Settings';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Vérifier le token dans localStorage
    const token = localStorage.getItem('auth_token');
    const userData = localStorage.getItem('user_data');
    
    if (token && userData) {
      setIsAuthenticated(true);
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogin = (token, userData) => {
    localStorage.setItem('auth_token', token);
    localStorage.setItem('user_data', JSON.stringify(userData));
    setIsAuthenticated(true);
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <NotificationProvider>
      <Router>
        <Routes>
          <Route 
            path="/login" 
            element={
              isAuthenticated ? 
              <Navigate to="/dashboard" /> : 
              <Login onLogin={handleLogin} />
            } 
          />
          
          <Route 
            path="/dashboard" 
            element={
              isAuthenticated ? 
              <Dashboard user={user} onLogout={handleLogout} /> : 
              <Navigate to="/login" />
            } 
          />
          
          <Route 
            path="/students" 
            element={
              isAuthenticated ? 
              <Students user={user} onLogout={handleLogout} /> : 
              <Navigate to="/login" />
            } 
          />
          
          <Route 
            path="/teachers" 
            element={
              isAuthenticated ? 
              <Teachers user={user} onLogout={handleLogout} /> : 
              <Navigate to="/login" />
            } 
          />
          
          <Route 
            path="/classes" 
            element={
              isAuthenticated ? 
              <Classes user={user} onLogout={handleLogout} /> : 
              <Navigate to="/login" />
            } 
          />
          
          <Route 
            path="/progressions" 
            element={
              isAuthenticated ? 
              <Progressions user={user} onLogout={handleLogout} /> : 
              <Navigate to="/login" />
            } 
          />
          
          <Route 
            path="/evaluations" 
            element={
              isAuthenticated ? 
              <Evaluations user={user} onLogout={handleLogout} /> : 
              <Navigate to="/login" />
            } 
          />
          
          <Route 
            path="/grades" 
            element={
              isAuthenticated ? 
              <Grades user={user} onLogout={handleLogout} /> : 
              <Navigate to="/login" />
            } 
          />
          
          <Route 
            path="/reports" 
            element={
              isAuthenticated ? 
              <Reports user={user} onLogout={handleLogout} /> : 
              <Navigate to="/login" />
            } 
          />
          
          <Route 
            path="/incidents" 
            element={
              isAuthenticated ? 
              <Incidents user={user} onLogout={handleLogout} /> : 
              <Navigate to="/login" />
            } 
          />
          
          <Route 
            path="/communications" 
            element={
              isAuthenticated ? 
              <Communications user={user} onLogout={handleLogout} /> : 
              <Navigate to="/login" />
            } 
          />
          
          <Route 
            path="/settings" 
            element={
              isAuthenticated ? 
              <Settings user={user} onLogout={handleLogout} /> : 
              <Navigate to="/login" />
            } 
          />
          
          <Route 
            path="/" 
            element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} 
          />
        </Routes>
      </Router>
    </NotificationProvider>
  );
}

export default App;
