import {
  model,
  Schema
} from "mongoose";

export interface StudentDocument {
  name: string;
  email: string;
  age: number;
  city: string;
  createdAt: Date;
  updatedAt: Date;
}

const studentSchema =
  new Schema<StudentDocument>(
    {
      name: {
        type: String,
        required: true,
        trim: true
      },

      email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
      },

      age: {
        type: Number,
        required: true,
        min: 10
      },

      city: {
        type: String,
        required: true,
        trim: true
      }
    },

    {
      timestamps: true
    }
  );

export const Student =
  model<StudentDocument>(
    "Student",
    studentSchema
  );
