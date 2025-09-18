import React from 'react';
import Sidebar from '../components/common/Sidebar';
import Dashboard from '../components/dashboard/Dashboard';
import '../styles/pages/dashboard.css';

const HomePage = () => {
  return (
    <div className="home-layout">
      <Sidebar />
      <div className="main-content">
        <Dashboard />
      </div>
    </div>
  );
};

export default HomePage;