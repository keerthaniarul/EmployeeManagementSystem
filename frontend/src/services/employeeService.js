import apiClient from './authService';

export const employeeService = {
  // Get all employees
  getAllEmployees: async () => {
    try {
      const response = await apiClient.get('/employees');
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to fetch employees',
      };
    }
  },

  // Get employees by department
  getEmployeesByDepartment: async (departmentId) => {
    try {
      const response = await apiClient.get(`/employees/department/${departmentId}`);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to fetch employees',
      };
    }
  },

  // Get employee by ID
  getEmployeeById: async (id) => {
    try {
      const response = await apiClient.get(`/employees/${id}`);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to fetch employee',
      };
    }
  },

  // Create new employee
  createEmployee: async (employeeData) => {
    try {
      const response = await apiClient.post('/employees', employeeData);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to create employee',
      };
    }
  },

  // Update employee
  updateEmployee: async (id, employeeData) => {
    try {
      const response = await apiClient.put(`/employees/${id}`, employeeData);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to update employee',
      };
    }
  },

  // Delete employee
  deleteEmployee: async (id) => {
    try {
      const response = await apiClient.delete(`/employees/${id}`);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to delete employee',
      };
    }
  },

  // Search employees
  searchEmployees: async (query) => {
    try {
      const response = await apiClient.get(`/employees/search?q=${encodeURIComponent(query)}`);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to search employees',
      };
    }
  },

  // Get employee statistics
  getEmployeeStats: async () => {
    try {
      const response = await apiClient.get('/employees/stats');
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to fetch employee stats',
      };
    }
  },

  // Update employee status
  updateEmployeeStatus: async (id, status) => {
    try {
      const response = await apiClient.patch(`/employees/${id}/status`, { status });
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to update employee status',
      };
    }
  },
};