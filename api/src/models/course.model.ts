import {
  model,
  Schema
} from "mongoose";

export type CourseLevel =
  | "Beginner"
  | "Intermediate"
  | "Advanced";

export interface CourseDocument {
  title: string;
  description: string;
  durationHours: number;
  price: number;
  level: CourseLevel;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const courseSchema =
  new Schema<CourseDocument>(
    {
      title: {
        type: String,
        required: true,
        trim: true
      },

      description: {
        type: String,
        required: true,
        trim: true
      },

      durationHours: {
        type: Number,
        required: true,
        min: 1
      },

      price: {
        type: Number,
        required: true,
        min: 0
      },

      level: {
        type: String,
        enum: [
          "Beginner",
          "Intermediate",
          "Advanced"
        ],
        required: true
      },

      active: {
        type: Boolean,
        default: true
      }
    },

    {
      timestamps: true
    }
  );

export const Course =
  model<CourseDocument>(
    "Course",
    courseSchema
  );
