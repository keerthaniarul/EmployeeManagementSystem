// src/services/attendanceService.js
import api from './api';

class AttendanceService {
  
  // Upload attendance data from Excel file
  async uploadAttendance(attendanceData, date) {
    try {
      const response = await api.post('/attendance/upload', {
        attendanceData,
        date
      });
      return response.data;
    } catch (error) {
      console.error('Error uploading attendance:', error);
      throw new Error(error.response?.data?.message || 'Failed to upload attendance');
    }
  }

  // Get attendance records by specific date
  async getByDate(date) {
    try {
      const response = await api.get(`/attendance/date/${date}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching attendance by date:', error);
      throw new Error(error.response?.data?.message || 'Failed to fetch attendance');
    }
  }

  // Mark individual attendance
  async markAttendance(attendanceData) {
    try {
      const response = await api.post('/attendance/mark', attendanceData);
      return response.data;
    } catch (error) {
      console.error('Error marking attendance:', error);
      throw new Error(error.response?.data?.message || 'Failed to mark attendance');
    }
  }

  // Update existing attendance record
  async updateAttendance(attendanceId, updateData) {
    try {
      const response = await api.put(`/attendance/${attendanceId}`, updateData);
      return response.data;
    } catch (error) {
      console.error('Error updating attendance:', error);
      throw new Error(error.response?.data?.message || 'Failed to update attendance');
    }
  }

  // Bulk mark attendance
  async bulkMarkAttendance(employeeIds, status, date) {
    try {
      const response = await api.post('/attendance/bulk-mark', {
        employeeIds,
        status,
        date
      });
      return response.data;
    } catch (error) {
      console.error('Error bulk marking attendance:', error);
      throw new Error(error.response?.data?.message || 'Failed to bulk mark attendance');
    }
  }

  // Get uploaded files list
  async getUploadedFiles() {
    try {
      const response = await api.get('/attendance/files');
      return response.data;
    } catch (error) {
      console.error('Error fetching uploaded files:', error);
      throw new Error(error.response?.data?.message || 'Failed to fetch uploaded files');
    }
  }

  // Delete uploaded file
  async deleteUploadedFile(fileId) {
    try {
      const response = await api.delete(`/attendance/files/${fileId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting uploaded file:', error);
      throw new Error(error.response?.data?.message || 'Failed to delete file');
    }
  }

  // Download file
  async downloadFile(fileId) {
    try {
      const response = await api.get(`/attendance/files/${fileId}/download`, {
        responseType: 'blob'
      });
      return response;
    } catch (error) {
      console.error('Error downloading file:', error);
      throw new Error(error.response?.data?.message || 'Failed to download file');
    }
  }

  // Reprocess uploaded file
  async reprocessFile(fileId) {
    try {
      const response = await api.post(`/attendance/files/${fileId}/reprocess`);
      return response.data;
    } catch (error) {
      console.error('Error reprocessing file:', error);
      throw new Error(error.response?.data?.message || 'Failed to reprocess file');
    }
  }

  // Get monthly attendance report
  async getMonthlyReport(month, employeeId = null) {
    try {
      const params = { month };
      if (employeeId && employeeId !== 'all') {
        params.employeeId = employeeId;
      }
      
      const response = await api.get('/attendance/report/monthly', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching monthly report:', error);
      throw new Error(error.response?.data?.message || 'Failed to fetch monthly report');
    }
  }

  // Get daily attendance report
  async getAttendanceReport(date, employeeId = null) {
    try {
      const params = { date };
      if (employeeId && employeeId !== 'all') {
        params.employeeId = employeeId;
      }
      
      const response = await api.get('/attendance/report/daily', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching daily report:', error);
      throw new Error(error.response?.data?.message || 'Failed to fetch daily report');
    }
  }

  // Export attendance to Excel
  async exportToExcel(filters) {
    try {
      const response = await api.post('/attendance/export', filters, {
        responseType: 'blob'
      });
      
      // Create download link
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      
      // Generate filename
      const date = new Date().toISOString().split('T')[0];
      const filename = filters.month 
        ? `attendance_monthly_${filters.month.replace('-', '_')}.xlsx`
        : `attendance_daily_${date.replace(/-/g, '_')}.xlsx`;
      
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      
      return { success: true };
    } catch (error) {
      console.error('Error exporting attendance:', error);
      throw new Error(error.response?.data?.message || 'Failed to export attendance');
    }
  }

  // Get attendance statistics
  async getAttendanceStats(startDate, endDate) {
    try {
      const params = { startDate, endDate };
      const response = await api.get('/attendance/stats', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching attendance stats:', error);
      return {};
    }
  }

  // Validate attendance data before uploading
  validateAttendanceData(data) {
    const errors = [];
    
    if (!Array.isArray(data)) {
      errors.push('Attendance data must be an array');
      return errors;
    }
    
    data.forEach((record, index) => {
      if (!record.employeeId) {
        errors.push(`Row ${index + 1}: Employee ID is required`);
      }
      
      if (!record.status || !['present', 'absent'].includes(record.status)) {
        errors.push(`Row ${index + 1}: Valid status (present/absent) is required`);
      }
      
      if (!record.date) {
        errors.push(`Row ${index + 1}: Date is required`);
      }
    });
    
    return errors;
  }
}

export default new AttendanceService();