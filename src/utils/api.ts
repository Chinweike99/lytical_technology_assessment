// src/utils/api.ts
import { Department, Role } from '../types';

// Mock API calls
export const fetchDepartments = async (): Promise<Department[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return [
    {
      id: '1',
      name: 'Engineering',
      description: 'Responsible for product development and technical solutions',
      roles: [{ id: '1', name: 'Software Engineer', department: 'Engineering' }],
      members: 15
    },
    {
      id: '2',
      name: 'Marketing',
      description: 'Handles brand management and customer acquisition',
      roles: [{ id: '2', name: 'Content Specialist', department: 'Marketing' }],
      members: 8
    }
  ];
};

export const fetchRoles = async (): Promise<Role[]> => {
  await new Promise(resolve => setTimeout(resolve, 800));
  
  return [
    { id: '1', name: 'Software Engineer', department: 'Engineering' },
    { id: '2', name: 'Product Manager', department: 'Product' },
    { id: '3', name: 'UX Designer', department: 'Design' },
    { id: '4', name: 'Content Specialist', department: 'Marketing' },
    { id: '5', name: 'Data Analyst', department: 'Engineering' },
    { id: '6', name: 'DevOps Engineer', department: 'Engineering' },
  ];
};

export const createDepartment = async (department: Omit<Department, 'id'>): Promise<Department> => {
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  return {
    ...department,
    id: Math.random().toString(36).substr(2, 9),
  };
};