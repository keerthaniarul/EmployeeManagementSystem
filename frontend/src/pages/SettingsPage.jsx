import React from 'react';
import Sidebar from '../components/common/Sidebar';

const SettingsPage = () => {
  return (
    <div className="settings-layout">
      <Sidebar />
      <div className="main-content">
        <div className="page-header">
          <h1>Settings</h1>
          <p>Configure system settings and company information</p>
        </div>
        
        <div style={{ 
          padding: '2rem', 
          background: 'white', 
          borderRadius: '1rem',
          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
          textAlign: 'center'
        }}>
          <h2>🚧 Under Development</h2>
          <p>The settings module is currently being developed.</p>
          <p>Features will include:</p>
          <ul style={{ textAlign: 'left', maxWidth: '500px', margin: '0 auto' }}>
            <li>Company profile management</li>
            <li>Logo and branding settings</li>
            <li>User role management</li>
            <li>System preferences</li>
            <li>Backup and restore</li>
            <li>Security settings</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;