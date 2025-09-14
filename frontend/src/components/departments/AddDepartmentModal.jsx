import React, { useState } from 'react';
import Modal from '../common/Modal';

const AddDepartmentModal = ({ isOpen, onClose, onAddDepartment }) => {
  const [formData, setFormData] = useState({
    name: '',
    head: '',
    description: '',
    status: 'Active'
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
      newErrors.name = 'Department name is required';
    }
    
    if (!formData.head.trim()) {
      newErrors.head = 'Department head is required';
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
      console.log('Submitting department:', formData);
      
      if (onAddDepartment) {
        onAddDepartment(formData);
      }
      
      resetForm();
      
    } catch (error) {
      console.error('Error adding department:', error);
      setErrors({ submit: 'Failed to add department. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      head: '',
      description: '',
      status: 'Active'
    });
    setErrors({});
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  // Inline styles for form elements
  const formStyles = {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem'
  };

  const formGroupStyles = {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem'
  };

  const labelStyles = {
    fontWeight: 600,
    color: '#333',
    fontSize: '0.95rem',
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

  const textareaStyles = {
    ...inputStyles,
    minHeight: '100px',
    resize: 'vertical'
  };

  const errorStyles = {
    color: '#ef4444',
    fontSize: '0.85rem',
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

  // ✅ FIXED: Proper button container and button styles
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
      title="Add New Department"
      size="medium"
    >
      <div style={formStyles}>
        {errors.submit && (
          <div style={errorMessageStyles}>
            {errors.submit}
          </div>
        )}

        <div style={formGroupStyles}>
          <label htmlFor="name" style={labelStyles}>Department Name *</label>
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
            placeholder="Enter department name"
            disabled={loading}
            autoFocus
          />
          {errors.name && (
            <span style={errorStyles}>{errors.name}</span>
          )}
        </div>

        <div style={formGroupStyles}>
          <label htmlFor="head" style={labelStyles}>Department Head *</label>
          <input
            type="text"
            id="head"
            name="head"
            value={formData.head}
            onChange={handleChange}
            style={errors.head ? errorInputStyles : inputStyles}
            onFocus={(e) => {
              e.target.style.borderColor = '#667eea';
              e.target.style.boxShadow = '0 0 0 4px rgba(102, 126, 234, 0.1)';
              e.target.style.outline = 'none';
            }}
            onBlur={(e) => {
              if (!errors.head) {
                e.target.style.borderColor = '#e0e0e0';
                e.target.style.boxShadow = 'none';
              }
            }}
            placeholder="Enter department head name"
            disabled={loading}
          />
          {errors.head && (
            <span style={errorStyles}>{errors.head}</span>
          )}
        </div>

        <div style={formGroupStyles}>
          <label htmlFor="description" style={labelStyles}>Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            style={textareaStyles}
            onFocus={(e) => {
              e.target.style.borderColor = '#667eea';
              e.target.style.boxShadow = '0 0 0 4px rgba(102, 126, 234, 0.1)';
              e.target.style.outline = 'none';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#e0e0e0';
              e.target.style.boxShadow = 'none';
            }}
            placeholder="Enter department description (optional)"
            rows="3"
            disabled={loading}
          />
        </div>

        <div style={formGroupStyles}>
          <label htmlFor="status" style={labelStyles}>Status</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            style={inputStyles}
            onFocus={(e) => {
              e.target.style.borderColor = '#667eea';
              e.target.style.boxShadow = '0 0 0 4px rgba(102, 126, 234, 0.1)';
              e.target.style.outline = 'none';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#e0e0e0';
              e.target.style.boxShadow = 'none';
            }}
            disabled={loading}
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        {/* ✅ FIXED: Properly styled buttons */}
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
            {loading ? 'Adding...' : 'Add Department'}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default AddDepartmentModal;