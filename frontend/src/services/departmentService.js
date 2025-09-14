import apiClient from './authService';

export const departmentService = {
  // Get all departments
  getAllDepartments: async () => {
    try {
      const response = await apiClient.get('/departments');
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to fetch departments',
      };
    }
  },

  // Get department by ID
  getDepartmentById: async (id) => {
    try {
      const response = await apiClient.get(`/departments/${id}`);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to fetch department',
      };
    }
  },

  // Create new department
  createDepartment: async (departmentData) => {
    try {
      const response = await apiClient.post('/departments', departmentData);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to create department',
      };
    }
  },

  // Update department
  updateDepartment: async (id, departmentData) => {
    try {
      const response = await apiClient.put(`/departments/${id}`, departmentData);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to update department',
      };
    }
  },

  // Delete department
  deleteDepartment: async (id) => {
    try {
      const response = await apiClient.delete(`/departments/${id}`);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to delete department',
      };
    }
  },

  // Get department statistics
  getDepartmentStats: async (id) => {
    try {
      const response = await apiClient.get(`/departments/${id}/stats`);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to fetch department stats',
      };
    }
  },
};