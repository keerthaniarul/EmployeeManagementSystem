import React, { useState, useEffect } from 'react';
import Sidebar from '../components/common/Sidebar';
import AddDepartmentModal from '../components/departments/AddDepartmentModal';
import '../styles/pages/departments.css';

const DepartmentsPage = () => {
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddDepartmentModal, setShowAddDepartmentModal] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);

  // Initial departments data - this will be updated when new departments are added
  const [departments, setDepartments] = useState([
    {
      id: 1,
      name: 'Supervisors',
      head: 'John Smith',
      description: 'Supervision and management department',
      status: 'Active'
    },
    {
      id: 2,
      name: 'Maintenance',
      head: 'Mike Johnson',
      description: 'Equipment maintenance and facility management',
      status: 'Active'
    },
    {
      id: 3,
      name: 'Quality Check',
      head: 'Sarah Wilson',
      description: 'Quality assurance and control department',
      status: 'Active'
    },
    {
      id: 4,
      name: 'Packing',
      head: 'David Brown',
      description: 'Product packaging and shipping department',
      status: 'Active'
    }
  ]);

  // Initial employees data
  const [employees, setEmployees] = useState({
    1: [ // Supervisors
      {
        id: 1,
        name: 'Alex Rodriguez',
        role: 'Senior Supervisor',
        dateOfJoining: '2020-03-15',
        phone: '+1-555-0101',
        email: 'alex.rodriguez@company.com',
        currentSalary: 75000
      },
      {
        id: 2,
        name: 'Emily Chen',
        role: 'Team Lead',
        dateOfJoining: '2021-07-22',
        phone: '+1-555-0102',
        email: 'emily.chen@company.com',
        currentSalary: 68000
      }
    ],
    2: [ // Maintenance
      {
        id: 4,
        name: 'Carlos Martinez',
        role: 'Maintenance Technician',
        dateOfJoining: '2020-01-08',
        phone: '+1-555-0201',
        email: 'carlos.martinez@company.com',
        currentSalary: 52000
      }
    ],
    3: [ // Quality Check
      {
        id: 6,
        name: 'Ahmed Hassan',
        role: 'Quality Inspector',
        dateOfJoining: '2020-09-05',
        phone: '+1-555-0301',
        email: 'ahmed.hassan@company.com',
        currentSalary: 55000
      }
    ],
    4: [ // Packing
      {
        id: 9,
        name: 'Maria Gonzalez',
        role: 'Packing Operator',
        dateOfJoining: '2021-02-14',
        phone: '+1-555-0401',
        email: 'maria.gonzalez@company.com',
        currentSalary: 45000
      }
    ]
  });

  const [editFormData, setEditFormData] = useState({
    name: '',
    role: '',
    dateOfJoining: '',
    phone: '',
    email: '',
    currentSalary: ''
  });

  // FIX: Handle body scroll when modal is open
  useEffect(() => {
    if (showEditModal || showAddDepartmentModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showEditModal, showAddDepartmentModal]);

  // Handle department click
  const handleDepartmentClick = (departmentId) => {
    setSelectedDepartment(departmentId);
  };

  // Handle back to departments
  const handleBackToDepartments = () => {
    setSelectedDepartment(null);
  };

  // Handle add department
  const handleAddDepartment = () => {
    setShowAddDepartmentModal(true);
  };

  // Handle close add department modal
  const handleCloseAddDepartmentModal = () => {
    setShowAddDepartmentModal(false);
  };

  // ✅ FIXED: Add new department to the list
  const handleAddNewDepartment = (newDepartmentData) => {
    console.log('Adding new department:', newDepartmentData); // Debug log
    
    // Generate new ID
    const newId = Math.max(...departments.map(d => d.id)) + 1;
    
    const newDepartment = {
      id: newId,
      name: newDepartmentData.name,
      head: newDepartmentData.head,
      description: newDepartmentData.description || 'No description provided',
      status: newDepartmentData.status || 'Active'
    };
    
    // Add to departments list
    setDepartments(prevDepartments => {
      const updated = [...prevDepartments, newDepartment];
      console.log('Updated departments:', updated); // Debug log
      return updated;
    });
    
    // Initialize empty employee array for new department
    setEmployees(prevEmployees => ({
      ...prevEmployees,
      [newId]: []
    }));
    
    // Close modal
    setShowAddDepartmentModal(false);
    
    // Show success message
    alert(`✅ Department "${newDepartmentData.name}" added successfully!`);
  };

  // Handle delete employee
  const handleDeleteEmployee = (employeeId) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      setEmployees(prev => ({
        ...prev,
        [selectedDepartment]: prev[selectedDepartment].filter(emp => emp.id !== employeeId)
      }));
    }
  };

  // Handle edit employee
  const handleEditEmployee = (employee) => {
    setEditingEmployee(employee);
    setEditFormData({
      name: employee.name,
      role: employee.role,
      dateOfJoining: employee.dateOfJoining,
      phone: employee.phone,
      email: employee.email,
      currentSalary: employee.currentSalary.toString()
    });
    setShowEditModal(true);
  };

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle save changes
  const handleSaveChanges = () => {
    const updatedEmployee = {
      ...editingEmployee,
      name: editFormData.name,
      role: editFormData.role,
      dateOfJoining: editFormData.dateOfJoining,
      phone: editFormData.phone,
      email: editFormData.email,
      currentSalary: parseInt(editFormData.currentSalary)
    };

    setEmployees(prev => ({
      ...prev,
      [selectedDepartment]: prev[selectedDepartment].map(emp => 
        emp.id === editingEmployee.id ? updatedEmployee : emp
      )
    }));

    setShowEditModal(false);
    setEditingEmployee(null);
  };

  // Handle cancel edit
  const handleCancelEdit = () => {
    setShowEditModal(false);
    setEditingEmployee(null);
    setEditFormData({
      name: '',
      role: '',
      dateOfJoining: '',
      phone: '',
      email: '',
      currentSalary: ''
    });
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Get icon for department
  const getDepartmentIcon = (departmentName) => {
    const icons = {
      'Supervisors': '👥',
      'Maintenance': '🔧',
      'Quality Check': '✅',
      'Packing': '📦',
      'HR': '👔',
      'Finance': '💰',
      'IT': '💻',
      'Sales': '📈',
      'Marketing': '📊',
      'Production': '🏭',
      'Security': '🔒',
      'Admin': '📋'
    };
    return icons[departmentName] || '🏢';
  };

  const selectedDeptName = departments.find(dept => dept.id === selectedDepartment)?.name;
  const departmentEmployees = employees[selectedDepartment] || [];

  return (
    <div className="departments-layout">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <div className="main-content">
        <div className="department-page">
          <div className="container">
            {/* Header */}
            <div className="page-header">
              <h1>
                {selectedDepartment ? (
                  <>
                    <button className="back-btn" onClick={handleBackToDepartments}>
                      ← Back to Departments
                    </button>
                    <span className="dept-title">{selectedDeptName} Department</span>
                  </>
                ) : (
                  'Company Departments'
                )}
              </h1>
            </div>

            {/* Departments Grid */}
            {!selectedDepartment && (
              <>
                <div className="departments-grid">
                  {departments.map(department => (
                    <div
                      key={department.id}
                      className="department-card"
                      onClick={() => handleDepartmentClick(department.id)}
                    >
                      <div className="dept-icon">
                        {getDepartmentIcon(department.name)}
                      </div>
                      <h3 className="dept-name">{department.name}</h3>
                      <p className="dept-head">Head: {department.head}</p>
                      <div className="employee-count">
                        {employees[department.id]?.length || 0} Employees
                      </div>
                    </div>
                  ))}
                </div>

                {/* Add Department Button */}
                <div className="add-department-section">
                  <button 
                    className="add-department-btn"
                    onClick={handleAddDepartment}
                  >
                    <span className="btn-icon">➕</span>
                    Add New Department
                  </button>
                </div>
              </>
            )}

            {/* Employee List */}
            {selectedDepartment && (
              <div className="employees-section">
                <div className="employees-header">
                  <h2>Employees in {selectedDeptName}</h2>
                  <p>{departmentEmployees.length} employee{departmentEmployees.length !== 1 ? 's' : ''} found</p>
                </div>

                {departmentEmployees.length === 0 ? (
                  <div className="no-employees">
                    <p>No employees found in this department.</p>
                  </div>
                ) : (
                  <div className="employees-grid">
                    {departmentEmployees.map(employee => (
                      <div key={employee.id} className="employee-card">
                        <div className="employee-header">
                          <div className="employee-avatar">
                            {employee.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                          </div>
                          <div className="employee-actions">
                            <button
                              className="edit-btn"
                              onClick={() => handleEditEmployee(employee)}
                              title="Edit Employee"
                            >
                              ✏️
                            </button>
                            <button
                              className="delete-btn"
                              onClick={() => handleDeleteEmployee(employee.id)}
                              title="Delete Employee"
                            >
                              🗑️
                            </button>
                          </div>
                        </div>
                        
                        <div className="employee-details">
                          <h3 className="employee-name">{employee.name}</h3>
                          <p className="employee-role">{employee.role}</p>
                          
                          <div className="employee-info">
                            <div className="info-item">
                              <span className="info-label">Joined:</span>
                              <span className="info-value">{formatDate(employee.dateOfJoining)}</span>
                            </div>
                            <div className="info-item">
                              <span className="info-label">Phone:</span>
                              <span className="info-value">{employee.phone}</span>
                            </div>
                            <div className="info-item">
                              <span className="info-label">Email:</span>
                              <span className="info-value">{employee.email}</span>
                            </div>
                            <div className="info-item">
                              <span className="info-label">Salary:</span>
                              <span className="info-value salary">{formatCurrency(employee.currentSalary)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* FIX: Edit Employee Modal with proper positioning */}
            {showEditModal && (
              <div 
                className="modal-overlay" 
                onClick={handleCancelEdit}
                style={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'rgba(0, 0, 0, 0.6)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 10000,
                  backdropFilter: 'blur(5px)',
                  padding: '1rem'
                }}
              >
                <div 
                  className="modal-content" 
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    background: 'white',
                    borderRadius: '20px',
                    width: '90%',
                    maxWidth: '600px',
                    maxHeight: '90vh',
                    overflowY: 'auto',
                    boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)',
                    position: 'relative',
                    margin: 'auto'
                  }}
                >
                  <div 
                    className="modal-header"
                    style={{
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
                    }}
                  >
                    <h3 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 700, color: 'white' }}>
                      Edit Employee Details
                    </h3>
                    <button 
                      className="modal-close" 
                      onClick={handleCancelEdit}
                      style={{
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
                      }}
                    >
                      ×
                    </button>
                  </div>
                  
                  <div 
                    className="modal-body"
                    style={{
                      padding: '2rem',
                      maxHeight: 'calc(90vh - 200px)',
                      overflowY: 'auto'
                    }}
                  >
                    <form className="edit-form" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                      <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label htmlFor="name" style={{ fontWeight: 600, color: '#333', fontSize: '0.9rem' }}>
                          Full Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={editFormData.name}
                          onChange={handleInputChange}
                          style={{
                            padding: '0.875rem',
                            border: '2px solid #e0e0e0',
                            borderRadius: '12px',
                            fontSize: '1rem',
                            transition: 'all 0.3s ease',
                            background: 'white'
                          }}
                          required
                        />
                      </div>

                      <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label htmlFor="role" style={{ fontWeight: 600, color: '#333', fontSize: '0.9rem' }}>
                          Job Role
                        </label>
                        <input
                          type="text"
                          id="role"
                          name="role"
                          value={editFormData.role}
                          onChange={handleInputChange}
                          style={{
                            padding: '0.875rem',
                            border: '2px solid #e0e0e0',
                            borderRadius: '12px',
                            fontSize: '1rem',
                            transition: 'all 0.3s ease',
                            background: 'white'
                          }}
                          required
                        />
                      </div>

                      <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label htmlFor="dateOfJoining" style={{ fontWeight: 600, color: '#333', fontSize: '0.9rem' }}>
                          Date of Joining
                        </label>
                        <input
                          type="date"
                          id="dateOfJoining"
                          name="dateOfJoining"
                          value={editFormData.dateOfJoining}
                          onChange={handleInputChange}
                          style={{
                            padding: '0.875rem',
                            border: '2px solid #e0e0e0',
                            borderRadius: '12px',
                            fontSize: '1rem',
                            transition: 'all 0.3s ease',
                            background: 'white'
                          }}
                          required
                        />
                      </div>

                      <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label htmlFor="phone" style={{ fontWeight: 600, color: '#333', fontSize: '0.9rem' }}>
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={editFormData.phone}
                          onChange={handleInputChange}
                          style={{
                            padding: '0.875rem',
                            border: '2px solid #e0e0e0',
                            borderRadius: '12px',
                            fontSize: '1rem',
                            transition: 'all 0.3s ease',
                            background: 'white'
                          }}
                          required
                        />
                      </div>

                      <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label htmlFor="email" style={{ fontWeight: 600, color: '#333', fontSize: '0.9rem' }}>
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={editFormData.email}
                          onChange={handleInputChange}
                          style={{
                            padding: '0.875rem',
                            border: '2px solid #e0e0e0',
                            borderRadius: '12px',
                            fontSize: '1rem',
                            transition: 'all 0.3s ease',
                            background: 'white'
                          }}
                          required
                        />
                      </div>

                      <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label htmlFor="currentSalary" style={{ fontWeight: 600, color: '#333', fontSize: '0.9rem' }}>
                          Current Salary ($)
                        </label>
                        <input
                          type="number"
                          id="currentSalary"
                          name="currentSalary"
                          value={editFormData.currentSalary}
                          onChange={handleInputChange}
                          min="0"
                          step="1000"
                          style={{
                            padding: '0.875rem',
                            border: '2px solid #e0e0e0',
                            borderRadius: '12px',
                            fontSize: '1rem',
                            transition: 'all 0.3s ease',
                            background: 'white'
                          }}
                          required
                        />
                      </div>
                    </form>
                  </div>
                  
                  <div 
                    className="modal-footer"
                    style={{
                      padding: '1.5rem 2rem',
                      borderTop: '2px solid #f0f0f0',
                      display: 'flex',
                      gap: '1rem',
                      justifyContent: 'flex-end',
                      background: '#fafafa',
                      borderRadius: '0 0 20px 20px',
                      position: 'sticky',
                      bottom: 0,
                      zIndex: 1
                    }}
                  >
                    <button 
                      className="btn-cancel" 
                      onClick={handleCancelEdit}
                      style={{
                        padding: '0.875rem 1.75rem',
                        border: 'none',
                        borderRadius: '12px',
                        fontSize: '1rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        minWidth: '120px',
                        background: '#f1f5f9',
                        color: '#475569',
                        border: '2px solid #e2e8f0'
                      }}
                    >
                      Cancel
                    </button>
                    <button 
                      className="btn-save" 
                      onClick={handleSaveChanges}
                      style={{
                        padding: '0.875rem 1.75rem',
                        border: 'none',
                        borderRadius: '12px',
                        fontSize: '1rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        minWidth: '120px',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: 'white',
                        border: '2px solid transparent'
                      }}
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ✅ FIXED: Add Department Modal with correct prop */}
      <AddDepartmentModal
        isOpen={showAddDepartmentModal}
        onClose={handleCloseAddDepartmentModal}
        onAddDepartment={handleAddNewDepartment}
      />
    </div>
  );
};

export default DepartmentsPage;