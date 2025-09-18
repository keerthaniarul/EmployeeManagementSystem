// src/pages/SalaryPage.jsx
import React, { useState, useEffect } from 'react';
import Sidebar from '../components/common/Sidebar';
import LoadingSpinner from '../components/common/LoadingSpinner';
import '../styles/pages/salary.css';

const SalaryPage = () => {
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [salaryRangeFilter, setSalaryRangeFilter] = useState('all');

  // Mock salary data - replace with API calls
  const [salaryData] = useState({
    totalPayrollCosts: 2850000,
    totalEmployees: 45,
    employeesPaid: 42,
    pendingPayments: 3,
    plannedBudget: 3000000,
    actualExpenses: 2850000
  });

  const [employees] = useState([
    {
      id: 1,
      name: 'Alex Rodriguez',
      department: 'Supervisors',
      role: 'Senior Supervisor',
      currentSalary: 75000,
      lastUpdated: '2024-01-15',
      status: 'paid',
      joiningDate: '2020-03-15',
      email: 'alex.rodriguez@company.com'
    },
    {
      id: 2,
      name: 'Emily Chen',
      department: 'Supervisors',
      role: 'Team Lead',
      currentSalary: 68000,
      lastUpdated: '2024-01-15',
      status: 'paid',
      joiningDate: '2021-07-22',
      email: 'emily.chen@company.com'
    },
    {
      id: 3,
      name: 'Robert Davis',
      department: 'Supervisors',
      role: 'Floor Supervisor',
      currentSalary: 72000,
      lastUpdated: '2024-01-15',
      status: 'pending',
      joiningDate: '2019-11-10',
      email: 'robert.davis@company.com'
    },
    {
      id: 4,
      name: 'Carlos Martinez',
      department: 'Maintenance',
      role: 'Maintenance Technician',
      currentSalary: 52000,
      lastUpdated: '2024-01-15',
      status: 'paid',
      joiningDate: '2020-01-08',
      email: 'carlos.martinez@company.com'
    },
    {
      id: 5,
      name: 'Ahmed Hassan',
      department: 'Quality Check',
      role: 'Quality Inspector',
      currentSalary: 55000,
      lastUpdated: '2024-01-15',
      status: 'paid',
      joiningDate: '2020-09-05',
      email: 'ahmed.hassan@company.com'
    },
    {
      id: 6,
      name: 'Maria Gonzalez',
      department: 'Packing',
      role: 'Packing Operator',
      currentSalary: 45000,
      lastUpdated: '2024-01-10',
      status: 'pending',
      joiningDate: '2021-02-14',
      email: 'maria.gonzalez@company.com'
    },
    {
      id: 7,
      name: 'John Smith',
      department: 'Supervisors',
      role: 'Department Head',
      currentSalary: 85000,
      lastUpdated: '2024-01-15',
      status: 'paid',
      joiningDate: '2018-05-20',
      email: 'john.smith@company.com'
    },
    {
      id: 8,
      name: 'Sarah Wilson',
      department: 'Quality Check',
      role: 'QC Manager',
      currentSalary: 78000,
      lastUpdated: '2024-01-15',
      status: 'paid',
      joiningDate: '2019-03-12',
      email: 'sarah.wilson@company.com'
    },
    {
      id: 9,
      name: 'Mike Johnson',
      department: 'Maintenance',
      role: 'Maintenance Manager',
      currentSalary: 70000,
      lastUpdated: '2024-01-12',
      status: 'pending',
      joiningDate: '2020-08-30',
      email: 'mike.johnson@company.com'
    },
    {
      id: 10,
      name: 'David Brown',
      department: 'Packing',
      role: 'Packing Supervisor',
      currentSalary: 58000,
      lastUpdated: '2024-01-15',
      status: 'paid',
      joiningDate: '2021-01-18',
      email: 'david.brown@company.com'
    }
  ]);

  // Get unique departments for filter
  const departments = [...new Set(employees.map(emp => emp.department))];

  // Filter employees based on search and filters
  const getFilteredEmployees = () => {
    return employees.filter(employee => {
      const matchesSearch = 
        employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.role.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesDepartment = 
        departmentFilter === 'all' || employee.department === departmentFilter;

      const matchesSalaryRange = () => {
        switch (salaryRangeFilter) {
          case 'under-50k':
            return employee.currentSalary < 50000;
          case '50k-70k':
            return employee.currentSalary >= 50000 && employee.currentSalary < 70000;
          case '70k-above':
            return employee.currentSalary >= 70000;
          default:
            return true;
        }
      };

      return matchesSearch && matchesDepartment && matchesSalaryRange();
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

  // Calculate budget variance
  const budgetVariance = salaryData.plannedBudget - salaryData.actualExpenses;
  const budgetVariancePercent = ((budgetVariance / salaryData.plannedBudget) * 100).toFixed(1);

  const filteredEmployees = getFilteredEmployees();

  return (
    <div className="salary-layout">
      <Sidebar />
      
      <div className="main-content">
        <div className="salary-page">
          <div className="container">
            {/* Page Header */}
            <div className="page-header">
              <h1>Salary Management</h1>
              <p>Manage payroll, track expenses, and monitor salary records</p>
            </div>

            {/* Dashboard Cards */}
            <div className="dashboard-cards">
              <div className="dashboard-card total-payroll">
                <div className="card-icon">💰</div>
                <div className="card-content">
                  <h3>Total Payroll Costs</h3>
                  <div className="card-value">{formatCurrency(salaryData.totalPayrollCosts)}</div>
                  <div className="card-subtitle">Current month</div>
                </div>
              </div>

              <div className="dashboard-card employees-paid">
                <div className="card-icon">✅</div>
                <div className="card-content">
                  <h3>Employees Paid</h3>
                  <div className="card-value">{salaryData.employeesPaid}/{salaryData.totalEmployees}</div>
                  <div className="card-subtitle">This month</div>
                </div>
              </div>

              <div className="dashboard-card pending-payments">
                <div className="card-icon">⏳</div>
                <div className="card-content">
                  <h3>Pending Payments</h3>
                  <div className="card-value">{salaryData.pendingPayments}</div>
                  <div className="card-subtitle">Awaiting processing</div>
                </div>
              </div>

              <div className="dashboard-card budget-variance">
                <div className="card-icon">{budgetVariance >= 0 ? '📈' : '📉'}</div>
                <div className="card-content">
                  <h3>Budget vs Actual</h3>
                  <div className="card-value">
                    <span className={budgetVariance >= 0 ? 'positive' : 'negative'}>
                      {budgetVariance >= 0 ? '+' : ''}{formatCurrency(budgetVariance)}
                    </span>
                  </div>
                  <div className="card-subtitle">
                    {budgetVariancePercent}% {budgetVariance >= 0 ? 'under' : 'over'} budget
                  </div>
                </div>
              </div>
            </div>

            {/* Budget Comparison Chart */}
            <div className="budget-comparison">
              <h3>Budget vs Actual Expenses</h3>
              <div className="budget-bars">
                <div className="budget-item">
                  <label>Planned Budget</label>
                  <div className="budget-bar">
                    <div 
                      className="budget-fill planned" 
                      style={{ width: '100%' }}
                    ></div>
                  </div>
                  <span>{formatCurrency(salaryData.plannedBudget)}</span>
                </div>
                <div className="budget-item">
                  <label>Actual Expenses</label>
                  <div className="budget-bar">
                    <div 
                      className="budget-fill actual" 
                      style={{ width: `${(salaryData.actualExpenses / salaryData.plannedBudget) * 100}%` }}
                    ></div>
                  </div>
                  <span>{formatCurrency(salaryData.actualExpenses)}</span>
                </div>
              </div>
            </div>

            {/* Employee Salary Table */}
            <div className="salary-table-section">
              <div className="table-header">
                <h3>Employee Salary Records</h3>
                <div className="table-controls">
                  {/* Search Bar */}
                  <div className="search-container">
                    <input
                      type="text"
                      placeholder="Search by name, email, department, or role..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="search-input"
                    />
                    <span className="search-icon">🔍</span>
                  </div>

                  {/* Department Filter */}
                  <select
                    value={departmentFilter}
                    onChange={(e) => setDepartmentFilter(e.target.value)}
                    className="filter-select"
                  >
                    <option value="all">All Departments</option>
                    {departments.map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>

                  {/* Salary Range Filter */}
                  <select
                    value={salaryRangeFilter}
                    onChange={(e) => setSalaryRangeFilter(e.target.value)}
                    className="filter-select"
                  >
                    <option value="all">All Salary Ranges</option>
                    <option value="under-50k">Under $50k</option>
                    <option value="50k-70k">$50k - $70k</option>
                    <option value="70k-above">$70k and above</option>
                  </select>
                </div>
              </div>

              {/* Results Count */}
              <div className="results-info">
                Showing {filteredEmployees.length} of {employees.length} employees
              </div>

              {/* Table */}
              {loading ? (
                <div className="loading-container">
                  <LoadingSpinner size="large" />
                </div>
              ) : filteredEmployees.length === 0 ? (
                <div className="no-results">
                  <div className="no-results-icon">📋</div>
                  <h4>No employees found</h4>
                  <p>Try adjusting your search criteria or filters</p>
                  <button 
                    className="clear-filters-btn"
                    onClick={() => {
                      setSearchTerm('');
                      setDepartmentFilter('all');
                      setSalaryRangeFilter('all');
                    }}
                  >
                    Clear All Filters
                  </button>
                </div>
              ) : (
                <div className="table-container">
                  <table className="salary-table">
                    <thead>
                      <tr>
                        <th>Employee</th>
                        <th>Department</th>
                        <th>Role</th>
                        <th>Current Salary</th>
                        <th>Status</th>
                        <th>Last Updated</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredEmployees.map(employee => (
                        <tr key={employee.id} className={`status-${employee.status}`}>
                          <td>
                            <div className="employee-info">
                              <div className="employee-avatar">
                                {employee.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                              </div>
                              <div className="employee-details">
                                <div className="employee-name">{employee.name}</div>
                                <div className="employee-email">{employee.email}</div>
                              </div>
                            </div>
                          </td>
                          <td>
                            <span className="department-tag">{employee.department}</span>
                          </td>
                          <td>{employee.role}</td>
                          <td>
                            <span className="salary-amount">{formatCurrency(employee.currentSalary)}</span>
                          </td>
                          <td>
                            <span className={`status-badge ${employee.status}`}>
                              {employee.status === 'paid' ? '✅ Paid' : '⏳ Pending'}
                            </span>
                          </td>
                          <td>{formatDate(employee.lastUpdated)}</td>
                          <td>
                            <div className="action-buttons">
                              <button 
                                className="action-btn edit-btn"
                                title="Edit Salary"
                              >
                                ✏️
                              </button>
                              <button 
                                className="action-btn view-btn"
                                title="View Details"
                              >
                                👁️
                              </button>
                              <button 
                                className="action-btn payslip-btn"
                                title="Generate Payslip"
                              >
                                📄
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalaryPage;