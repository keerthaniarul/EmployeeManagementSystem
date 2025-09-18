import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import HomePage from './pages/HomePage';
import DepartmentsPage from './pages/DepartmentsPage';
import AttendancePage from './pages/AttendancePage';
import SalaryPage from './pages/SalaryPage';
import SettingsPage from './pages/SettingsPage';
import LoadingSpinner from './components/common/LoadingSpinner';
import './App.css';
import './styles/global.css';

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="App">
      <Routes>
        {/* Public Routes */}
        <Route 
          path="/login" 
          element={!user ? <Login /> : <Navigate to="/" replace />} 
        />
        <Route 
          path="/signup" 
          element={!user ? <Signup /> : <Navigate to="/" replace />} 
        />

        {/* Protected Routes */}
        <Route 
          path="/" 
          element={user ? <HomePage /> : <Navigate to="/login" replace />} 
        />
        <Route 
          path="/departments" 
          element={user ? <DepartmentsPage /> : <Navigate to="/login" replace />} 
        />
        <Route 
          path="/attendance" 
          element={user ? <AttendancePage /> : <Navigate to="/login" replace />} 
        />
        <Route 
          path="/salary" 
          element={user ? <SalaryPage /> : <Navigate to="/login" replace />} 
        />
        <Route 
          path="/settings" 
          element={user ? <SettingsPage /> : <Navigate to="/login" replace />} 
        />

        {/* Fallback Route */}
        <Route 
          path="*" 
          element={<Navigate to={user ? "/" : "/login"} replace />} 
        />
      </Routes>
    </div>
  );
}

export default App;