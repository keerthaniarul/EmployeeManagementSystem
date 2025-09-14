import apiClient from './authService';

export const salaryService = {
  // Get salary records
  getSalaryRecords: async (filters = {}) => {
    try {
      const queryParams = new URLSearchParams(filters).toString();
      const response = await apiClient.get(`/salary?${queryParams}`);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to fetch salary records',
      };
    }
  },

  // Get employee salary history
  getEmployeeSalaryHistory: async (employeeId) => {
    try {
      const response = await apiClient.get(`/salary/employee/${employeeId}`);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to fetch salary history',
      };
    }
  },

  // Calculate salary
  calculateSalary: async (employeeId, month, year) => {
    try {
      const response = await apiClient.post('/salary/calculate', {
        employeeId,
        month,
        year
      });
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to calculate salary',
      };
    }
  },

  // Process salary
  processSalary: async (salaryData) => {
    try {
      const response = await apiClient.post('/salary/process', salaryData);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to process salary',
      };
    }
  },

  // Update salary record
  updateSalary: async (id, salaryData) => {
    try {
      const response = await apiClient.put(`/salary/${id}`, salaryData);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to update salary',
      };
    }
  },

  // Delete salary record
  deleteSalary: async (id) => {
    try {
      const response = await apiClient.delete(`/salary/${id}`);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to delete salary record',
      };
    }
  },

  // Generate salary slip
  generateSalarySlip: async (employeeId, month, year) => {
    try {
      const response = await apiClient.get(`/salary/slip/${employeeId}`, {
        params: { month, year },
        responseType: 'blob'
      });
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to generate salary slip',
      };
    }
  },

  // Get salary statistics
  getSalaryStats: async (departmentId = null) => {
    try {
      const params = departmentId ? { departmentId } : {};
      const response = await apiClient.get('/salary/stats', { params });
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to fetch salary stats',
      };
    }
  },

  // Process bulk salaries
  processBulkSalaries: async (employeeIds, month, year) => {
    try {
      const response = await apiClient.post('/salary/bulk-process', {
        employeeIds,
        month,
        year
      });
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to process bulk salaries',
      };
    }
  },

  // Get payroll report
  getPayrollReport: async (month, year, departmentId = null) => {
    try {
      const params = { month, year };
      if (departmentId) params.departmentId = departmentId;
      
      const response = await apiClient.get('/salary/payroll-report', {
        params,
        responseType: 'blob'
      });
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to generate payroll report',
      };
    }
  },
};