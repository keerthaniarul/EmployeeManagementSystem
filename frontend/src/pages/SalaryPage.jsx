import React from 'react';
import Sidebar from '../components/common/Sidebar';

const SalaryPage = () => {
  return (
    <div className="salary-layout">
      <Sidebar />
      <div className="main-content">
        <div className="page-header">
          <h1>Salary Management</h1>
          <p>Calculate and manage employee salaries and payroll</p>
        </div>
        
        <div style={{ 
          padding: '2rem', 
          background: 'white', 
          borderRadius: '1rem',
          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
          textAlign: 'center'
        }}>
          <h2>🚧 Under Development</h2>
          <p>The salary calculation module is currently being developed.</p>
          <p>Features will include:</p>
          <ul style={{ textAlign: 'left', maxWidth: '500px', margin: '0 auto' }}>
            <li>Automatic salary calculations</li>
            <li>Payroll processing</li>
            <li>Salary slips generation</li>
            <li>Tax calculations</li>
            <li>Bonus and deduction management</li>
            <li>Payment history</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SalaryPage;