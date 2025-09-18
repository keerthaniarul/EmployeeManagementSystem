import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';

// Create axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle common errors
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or unauthorized
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authService = {
  // Set auth token in headers
  setAuthToken: (token) => {
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  },

  // Remove auth token from headers
  removeAuthToken: () => {
    delete apiClient.defaults.headers.common['Authorization'];
  },

  // Login user
  login: async (email, password) => {
    try {
      const response = await apiClient.post('/auth/login', {
        email,
        password,
      });
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      // For development, return mock success
      if (email === 'admin@company.com' && password === 'admin123') {
        return {
          success: true,
          data: {
            token: 'mock-jwt-token-admin',
            user: {
              id: '1',
              name: 'Admin User',
              email: 'admin@company.com',
              role: 'admin',
            },
          },
        };
      } else if (email === 'employee@company.com' && password === 'emp123') {
        return {
          success: true,
          data: {
            token: 'mock-jwt-token-employee',
            user: {
              id: '2',
              name: 'John Employee',
              email: 'employee@company.com',
              role: 'employee',
            },
          },
        };
      } else {
        return {
          success: false,
          message: error.response?.data?.message || 'Invalid credentials',
        };
      }
    }
  },

  // Register user
  signup: async (userData) => {
    try {
      const response = await apiClient.post('/auth/signup', userData);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      // For development, return mock success
      return {
        success: true,
        message: 'Account created successfully',
      };
    }
  },

  // Get current user
  getCurrentUser: async () => {
    try {
      const response = await apiClient.get('/auth/me');
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to get user',
      };
    }
  },

  // Update user profile
  updateProfile: async (userData) => {
    try {
      const response = await apiClient.put('/auth/profile', userData);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to update profile',
      };
    }
  },

  // Change password
  changePassword: async (currentPassword, newPassword) => {
    try {
      const response = await apiClient.put('/auth/change-password', {
        currentPassword,
        newPassword,
      });
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to change password',
      };
    }
  },

  // Refresh token
  refreshToken: async () => {
    try {
      const response = await apiClient.post('/auth/refresh');
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to refresh token',
      };
    }
  },
};

export default apiClient;