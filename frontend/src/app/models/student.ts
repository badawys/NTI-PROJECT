export interface Student {
  _id: string;
  name: string;
  email: string;
  age: number;
  city: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateStudentInput {
  name: string;
  email: string;
  age: number;
  city: string;
}

export type UpdateStudentInput =
  Partial<CreateStudentInput>;