import React, { useState, useEffect } from 'react';
import Modal from '../common/Modal';
import { useEmployees } from '../../context/EmployeeContext';
import { toast } from 'react-toastify';
import LoadingSpinner from '../common/LoadingSpinner';

const EditEmployeeModal = ({ isOpen, onClose, employee, departmentId }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    currentSalary: '',
    dateOfJoining: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  
  const { updateEmployee } = useEmployees();

  useEffect(() => {
    if (employee && isOpen) {
      setFormData({
        name: employee.name || '',
        email: employee.email || '',
        phone: employee.phone || '',
        role: employee.role || '',
        currentSalary: employee.currentSalary?.toString() || '',
        dateOfJoining: employee.dateOfJoining ? 
          new Date(employee.dateOfJoining).toISOString().split('T')[0] : ''
      });
    }
  }, [employee, isOpen]);

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
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
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
      const employeeData = {
        ...formData,
        currentSalary: parseFloat(formData.currentSalary)
      };
      
      await updateEmployee(employee._id || employee.id, employeeData);
      toast.success('Employee updated successfully');
      onClose();
    } catch (error) {
      toast.error('Failed to update employee');
      setErrors({ submit: 'Failed to update employee. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setErrors({});
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Edit Employee"
      size="medium"
    >
      <form onSubmit={handleSubmit} className="modal-form">
        {errors.submit && (
          <div className="error-message">
            {errors.submit}
          </div>
        )}

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="edit-name">Full Name *</label>
            <input
              type="text"
              id="edit-name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={errors.name ? 'error' : ''}
              placeholder="Enter full name"
              disabled={loading}
            />
            {errors.name && (
              <span className="field-error">{errors.name}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="edit-email">Email Address *</label>
            <input
              type="email"
              id="edit-email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'error' : ''}
              placeholder="Enter email address"
              disabled={loading}
            />
            {errors.email && (
              <span className="field-error">{errors.email}</span>
            )}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="edit-phone">Phone Number *</label>
            <input
              type="tel"
              id="edit-phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={errors.phone ? 'error' : ''}
              placeholder="Enter phone number"
              disabled={loading}
            />
            {errors.phone && (
              <span className="field-error">{errors.phone}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="edit-role">Job Role *</label>
            <input
              type="text"
              id="edit-role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className={errors.role ? 'error' : ''}
              placeholder="Enter job role"
              disabled={loading}
            />
            {errors.role && (
              <span className="field-error">{errors.role}</span>
            )}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="edit-currentSalary">Current Salary *</label>
            <input
              type="number"
              id="edit-currentSalary"
              name="currentSalary"
              value={formData.currentSalary}
              onChange={handleChange}
              className={errors.currentSalary ? 'error' : ''}
              placeholder="Enter salary amount"
              min="0"
              step="1000"
              disabled={loading}
            />
            {errors.currentSalary && (
              <span className="field-error">{errors.currentSalary}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="edit-dateOfJoining">Date of Joining *</label>
            <input
              type="date"
              id="edit-dateOfJoining"
              name="dateOfJoining"
              value={formData.dateOfJoining}
              onChange={handleChange}
              className={errors.dateOfJoining ? 'error' : ''}
              disabled={loading}
            />
            {errors.dateOfJoining && (
              <span className="field-error">{errors.dateOfJoining}</span>
            )}
          </div>
        </div>

        <div className="modal-actions">
          <button 
            type="button" 
            className="btn-secondary"
            onClick={handleClose}
            disabled={loading}
          >
            Cancel
          </button>
          <button 
            type="submit" 
            className="btn-primary"
            disabled={loading}
          >
            {loading ? <LoadingSpinner size="small" /> : 'Update Employee'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EditEmployeeModal;