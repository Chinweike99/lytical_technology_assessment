import { z } from 'zod';

export const departmentSchema = z.object({
  name: z.string().min(1, 'Department name is required'),
  description: z.string()
    .refine((val) => {
      if (val.trim() === '') return true; // Allow empty
      const wordCount = val.trim().split(/\s+/).length;
      return wordCount <= 100;
    }, 'Description must not exceed 100 words')
});

export type DepartmentFormData = z.infer<typeof departmentSchema>;