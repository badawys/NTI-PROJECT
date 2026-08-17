export type CourseLevel =
  | "Beginner"
  | "Intermediate"
  | "Advanced";

export interface Course {
  _id: string;
  title: string;
  description: string;
  durationHours: number;
  price: number;
  level: CourseLevel;
  active: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateCourseInput {
  title: string;
  description: string;
  durationHours: number;
  price: number;
  level: CourseLevel;
  active: boolean;
}

export type UpdateCourseInput =
  Partial<CreateCourseInput>;