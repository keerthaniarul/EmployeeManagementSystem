// src/components/common/Modal.jsx
import React, { useEffect } from 'react';

const Modal = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  size = 'medium',
  showCloseButton = true 
}) => {
  // Handle body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return { maxWidth: '400px' };
      case 'large':
        return { maxWidth: '800px' };
      case 'extra-large':
        return { maxWidth: '1200px' };
      default:
        return { maxWidth: '600px' };
    }
  };

  const overlayStyles = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10000,
    backdropFilter: 'blur(5px)',
    padding: '1rem'
  };

  const modalStyles = {
    backgroundColor: 'white',
    borderRadius: '20px',
    width: '90%',
    ...getSizeStyles(),
    maxHeight: '90vh',
    overflowY: 'auto',
    boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)',
    position: 'relative',
    margin: 'auto'
  };

  const headerStyles = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1.5rem 2rem',
    borderBottom: '2px solid #f0f0f0',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    borderRadius: '20px 20px 0 0',
    position: 'sticky',
    top: 0,
    zIndex: 1
  };

  const titleStyles = {
    margin: 0,
    fontSize: '1.5rem',
    fontWeight: 700,
    color: 'white'
  };

  const closeButtonStyles = {
    background: 'rgba(255, 255, 255, 0.2)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    color: 'white',
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    cursor: 'pointer',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s ease'
  };

  const bodyStyles = {
    padding: '2rem',
    maxHeight: 'calc(90vh - 200px)',
    overflowY: 'auto'
  };

  return (
    <div 
      style={overlayStyles}
      onClick={onClose}
    >
      <div 
        style={modalStyles}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={headerStyles}>
          <h3 style={titleStyles}>{title}</h3>
          {showCloseButton && (
            <button 
              style={closeButtonStyles}
              onClick={onClose}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.3)';
                e.target.style.transform = 'scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                e.target.style.transform = 'scale(1)';
              }}
            >
              ×
            </button>
          )}
        </div>
        
        {/* Body */}
        <div style={bodyStyles}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;