import React, { useState } from 'react';
import Modal from '../common/Modal';

const AddEmployeeModal = ({ isOpen, onClose, onAddEmployee, departmentId, departmentName }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    currentSalary: '',
    dateOfJoining: new Date().toISOString().split('T')[0]
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Employee name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[\d\s\-\(\)]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    if (!formData.role.trim()) {
      newErrors.role = 'Role is required';
    }
    
    if (!formData.currentSalary || formData.currentSalary <= 0) {
      newErrors.currentSalary = 'Valid salary is required';
    }
    
    if (!formData.dateOfJoining) {
      newErrors.dateOfJoining = 'Date of joining is required';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setLoading(true);
    setErrors({});
    
    try {
      console.log('Adding employee:', formData);
      
      if (onAddEmployee) {
        onAddEmployee(formData);
      }
      
      resetForm();
      
    } catch (error) {
      console.error('Error adding employee:', error);
      setErrors({ submit: 'Failed to add employee. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      role: '',
      currentSalary: '',
      dateOfJoining: new Date().toISOString().split('T')[0]
    });
    setErrors({});
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  // Inline styles
  const formStyles = {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem'
  };

  const formRowStyles = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1rem'
  };

  const formGroupStyles = {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem'
  };

  const labelStyles = {
    fontWeight: 600,
    color: '#333',
    fontSize: '0.9rem',
    marginBottom: '0.25rem'
  };

  const inputStyles = {
    width: '100%',
    padding: '0.875rem 1rem',
    border: '2px solid #e0e0e0',
    borderRadius: '12px',
    fontSize: '1rem',
    transition: 'all 0.3s ease',
    background: 'white',
    fontFamily: 'inherit',
    boxSizing: 'border-box'
  };

  const errorInputStyles = {
    ...inputStyles,
    borderColor: '#ef4444',
    boxShadow: '0 0 0 4px rgba(239, 68, 68, 0.1)'
  };

  const errorStyles = {
    color: '#ef4444',
    fontSize: '0.8rem',
    fontWeight: 500,
    marginTop: '0.25rem'
  };

  const errorMessageStyles = {
    padding: '1rem',
    background: 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)',
    border: '1px solid #f87171',
    color: '#dc2626',
    borderRadius: '12px',
    fontSize: '0.9rem',
    textAlign: 'center',
    fontWeight: 500,
    marginBottom: '1rem'
  };

  const buttonContainerStyles = {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'flex-end',
    paddingTop: '2rem',
    marginTop: '1rem',
    borderTop: '2px solid #f0f0f0'
  };

  const buttonBaseStyles = {
    padding: '0.875rem 2rem',
    border: 'none',
    borderRadius: '12px',
    fontSize: '1rem',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    minWidth: '120px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    fontFamily: 'inherit'
  };

  const cancelButtonStyles = {
    ...buttonBaseStyles,
    background: '#f1f5f9',
    color: '#475569',
    border: '2px solid #e2e8f0'
  };

  const saveButtonStyles = {
    ...buttonBaseStyles,
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: '2px solid transparent',
    boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)'
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={`Add New Employee - ${departmentName}`}
      size="medium"
    >
      <div style={formStyles}>
        {errors.submit && (
          <div style={errorMessageStyles}>
            {errors.submit}
          </div>
        )}

        <div style={formRowStyles}>
          <div style={formGroupStyles}>
            <label htmlFor="name" style={labelStyles}>Full Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              style={errors.name ? errorInputStyles : inputStyles}
              onFocus={(e) => {
                e.target.style.borderColor = '#667eea';
                e.target.style.boxShadow = '0 0 0 4px rgba(102, 126, 234, 0.1)';
                e.target.style.outline = 'none';
              }}
              onBlur={(e) => {
                if (!errors.name) {
                  e.target.style.borderColor = '#e0e0e0';
                  e.target.style.boxShadow = 'none';
                }
              }}
              placeholder="Enter full name"
              disabled={loading}
              autoFocus
            />
            {errors.name && (
              <span style={errorStyles}>{errors.name}</span>
            )}
          </div>

          <div style={formGroupStyles}>
            <label htmlFor="email" style={labelStyles}>Email Address *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={errors.email ? errorInputStyles : inputStyles}
              onFocus={(e) => {
                e.target.style.borderColor = '#667eea';
                e.target.style.boxShadow = '0 0 0 4px rgba(102, 126, 234, 0.1)';
                e.target.style.outline = 'none';
              }}
              onBlur={(e) => {
                if (!errors.email) {
                  e.target.style.borderColor = '#e0e0e0';
                  e.target.style.boxShadow = 'none';
                }
              }}
              placeholder="Enter email address"
              disabled={loading}
            />
            {errors.email && (
              <span style={errorStyles}>{errors.email}</span>
            )}
          </div>
        </div>

        <div style={formRowStyles}>
          <div style={formGroupStyles}>
            <label htmlFor="phone" style={labelStyles}>Phone Number *</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              style={errors.phone ? errorInputStyles : inputStyles}
              onFocus={(e) => {
                e.target.style.borderColor = '#667eea';
                e.target.style.boxShadow = '0 0 0 4px rgba(102, 126, 234, 0.1)';
                e.target.style.outline = 'none';
              }}
              onBlur={(e) => {
                if (!errors.phone) {
                  e.target.style.borderColor = '#e0e0e0';
                  e.target.style.boxShadow = 'none';
                }
              }}
              placeholder="Enter phone number"
              disabled={loading}
            />
            {errors.phone && (
              <span style={errorStyles}>{errors.phone}</span>
            )}
          </div>

          <div style={formGroupStyles}>
            <label htmlFor="role" style={labelStyles}>Job Role *</label>
            <input
              type="text"
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              style={errors.role ? errorInputStyles : inputStyles}
              onFocus={(e) => {
                e.target.style.borderColor = '#667eea';
                e.target.style.boxShadow = '0 0 0 4px rgba(102, 126, 234, 0.1)';
                e.target.style.outline = 'none';
              }}
              onBlur={(e) => {
                if (!errors.role) {
                  e.target.style.borderColor = '#e0e0e0';
                  e.target.style.boxShadow = 'none';
                }
              }}
              placeholder="Enter job role"
              disabled={loading}
            />
            {errors.role && (
              <span style={errorStyles}>{errors.role}</span>
            )}
          </div>
        </div>

        <div style={formRowStyles}>
          <div style={formGroupStyles}>
            <label htmlFor="currentSalary" style={labelStyles}>Current Salary ($) *</label>
            <input
              type="number"
              id="currentSalary"
              name="currentSalary"
              value={formData.currentSalary}
              onChange={handleChange}
              style={errors.currentSalary ? errorInputStyles : inputStyles}
              onFocus={(e) => {
                e.target.style.borderColor = '#667eea';
                e.target.style.boxShadow = '0 0 0 4px rgba(102, 126, 234, 0.1)';
                e.target.style.outline = 'none';
              }}
              onBlur={(e) => {
                if (!errors.currentSalary) {
                  e.target.style.borderColor = '#e0e0e0';
                  e.target.style.boxShadow = 'none';
                }
              }}
              placeholder="Enter salary amount"
              min="0"
              step="1000"
              disabled={loading}
            />
            {errors.currentSalary && (
              <span style={errorStyles}>{errors.currentSalary}</span>
            )}
          </div>

          <div style={formGroupStyles}>
            <label htmlFor="dateOfJoining" style={labelStyles}>Date of Joining *</label>
            <input
              type="date"
              id="dateOfJoining"
              name="dateOfJoining"
              value={formData.dateOfJoining}
              onChange={handleChange}
              style={errors.dateOfJoining ? errorInputStyles : inputStyles}
              onFocus={(e) => {
                e.target.style.borderColor = '#667eea';
                e.target.style.boxShadow = '0 0 0 4px rgba(102, 126, 234, 0.1)';
                e.target.style.outline = 'none';
              }}
              onBlur={(e) => {
                if (!errors.dateOfJoining) {
                  e.target.style.borderColor = '#e0e0e0';
                  e.target.style.boxShadow = 'none';
                }
              }}
              disabled={loading}
            />
            {errors.dateOfJoining && (
              <span style={errorStyles}>{errors.dateOfJoining}</span>
            )}
          </div>
        </div>

        <div style={buttonContainerStyles}>
          <button 
            type="button" 
            style={cancelButtonStyles}
            onMouseEnter={(e) => {
              e.target.style.background = '#e2e8f0';
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = '#f1f5f9';
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = 'none';
            }}
            onClick={handleClose}
            disabled={loading}
          >
            Cancel
          </button>
          <button 
            type="submit" 
            style={saveButtonStyles}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.3)';
            }}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? 'Adding...' : 'Add Employee'}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default AddEmployeeModal;