// src/components/common/Sidebar.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Sidebar = () => {
  const location = useLocation();
  const { logout, user } = useAuth();

  const menuItems = [
    { 
      path: '/', 
      icon: '📊', 
      label: 'Dashboard',
      id: 'dashboard'
    },
    { 
      path: '/departments', 
      icon: '🏢', 
      label: 'Departments',
      id: 'departments'
    },
    { 
      path: '/attendance', 
      icon: '📋', 
      label: 'Attendance',
      id: 'attendance'
    },
    { 
      path: '/salary', 
      icon: '💰', 
      label: 'Salary',
      id: 'salary'
    },
    { 
      path: '/settings', 
      icon: '⚙️', 
      label: 'Settings',
      id: 'settings'
    }
  ];

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      logout();
    }
  };

  const isActiveLink = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const sidebarStyles = {
    position: 'fixed',
    left: 0,
    top: 0,
    width: '250px',
    height: '100vh',
    background: 'linear-gradient(180deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    zIndex: 1000,
    boxShadow: '4px 0 15px rgba(0, 0, 0, 0.1)'
  };

  const logoStyles = {
    padding: '2rem 1.5rem',
    borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
    textAlign: 'center'
  };

  const logoTextStyles = {
    fontSize: '1.8rem',
    fontWeight: 'bold',
    margin: '0.5rem 0',
    letterSpacing: '2px'
  };

  const userInfoStyles = {
    padding: '1.5rem',
    borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
    textAlign: 'center'
  };

  const avatarStyles = {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    background: 'rgba(255, 255, 255, 0.2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 0.5rem',
    fontSize: '1.5rem',
    fontWeight: 'bold'
  };

  const navStyles = {
    flex: 1,
    padding: '1rem 0',
    overflowY: 'auto'
  };

  const menuLinkStyles = {
    display: 'flex',
    alignItems: 'center',
    padding: '1rem 1.5rem',
    color: 'white',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
    borderLeft: '4px solid transparent',
    gap: '1rem'
  };

  const activeLinkStyles = {
    ...menuLinkStyles,
    background: 'rgba(255, 255, 255, 0.2)',
    borderLeftColor: 'white',
    fontWeight: 'bold'
  };

  const logoutContainerStyles = {
    padding: '1.5rem',
    borderTop: '1px solid rgba(255, 255, 255, 0.2)'
  };

  const logoutButtonStyles = {
    width: '100%',
    padding: '0.75rem',
    background: 'rgba(255, 255, 255, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    color: 'white',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    fontFamily: 'inherit',
    fontSize: '0.95rem'
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <div style={sidebarStyles}>
      {/* Logo */}
      <div style={logoStyles}>
        <div style={logoTextStyles}>EMS</div>
        <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>Employee Management</div>
      </div>

      {/* User Info */}
      <div style={userInfoStyles}>
        <div style={avatarStyles}>
          {getInitials(user?.name || 'Admin User')}
        </div>
        <div style={{ fontWeight: '500', marginBottom: '0.25rem' }}>
          {user?.name || 'Admin User'}
        </div>
        <div style={{ fontSize: '0.85rem', opacity: 0.8 }}>
          {user?.role || 'Administrator'}
        </div>
      </div>

      {/* Navigation */}
      <nav style={navStyles}>
        {menuItems.map(item => (
          <Link
            key={item.id}
            to={item.path}
            style={isActiveLink(item.path) ? activeLinkStyles : menuLinkStyles}
            onMouseEnter={(e) => {
              if (!isActiveLink(item.path)) {
                e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                e.target.style.borderLeftColor = 'rgba(255, 255, 255, 0.5)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isActiveLink(item.path)) {
                e.target.style.background = 'transparent';
                e.target.style.borderLeftColor = 'transparent';
              }
            }}
          >
            <span style={{ fontSize: '1.2rem' }}>{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      {/* Logout */}
      <div style={logoutContainerStyles}>
        <button
          style={logoutButtonStyles}
          onClick={handleLogout}
          onMouseEnter={(e) => {
            e.target.style.background = 'rgba(255, 255, 255, 0.2)';
            e.target.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'rgba(255, 255, 255, 0.1)';
            e.target.style.transform = 'translateY(0)';
          }}
        >
          <span>🚪</span>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;