import { Department, Role } from '../types';

// Mock API calls
export const fetchDepartments = async (): Promise<Department[]> => {
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
    { id: '1', name: 'Finance Manager', department: 'Accounting' },
    { id: '2', name: 'Accountant', department: 'Accounting' },
    { id: '3', name: 'Engineering Manager', department: 'Engineering' },
    { id: '4', name: 'Software Engineer', department: 'Engineering' },
    { id: '5', name: 'QA Engineer', department: '-' },
    { id: '6', name: 'DevOps Engineer', department: 'Engineering' },
    { id: '7', name: 'Billing Specialist', department: 'Accounting' },
    { id: '8', name: 'Product Manager', department: '-' },
    { id: '9', name: 'Product Designer', department: '-' },
    { id: '10', name: 'UX Reseacher', department: '-' },
  ];
};

export const createDepartment = async (department: Omit<Department, 'id'>): Promise<Department> => {
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  return {
    ...department,
    id: Math.random().toString(36).substr(2, 9),
  };
};