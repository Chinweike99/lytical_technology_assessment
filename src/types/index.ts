// src/types/index.ts
export interface Department {
  id: string;
  name: string;
  description: string;
  roles: Role[];
  members: number;
}

export interface Role {
  id: string;
  name: string;
  department: string;
}

export type Step = 1 | 2 | 3;