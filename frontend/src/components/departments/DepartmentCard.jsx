import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDepartments } from '../../context/DepartmentContext';
import { toast } from 'react-toastify';

const DepartmentCard = ({ department }) => {
  const navigate = useNavigate();
  const { deleteDepartment } = useDepartments();

  const handleCardClick = () => {
    navigate(`/departments/${department._id || department.id}/employees`);
  };

  const handleDelete = async (e) => {
    e.stopPropagation(); // Prevent card click
    
    if (window.confirm(`Are you sure you want to delete ${department.name} department?`)) {
      try {
        await deleteDepartment(department._id || department.id);
        toast.success('Department deleted successfully');
      } catch (error) {
        toast.error('Failed to delete department');
      }
    }
  };

  const getDepartmentIcon = (name) => {
    const icons = {
      'HR': '👥',
      'IT': '💻',
      'Finance': '💰',
      'Marketing': '📈',
      'Sales': '🛒',
      'Operations': '⚙️',
      'Development': '🔧',
      'Design': '🎨'
    };
    return icons[name] || '🏢';
  };

  return (
    <div className="department-card" onClick={handleCardClick}>
      <div className="department-card-header">
        <div className="department-icon">
          {getDepartmentIcon(department.name)}
        </div>
        <button 
          className="department-delete-btn"
          onClick={handleDelete}
          title="Delete Department"
        >
          🗑️
        </button>
      </div>
      
      <div className="department-card-body">
        <h3 className="department-name">{department.name}</h3>
        <p className="department-description">
          {department.description || 'No description available'}
        </p>
        
        <div className="department-stats">
          <div className="stat-item">
            <span className="stat-label">Employees:</span>
            <span className="stat-value">{department.employeeCount || 0}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Head:</span>
            <span className="stat-value">{department.head || 'Not assigned'}</span>
          </div>
        </div>
      </div>
      
      <div className="department-card-footer">
        <span className="department-status">
          {department.status || 'Active'}
        </span>
        <span className="view-employees-text">
          Click to view employees →
        </span>
      </div>
    </div>
  );
};

export default DepartmentCard;