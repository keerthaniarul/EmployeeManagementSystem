// API Constants
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    SIGNUP: '/auth/signup',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    PROFILE: '/auth/profile',
    CHANGE_PASSWORD: '/auth/change-password',
  },
  EMPLOYEES: {
    BASE: '/employees',
    SEARCH: '/employees/search',
    STATS: '/employees/stats',
    BY_DEPARTMENT: '/employees/department',
  },
  DEPARTMENTS: {
    BASE: '/departments',
    STATS: '/departments/stats',
  },
  ATTENDANCE: {
    BASE: '/attendance',
    SUMMARY: '/attendance/summary',
    REPORT: '/attendance/report',
    STATS: '/attendance/stats',
  },
  SALARY: {
    BASE: '/salary',
    CALCULATE: '/salary/calculate',
    PROCESS: '/salary/process',
    SLIP: '/salary/slip',
    REPORT: '/salary/report',
    STATS: '/salary/stats',
  },
};

// User Roles
export const USER_ROLES = {
  ADMIN: 'admin',
  EMPLOYEE: 'employee',
  HR: 'hr',
  MANAGER: 'manager',
};

// Employee Status
export const EMPLOYEE_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  TERMINATED: 'terminated',
  ON_LEAVE: 'on_leave',
  PROBATION: 'probation',
};

// Department Status
export const DEPARTMENT_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
};

// Attendance Status
export const ATTENDANCE_STATUS = {
  PRESENT: 'present',
  ABSENT: 'absent',
  LATE: 'late',
  HALF_DAY: 'half_day',
  HOLIDAY: 'holiday',
  LEAVE: 'leave',
};

// Leave Types
export const LEAVE_TYPES = {
  CASUAL: 'casual',
  SICK: 'sick',
  ANNUAL: 'annual',
  MATERNITY: 'maternity',
  PATERNITY: 'paternity',
  EMERGENCY: 'emergency',
  UNPAID: 'unpaid',
};

// Salary Status
export const SALARY_STATUS = {
  PENDING: 'pending',
  PROCESSED: 'processed',
  PAID: 'paid',
  HOLD: 'hold',
  CANCELLED: 'cancelled',
};

// Notification Types
export const NOTIFICATION_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
};

// Date Formats
export const DATE_FORMATS = {
  DISPLAY: 'MMM dd, yyyy',
  INPUT: 'yyyy-MM-dd',
  FULL: 'MMMM dd, yyyy',
  SHORT: 'MM/dd/yyyy',
  TIME: 'HH:mm',
  DATETIME: 'MMM dd, yyyy HH:mm',
};

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100,
  PAGE_SIZE_OPTIONS: [5, 10, 20, 50, 100],
};

// File Upload
export const FILE_UPLOAD = {
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_TYPES: {
    IMAGES: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'],
    DOCUMENTS: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
    EXCEL: ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
  },
};

// Colors
export const COLORS = {
  PRIMARY: '#667eea',
  SECONDARY: '#764ba2',
  SUCCESS: '#10b981',
  WARNING: '#f59e0b',
  ERROR: '#ef4444',
  INFO: '#3b82f6',
  GRAY: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },
};

// Breakpoints
export const BREAKPOINTS = {
  XS: '480px',
  SM: '640px',
  MD: '768px',
  LG: '1024px',
  XL: '1280px',
  '2XL': '1536px',
};

// Local Storage Keys
export const STORAGE_KEYS = {
  TOKEN: 'token',
  USER: 'user',
  THEME: 'theme',
  LANGUAGE: 'language',
  PREFERENCES: 'preferences',
};

// Form Validation
export const VALIDATION = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE_REGEX: /^\d{10}$/,
  PASSWORD_MIN_LENGTH: 6,
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 50,
};

// Time Zones
export const TIMEZONES = [
  { value: 'America/New_York', label: 'Eastern Time (ET)' },
  { value: 'America/Chicago', label: 'Central Time (CT)' },
  { value: 'America/Denver', label: 'Mountain Time (MT)' },
  { value: 'America/Los_Angeles', label: 'Pacific Time (PT)' },
  { value: 'UTC', label: 'UTC' },
  { value: 'Europe/London', label: 'London (GMT)' },
  { value: 'Europe/Paris', label: 'Paris (CET)' },
  { value: 'Asia/Tokyo', label: 'Tokyo (JST)' },
  { value: 'Asia/Shanghai', label: 'Shanghai (CST)' },
  { value: 'Asia/Kolkata', label: 'India (IST)' },
];

