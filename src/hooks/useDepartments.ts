import { useState, useEffect } from 'react';
import { Department } from '../types';
import { fetchDepartments, createDepartment } from '../utils/api';

export const useDepartments = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadDepartments();
  }, []);

  const loadDepartments = async () => {
    try {
      setLoading(true);
      const data = await fetchDepartments();
      setDepartments(data);
      setError(null);
    } catch (err) {
      setError('Failed to load departments');
    } finally {
      setLoading(false);
    }
  };

  const addDepartment = async (department: Omit<Department, 'id'>) => {
    try {
      const newDepartment = await createDepartment(department);
      setDepartments(prev => [...prev, newDepartment]);
      return newDepartment;
    } catch (err) {
      setError('Failed to create department');
      throw err;
    }
  };

  return { departments, loading, error, addDepartment, refetch: loadDepartments };
};