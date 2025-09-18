// src/components/common/LoadingSpinner.jsx
import React from 'react';

const LoadingSpinner = ({ size = 'medium', color = '#667eea' }) => {
  const sizeClasses = {
    small: { width: '20px', height: '20px', borderWidth: '2px' },
    medium: { width: '40px', height: '40px', borderWidth: '3px' },
    large: { width: '60px', height: '60px', borderWidth: '4px' }
  };

  const spinnerStyle = {
    ...sizeClasses[size],
    border: `${sizeClasses[size].borderWidth} solid #f3f3f3`,
    borderTop: `${sizeClasses[size].borderWidth} solid ${color}`,
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    display: 'inline-block'
  };

  // Inject CSS animation if not already present
  React.useEffect(() => {
    if (!document.querySelector('#loading-spinner-styles')) {
      const style = document.createElement('style');
      style.id = 'loading-spinner-styles';
      style.innerHTML = `
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  return <div style={spinnerStyle}></div>;
};

export default LoadingSpinner;