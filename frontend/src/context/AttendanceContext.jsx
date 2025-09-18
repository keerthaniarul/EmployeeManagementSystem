// src/context/AttendanceContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const AttendanceContext = createContext();

export const AttendanceProvider = ({ children }) => {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load initial data
  useEffect(() => {
    loadAttendanceData();
    loadUploadedFiles();
  }, []);

  // Load attendance data from localStorage (mock)
  const loadAttendanceData = () => {
    try {
      const data = JSON.parse(localStorage.getItem('attendanceRecords') || '[]');
      setAttendanceRecords(data);
    } catch (error) {
      console.error('Error loading attendance data:', error);
      setAttendanceRecords([]);
    }
  };

  // Load uploaded files from localStorage (mock)
  const loadUploadedFiles = () => {
    try {
      const files = JSON.parse(localStorage.getItem('uploadedFiles') || '[]');
      setUploadedFiles(files);
    } catch (error) {
      console.error('Error loading uploaded files:', error);
      setUploadedFiles([]);
    }
  };

  // Get attendance by date
  const getAttendanceByDate = async (date) => {
    try {
      setLoading(true);
      // Mock API call
      const allRecords = JSON.parse(localStorage.getItem('attendanceRecords') || '[]');
      const dateRecords = allRecords.filter(record => record.date === date);
      setAttendanceRecords(dateRecords);
      return dateRecords;
    } catch (error) {
      console.error('Error fetching attendance:', error);
      toast.error('Failed to fetch attendance records');
      return [];
    } finally {
      setLoading(false);
    }
  };

  // Upload attendance data
  const uploadAttendance = async (data, date) => {
    try {
      setLoading(true);
      
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const existingData = JSON.parse(localStorage.getItem('attendanceRecords') || '[]');
      const newRecords = data.map(record => ({
        ...record,
        id: Date.now() + Math.random(),
        uploadedAt: new Date().toISOString()
      }));
      
      const updatedData = [...existingData, ...newRecords];
      localStorage.setItem('attendanceRecords', JSON.stringify(updatedData));
      
      // Add to uploaded files
      const uploadedFile = {
        id: Date.now(),
        originalName: `attendance_${date}.xlsx`,
        uploadDate: new Date().toISOString(),
        recordsProcessed: data.length,
        status: 'processed',
        uploadedBy: 'Admin User'
      };
      
      const existingFiles = JSON.parse(localStorage.getItem('uploadedFiles') || '[]');
      localStorage.setItem('uploadedFiles', JSON.stringify([uploadedFile, ...existingFiles]));
      
      setAttendanceRecords(updatedData);
      setUploadedFiles([uploadedFile, ...existingFiles]);
      
      return { success: true };
    } catch (error) {
      console.error('Error uploading attendance:', error);
      throw new Error('Failed to upload attendance');
    } finally {
      setLoading(false);
    }
  };

  // Mark individual attendance
  const markAttendance = async (attendanceData) => {
    try {
      setLoading(true);
      
      const existingData = JSON.parse(localStorage.getItem('attendanceRecords') || '[]');
      const newRecord = {
        ...attendanceData,
        id: Date.now() + Math.random(),
        markedAt: new Date().toISOString()
      };
      
      const updatedData = [...existingData, newRecord];
      localStorage.setItem('attendanceRecords', JSON.stringify(updatedData));
      setAttendanceRecords(updatedData);
      
      return newRecord;
    } catch (error) {
      throw new Error('Failed to mark attendance');
    } finally {
      setLoading(false);
    }
  };

  // Update attendance record
  const updateAttendance = async (id, updateData) => {
    try {
      setLoading(true);
      
      const existingData = JSON.parse(localStorage.getItem('attendanceRecords') || '[]');
      const updatedData = existingData.map(record => 
        record.id === id ? { ...record, ...updateData, updatedAt: new Date().toISOString() } : record
      );
      
      localStorage.setItem('attendanceRecords', JSON.stringify(updatedData));
      setAttendanceRecords(updatedData);
      
      return { success: true };
    } catch (error) {
      throw new Error('Failed to update attendance');
    } finally {
      setLoading(false);
    }
  };

  // Delete uploaded file
  const deleteUploadedFile = async (fileId) => {
    try {
      setLoading(true);
      
      const existingFiles = JSON.parse(localStorage.getItem('uploadedFiles') || '[]');
      const updatedFiles = existingFiles.filter(file => file.id !== fileId);
      
      localStorage.setItem('uploadedFiles', JSON.stringify(updatedFiles));
      setUploadedFiles(updatedFiles);
      
      return { success: true };
    } catch (error) {
      throw new Error('Failed to delete file');
    } finally {
      setLoading(false);
    }
  };

  // Download file (mock)
  const downloadFile = async (fileId, fileName) => {
    try {
      toast.success(`Downloading ${fileName}...`);
      // In real implementation, this would download the actual file
      return { success: true };
    } catch (error) {
      throw new Error('Failed to download file');
    }
  };

  // Reprocess file (mock)
  const reprocessFile = async (fileId) => {
    try {
      setLoading(true);
      
      const existingFiles = JSON.parse(localStorage.getItem('uploadedFiles') || '[]');
      const updatedFiles = existingFiles.map(file => 
        file.id === fileId 
          ? { ...file, status: 'processed', processingNotes: 'File reprocessed successfully' }
          : file
      );
      
      localStorage.setItem('uploadedFiles', JSON.stringify(updatedFiles));
      setUploadedFiles(updatedFiles);
      
      return { success: true };
    } catch (error) {
      throw new Error('Failed to reprocess file');
    } finally {
      setLoading(false);
    }
  };

  // Get monthly report (mock)
  const getMonthlyReport = async (month, employeeId = 'all') => {
    try {
      setLoading(true);
      
      // Mock monthly report data
      const mockData = {
        data: [
          {
            employeeName: 'John Doe',
            totalDays: 22,
            presentDays: 20,
            absentDays: 2,
            attendancePercentage: 91
          },
          {
            employeeName: 'Jane Smith',
            totalDays: 22,
            presentDays: 22,
            absentDays: 0,
            attendancePercentage: 100
          }
        ],
        summary: {
          totalEmployees: 2,
          averageAttendance: 95
        }
      };
      
      return mockData;
    } catch (error) {
      return { data: [], summary: {} };
    } finally {
      setLoading(false);
    }
  };

  // Get daily report (mock)
  const getAttendanceReport = async (date, employeeId = 'all') => {
    try {
      const records = await getAttendanceByDate(date);
      
      const summary = {
        totalEmployees: records.length,
        totalPresent: records.filter(r => r.status === 'present').length,
        totalAbsent: records.filter(r => r.status === 'absent').length
      };
      
      return { data: records, summary };
    } catch (error) {
      return { data: [], summary: {} };
    }
  };

  const value = {
    attendanceRecords,
    uploadedFiles,
    loading,
    error,
    uploadAttendance,
    getAttendanceByDate,
    markAttendance,
    updateAttendance,
    deleteUploadedFile,
    downloadFile,
    reprocessFile,
    getMonthlyReport,
    getAttendanceReport
  };

  return (
    <AttendanceContext.Provider value={value}>
      {children}
    </AttendanceContext.Provider>
  );
};

export const useAttendance = () => {
  const context = useContext(AttendanceContext);
  if (!context) {
    throw new Error('useAttendance must be used within AttendanceProvider');
  }
  return context;
};