import React, { useState, useEffect } from 'react';
import { useDepartments } from '../../context/DepartmentContext';
import DepartmentCard from './DepartmentCard';
import AddDepartmentModal from './AddDepartmentModal';
import LoadingSpinner from '../common/LoadingSpinner';

const DepartmentList = () => {
  const { departments, loading, fetchDepartments } = useDepartments();
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    fetchDepartments();
  }, [fetchDepartments]);

  const handleAddDepartment = () => {
    setShowAddModal(true);
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
  };

  if (loading) {
    return <LoadingSpinner message="Loading departments..." />;
  }

  return (
    <div className="department-list-container">
      <div className="departments-grid">
        {departments.map(department => (
          <DepartmentCard 
            key={department._id || department.id} 
            department={department} 
          />
        ))}
      </div>

      <div className="add-department-section">
        <button 
          className="add-department-btn"
          onClick={handleAddDepartment}
        >
          <span className="btn-icon">➕</span>
          Add Department
        </button>
      </div>

      <AddDepartmentModal 
        isOpen={showAddModal}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default DepartmentList;