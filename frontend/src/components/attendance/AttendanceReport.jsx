// src/components/attendance/AttendanceReport.jsx
import React, { useState } from 'react';
import { useEmployees } from '../../context/EmployeeContext';
import * as XLSX from 'xlsx';
import { toast } from 'react-toastify';
import LoadingSpinner from '../common/LoadingSpinner';

const AttendanceReport = ({ selectedDate }) => {
  const [reportType, setReportType] = useState('daily');
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7));
  const [selectedEmployee, setSelectedEmployee] = useState('all');
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [summaryStats, setSummaryStats] = useState({});

  const { employees } = useEmployees();

  const generateReport = async () => {
    setLoading(true);
    try {
      const attendanceRecords = JSON.parse(localStorage.getItem('attendanceRecords') || '[]');
      let filteredData = [];
      let summary = {};

      if (reportType === 'daily') {
        // Daily report
        filteredData = attendanceRecords.filter(record => record.date === selectedDate);
        
        if (selectedEmployee !== 'all') {
          filteredData = filteredData.filter(record => record.employeeId === selectedEmployee);
        }

        // Add employee names
        filteredData = filteredData.map(record => {
          const employee = employees.find(emp => emp._id === record.employeeId);
          return {
            ...record,
            employeeName: employee?.name || 'Unknown Employee',
            departmentName: employee?.department || 'N/A'
          };
        });

        summary = {
          totalEmployees: selectedEmployee === 'all' ? employees.length : 1,
          totalPresent: filteredData.filter(r => r.status === 'present').length,
          totalAbsent: filteredData.filter(r => r.status === 'absent').length,
          totalMarked: filteredData.length
        };

      } else {
        // Monthly report
        const [year, month] = selectedMonth.split('-');
        const monthStart = new Date(year, month - 1, 1);
        const monthEnd = new Date(year, month, 0);
        
        // Get all records for the month
        const monthRecords = attendanceRecords.filter(record => {
          const recordDate = new Date(record.date);
          return recordDate >= monthStart && recordDate <= monthEnd;
        });

        // Group by employee
        const employeeStats = {};
        
        employees.forEach(employee => {
          if (selectedEmployee !== 'all' && employee._id !== selectedEmployee) return;
          
          const employeeRecords = monthRecords.filter(r => r.employeeId === employee._id);
          const presentDays = employeeRecords.filter(r => r.status === 'present').length;
          const absentDays = employeeRecords.filter(r => r.status === 'absent').length;
          const totalDays = monthEnd.getDate(); // Total days in month
          const attendancePercentage = totalDays > 0 ? Math.round((presentDays / totalDays) * 100) : 0;

          employeeStats[employee._id] = {
            employeeId: employee._id,
            employeeName: employee.name,
            departmentName: employee.department || 'N/A',
            totalDays,
            presentDays,
            absentDays,
            attendancePercentage
          };
        });

        filteredData = Object.values(employeeStats);
        
        summary = {
          totalEmployees: filteredData.length,
          averageAttendance: filteredData.length > 0 
            ? Math.round(filteredData.reduce((sum, emp) => sum + emp.attendancePercentage, 0) / filteredData.length)
            : 0,
          totalPresentDays: filteredData.reduce((sum, emp) => sum + emp.presentDays, 0),
          totalAbsentDays: filteredData.reduce((sum, emp) => sum + emp.absentDays, 0)
        };
      }

      setReportData(filteredData);
      setSummaryStats(summary);
      toast.success('Report generated successfully');
    } catch (error) {
      console.error('Error generating report:', error);
      toast.error('Failed to generate report');
    } finally {
      setLoading(false);
    }
  };

  const exportToExcel = () => {
    if (reportData.length === 0) {
      toast.error('No data to export');
      return;
    }

    try {
      let exportData;
      
      if (reportType === 'daily') {
        exportData = reportData.map(record => ({
          'Employee Name': record.employeeName,
          'Department': record.departmentName,
          'Status': record.status,
          'Date': record.date,
          'Marked At': record.markedAt ? new Date(record.markedAt).toLocaleString() : 'N/A'
        }));
      } else {
        exportData = reportData.map(record => ({
          'Employee Name': record.employeeName,
          'Department': record.departmentName,
          'Total Days': record.totalDays,
          'Present Days': record.presentDays,
          'Absent Days': record.absentDays,
          'Attendance %': `${record.attendancePercentage}%`
        }));
      }

      const ws = XLSX.utils.json_to_sheet(exportData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Attendance Report');
      
      const fileName = reportType === 'daily' 
        ? `daily_attendance_${selectedDate}.xlsx`
        : `monthly_attendance_${selectedMonth.replace('-', '_')}.xlsx`;
      
      XLSX.writeFile(wb, fileName);
      toast.success('Report exported successfully');
    } catch (error) {
      console.error('Error exporting report:', error);
      toast.error('Failed to export report');
    }
  };

  return (
    <div className="attendance-report">
      <div className="report-header">
        <h2>Attendance Reports</h2>
        <p>Generate and export attendance reports for employees</p>
      </div>

      {/* Report Controls */}
      <div className="report-controls">
        <div className="control-group">
          <label>Report Type</label>
          <select
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
            className="control-select"
          >
            <option value="daily">Daily Report</option>
            <option value="monthly">Monthly Report</option>
          </select>
        </div>

        {reportType === 'monthly' ? (
          <div className="control-group">
            <label>Month</label>
            <input
              type="month"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="control-input"
            />
          </div>
        ) : (
          <div className="control-group">
            <label>Date</label>
            <input
              type="date"
              value={selectedDate}
              readOnly
              className="control-input"
            />
          </div>
        )}

        <div className="control-group">
          <label>Employee</label>
          <select
            value={selectedEmployee}
            onChange={(e) => setSelectedEmployee(e.target.value)}
            className="control-select"
          >
            <option value="all">All Employees</option>
            {employees.map(emp => (
              <option key={emp._id} value={emp._id}>
                {emp.name}
              </option>
            ))}
          </select>
        </div>

        <div className="control-group">
          <button
            className="btn-generate"
            onClick={generateReport}
            disabled={loading}
          >
            {loading ? <LoadingSpinner size="small" /> : 'Generate Report'}
          </button>
        </div>

        <div className="control-group">
          <button
            className="btn-export"
            onClick={exportToExcel}
            disabled={loading || reportData.length === 0}
          >
            📊 Export to Excel
          </button>
        </div>
      </div>

      {/* Summary Stats */}
      {Object.keys(summaryStats).length > 0 && (
        <div className="summary-stats">
          <div className="stat-card">
            <span className="stat-number">{summaryStats.totalEmployees || 0}</span>
            <span className="stat-label">Total Employees</span>
          </div>
          {reportType === 'daily' ? (
            <>
              <div className="stat-card">
                <span className="stat-number">{summaryStats.totalPresent || 0}</span>
                <span className="stat-label">Present</span>
              </div>
              <div className="stat-card">
                <span className="stat-number">{summaryStats.totalAbsent || 0}</span>
                <span className="stat-label">Absent</span>
              </div>
              <div className="stat-card">
                <span className="stat-number">{summaryStats.totalMarked || 0}</span>
                <span className="stat-label">Marked</span>
              </div>
            </>
          ) : (
            <>
              <div className="stat-card">
                <span className="stat-number">{summaryStats.totalPresentDays || 0}</span>
                <span className="stat-label">Total Present Days</span>
              </div>
              <div className="stat-card">
                <span className="stat-number">{summaryStats.totalAbsentDays || 0}</span>
                <span className="stat-label">Total Absent Days</span>
              </div>
              <div className="stat-card">
                <span className="stat-number">{summaryStats.averageAttendance || 0}%</span>
                <span className="stat-label">Average Attendance</span>
              </div>
            </>
          )}
        </div>
      )}

      {/* Report Content */}
      <div className="report-content">
        {loading ? (
          <div className="loading-container">
            <LoadingSpinner size="large" />
          </div>
        ) : reportData.length === 0 ? (
          <div className="no-data">
            <div className="no-data-icon">📊</div>
            <h3>No Report Data</h3>
            <p>Click "Generate Report" to see attendance data for the selected criteria.</p>
          </div>
        ) : (
          <div className="report-table-container">
            <table className="report-table">
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Department</th>
                  {reportType === 'daily' ? (
                    <>
                      <th>Status</th>
                      <th>Marked At</th>
                    </>
                  ) : (
                    <>
                      <th>Total Days</th>
                      <th>Present</th>
                      <th>Absent</th>
                      <th>Attendance %</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody>
                {reportData.map((record, index) => (
                  <tr key={index}>
                    <td>
                      <div className="employee-info">
                        <div className="employee-avatar">
                          {record.employeeName.split(' ').map(n => n[0]).join('').slice(0, 2)}
                        </div>
                        <div className="employee-details">
                          <div className="employee-name">{record.employeeName}</div>
                        </div>
                      </div>
                    </td>
                    
                    <td>
                      <span className="department-name">{record.departmentName}</span>
                    </td>

                    {reportType === 'daily' ? (
                      <>
                        <td>
                          <span className={`status-badge ${record.status}`}>
                            {record.status === 'present' && '✅ Present'}
                            {record.status === 'absent' && '❌ Absent'}
                          </span>
                        </td>
                        <td>
                          <span className="marked-time">
                            {record.markedAt 
                              ? new Date(record.markedAt).toLocaleTimeString('en-US', {
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })
                              : '-'
                            }
                          </span>
                        </td>
                      </>
                    ) : (
                      <>
                        <td>
                          <span className="total-days">{record.totalDays}</span>
                        </td>
                        <td>
                          <span className="present-days">{record.presentDays}</span>
                        </td>
                        <td>
                          <span className="absent-days">{record.absentDays}</span>
                        </td>
                        <td>
                          <span className={`attendance-percentage ${
                            record.attendancePercentage >= 90 ? 'excellent' :
                            record.attendancePercentage >= 75 ? 'good' :
                            record.attendancePercentage >= 60 ? 'average' : 'poor'
                          }`}>
                            {record.attendancePercentage}%
                          </span>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AttendanceReport;