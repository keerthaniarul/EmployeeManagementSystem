// src/components/attendance/AttendanceUpload.jsx
import React, { useState, useRef } from 'react';
import * as XLSX from 'xlsx';
import { toast } from 'react-toastify';
import LoadingSpinner from '../common/LoadingSpinner';
import { useEmployees } from '../../context/EmployeeContext';

const AttendanceUpload = ({ selectedDate }) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedData, setUploadedData] = useState([]);
  const [validationErrors, setValidationErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  
  const fileInputRef = useRef(null);
  const { employees } = useEmployees();

  // Handle drag events
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  // Handle drop event
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  };

  // Handle file input change
  const handleFileSelect = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  };

  // Process uploaded file
  const handleFile = async (file) => {
    const fileExtension = file.name.toLowerCase().split('.').pop();
    if (!['xlsx', 'xls'].includes(fileExtension)) {
      toast.error('Please upload a valid Excel file (.xlsx or .xls)');
      return;
    }

    setLoading(true);
    try {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = e.target.result;
          const workbook = XLSX.read(data, { type: 'binary' });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(worksheet);
          
          processExcelData(jsonData, file.name);
        } catch (error) {
          console.error('Error reading Excel file:', error);
          toast.error('Error reading Excel file. Please check the file format.');
          setLoading(false);
        }
      };
      reader.readAsBinaryString(file);
    } catch (error) {
      console.error('Error processing file:', error);
      toast.error('Error processing file');
      setLoading(false);
    }
  };

  // Process and validate Excel data
  const processExcelData = (data, fileName) => {
    const processedData = [];
    const errors = [];

    data.forEach((row, index) => {
      const rowNumber = index + 2;
      
      const employeeId = row['Employee_ID'] || row['EmployeeID'] || row['ID'];
      const employeeName = row['Employee_Name'] || row['Name'] || row['EmployeeName'];
      const status = row['Status'] || row['Attendance'] || row['Present'];
      const date = row['Date'] ? new Date(row['Date']).toISOString().split('T')[0] : selectedDate;

      // Validate required fields
      if (!employeeId) {
        errors.push(`Row ${rowNumber}: Employee ID is required`);
        return;
      }

      if (!employeeName) {
        errors.push(`Row ${rowNumber}: Employee Name is required`);
        return;
      }

      if (!status) {
        errors.push(`Row ${rowNumber}: Status is required`);
        return;
      }

      // Find employee in database
      const employee = employees.find(emp => 
        emp._id === employeeId.toString() || 
        emp.name.toLowerCase() === employeeName.toLowerCase().trim() ||
        emp.email.toLowerCase() === employeeName.toLowerCase().trim()
      );

      if (!employee) {
        errors.push(`Row ${rowNumber}: Employee '${employeeName}' (ID: ${employeeId}) not found`);
        return;
      }

      // Validate and normalize status
      const validStatuses = ['present', 'absent', 'p', 'a', '1', '0', 'yes', 'no'];
      const normalizedStatus = status.toString().toLowerCase().trim();
      
      if (!validStatuses.includes(normalizedStatus)) {
        errors.push(`Row ${rowNumber}: Invalid status '${status}'. Use Present/Absent, P/A, 1/0, or Yes/No`);
        return;
      }

      const isPresent = ['present', 'p', '1', 'yes'].includes(normalizedStatus);

      processedData.push({
        employeeId: employee._id,
        employeeName: employee.name,
        status: isPresent ? 'present' : 'absent',
        date,
        originalRow: rowNumber
      });
    });

    setUploadedData(processedData);
    setValidationErrors(errors);
    setShowPreview(true);
    setLoading(false);

    if (errors.length > 0) {
      toast.warning(`Found ${errors.length} validation errors. Please review before uploading.`);
    } else {
      toast.success(`Successfully processed ${processedData.length} attendance records.`);
    }
  };

  // Upload attendance data - Mock implementation
  const handleUpload = async () => {
    if (uploadedData.length === 0) {
      toast.error('No valid data to upload');
      return;
    }

    if (validationErrors.length > 0) {
      toast.error('Please fix validation errors before uploading');
      return;
    }

    setLoading(true);
    try {
      // Mock API call - replace with actual API
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Store in localStorage for demo purposes
      const existingData = JSON.parse(localStorage.getItem('attendanceRecords') || '[]');
      const newRecords = uploadedData.map(record => ({
        ...record,
        id: Date.now() + Math.random(),
        uploadedAt: new Date().toISOString()
      }));
      
      localStorage.setItem('attendanceRecords', JSON.stringify([...existingData, ...newRecords]));
      
      toast.success('Attendance uploaded successfully');
      resetUpload();
    } catch (error) {
      console.error('Error uploading attendance:', error);
      toast.error('Failed to upload attendance');
    } finally {
      setLoading(false);
    }
  };

  // Reset upload state
  const resetUpload = () => {
    setUploadedData([]);
    setValidationErrors([]);
    setShowPreview(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Download sample template
  const downloadTemplate = () => {
    const templateData = [
      {
        Employee_ID: '001',
        Employee_Name: 'John Doe',
        Status: 'Present',
        Date: selectedDate
      },
      {
        Employee_ID: '002',
        Employee_Name: 'Jane Smith',
        Status: 'Absent',
        Date: selectedDate
      },
      {
        Employee_ID: '003',
        Employee_Name: 'Mike Johnson',
        Status: 'P',
        Date: selectedDate
      }
    ];

    const ws = XLSX.utils.json_to_sheet(templateData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Attendance Template');
    XLSX.writeFile(wb, `attendance_template_${selectedDate}.xlsx`);
    toast.success('Template downloaded successfully');
  };

  return (
    <div className="attendance-upload">
      {/* Upload Instructions */}
      <div className="upload-instructions">
        <h2>Upload Daily Attendance</h2>
        <p>Upload Excel files with employee attendance data. The file should contain columns: Employee_ID, Employee_Name, Status, and Date (optional).</p>
        
        <div className="template-download">
          <button className="btn-template" onClick={downloadTemplate}>
            📥 Download Template
          </button>
        </div>
      </div>

      {!showPreview ? (
        // File Upload Area
        <div 
          className={`upload-area ${dragActive ? 'drag-active' : ''}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".xlsx,.xls"
            onChange={handleFileSelect}
            className="file-input"
          />
          
          <div className="upload-content">
            {loading ? (
              <LoadingSpinner size="large" />
            ) : (
              <>
                <div className="upload-icon">📊</div>
                <h3>Drop Excel file here or click to browse</h3>
                <p>Supports .xlsx and .xls files</p>
                <div className="upload-formats">
                  <span>Accepted formats: XLSX, XLS</span>
                </div>
              </>
            )}
          </div>
        </div>
      ) : (
        // Preview Area
        <div className="preview-area">
          <div className="preview-header">
            <h3>Preview Attendance Data</h3>
            <div className="preview-stats">
              <span className="stat-item">
                <strong>{uploadedData.length}</strong> Valid Records
              </span>
              <span className="stat-item error">
                <strong>{validationErrors.length}</strong> Errors
              </span>
            </div>
          </div>

          {/* Validation Errors */}
          {validationErrors.length > 0 && (
            <div className="validation-errors">
              <h4>❌ Validation Errors</h4>
              <ul>
                {validationErrors.slice(0, 10).map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
                {validationErrors.length > 10 && (
                  <li>... and {validationErrors.length - 10} more errors</li>
                )}
              </ul>
            </div>
          )}

          {/* Preview Table */}
          {uploadedData.length > 0 && (
            <div className="preview-table-container">
              <table className="preview-table">
                <thead>
                  <tr>
                    <th>Employee Name</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Row</th>
                  </tr>
                </thead>
                <tbody>
                  {uploadedData.slice(0, 10).map((record, index) => (
                    <tr key={index}>
                      <td>{record.employeeName}</td>
                      <td>
                        <span className={`status-badge ${record.status}`}>
                          {record.status === 'present' ? '✅ Present' : '❌ Absent'}
                        </span>
                      </td>
                      <td>{record.date}</td>
                      <td>#{record.originalRow}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {uploadedData.length > 10 && (
                <p className="preview-note">
                  Showing first 10 records. Total: {uploadedData.length}
                </p>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="preview-actions">
            <button 
              className="btn-secondary" 
              onClick={resetUpload}
              disabled={loading}
            >
              Cancel
            </button>
            <button 
              className="btn-primary" 
              onClick={handleUpload}
              disabled={loading || validationErrors.length > 0 || uploadedData.length === 0}
            >
              {loading ? <LoadingSpinner size="small" /> : 'Upload Attendance'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AttendanceUpload;