import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import StatsCard from './StatsCard';
import AnnouncementCard from './AnnouncementCard';
import LoadingSpinner from '../common/LoadingSpinner';
import '../../styles/pages/dashboard.css';
import logo from '../../assets/H_GK.png';
const Dashboard = () => {
  const { user, isAdmin } = useAuth();
  const [stats, setStats] = useState({
    totalEmployees: 0,
    totalDepartments: 0,
    presentToday: 0,
    pendingSalaries: 0
  });
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Simulate API call
        setTimeout(() => {
          setStats({
            totalEmployees: 45,
            totalDepartments: 8,
            presentToday: 38,
            pendingSalaries: 3
          });
          
          setAnnouncements([
            {
              id: 1,
              title: 'Welcome to EMS',
              content: 'Welcome to our new Employee Management System. Please update your profile information.',
              date: new Date().toLocaleDateString(),
              type: 'info'
            },
            {
              id: 2,
              title: 'Holiday Notice',
              content: 'Please note that the office will be closed on Friday for the national holiday.',
              date: new Date().toLocaleDateString(),
              type: 'announcement'
            },
            {
              id: 3,
              title: 'System Maintenance',
              content: 'Scheduled maintenance will occur this weekend. The system may be unavailable.',
              date: new Date().toLocaleDateString(),
              type: 'warning'
            }
          ]);
          
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="dashboard-loading">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="welcome-section">
          <h1>Welcome back, {user?.name}!</h1>
          <p>Here's what's happening in your organization today.</p>
        </div>
        <div className="company-logo-section">
          <img 
            src={logo}
            alt="Company Logo" 
            className="company-logo-large"
          />
        </div>
      </div>

      {/* Stats Cards - Only for Admin */}
      {isAdmin && (
        <div className="stats-section">
          <h2>Overview</h2>
          <div className="stats-grid">
            <StatsCard
              title="Total Employees"
              value={stats.totalEmployees}
              icon="👥"
              color="blue"
              trend="+2 this month"
            />
            <StatsCard
              title="Departments"
              value={stats.totalDepartments}
              icon="🏢"
              color="green"
              trend="Active"
            />
            <StatsCard
              title="Present Today"
              value={stats.presentToday}
              icon="✅"
              color="purple"
              trend={`${Math.round((stats.presentToday / stats.totalEmployees) * 100)}% attendance`}
            />
            <StatsCard
              title="Pending Salaries"
              value={stats.pendingSalaries}
              icon="💰"
              color="orange"
              trend="To be processed"
            />
          </div>
        </div>
      )}

      {/* Company Achievements Section */}
      <div className="achievements-section">
        <h2>Company Achievements</h2>
        <div className="achievements-grid">
          <div className="achievement-card">
            <div className="achievement-icon">🏆</div>
            <div className="achievement-content">
              <h3>Best Workplace 2024</h3>
              <p>Recognized as one of the top 100 companies to work for</p>
            </div>
          </div>
          <div className="achievement-card">
            <div className="achievement-icon">🌟</div>
            <div className="achievement-content">
              <h3>Excellence in Innovation</h3>
              <p>Award for outstanding technological advancement</p>
            </div>
          </div>
          <div className="achievement-card">
            <div className="achievement-icon">🌱</div>
            <div className="achievement-content">
              <h3>Green Company Initiative</h3>
              <p>Committed to sustainable and eco-friendly practices</p>
            </div>
          </div>
        </div>
      </div>

      {/* Announcements Section */}
      <div className="announcements-section">
        <h2>Latest Announcements</h2>
        <div className="announcements-list">
          {announcements.map(announcement => (
            <AnnouncementCard
              key={announcement.id}
              announcement={announcement}
            />
          ))}
        </div>
      </div>

      {/* Quick Actions - Only for Admin */}
      {isAdmin && (
        <div className="quick-actions-section">
          <h2>Quick Actions</h2>
          <div className="quick-actions-grid">
            <button className="quick-action-btn">
              <span className="action-icon">👤</span>
              <span>Add Employee</span>
            </button>
            <button className="quick-action-btn">
              <span className="action-icon">🏢</span>
              <span>Add Department</span>
            </button>
            <button className="quick-action-btn">
              <span className="action-icon">📊</span>
              <span>Generate Report</span>
            </button>
            <button className="quick-action-btn">
              <span className="action-icon">💰</span>
              <span>Process Salaries</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;