// src/utils/validation.ts
import { z } from 'zod';

export const departmentSchema = z.object({
  name: z.string().min(1, 'Department name is required'),
  description: z.string().max(100, 'Description must be 100 characters or less'),
});

export type DepartmentFormData = z.infer<typeof departmentSchema>;