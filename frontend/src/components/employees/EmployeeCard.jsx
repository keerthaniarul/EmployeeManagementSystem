import React from 'react';

const EmployeeCard = ({ employee, onEdit, onDelete, formatCurrency, formatDate }) => {
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  // Inline styles
  const cardStyles = {
    background: 'white',
    border: '2px solid #f0f0f0',
    borderRadius: '15px',
    padding: '1.5rem',
    transition: 'all 0.3s ease',
    position: 'relative',
    overflow: 'hidden'
  };

  const cardBeforeStyles = {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '4px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
  };

  const headerStyles = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '1rem'
  };

  const avatarStyles = {
    width: '60px',
    height: '60px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontWeight: 700,
    fontSize: '1.2rem',
    boxShadow: '0 5px 15px rgba(102, 126, 234, 0.3)'
  };

  const actionsStyles = {
    display: 'flex',
    gap: '0.5rem',
    opacity: 0,
    transition: 'opacity 0.3s ease'
  };

  const actionBtnStyles = {
    background: 'white',
    border: '2px solid #f0f0f0',
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  const detailsStyles = {
    textAlign: 'left'
  };

  const nameStyles = {
    fontSize: '1.4rem',
    fontWeight: 700,
    color: '#333',
    marginBottom: '0.5rem'
  };

  const roleStyles = {
    color: '#667eea',
    fontWeight: 600,
    fontSize: '1rem',
    marginBottom: '1rem'
  };

  const infoStyles = {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem'
  };

  const infoItemStyles = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.5rem 0',
    borderBottom: '1px solid #f0f0f0'
  };

  const infoLabelStyles = {
    fontWeight: 600,
    color: '#666',
    fontSize: '0.9rem'
  };

  const infoValueStyles = {
    fontWeight: 500,
    color: '#333',
    fontSize: '0.9rem'
  };

  const salaryStyles = {
    ...infoValueStyles,
    color: '#10b981',
    fontWeight: 700,
    fontSize: '1rem'
  };

  return (
    <div 
      style={cardStyles}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-5px)';
        e.currentTarget.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.1)';
        e.currentTarget.style.borderColor = '#667eea';
        const actions = e.currentTarget.querySelector('.employee-actions');
        if (actions) actions.style.opacity = '1';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
        e.currentTarget.style.borderColor = '#f0f0f0';
        const actions = e.currentTarget.querySelector('.employee-actions');
        if (actions) actions.style.opacity = '0';
      }}
    >
      <div style={cardBeforeStyles}></div>
      
      <div style={headerStyles}>
        <div style={avatarStyles}>
          {getInitials(employee.name)}
        </div>
        <div className="employee-actions" style={actionsStyles}>
          <button
            style={actionBtnStyles}
            onClick={onEdit}
            onMouseEnter={(e) => {
              e.target.style.borderColor = '#3b82f6';
              e.target.style.background = '#eff6ff';
              e.target.style.transform = 'scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.target.style.borderColor = '#f0f0f0';
              e.target.style.background = 'white';
              e.target.style.transform = 'scale(1)';
            }}
            title="Edit Employee"
          >
            ✏️
          </button>
          <button
            style={actionBtnStyles}
            onClick={onDelete}
            onMouseEnter={(e) => {
              e.target.style.borderColor = '#ef4444';
              e.target.style.background = '#fef2f2';
              e.target.style.transform = 'scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.target.style.borderColor = '#f0f0f0';
              e.target.style.background = 'white';
              e.target.style.transform = 'scale(1)';
            }}
            title="Delete Employee"
          >
            🗑️
          </button>
        </div>
      </div>
      
      <div style={detailsStyles}>
        <h3 style={nameStyles}>{employee.name}</h3>
        <p style={roleStyles}>{employee.role}</p>
        
        <div style={infoStyles}>
          <div style={infoItemStyles}>
            <span style={infoLabelStyles}>Joined:</span>
            <span style={infoValueStyles}>{formatDate(employee.dateOfJoining)}</span>
          </div>
          <div style={infoItemStyles}>
            <span style={infoLabelStyles}>Phone:</span>
            <span style={infoValueStyles}>{employee.phone}</span>
          </div>
          <div style={infoItemStyles}>
            <span style={infoLabelStyles}>Email:</span>
            <span style={infoValueStyles}>{employee.email}</span>
          </div>
          <div style={infoItemStyles}>
            <span style={infoLabelStyles}>Salary:</span>
            <span style={salaryStyles}>{formatCurrency(employee.currentSalary)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeCard;