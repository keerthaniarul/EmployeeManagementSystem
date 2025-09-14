// src/components/attendance/AttendanceTable.jsx
import React, { useState, useEffect } from 'react';
import { useEmployees } from '../../context/EmployeeContext';
import { toast } from 'react-toastify';
import LoadingSpinner from '../common/LoadingSpinner';

const AttendanceTable = ({ selectedDate }) => {
  const [loading, setLoading] = useState(false);
  const [attendanceData, setAttendanceData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  const { employees } = useEmployees();

  useEffect(() => {
    loadAttendanceData();
  }, [selectedDate, employees]);

  const loadAttendanceData = async () => {
    setLoading(true);
    try {
      // Get existing attendance records from localStorage
      const existingRecords = JSON.parse(localStorage.getItem('attendanceRecords') || '[]');
      const todayRecords = existingRecords.filter(record => record.date === selectedDate);
      
      // Combine employees with attendance records
      const combinedData = employees.map(employee => {
        const attendanceRecord = todayRecords.find(r => r.employeeId === employee._id);
        return {
          ...employee,
          status: attendanceRecord?.status || 'not-marked',
          attendanceId: attendanceRecord?.id,
          markedAt: attendanceRecord?.markedAt
        };
      });
      
      setAttendanceData(combinedData);
    } catch (error) {
      console.error('Error loading attendance:', error);
      toast.error('Failed to load attendance data');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (employeeId, newStatus) => {
    try {
      setLoading(true);
      
      // Get existing records
      const existingRecords = JSON.parse(localStorage.getItem('attendanceRecords') || '[]');
      
      // Check if record already exists for this employee and date
      const existingRecordIndex = existingRecords.findIndex(
        r => r.employeeId === employeeId && r.date === selectedDate
      );
      
      if (existingRecordIndex >= 0) {
        // Update existing record
        existingRecords[existingRecordIndex] = {
          ...existingRecords[existingRecordIndex],
          status: newStatus,
          markedAt: new Date().toISOString()
        };
      } else {
        // Create new record
        const newRecord = {
          id: Date.now() + Math.random(),
          employeeId,
          status: newStatus,
          date: selectedDate,
          markedAt: new Date().toISOString()
        };
        existingRecords.push(newRecord);
      }
      
      // Save to localStorage
      localStorage.setItem('attendanceRecords', JSON.stringify(existingRecords));
      
      // Update local state
      setAttendanceData(prev => prev.map(emp => 
        emp._id === employeeId 
          ? { ...emp, status: newStatus, markedAt: new Date().toISOString() }
          : emp
      ));
      
      toast.success(`Marked ${newStatus} for employee`);
    } catch (error) {
      console.error('Error updating attendance:', error);
      toast.error('Failed to update attendance');
    } finally {
      setLoading(false);
    }
  };

  const handleBulkAction = (action) => {
    const unmarkedEmployees = attendanceData.filter(emp => emp.status === 'not-marked');
    
    if (unmarkedEmployees.length === 0) {
      toast.info('No unmarked employees found');
      return;
    }

    unmarkedEmployees.forEach(employee => {
      handleStatusChange(employee._id, action);
    });
  };

  // Filter employees based on search
  const filteredData = attendanceData.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get statistics
  const stats = {
    total: attendanceData.length,
    present: attendanceData.filter(emp => emp.status === 'present').length,
    absent: attendanceData.filter(emp => emp.status === 'absent').length,
    notMarked: attendanceData.filter(emp => emp.status === 'not-marked').length
  };

  if (loading && attendanceData.length === 0) {
    return (
      <div className="loading-container">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  return (
    <div className="attendance-table-container">
      {/* Header with Stats */}
      <div className="attendance-header">
        <h2>Attendance for {new Date(selectedDate).toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })}</h2>
        
        <div className="attendance-stats">
          <div className="stat-card">
            <span className="stat-number">{stats.total}</span>
            <span className="stat-label">Total</span>
          </div>
          <div className="stat-card present">
            <span className="stat-number">{stats.present}</span>
            <span className="stat-label">Present</span>
          </div>
          <div className="stat-card absent">
            <span className="stat-number">{stats.absent}</span>
            <span className="stat-label">Absent</span>
          </div>
          <div className="stat-card not-marked">
            <span className="stat-number">{stats.notMarked}</span>
            <span className="stat-label">Not Marked</span>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="table-controls">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search employees..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="bulk-actions">
          <button
            className="btn-bulk present"
            onClick={() => handleBulkAction('present')}
            disabled={stats.notMarked === 0}
          >
            Mark All Present
          </button>
          <button
            className="btn-bulk absent"
            onClick={() => handleBulkAction('absent')}
            disabled={stats.notMarked === 0}
          >
            Mark All Absent
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="table-wrapper">
        <table className="attendance-table">
          <thead>
            <tr>
              <th>Employee</th>
              <th>Department</th>
              <th>Status</th>
              <th>Marked At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map(employee => (
              <tr key={employee._id} className={`status-${employee.status}`}>
                <td>
                  <div className="employee-info">
                    <div className="employee-avatar">
                      {employee.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </div>
                    <div className="employee-details">
                      <div className="employee-name">{employee.name}</div>
                      <div className="employee-email">{employee.email}</div>
                    </div>
                  </div>
                </td>
                
                <td>
                  <span className="department-name">
                    {employee.department || 'N/A'}
                  </span>
                </td>
                
                <td>
                  <span className={`status-badge ${employee.status}`}>
                    {employee.status === 'present' && '✅ Present'}
                    {employee.status === 'absent' && '❌ Absent'}
                    {employee.status === 'not-marked' && '⏳ Not Marked'}
                  </span>
                </td>
                
                <td>
                  <span className="marked-time">
                    {employee.markedAt 
                      ? new Date(employee.markedAt).toLocaleTimeString('en-US', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })
                      : '-'
                    }
                  </span>
                </td>
                
                <td>
                  <div className="action-buttons">
                    <button
                      className="btn-quick present"
                      onClick={() => handleStatusChange(employee._id, 'present')}
                      disabled={loading}
                    >
                      Present
                    </button>
                    <button
                      className="btn-quick absent"
                      onClick={() => handleStatusChange(employee._id, 'absent')}
                      disabled={loading}
                    >
                      Absent
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredData.length === 0 && (
          <div className="no-data">
            <div className="no-data-icon">📋</div>
            <h3>No Employees Found</h3>
            <p>
              {searchTerm 
                ? 'No employees match your search criteria.' 
                : 'No employees available.'
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AttendanceTable;