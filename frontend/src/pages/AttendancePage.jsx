// src/pages/AttendancePage.jsx
import React, { useState } from 'react';
import AttendanceUpload from '../components/attendance/AttendanceUpload';
import AttendanceTable from '../components/attendance/AttendanceTable';
import AttendanceReport from '../components/attendance/AttendanceReport';
import AttendanceFileManager from '../components/attendance/AttendanceFileManager';
import LoadingSpinner from '../components/common/LoadingSpinner';
import '../styles/pages/attendance.css';

const AttendancePage = () => {
  const [activeTab, setActiveTab] = useState('upload');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [loading, setLoading] = useState(false);

  const tabs = [
    { id: 'upload', label: 'Upload Attendance', icon: '📤' },
    { id: 'view', label: 'View Attendance', icon: '📋' },
    { id: 'reports', label: 'Reports', icon: '📊' },
    { id: 'files', label: 'File Manager', icon: '📁' }
  ];

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div className="attendance-page">
      {/* Page Header */}
      <div className="page-header">
        <div className="header-content">
          <h1>Attendance Management</h1>
          <p>Upload, manage and track employee attendance records</p>
        </div>
        
        <div className="header-actions">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => handleDateChange(e.target.value)}
            className="date-picker"
          />
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="tab-navigation">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => handleTabChange(tab.id)}
          >
            <span className="tab-icon">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {loading ? (
          <div className="loading-container">
            <LoadingSpinner size="large" />
          </div>
        ) : (
          <>
            {activeTab === 'upload' && (
              <AttendanceUpload selectedDate={selectedDate} />
            )}
            
            {activeTab === 'view' && (
              <AttendanceTable selectedDate={selectedDate} />
            )}
            
            {activeTab === 'reports' && (
              <AttendanceReport selectedDate={selectedDate} />
            )}
            
            {activeTab === 'files' && (
              <AttendanceFileManager />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AttendancePage;