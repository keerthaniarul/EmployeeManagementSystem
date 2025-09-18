import React, { createContext, useContext, useState, useCallback } from 'react';
import { departmentService } from '../services/departmentService';

const DepartmentContext = createContext();

export const useDepartments = () => {
  const context = useContext(DepartmentContext);
  if (!context) {
    throw new Error('useDepartments must be used within a DepartmentProvider');
  }
  return context;
};

export const DepartmentProvider = ({ children }) => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentDepartment, setCurrentDepartment] = useState(null);

  const fetchDepartments = useCallback(async () => {
    try {
      setLoading(true);
      const response = await departmentService.getAllDepartments();
      if (response.success) {
        setDepartments(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch departments:', error);
      // For development, set some dummy data
      setDepartments([
        {
          id: '1',
          name: 'IT',
          description: 'Information Technology Department',
          head: 'John Smith',
          employeeCount: 15,
          status: 'Active'
        },
        {
          id: '2',
          name: 'HR',
          description: 'Human Resources Department',
          head: 'Sarah Johnson',
          employeeCount: 8,
          status: 'Active'
        },
        {
          id: '3',
          name: 'Finance',
          description: 'Finance and Accounting Department',
          head: 'Michael Brown',
          employeeCount: 10,
          status: 'Active'
        },
        {
          id: '4',
          name: 'Marketing',
          description: 'Marketing and Communications Department',
          head: 'Emily Davis',
          employeeCount: 12,
          status: 'Active'
        }
      ]);
    } finally {
      setLoading(false);
    }
  }, []);

  const getDepartmentById = useCallback(async (id) => {
    try {
      const response = await departmentService.getDepartmentById(id);
      if (response.success) {
        setCurrentDepartment(response.data);
        return response.data;
      }
    } catch (error) {
      console.error('Failed to fetch department:', error);
      // Return dummy data for development
      const dummyDepartment = departments.find(dept => dept.id === id);
      if (dummyDepartment) {
        setCurrentDepartment(dummyDepartment);
        return dummyDepartment;
      }
    }
    return null;
  }, [departments]);

  const addDepartment = useCallback(async (departmentData) => {
    try {
      const response = await departmentService.createDepartment(departmentData);
      if (response.success) {
        setDepartments(prev => [...prev, response.data]);
        return response.data;
      }
    } catch (error) {
      console.error('Failed to add department:', error);
      // For development, add to local state
      const newDepartment = {
        id: Date.now().toString(),
        ...departmentData,
        employeeCount: 0
      };
      setDepartments(prev => [...prev, newDepartment]);
      return newDepartment;
    }
  }, []);

  const updateDepartment = useCallback(async (id, departmentData) => {
    try {
      const response = await departmentService.updateDepartment(id, departmentData);
      if (response.success) {
        setDepartments(prev =>
          prev.map(dept => 
            (dept._id || dept.id) === id 
              ? { ...dept, ...response.data }
              : dept
          )
        );
        return response.data;
      }
    } catch (error) {
      console.error('Failed to update department:', error);
      // For development, update local state
      setDepartments(prev =>
        prev.map(dept => 
          (dept._id || dept.id) === id 
            ? { ...dept, ...departmentData }
            : dept
        )
      );
    }
  }, []);

  const deleteDepartment = useCallback(async (id) => {
    try {
      const response = await departmentService.deleteDepartment(id);
      if (response.success) {
        setDepartments(prev => 
          prev.filter(dept => (dept._id || dept.id) !== id)
        );
        return true;
      }
    } catch (error) {
      console.error('Failed to delete department:', error);
      // For development, remove from local state
      setDepartments(prev => 
        prev.filter(dept => (dept._id || dept.id) !== id)
      );
    }
  }, []);

  const value = {
    departments,
    loading,
    currentDepartment,
    fetchDepartments,
    getDepartmentById,
    addDepartment,
    updateDepartment,
    deleteDepartment,
    setCurrentDepartment
  };

  return (
    <DepartmentContext.Provider value={value}>
      {children}
    </DepartmentContext.Provider>
  );
};