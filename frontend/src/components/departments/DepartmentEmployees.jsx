import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Sidebar from '../common/Sidebar';
import EmployeeCard from '../employees/EmployeeCard';
import AddEmployeeModal from '../employees/AddEmployeeModal';
import SearchBar from '../employees/SearchBar';
import LoadingSpinner from '../common/LoadingSpinner';
import '../styles/pages/employees.css';

const DepartmentEmployees = () => {
  const { departmentId } = useParams();
  const [currentDepartment, setCurrentDepartment] = useState(null);
  const [showAddEmployeeModal, setShowAddEmployeeModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  // Sample departments data
  const [departments] = useState([
    {
      id: 1,
      name: 'Supervisors',
      head: 'John Smith',
      description: 'Supervision and management department'
    },
    {
      id: 2,
      name: 'Maintenance',
      head: 'Mike Johnson',
      description: 'Equipment maintenance and facility management'
    },
    {
      id: 3,
      name: 'Quality Check',
      head: 'Sarah Wilson',
      description: 'Quality assurance and control department'
    },
    {
      id: 4,
      name: 'Packing',
      head: 'David Brown',
      description: 'Product packaging and shipping department'
    }
  ]);

  // Sample employees data
  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: 'Alex Rodriguez',
      role: 'Senior Supervisor',
      dateOfJoining: '2020-03-15',
      phone: '+1-555-0101',
      email: 'alex.rodriguez@company.com',
      currentSalary: 75000,
      departmentId: 1
    },
    {
      id: 2,
      name: 'Emily Chen',
      role: 'Team Lead',
      dateOfJoining: '2021-07-22',
      phone: '+1-555-0102',
      email: 'emily.chen@company.com',
      currentSalary: 68000,
      departmentId: 1
    },
    {
      id: 3,
      name: 'Robert Davis',
      role: 'Floor Supervisor',
      dateOfJoining: '2019-11-10',
      phone: '+1-555-0103',
      email: 'robert.davis@company.com',
      currentSalary: 72000,
      departmentId: 1
    },
    {
      id: 4,
      name: 'Carlos Martinez',
      role: 'Maintenance Technician',
      dateOfJoining: '2020-01-08',
      phone: '+1-555-0201',
      email: 'carlos.martinez@company.com',
      currentSalary: 52000,
      departmentId: 2
    },
    {
      id: 5,
      name: 'Jennifer Lee',
      role: 'Equipment Specialist',
      dateOfJoining: '2021-04-12',
      phone: '+1-555-0202',
      email: 'jennifer.lee@company.com',
      currentSalary: 58000,
      departmentId: 2
    },
    {
      id: 6,
      name: 'Ahmed Hassan',
      role: 'Quality Inspector',
      dateOfJoining: '2020-09-05',
      phone: '+1-555-0301',
      email: 'ahmed.hassan@company.com',
      currentSalary: 55000,
      departmentId: 3
    },
    {
      id: 7,
      name: 'Lisa Thompson',
      role: 'QC Analyst',
      dateOfJoining: '2021-12-18',
      phone: '+1-555-0302',
      email: 'lisa.thompson@company.com',
      currentSalary: 60000,
      departmentId: 3
    },
    {
      id: 8,
      name: 'Kevin Park',
      role: 'Quality Supervisor',
      dateOfJoining: '2019-06-30',
      phone: '+1-555-0303',
      email: 'kevin.park@company.com',
      currentSalary: 65000,
      departmentId: 3
    },
    {
      id: 9,
      name: 'Maria Gonzalez',
      role: 'Packing Operator',
      dateOfJoining: '2021-02-14',
      phone: '+1-555-0401',
      email: 'maria.gonzalez@company.com',
      currentSalary: 45000,
      departmentId: 4
    },
    {
      id: 10,
      name: 'James Wilson',
      role: 'Packaging Specialist',
      dateOfJoining: '2020-08-27',
      phone: '+1-555-0402',
      email: 'james.wilson@company.com',
      currentSalary: 48000,
      departmentId: 4
    }
  ]);

  const [editFormData, setEditFormData] = useState({
    name: '',
    role: '',
    dateOfJoining: '',
    phone: '',
    email: '',
    currentSalary: ''
  });

  useEffect(() => {
    if (departmentId) {
      // Find current department
      const dept = departments.find(d => d.id.toString() === departmentId);
      setCurrentDepartment(dept);
      setLoading(false);
    }
  }, [departmentId, departments]);

  // Filter employees by department and search query
  const filteredEmployees = employees.filter(employee => {
    const matchesDepartment = employee.departmentId.toString() === departmentId;
    const matchesSearch = searchQuery === '' || 
      employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.phone.includes(searchQuery) ||
      employee.role.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesDepartment && matchesSearch;
  });

  // Handle add employee
  const handleAddEmployee = () => {
    setShowAddEmployeeModal(true);
  };

  // Handle close add employee modal
  const handleCloseAddEmployeeModal = () => {
    setShowAddEmployeeModal(false);
  };

  // Handle add new employee
  const handleAddNewEmployee = (newEmployeeData) => {
    const newEmployee = {
      id: Math.max(...employees.map(e => e.id)) + 1,
      ...newEmployeeData,
      departmentId: parseInt(departmentId),
      currentSalary: parseFloat(newEmployeeData.currentSalary)
    };
    
    setEmployees(prev => [...prev, newEmployee]);
    setShowAddEmployeeModal(false);
    alert(`✅ Employee "${newEmployeeData.name}" added successfully!`);
  };

  // Handle delete employee
  const handleDeleteEmployee = (employeeId) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      setEmployees(prev => prev.filter(emp => emp.id !== employeeId));
      alert('✅ Employee deleted successfully!');
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
      currentSalary: parseFloat(editFormData.currentSalary)
    };

    setEmployees(prev => 
      prev.map(emp => emp.id === editingEmployee.id ? updatedEmployee : emp)
    );

    setShowEditModal(false);
    setEditingEmployee(null);
    alert('✅ Employee updated successfully!');
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

  // Handle search
  const handleSearch = (query) => {
    setSearchQuery(query);
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

  if (loading) {
    return (
      <div className="employees-layout">
        <Sidebar />
        <div className="main-content">
          <LoadingSpinner message="Loading employees..." />
        </div>
      </div>
    );
  }

  return (
    <div className="employees-layout">
      <Sidebar />
      <div className="main-content">
        <div className="employees-page">
          <div className="container">
            {/* Page Header */}
            <div className="page-header">
              <div className="breadcrumb">
                <Link to="/departments" className="breadcrumb-link">
                  Departments
                </Link>
                <span className="breadcrumb-separator">›</span>
                <span className="breadcrumb-current">
                  {currentDepartment?.name || 'Department'} Employees
                </span>
              </div>
              
              <div className="department-info">
                <h1>{currentDepartment?.name} Department</h1>
                <p>{currentDepartment?.description}</p>
                <div className="department-meta">
                  <span className="employee-count">
                    {filteredEmployees.length} Employee{filteredEmployees.length !== 1 ? 's' : ''}
                  </span>
                  {currentDepartment?.head && (
                    <span className="department-head">
                      Head: {currentDepartment.head}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* ✅ Controls Section with Search and Add Button */}
            <div className="employees-controls">
              <SearchBar 
                onSearch={handleSearch} 
                placeholder="Search employees by name, email, phone, or role..."
              />
              <button 
                className="add-employee-btn"
                onClick={handleAddEmployee}
              >
                <span className="btn-icon">👤➕</span>
                Add Employee
              </button>
            </div>

            {/* Employee List Section */}
            <div className="employees-section">
              {filteredEmployees.length === 0 ? (
                <div className="no-employees">
                  <div className="no-employees-icon">👥</div>
                  <h3>No employees found</h3>
                  <p>
                    {searchQuery 
                      ? `No employees match "${searchQuery}"`
                      : 'This department has no employees yet.'
                    }
                  </p>
                  {!searchQuery && (
                    <button 
                      className="add-employee-btn"
                      onClick={handleAddEmployee}
                    >
                      Add First Employee
                    </button>
                  )}
                </div>
              ) : (
                <div className="employees-grid">
                  {filteredEmployees.map(employee => (
                    <EmployeeCard 
                      key={employee.id} 
                      employee={employee}
                      onEdit={() => handleEditEmployee(employee)}
                      onDelete={() => handleDeleteEmployee(employee.id)}
                      formatCurrency={formatCurrency}
                      formatDate={formatDate}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Edit Employee Modal */}
            {showEditModal && (
              <div className="modal-overlay" onClick={handleCancelEdit}>
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                  <div className="modal-header">
                    <h3>Edit Employee Details</h3>
                    <button className="modal-close" onClick={handleCancelEdit}>×</button>
                  </div>
                  
                  <div className="modal-body">
                    <form className="edit-form">
                      <div className="form-group">
                        <label htmlFor="name">Full Name</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={editFormData.name}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="role">Job Role</label>
                        <input
                          type="text"
                          id="role"
                          name="role"
                          value={editFormData.role}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="dateOfJoining">Date of Joining</label>
                        <input
                          type="date"
                          id="dateOfJoining"
                          name="dateOfJoining"
                          value={editFormData.dateOfJoining}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="phone">Phone Number</label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={editFormData.phone}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={editFormData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="currentSalary">Current Salary ($)</label>
                        <input
                          type="number"
                          id="currentSalary"
                          name="currentSalary"
                          value={editFormData.currentSalary}
                          onChange={handleInputChange}
                          min="0"
                          step="1000"
                          required
                        />
                      </div>
                    </form>
                  </div>
                  
                  <div className="modal-footer">
                    <button className="btn-cancel" onClick={handleCancelEdit}>
                      Cancel
                    </button>
                    <button className="btn-save" onClick={handleSaveChanges}>
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ✅ Add Employee Modal */}
      <AddEmployeeModal
        isOpen={showAddEmployeeModal}
        onClose={handleCloseAddEmployeeModal}
        onAddEmployee={handleAddNewEmployee}
        departmentId={departmentId}
        departmentName={currentDepartment?.name}
      />
    </div>
  );
};

export default DepartmentEmployees;