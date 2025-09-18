import React, { createContext, useContext, useState, useCallback } from 'react';
import { employeeService } from '../services/employeeService';

const EmployeeContext = createContext();

export const useEmployees = () => {
  const context = useContext(EmployeeContext);
  if (!context) {
    throw new Error('useEmployees must be used within an EmployeeProvider');
  }
  return context;
};

export const EmployeeProvider = ({ children }) => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState(null);

  const fetchEmployees = useCallback(async (departmentId = null) => {
    try {
      setLoading(true);
      const response = departmentId 
        ? await employeeService.getEmployeesByDepartment(departmentId)
        : await employeeService.getAllEmployees();
      
      if (response.success) {
        setEmployees(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch employees:', error);
      // For development, set some dummy data
      const dummyEmployees = [
        {
          id: '1',
          name: 'Alice Johnson',
          email: 'alice@company.com',
          phone: '+1234567890',
          role: 'Software Engineer',
          department: departmentId || '1',
          dateOfJoining: '2023-01-15',
          currentSalary: 75000,
          status: 'Active'
        },
        {
          id: '2',
          name: 'Bob Smith',
          email: 'bob@company.com',
          phone: '+1234567891',
          role: 'Senior Developer',
          department: departmentId || '1',
          dateOfJoining: '2022-06-10',
          currentSalary: 85000,
          status: 'Active'
        },
        {
          id: '3',
          name: 'Carol Davis',
          email: 'carol@company.com',
          phone: '+1234567892',
          role: 'Project Manager',
          department: departmentId || '1',
          dateOfJoining: '2021-03-20',
          currentSalary: 90000,
          status: 'Active'
        }
      ];
      setEmployees(dummyEmployees);
    } finally {
      setLoading(false);
    }
  }, []);

  const getEmployeeById = useCallback(async (id) => {
    try {
      const response = await employeeService.getEmployeeById(id);
      if (response.success) {
        setCurrentEmployee(response.data);
        return response.data;
      }
    } catch (error) {
      console.error('Failed to fetch employee:', error);
      const dummyEmployee = employees.find(emp => emp.id === id);
      if (dummyEmployee) {
        setCurrentEmployee(dummyEmployee);
        return dummyEmployee;
      }
    }
    return null;
  }, [employees]);

  const addEmployee = useCallback(async (employeeData) => {
    try {
      const response = await employeeService.createEmployee(employeeData);
      if (response.success) {
        setEmployees(prev => [...prev, response.data]);
        return response.data;
      }
    } catch (error) {
      console.error('Failed to add employee:', error);
      // For development, add to local state
      const newEmployee = {
        id: Date.now().toString(),
        ...employeeData,
        dateOfJoining: new Date().toISOString().split('T')[0],
        status: 'Active'
      };
      setEmployees(prev => [...prev, newEmployee]);
      return newEmployee;
    }
  }, []);

  const updateEmployee = useCallback(async (id, employeeData) => {
    try {
      const response = await employeeService.updateEmployee(id, employeeData);
      if (response.success) {
        setEmployees(prev =>
          prev.map(emp => 
            (emp._id || emp.id) === id 
              ? { ...emp, ...response.data }
              : emp
          )
        );
        return response.data;
      }
    } catch (error) {
      console.error('Failed to update employee:', error);
      // For development, update local state
      setEmployees(prev =>
        prev.map(emp => 
          (emp._id || emp.id) === id 
            ? { ...emp, ...employeeData }
            : emp
        )
      );
    }
  }, []);

  const deleteEmployee = useCallback(async (id) => {
    try {
      const response = await employeeService.deleteEmployee(id);
      if (response.success) {
        setEmployees(prev => 
          prev.filter(emp => (emp._id || emp.id) !== id)
        );
        return true;
      }
    } catch (error) {
      console.error('Failed to delete employee:', error);
      // For development, remove from local state
      setEmployees(prev => 
        prev.filter(emp => (emp._id || emp.id) !== id)
      );
    }
  }, []);

  const searchEmployees = useCallback(async (query) => {
    try {
      const response = await employeeService.searchEmployees(query);
      if (response.success) {
        return response.data;
      }
    } catch (error) {
      console.error('Failed to search employees:', error);
      // For development, filter local data
      const filtered = employees.filter(emp => 
        emp.name.toLowerCase().includes(query.toLowerCase()) ||
        emp.email.toLowerCase().includes(query.toLowerCase()) ||
        emp.phone.includes(query)
      );
      return filtered;
    }
    return [];
  }, [employees]);

  const value = {
    employees,
    loading,
    currentEmployee,
    fetchEmployees,
    getEmployeeById,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    searchEmployees,
    setCurrentEmployee
  };

  return (
    <EmployeeContext.Provider value={value}>
      {children}
    </EmployeeContext.Provider>
  );
};