// Default Values
export const DEFAULTS = {
  AVATAR_SIZE: 40,
  TOAST_DURATION: 3000,
  DEBOUNCE_DELAY: 300,
  ANIMATION_DURATION: 300,
  SIDEBAR_WIDTH: 280,
  HEADER_HEIGHT: 64,
};

// Menu Items
export const MENU_ITEMS = {
  ADMIN: [
    { path: '/', label: 'Dashboard', icon: '📊' },
    { path: '/departments', label: 'Departments', icon: '🏢' },
    { path: '/attendance', label: 'Attendance', icon: '📅' },
    { path: '/salary', label: 'Salary', icon: '💰' },
    { path: '/settings', label: 'Settings', icon: '⚙️' },
  ],
  EMPLOYEE: [
    { path: '/', label: 'Dashboard', icon: '📊' },
    { path: '/attendance', label: 'My Attendance', icon: '📅' },
    { path: '/salary', label: 'My Salary', icon: '💰' },
  ],
};

// Status Colors
export const STATUS_COLORS = {
  [EMPLOYEE_STATUS.ACTIVE]: '#10b981',
  [EMPLOYEE_STATUS.INACTIVE]: '#6b7280',
  [EMPLOYEE_STATUS.TERMINATED]: '#ef4444',
  [EMPLOYEE_STATUS.ON_LEAVE]: '#f59e0b',
  [EMPLOYEE_STATUS.PROBATION]: '#8b5cf6',
  [ATTENDANCE_STATUS.PRESENT]: '#10b981',
  [ATTENDANCE_STATUS.ABSENT]: '#ef4444',
  [ATTENDANCE_STATUS.LATE]: '#f59e0b',
  [ATTENDANCE_STATUS.HALF_DAY]: '#3b82f6',
  [ATTENDANCE_STATUS.HOLIDAY]: '#8b5cf6',
  [ATTENDANCE_STATUS.LEAVE]: '#6b7280',
  [SALARY_STATUS.PENDING]: '#f59e0b',
  [SALARY_STATUS.PROCESSED]: '#3b82f6',
  [SALARY_STATUS.PAID]: '#10b981',
  [SALARY_STATUS.HOLD]: '#ef4444',
  [SALARY_STATUS.CANCELLED]: '#6b7280',
};

// Error Messages
export const ERROR_MESSAGES = {
  REQUIRED_FIELD: 'This field is required',
  INVALID_EMAIL: 'Please enter a valid email address',
  INVALID_PHONE: 'Please enter a valid phone number',
  PASSWORD_TOO_SHORT: `Password must be at least ${VALIDATION.PASSWORD_MIN_LENGTH} characters`,
  PASSWORDS_DONT_MATCH: 'Passwords do not match',
  NETWORK_ERROR: 'Network error. Please check your connection.',
  SERVER_ERROR: 'Server error. Please try again later.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  NOT_FOUND: 'The requested resource was not found.',
  VALIDATION_ERROR: 'Please fix the validation errors.',
};

// Success Messages
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Login successful!',
  SIGNUP_SUCCESS: 'Account created successfully!',
  LOGOUT_SUCCESS: 'Logged out successfully',
  SAVE_SUCCESS: 'Saved successfully!',
  UPDATE_SUCCESS: 'Updated successfully!',
  DELETE_SUCCESS: 'Deleted successfully!',
  UPLOAD_SUCCESS: 'File uploaded successfully!',
};

export default {
  API_ENDPOINTS,
  USER_ROLES,
  EMPLOYEE_STATUS,
  DEPARTMENT_STATUS,
  ATTENDANCE_STATUS,
  LEAVE_TYPES,
  SALARY_STATUS,
  NOTIFICATION_TYPES,
  DATE_FORMATS,
  PAGINATION,
  FILE_UPLOAD,
  COLORS,
  BREAKPOINTS,
  STORAGE_KEYS,
  VALIDATION,
  TIMEZONES,
  DEFAULTS,
  MENU_ITEMS,
  STATUS_COLORS,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
};