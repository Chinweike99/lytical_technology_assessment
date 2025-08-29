import { useState, useEffect } from 'react';
import { Role } from '../types';
import { fetchRoles } from '../utils/api';

export const useRoles = () => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadRoles();
  }, []);

  const loadRoles = async () => {
    try {
      setLoading(true);
      const data = await fetchRoles();
      setRoles(data);
      setError(null);
    } catch (err) {
      setError('Failed to load roles');
    } finally {
      setLoading(false);
    }
  };

  return { roles, loading, error, refetch: loadRoles };
};